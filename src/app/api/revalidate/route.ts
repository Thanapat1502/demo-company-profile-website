import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, locale, secret } = body;

    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const revalidatedPaths: string[] = [];
    const revalidatedTags: string[] = [];

    if (path) {
      if (locale) {
        // Revalidate specific locale only
        const fullPath = `/${locale}${path}`;
        revalidatePath(fullPath);
        revalidatedPaths.push(fullPath);
        console.log(`Revalidated path: ${fullPath}`);
      } else {
        // Revalidate for all locales
        const locales = ["th", "en"];
        for (const loc of locales) {
          const fullPath = `/${loc}${path}`;
          revalidatePath(fullPath);
          revalidatedPaths.push(fullPath);
        }
        console.log(`Revalidated path: ${path} for all locales`);
      }
    }

    if (tag) {
      revalidateTag(tag);
      revalidatedTags.push(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    // Also revalidate locale-specific tags if specified
    if (locale) {
      const localeTag = `locale-${locale}`;
      revalidateTag(localeTag);
      revalidatedTags.push(localeTag);
      console.log(`Revalidated locale tag: ${localeTag}`);
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: revalidatedPaths,
      tags: revalidatedTags,
      locale: locale || "all",
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}

// Cron job endpoint for periodic revalidation
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    // Verify cron secret
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Revalidate critical pages
    const criticalPaths = [
      "/",
      "/pds-group",
      "/products-services",
      "/reference",
      "/contact",
    ];

    const locales = ["th", "en"];

    for (const locale of locales) {
      for (const path of criticalPaths) {
        revalidatePath(`/${locale}${path === "/" ? "" : path}`);
      }
    }

    // Revalidate data tags
    const dataTags = ["services", "products", "partners", "contents"];
    for (const tag of dataTags) {
      revalidateTag(tag);
    }

    console.log("Periodic revalidation completed");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      paths: criticalPaths,
      locales: locales,
      tags: dataTags,
    });
  } catch (err) {
    console.error("Cron revalidation error:", err);
    return NextResponse.json(
      { message: "Error in cron revalidation" },
      { status: 500 }
    );
  }
}
