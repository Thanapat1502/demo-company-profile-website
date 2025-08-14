import { NextResponse } from "next/server";

/**
 * Utility functions for API responses with proper cache control
 * Ensures all API responses are never cached by Vercel or browsers
 */

/**
 * Set no-cache headers on a NextResponse
 * This prevents both Vercel edge caching and browser caching
 */
export function setNoCacheHeaders(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("X-Vercel-Cache", "BYPASS");
  return response;
}

/**
 * Create a JSON response with no-cache headers
 * Use this instead of NextResponse.json() for API routes
 */
export function createApiResponse(data: any, options?: ResponseInit): NextResponse {
  const response = NextResponse.json(data, options);
  return setNoCacheHeaders(response);
}

/**
 * Create an error response with no-cache headers
 * Standardized error response format
 */
export function createApiErrorResponse(
  error: string, 
  status: number = 500, 
  details?: any
): NextResponse {
  const response = NextResponse.json(
    { 
      error, 
      details,
      timestamp: new Date().toISOString()
    }, 
    { status }
  );
  return setNoCacheHeaders(response);
}

/**
 * Create a success response with no-cache headers
 * Standardized success response format
 */
export function createApiSuccessResponse(
  data: any, 
  message?: string,
  status: number = 200
): NextResponse {
  const response = NextResponse.json(
    { 
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    }, 
    { status }
  );
  return setNoCacheHeaders(response);
}

/**
 * Middleware function to add no-cache headers to any response
 * Can be used in API route handlers
 */
export function withNoCacheHeaders<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: any[]) => {
    const response = await handler(...args);
    return setNoCacheHeaders(response);
  }) as T;
}

/**
 * Check if a request is for an API route
 */
export function isApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api/');
}

/**
 * Get cache bypass headers as an object
 * Useful for fetch requests or external API calls
 */
export function getNoCacheHeaders(): Record<string, string> {
  return {
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'X-Vercel-Cache': 'BYPASS'
  };
}
