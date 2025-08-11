import { NextRequest, NextResponse } from "next/server";

/**
 * Cache warming endpoint to pre-populate Vercel's cache after deployment
 * This helps ensure cache HITs for the most important pages
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    // Verify authorization
    if (authHeader !== `Bearer ${process.env.CACHE_WARM_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://padungsilpa.group";

    // Critical pages to warm for both locales
    const criticalPages = [
      "/",
      "/pds-group",
      "/products-services",
      "/reference",
      "/contact",
    ];

    const locales = ["th", "en"];
    const results: Array<{ url: string; status: number; cached: boolean }> = [];

    // Warm cache for each locale and page combination
    for (const locale of locales) {
      for (const page of criticalPages) {
        const url = `${baseUrl}/${locale}${page === "/" ? "" : page}`;

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "User-Agent": "Cache-Warmer/1.0",
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "Accept-Language":
                locale === "th" ? "th,en;q=0.9" : "en,th;q=0.9",
              "Cache-Control": "no-cache", // Force fresh fetch to populate cache
            },
          });

          const cached = response.headers.get("x-vercel-cache") === "HIT";

          results.push({
            url,
            status: response.status,
            cached,
          });

          console.log(
            `Cache warm: ${url} - Status: ${response.status} - Cached: ${cached}`
          );

          // Small delay to avoid overwhelming the server
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to warm cache for ${url}:`, error);
          results.push({
            url,
            status: 500,
            cached: false,
          });
        }
      }
    }

    // Also warm API endpoints
    const apiEndpoints = [
      "/api/services",
      "/api/products",
      "/api/partners",
      "/api/contents?page=HOME",
    ];

    for (const endpoint of apiEndpoints) {
      const url = `${baseUrl}${endpoint}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "User-Agent": "Cache-Warmer/1.0",
            "Cache-Control": "no-cache",
          },
        });

        const cached = response.headers.get("x-vercel-cache") === "HIT";

        results.push({
          url,
          status: response.status,
          cached,
        });

        console.log(
          `API cache warm: ${url} - Status: ${response.status} - Cached: ${cached}`
        );

        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (error) {
        console.error(`Failed to warm API cache for ${url}:`, error);
        results.push({
          url,
          status: 500,
          cached: false,
        });
      }
    }

    const successCount = results.filter((r) => r.status === 200).length;
    const cacheHitCount = results.filter((r) => r.cached).length;

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        total: results.length,
        successful: successCount,
        cacheHits: cacheHitCount,
        cacheHitRate: `${((cacheHitCount / results.length) * 100).toFixed(1)}%`,
      },
      results,
    });
  } catch (error) {
    console.error("Cache warming error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Cache warming failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    service: "cache-warm",
    status: "ready",
    timestamp: new Date().toISOString(),
  });
}
