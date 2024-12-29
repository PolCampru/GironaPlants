import { NextRequest, NextResponse } from "next/server";
import * as xlsx from "xlsx";

interface PlantRow {
  GENUS?: string;
  DESCRIPTION?: string;
  "POT SIZE"?: string;
  HEIGHT?: string;
  PRICE?: number;
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

    const fileUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/GironaPlantsCatalogue.xlsx`;

    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${fileUrl} (${response.status})`);
    }

    const buffer = await response.arrayBuffer();

    const workbook = xlsx.read(new Uint8Array(buffer), { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json<PlantRow>(workbook.Sheets[sheetName]);

    const filteredRows = rows.filter((row) => row.PRICE);

    for (const row of filteredRows) {
      const { GENUS, DESCRIPTION, "POT SIZE": potSize, HEIGHT, PRICE } = row;

      const payload = {
        data: {
          genus: GENUS,
          description: DESCRIPTION,
          pot_size: potSize,
          height: HEIGHT,
          price: PRICE,
        },
      };

      const response = await fetch(`${strapiBaseUrl}/api/plants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(
          `Failed to POST row. Status ${response.status}: ${response.statusText}`
        );
      }
    }

    return NextResponse.json({
      message: `Seeded ${filteredRows.length} rows to Strapi.`,
    });
  } catch (err: any) {
    console.error(`POST /seed-plants error: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
