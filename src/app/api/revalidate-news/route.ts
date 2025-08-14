import { NextRequest, NextResponse } from "next/server";
import { revalidateNewsCache, triggerManualRevalidation } from "@/lib/cache-revalidation";

/**
 * Manual cache revalidation endpoint for news content
 * This endpoint can be used to manually trigger cache revalidation
 * Useful for webhooks, external integrations, or manual cache clearing
 */

export async function POST(req: NextRequest) {
  try {
    // Check for authorization (optional - you can add API key validation here)
    const authHeader = req.headers.get('authorization');
    const apiKey = process.env.REVALIDATION_API_KEY;
    
    if (apiKey && authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { 
      type = 'manual', 
      slug_th, 
      slug_en, 
      id, 
      action = 'update',
      paths = []
    } = body;

    let result;

    if (type === 'news' && (slug_th || slug_en || id)) {
      // Specific news article revalidation
      result = await revalidateNewsCache({
        slug_th,
        slug_en,
        id,
        action
      });
    } else if (type === 'manual' || paths.length > 0) {
      // Manual revalidation with custom paths
      result = await triggerManualRevalidation(paths);
    } else {
      // Default: revalidate all news-related cache
      result = await revalidateNewsCache({
        action: 'update'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Cache revalidation triggered',
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Revalidation API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to trigger revalidation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'manual';
    const paths = searchParams.get('paths')?.split(',') || [];

    let result;

    if (type === 'manual') {
      result = await triggerManualRevalidation(paths);
    } else {
      result = await revalidateNewsCache({
        action: 'update'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Cache revalidation completed',
      result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Revalidation GET error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to revalidate cache',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint to verify revalidation service is working
 */
export async function HEAD() {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Service': 'cache-revalidation'
    }
  });
}
