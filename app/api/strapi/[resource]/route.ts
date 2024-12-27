import { NextRequest, NextResponse } from "next/server";

const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL ?? "";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export async function GET(
  req: NextRequest,
  { params }: { params: { resource: string } }
) {
  try {
    const { resource } = params;

    const url = new URL(req.url);

    const searchParams = url.searchParams;

    const queryString = searchParams.toString();

    const fetchUrl = `${STRAPI_BASE_URL}/api/${resource}?${queryString}`;

    const strapiRes = await fetch(fetchUrl, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    });

    if (!strapiRes.ok) {
      return NextResponse.json(
        { error: `Error from Strapi: ${strapiRes.statusText}` },
        { status: strapiRes.status }
      );
    }

    const data = await strapiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/strapi/[resource] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
