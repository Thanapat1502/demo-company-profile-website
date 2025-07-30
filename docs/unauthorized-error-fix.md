# Fix for "Unauthorized" Error in API Calls

## Problem Identified

The "Unauthorized" error occurs because **frontend fetch requests are not including authentication cookies** that the server-side API routes need to verify the user's identity.

## Root Cause

1. **Default fetch() behavior**: By default, `fetch()` does not include cookies in requests
2. **Missing credentials**: API calls were not configured to send authentication cookies
3. **Server expecting cookies**: API routes are correctly checking for auth cookies, but they're not being sent

## Solution Implemented

### 1. **Updated All Fetch Calls to Include Credentials**

Added `credentials: "include"` to all fetch requests in `productStore.tsx`:

```typescript
// Before (WRONG)
const res = await fetch("/api/products");

// After (CORRECT)
const res = await fetch("/api/products", {
  credentials: "include", // Include cookies for authentication
});
```

### 2. **Updated Functions Fixed:**

- ✅ `fetchProducts()` - GET /api/products
- ✅ `addProduct()` - POST /api/products  
- ✅ `updateProduct()` - PUT /api/products/[id]
- ✅ `deleteProduct()` - DELETE /api/products/[id]
- ✅ `uploadProductImage()` - POST /api/image-upload

### 3. **Enhanced Supabase Client Configuration**

Updated `src/lib/supabase.ts` for better cookie handling:

```typescript
supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
    },
  },
});
```

## Testing Steps

### 1. **Clear Browser Data (Important!)**
```bash
# Clear all cookies and localStorage for your domain
# In Chrome: DevTools > Application > Storage > Clear storage
```

### 2. **Login Again**
1. Go to `/admin/login`
2. Enter your credentials
3. Verify successful login

### 3. **Test Product Operations**
1. Go to Product Manager in admin
2. Try fetching products (should work now)
3. Try adding a new product
4. Check browser Network tab for 200 responses (not 401)

### 4. **Debug Authentication (If Still Issues)**

Use the debug utility in browser console:

```javascript
// In browser console on admin page
import { authDebug } from '/src/utils/auth-debug.ts';

// Check auth status
await authDebug.checkAuthStatus();

// Test API call
await authDebug.testApiCall();

// Full debug report
await authDebug.fullDebugReport();
```

Or simply:
```javascript
// Debug utility is available globally
await authDebug.fullDebugReport();
```

## Verification Checklist

### ✅ **Frontend (Client-Side)**
- [ ] User is logged in (`useAuth().isAuthenticated === true`)
- [ ] Supabase session exists in localStorage
- [ ] Auth cookies are present in browser
- [ ] Fetch calls include `credentials: "include"`

### ✅ **Backend (Server-Side)**  
- [ ] API routes use `createServerClient` from `@supabase/ssr`
- [ ] API routes read cookies with `await cookies()`
- [ ] API routes verify user with `supabase.auth.getUser()`
- [ ] Database table exists with proper RLS policies

### ✅ **Database (Supabase)**
- [ ] Products table exists (run `database/products-table.sql`)
- [ ] RLS policies allow authenticated users
- [ ] Admin user exists and is confirmed

## Common Issues & Solutions

### **Issue 1: Still Getting 401 After Changes**
**Solution**: Clear browser cookies and localStorage, then login again

### **Issue 2: Cookies Not Being Sent**
**Solution**: Ensure `credentials: "include"` is in ALL fetch calls

### **Issue 3: User Shows as Authenticated but API Returns 401**
**Solution**: Check if server-side cookie reading is working:
```typescript
// In API route, add debug logging
const cookieStore = await cookies();
console.log("All cookies:", cookieStore.getAll());
```

### **Issue 4: Products Table Doesn't Exist**
**Solution**: Run the SQL script in Supabase:
```sql
-- Copy and paste contents of database/products-table.sql
-- into Supabase SQL Editor and run
```

### **Issue 5: RLS Policy Too Restrictive**
**Solution**: Temporarily disable RLS to test:
```sql
-- Temporarily disable RLS (for testing only!)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Re-enable after testing
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
```

## Security Notes

1. **credentials: "include"** is safe for same-origin requests
2. **RLS policies** provide database-level security
3. **Authentication verification** happens on every API call
4. **Cookies are httpOnly** and secure in production

## Next Steps After Fix

1. **Test all CRUD operations** thoroughly
2. **Monitor for any remaining auth issues**
3. **Consider implementing refresh token handling**
4. **Add proper error boundaries** for auth failures
5. **Set up monitoring** for 401 errors in production

## Quick Debug Commands

```javascript
// Check if user is authenticated
console.log("Authenticated:", useAuth().isAuthenticated);

// Check session
console.log("Session:", await supabase.auth.getSession());

// Check cookies
console.log("Cookies:", document.cookie);

// Test API call
const response = await fetch("/api/products", { credentials: "include" });
console.log("API Status:", response.status);
```

The "Unauthorized" error should now be resolved! 🎉
