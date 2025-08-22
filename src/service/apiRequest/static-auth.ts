// Static authentication service for demo purposes
// This replaces Supabase auth with simple static credentials

export interface StaticUser {
  id: string;
  email: string;
  username: string;
  role: string;
  created_at: string;
}

export interface StaticSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: StaticUser;
}

export interface StaticAuthResponse {
  user: StaticUser | null;
  session: StaticSession | null;
  error: Error | null;
}

// Static credentials for demo
const DEMO_CREDENTIALS = {
  username: "admin",
  password: "admin",
  email: "admin@oildevelopment.com"
};

// Mock user data
const DEMO_USER: StaticUser = {
  id: "demo-admin-001",
  email: DEMO_CREDENTIALS.email,
  username: DEMO_CREDENTIALS.username,
  role: "admin",
  created_at: new Date().toISOString()
};

// Session storage key
const SESSION_KEY = "demo_auth_session";

// Helper functions for session management
const getStoredSession = (): StaticSession | null => {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    
    const session = JSON.parse(stored) as StaticSession;
    
    // Check if session is expired
    if (Date.now() > session.expires_at) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
};

const createSession = (user: StaticUser): StaticSession => {
  const session: StaticSession = {
    access_token: `demo_token_${Date.now()}`,
    refresh_token: `demo_refresh_${Date.now()}`,
    expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    user
  };
  
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  
  return session;
};

const clearSession = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
};

// Static auth service
export const staticAuthService = {
  // Sign in with username/password
  async signIn({ username, password }: { username: string; password: string }): Promise<StaticAuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check credentials
      if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        const session = createSession(DEMO_USER);
        
        return {
          user: DEMO_USER,
          session,
          error: null
        };
      } else {
        return {
          user: null,
          session: null,
          error: new Error("Invalid credentials. Use username: admin, password: admin")
        };
      }
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error as Error
      };
    }
  },

  // Get current user
  async getUser(): Promise<{ user: StaticUser | null; error: Error | null }> {
    try {
      const session = getStoredSession();
      
      if (session) {
        return {
          user: session.user,
          error: null
        };
      } else {
        return {
          user: null,
          error: new Error("No active session")
        };
      }
    } catch (error) {
      return {
        user: null,
        error: error as Error
      };
    }
  },

  // Get current session
  async getSession(): Promise<{ session: StaticSession | null; error: Error | null }> {
    try {
      const session = getStoredSession();
      
      return {
        session,
        error: null
      };
    } catch (error) {
      return {
        session: null,
        error: error as Error
      };
    }
  },

  // Sign out
  async signOut(): Promise<{ error: Error | null }> {
    try {
      clearSession();
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return getStoredSession() !== null;
  }
};

// Export for compatibility with existing auth service interface
export const authService = staticAuthService;
