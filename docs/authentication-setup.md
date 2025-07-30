# Authentication Setup for Admin Panel

## Overview

The admin panel is now protected with Supabase authentication. Users must log in to access any admin routes.

## Components

### 1. **Login Page** (`/admin/login`)
- Clean, professional login interface
- Email and password authentication
- Error handling and loading states
- Automatic redirect if already logged in

### 2. **Authentication Context** (`AuthContext.tsx`)
- Manages global authentication state
- Provides auth methods (signIn, signOut)
- Listens for auth state changes
- Accessible via `useAuth()` hook

### 3. **Protected Route Component** (`ProtectedRoute.tsx`)
- Wraps admin pages to require authentication
- Redirects to login if not authenticated
- Shows loading state while checking auth

### 4. **Admin Layout** (`/admin/layout.tsx`)
- Provides AuthProvider to all admin pages
- Ensures auth context is available

## Setup Instructions

### 1. **Supabase Configuration**

Make sure your Supabase project has the following environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. **Create Admin User**

In your Supabase dashboard:

1. Go to Authentication > Users
2. Click "Add user"
3. Enter email and password for admin
4. Confirm the user (if email confirmation is enabled)

### 3. **Database Setup (Optional)**

For enhanced security, you can create an admin role:

```sql
-- Create admin role
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert admin user
INSERT INTO admin_users (id, email) 
VALUES ('user-uuid-here', 'admin@example.com');

-- RLS Policy for admin access
CREATE POLICY "Only admins can access admin content" 
ON your_table FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);
```

## Usage

### 1. **Accessing Admin Panel**

1. Navigate to `/admin`
2. If not logged in, automatically redirected to `/admin/login`
3. Enter credentials and sign in
4. Redirected to admin dashboard

### 2. **Using Auth in Components**

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, signOut } = useAuth();
  
  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### 3. **Protecting Additional Routes**

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <YourAdminContent />
    </ProtectedRoute>
  );
}
```

## Features

### ✅ **Security Features**
- Session-based authentication
- Automatic token refresh
- Secure logout
- Route protection
- Loading states

### ✅ **User Experience**
- Clean login interface
- Error handling
- Loading indicators
- Automatic redirects
- Remember session

### ✅ **Developer Experience**
- TypeScript support
- React hooks
- Context API
- Reusable components
- Easy to extend

## Troubleshooting

### **Login Issues**
1. Check Supabase URL and keys in environment variables
2. Verify user exists in Supabase Auth dashboard
3. Check browser console for errors
4. Ensure Supabase project is active

### **Redirect Issues**
1. Clear browser cache and cookies
2. Check if user session is valid in Supabase
3. Verify ProtectedRoute is properly wrapping components

### **Environment Variables**
Make sure `.env.local` contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Security Considerations

1. **Environment Variables**: Never commit real Supabase keys to version control
2. **RLS Policies**: Implement Row Level Security in Supabase for data protection
3. **Admin Verification**: Consider adding admin role verification
4. **Session Management**: Sessions automatically expire based on Supabase settings
5. **HTTPS**: Always use HTTPS in production

## Next Steps

1. **Role-Based Access**: Implement different admin roles (super admin, editor, etc.)
2. **Password Reset**: Add forgot password functionality
3. **User Management**: Add user management interface for super admins
4. **Audit Logs**: Track admin actions for security
5. **Two-Factor Auth**: Add 2FA for enhanced security
