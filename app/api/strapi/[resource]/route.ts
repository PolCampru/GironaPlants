import { NextRequest, NextResponse } from "next/server";

const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL ?? "";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

// Rate limiting storage (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 100; // max requests per window

  const current = rateLimit.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ resource: string }> }
) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { 
          status: 429,
          headers: {
            'Retry-After': '60'
          }
        }
      );
    }

    const { resource } = await context.params;

    // Validate resource parameter
    const allowedResources = ['plants', 'offers', 'home', 'about-us', 'catalogue', 'catalogues'];
    if (!allowedResources.includes(resource)) {
      return NextResponse.json(
        { error: "Invalid resource" },
        { status: 400 }
      );
    }

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    
    // Sanitize query parameters
    const sanitizedParams = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      // Allow only safe characters
      if (/^[a-zA-Z0-9\[\]\.\,\:\-\_\*\&\=\%]+$/.test(key) && 
          /^[a-zA-Z0-9\[\]\.\,\:\-\_\*\&\=\%\s]+$/.test(value)) {
        sanitizedParams.append(key, value);
      }
    }

    const queryString = sanitizedParams.toString();
    const fetchUrl = `${STRAPI_BASE_URL}/api/${resource}?${queryString}`;

    const strapiRes = await fetch(fetchUrl, {
      headers: { 
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        'User-Agent': 'GironaPlants/1.0'
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!strapiRes.ok) {
      console.error(`Strapi API error: ${strapiRes.status} ${strapiRes.statusText}`);
      return NextResponse.json(
        { error: `Error from Strapi: ${strapiRes.statusText}` },
        { status: strapiRes.status }
      );
    }

    const data = await strapiRes.json();
    
    // Determine cache duration based on resource type
    let maxAge = 3600; // 1 hour default
    if (resource === 'plants' || resource === 'offers') {
      maxAge = 1800; // 30 minutes for dynamic content
    } else if (resource === 'home' || resource === 'about-us') {
      maxAge = 7200; // 2 hours for semi-static content
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=86400`,
        'CDN-Cache-Control': `public, s-maxage=${maxAge}`,
        'Vercel-CDN-Cache-Control': `public, s-maxage=${maxAge}`,
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("GET /api/strapi/[resource] error:", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    // Don't expose internal error details
    return NextResponse.json(
      { error: "Internal Server Error" },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
        }
      }
    );
  }
}
