import { supabase } from "@/lib/supabase";
import type {
  NewsEvent,
  LocalizedNewsEvent,
  NewsEventForm,
  LanguageCode,
  ContentStatus,
  PaginatedResponse,
} from "@/types/database";

// Utility function to localize content
function localizeNewsEvent(
  item: NewsEvent,
  locale: LanguageCode
): LocalizedNewsEvent {
  return {
    id: item.id,
    title: locale === "en" ? item.title_en : item.title_th,
    slug: locale === "en" ? item.slug_en : item.slug_th,
    excerpt: locale === "en" ? item.excerpt_en : item.excerpt_th,
    content: locale === "en" ? item.content_en : item.content_th,
    featured_image: item.featured_image,
    category: item.category,
    status: item.status,
    published_at: item.published_at,
    created_at: item.created_at,
    updated_at: item.updated_at,
    author_id: item.author_id,
    meta_title: locale === "en" ? item.meta_title_en : item.meta_title_th,
    meta_description:
      locale === "en" ? item.meta_description_en : item.meta_description_th,
    tags: item.tags,
  };
}

export const newsEventsService = {
  // Get all news events with pagination
  async getAll(
    locale: LanguageCode = "th",
    status: ContentStatus = "published",
    page: number = 1,
    limit: number = 10,
    category?: string
  ): Promise<PaginatedResponse<LocalizedNewsEvent>> {
    try {
      const offset = (page - 1) * limit;

      let query = supabase
        .from("news_events")
        .select("*", { count: "exact" })
        .eq("status", status)
        .order("published_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      const localizedData =
        data?.map((item) =>
          localizeNewsEvent(item as unknown as NewsEvent, locale)
        ) || [];

      return {
        data: localizedData,
        count: count || 0,
        page,
        limit,
        total_pages: Math.ceil((count || 0) / limit),
      };
    } catch (error) {
      throw new Error(`Failed to fetch news events: ${error}`);
    }
  },

  // Get news event by slug
  async getBySlug(
    slug: string,
    locale: LanguageCode = "th"
  ): Promise<LocalizedNewsEvent | null> {
    try {
      const slugColumn = locale === "en" ? "slug_en" : "slug_th";

      const { data, error } = await supabase
        .from("news_events")
        .select("*")
        .eq(slugColumn, slug)
        .eq("status", "published")
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Not found
        throw error;
      }

      return localizeNewsEvent(data as unknown as NewsEvent, locale);
    } catch (error) {
      throw new Error(`Failed to fetch news event: ${error}`);
    }
  },

  // Get featured news events
  async getFeatured(
    locale: LanguageCode = "th",
    limit: number = 3
  ): Promise<LocalizedNewsEvent[]> {
    try {
      const { data, error } = await supabase
        .from("news_events")
        .select("*")
        .eq("status", "published")
        .not("featured_image", "is", null)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      return (
        data?.map((item) =>
          localizeNewsEvent(item as unknown as NewsEvent, locale)
        ) || []
      );
    } catch (error) {
      throw new Error(`Failed to fetch featured news events: ${error}`);
    }
  },

  // Create news event (admin only)
  async create(newsEvent: NewsEventForm): Promise<NewsEvent> {
    try {
      const { data, error } = await supabase
        .from("news_events")
        .insert({
          ...newsEvent,
          published_at:
            newsEvent.status === "published" ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as NewsEvent;
    } catch (error) {
      throw new Error(`Failed to create news event: ${error}`);
    }
  },

  // Update news event (admin only)
  async update(
    id: string,
    updates: Partial<NewsEventForm>
  ): Promise<NewsEvent> {
    try {
      const updateData: Partial<NewsEventForm> & { published_at?: string } = {
        ...updates,
      };

      // Set published_at if status is being changed to published
      if (updates.status === "published" && !updateData.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("news_events")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as NewsEvent;
    } catch (error) {
      throw new Error(`Failed to update news event: ${error}`);
    }
  },

  // Delete news event (admin only)
  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("news_events")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      throw new Error(`Failed to delete news event: ${error}`);
    }
  },

  // Get all categories
  async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from("news_events")
        .select("category")
        .not("category", "is", null)
        .eq("status", "published");

      if (error) throw error;

      const categories = [
        ...new Set(data?.map((item: any) => item.category).filter(Boolean)),
      ] as string[];
      return categories;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error}`);
    }
  },

  // Search news events
  async search(
    query: string,
    locale: LanguageCode = "th",
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<LocalizedNewsEvent>> {
    try {
      const offset = (page - 1) * limit;
      const titleColumn = locale === "en" ? "title_en" : "title_th";
      const contentColumn = locale === "en" ? "content_en" : "content_th";

      const { data, error, count } = await supabase
        .from("news_events")
        .select("*", { count: "exact" })
        .eq("status", "published")
        .or(`${titleColumn}.ilike.%${query}%,${contentColumn}.ilike.%${query}%`)
        .order("published_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const localizedData =
        data?.map((item) =>
          localizeNewsEvent(item as unknown as NewsEvent, locale)
        ) || [];

      return {
        data: localizedData,
        count: count || 0,
        page,
        limit,
        total_pages: Math.ceil((count || 0) / limit),
      };
    } catch (error) {
      throw new Error(`Failed to search news events: ${error}`);
    }
  },
};
