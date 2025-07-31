import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Types
export interface AuthenticatedUser {
  id: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface AuthenticatedRequest extends NextRequest {
  user: AuthenticatedUser;
  supabase: ReturnType<typeof createServerClient>;
}

// Create authenticated Supabase client
export async function createAuthenticatedClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Verify user is authenticated
export async function verifyAuth(supabase: ReturnType<typeof createServerClient>) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return null;
  }
  return user;
}

// Authentication middleware wrapper
export function withAuth<T extends any[]>(
  handler: (req: NextRequest, supabase: ReturnType<typeof createServerClient>, user: AuthenticatedUser, ...args: T) => Promise<NextResponse>
) {
  return async (req: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Create authenticated client
      const supabase = await createAuthenticatedClient();
      
      // Verify authentication
      const user = await verifyAuth(supabase);
      
      if (!user) {
        return NextResponse.json(
          { error: "Unauthorized - Authentication required" },
          { status: 401 }
        );
      }

      // Call the original handler with authenticated context
      return await handler(req, supabase, user, ...args);
    } catch (error) {
      console.error("Authentication middleware error:", error);
      return NextResponse.json(
        { error: "Authentication failed", details: error },
        { status: 500 }
      );
    }
  };
}

// Optional: Role-based authentication wrapper
export function withRole(requiredRole: string) {
  return function<T extends any[]>(
    handler: (req: NextRequest, supabase: ReturnType<typeof createServerClient>, user: AuthenticatedUser, ...args: T) => Promise<NextResponse>
  ) {
    return withAuth(async (req: NextRequest, supabase: ReturnType<typeof createServerClient>, user: AuthenticatedUser, ...args: T) => {
      // Check if user has required role
      const userRole = user.app_metadata?.role || user.user_metadata?.role || 'user';
      
      if (userRole !== requiredRole && requiredRole !== 'user') {
        return NextResponse.json(
          { error: `Forbidden - ${requiredRole} role required` },
          { status: 403 }
        );
      }

      return await handler(req, supabase, user, ...args);
    });
  };
}

// Utility function for handling common API patterns
export async function handleAuthenticatedRequest<T>(
  req: NextRequest,
  handler: (supabase: ReturnType<typeof createServerClient>, user: AuthenticatedUser) => Promise<T>
): Promise<NextResponse> {
  try {
    const supabase = await createAuthenticatedClient();
    const user = await verifyAuth(supabase);
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await handler(supabase, user);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}

// Example usage patterns:
/*
// Basic authentication
export const POST = withAuth(async (req, supabase, user) => {
  // Your authenticated logic here
  const data = await supabase.from('table').insert({...});
  return NextResponse.json({ data });
});

// Role-based authentication
export const DELETE = withRole('admin')(async (req, supabase, user) => {
  // Only admins can access this
  const data = await supabase.from('table').delete().eq('id', id);
  return NextResponse.json({ data });
});

// Simple pattern
export async function GET(req: NextRequest) {
  return handleAuthenticatedRequest(req, async (supabase, user) => {
    const { data, error } = await supabase.from('table').select('*');
    return { data, error };
  });
}
*/
