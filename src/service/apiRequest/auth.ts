// import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const authService = {
  // Sign in with email and password
  async signIn({ email, password }: SignInCredentials): Promise<AuthResponse> {
    // Temporarily disabled for development
    return {
      user: null,
      session: null,
      error: new Error("Authentication service not configured"),
    };

    // try {
    //   const { data, error } = await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    //   });

    //   return {
    //     user: data.user,
    //     session: data.session,
    //     error: error as Error | null,
    //   };
    // } catch (error) {
    //   return {
    //     user: null,
    //     session: null,
    //     error: error as Error,
    //   };
    // }
  },

  // Sign up with email and password
  async signUp({
    email,
    password,
    firstName,
    lastName,
  }: SignUpCredentials): Promise<AuthResponse> {
    // Temporarily disabled for development
    return {
      user: null,
      session: null,
      error: new Error("Authentication service not configured"),
    };
  },

  // Sign out
  async signOut(): Promise<{ error: Error | null }> {
    return { error: null };
  },

  // Get current session
  async getSession(): Promise<{
    session: Session | null;
    error: Error | null;
  }> {
    return {
      session: null,
      error: null,
    };
  },

  // Get current user
  async getUser(): Promise<{ user: User | null; error: Error | null }> {
    return {
      user: null,
      error: null,
    };
  },

  // Reset password
  async resetPassword(email: string): Promise<{ error: Error | null }> {
    return { error: null };
  },

  // Update password
  async updatePassword(password: string): Promise<{ error: Error | null }> {
    return { error: null };
  },

  // Listen to auth state changes
  onAuthStateChange(
    callback: (event: string, session: Session | null) => void
  ) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
};
