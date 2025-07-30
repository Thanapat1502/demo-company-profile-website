# RLS Policy Fix for Supabase Authentication

## Problem Identified

The "new row violates row-level security policy" error occurs because:

1. **API routes were using client-side Supabase instance** without proper authentication
2. **Missing authentication token validation** in server-side API calls
3. **RLS policies expecting authenticated users** but requests not passing auth tokens
4. **Table name mismatch** - API using `products` but schema has `products_services`

## Solutions Implemented

### 1. **Fixed API Authentication**

Updated all API routes to use proper server-side authentication:

- **`/api/products/route.ts`** - Added authentication verification
- **`/api/products/[id]/route.ts`** - Added authentication verification  
- **`/api/image-upload/route.ts`** - Added authentication verification

**Key Changes:**
```typescript
// Before (WRONG)
import { supabase } from "@/lib/supabase";

// After (CORRECT)
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function createAuthenticatedClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

async function verifyAuth(supabase: ReturnType<typeof createServerClient>) {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return null;
  }
  return user;
}
```

### 2. **Created Products Table**

Created a separate `products` table to match the API expectations:

**File:** `database/products-table.sql`

```sql
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_th TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_th TEXT,
    description_en TEXT,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access for available products
CREATE POLICY "Public can read available products" ON products 
FOR SELECT USING (is_available = true);

-- Authenticated users can manage all products
CREATE POLICY "Authenticated users can manage products" ON products 
FOR ALL USING (auth.role() = 'authenticated');
```

### 3. **Reinstalled Supabase Packages**

Reinstalled with proper SSR support:
```bash
npm install @supabase/ssr --force
```

## Setup Instructions

### 1. **Run the Products Table SQL**

Execute the SQL in `database/products-table.sql` in your Supabase SQL editor:

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `database/products-table.sql`
3. Click "Run" to create the table and policies

### 2. **Verify RLS Policies**

Check that RLS policies are correctly set up:

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('products', 'products_services', 'news_events');

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('products', 'products_services');
```

### 3. **Test Authentication**

1. **Login to admin panel** at `/admin/login`
2. **Try adding a product** in the Product Manager
3. **Check for errors** in browser console and network tab

### 4. **Verify User Authentication**

In Supabase Dashboard → Authentication → Users:
1. Ensure your admin user exists
2. Check that the user is confirmed
3. Note the user's email format for policy matching

## RLS Policy Options

### Option 1: **Role-Based (Recommended)**
```sql
CREATE POLICY "Authenticated users can manage products" ON products 
FOR ALL USING (auth.role() = 'authenticated');
```

### Option 2: **Email-Based Admin**
```sql
CREATE POLICY "Admins can manage products" ON products 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@admin.%'
  )
);
```

### Option 3: **Admin Table-Based**
```sql
-- Create admin users table
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policy using admin table
CREATE POLICY "Admin users can manage products" ON products 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);
```

## Troubleshooting

### **Still Getting RLS Errors?**

1. **Check authentication status:**
```javascript
// In browser console on admin page
console.log(await supabase.auth.getUser());
```

2. **Verify cookies are being sent:**
   - Open Network tab in DevTools
   - Check API requests include authentication cookies
   - Look for `sb-` prefixed cookies

3. **Test RLS policies directly:**
```sql
-- Test as authenticated user
SELECT auth.uid(), auth.role();
SELECT * FROM products; -- Should work if authenticated
```

4. **Check server logs:**
   - Look for authentication errors in API routes
   - Check Supabase logs for policy violations

### **Common Issues:**

1. **User not authenticated** - Login again
2. **Cookies not being sent** - Check domain/path settings
3. **Wrong table name** - Ensure API uses correct table
4. **Policy too restrictive** - Adjust policy conditions
5. **Environment variables** - Verify Supabase URL/keys

## Security Best Practices

1. **Use server-side authentication** for all API routes
2. **Implement proper RLS policies** for all tables
3. **Validate user permissions** before database operations
4. **Use HTTPS** in production
5. **Regularly audit** user access and permissions
6. **Monitor** authentication logs for suspicious activity

## Next Steps

1. **Test all CRUD operations** (Create, Read, Update, Delete)
2. **Implement role-based permissions** if needed
3. **Add audit logging** for admin actions
4. **Set up monitoring** for RLS policy violations
5. **Document** admin user management procedures
