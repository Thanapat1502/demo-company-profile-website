import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { clearTranslationCache } from "@/lib/i18n/loadMessages";

// Create authenticated Supabase client
async function createAuthenticatedClient() {
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

// GET /api/translations - Fetch all translations or by locale
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');

    const supabase = await createAuthenticatedClient();
    
    let query = supabase
      .from('web_labels')
      .select('*')
      .order('key');

    if (locale) {
      query = query.eq('locale', locale);
    }

    const { data: labels, error } = await query;

    if (error) {
      console.error('Error fetching translations:', error);
      return NextResponse.json(
        { error: 'Failed to fetch translations' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: labels,
      count: labels?.length || 0
    });

  } catch (error) {
    console.error('Translations API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/translations - Create or update a translation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, locale, description } = body;

    // Validate required fields
    if (!key || !value || !locale) {
      return NextResponse.json(
        { error: 'Missing required fields: key, value, locale' },
        { status: 400 }
      );
    }

    // Validate locale
    if (!['en', 'th'].includes(locale)) {
      return NextResponse.json(
        { error: 'Invalid locale. Must be "en" or "th"' },
        { status: 400 }
      );
    }

    const supabase = await createAuthenticatedClient();

    // Upsert the translation
    const { data, error } = await supabase
      .from('web_labels')
      .upsert({
        key,
        value,
        locale,
        description: description || null
      }, {
        onConflict: 'key,locale'
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting translation:', error);
      return NextResponse.json(
        { error: 'Failed to save translation' },
        { status: 500 }
      );
    }

    // Clear cache for this locale
    clearTranslationCache(locale);

    return NextResponse.json({
      success: true,
      data,
      message: 'Translation saved successfully'
    });

  } catch (error) {
    console.error('Translation POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/translations - Delete a translation
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const locale = searchParams.get('locale');

    if (!key || !locale) {
      return NextResponse.json(
        { error: 'Missing required parameters: key, locale' },
        { status: 400 }
      );
    }

    const supabase = await createAuthenticatedClient();

    const { error } = await supabase
      .from('web_labels')
      .delete()
      .eq('key', key)
      .eq('locale', locale);

    if (error) {
      console.error('Error deleting translation:', error);
      return NextResponse.json(
        { error: 'Failed to delete translation' },
        { status: 500 }
      );
    }

    // Clear cache for this locale
    clearTranslationCache(locale);

    return NextResponse.json({
      success: true,
      message: 'Translation deleted successfully'
    });

  } catch (error) {
    console.error('Translation DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
