import { NextRequest, NextResponse } from "next/server";
import * as xlsx from "xlsx";

interface PlantRow {
  GENUS?: string;
  DESCRIPTION?: string;
  "POT SIZE"?: string;
  HEIGHT?: string;
  PRICE?: number;
}

interface StrapiPlant {
  id: number;
  documentId: string;
}

const BATCH_SIZE = 10;

async function deleteAllPlants(baseUrl: string, token: string): Promise<number> {
  let deleted = 0;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `${baseUrl}/api/plants?pagination[pageSize]=100&fields[0]=id`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error(`Failed to fetch plants for deletion: ${res.status}`);

    const json = await res.json();
    const plants: StrapiPlant[] = json.data ?? [];

    if (plants.length === 0) {
      hasMore = false;
      break;
    }

    const deletePromises = plants.map((plant) =>
      fetch(`${baseUrl}/api/plants/${plant.documentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const results = await Promise.allSettled(deletePromises);
    deleted += results.filter((r) => r.status === "fulfilled").length;
  }

  return deleted;
}

async function createPlantsBatch(
  rows: PlantRow[],
  baseUrl: string,
  token: string
): Promise<{ succeeded: number; failed: number }> {
  const promises = rows.map((row) => {
    const { GENUS, DESCRIPTION, "POT SIZE": potSize, HEIGHT, PRICE } = row;

    return fetch(`${baseUrl}/api/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          genus: GENUS ?? "",
          description: DESCRIPTION ?? "",
          pot_size: potSize ?? "",
          height: HEIGHT ?? "",
          price: PRICE ?? 0,
        },
      }),
    });
  });

  const results = await Promise.allSettled(promises);
  let succeeded = 0;
  let failed = 0;

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.ok) {
      succeeded++;
    } else {
      failed++;
    }
  }

  return { succeeded, failed };
}

export async function POST(request: NextRequest) {
  try {
    const secretToken = process.env.SECRET_TOKEN;

    if (request.headers.get("Authorization") !== `Bearer ${secretToken}`) {
      return NextResponse.json(
        { error: "Unauthorized. Missing or invalid secret token." },
        { status: 401 }
      );
    }

    const strapiBaseUrl = process.env.STRAPI_BASE_URL;
    const strapiToken = process.env.STRAPI_TOKEN;
    if (!strapiBaseUrl || !strapiToken) {
      return NextResponse.json(
        { error: "Missing STRAPI_BASE_URL or STRAPI_TOKEN in environment." },
        { status: 500 }
      );
    }

    // 1. Delete all existing plants
    const deletedCount = await deleteAllPlants(strapiBaseUrl, strapiToken);

    // 2. Read the Excel file
    const fileUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/GironaPlantsCatalogue.xlsx`;

    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch file: ${fileUrl} (${fileResponse.status})`);
    }

    const buffer = await fileResponse.arrayBuffer();
    const workbook = xlsx.read(new Uint8Array(buffer), { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json<PlantRow>(workbook.Sheets[sheetName]);
    const filteredRows = rows.filter((row) => row.PRICE);

    // 3. Create plants in parallel batches
    let totalSucceeded = 0;
    let totalFailed = 0;

    for (let i = 0; i < filteredRows.length; i += BATCH_SIZE) {
      const batch = filteredRows.slice(i, i + BATCH_SIZE);
      const { succeeded, failed } = await createPlantsBatch(
        batch,
        strapiBaseUrl,
        strapiToken
      );
      totalSucceeded += succeeded;
      totalFailed += failed;
    }

    // 4. Publish all draft plants
    let published = 0;
    let page = 1;
    let hasMoreDrafts = true;

    while (hasMoreDrafts) {
      const res = await fetch(
        `${strapiBaseUrl}/api/plants?status=draft&pagination[page]=${page}&pagination[pageSize]=100&fields[0]=id`,
        { headers: { Authorization: `Bearer ${strapiToken}` } }
      );

      if (!res.ok) break;

      const json = await res.json();
      const drafts: StrapiPlant[] = json.data ?? [];

      if (drafts.length === 0) {
        hasMoreDrafts = false;
        break;
      }

      const publishPromises = drafts.map((plant) =>
        fetch(`${strapiBaseUrl}/api/plants/${plant.documentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${strapiToken}`,
          },
          body: JSON.stringify({
            data: { publishedAt: new Date().toISOString() },
          }),
        })
      );

      const results = await Promise.allSettled(publishPromises);
      published += results.filter(
        (r) => r.status === "fulfilled" && r.value.ok
      ).length;
      page++;
    }

    return NextResponse.json({
      message: "Seed complete",
      deleted: deletedCount,
      total_rows: filteredRows.length,
      created: totalSucceeded,
      failed: totalFailed,
      published,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`POST /seed-plants error: ${message}`);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
