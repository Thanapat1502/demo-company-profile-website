import { Delta } from "quill";
import { create } from "zustand";

export interface News {
  id: string; // UUID
  thumbnail_url: string;
  title_th: string;
  title_en: string;
  subtitle_th?: string;
  subtitle_en?: string;
  tag_ids: number[]; // อ้างถึง news_tag.id
  body_th: Delta; // JSON จาก Quill (อาจใช้ type `Record<string, any>` หรือ `Delta` หากใช้ quill-delta)
  body_en: Delta;
  highlight: boolean;
  status: "draft" | "published";
  publish_date?: Date;
}

type State = {
  allNews: News[] | null;
  publishedNews: News[] | null;
  highlightNews: News[] | null;
  fetchNews: () => void;
  fetchHighlightNews: () => void;
  addnews: (news: News) => void;
  updatenews: (id: string, updatednews: News) => void;
  deletenews: (id: string) => void;
};

export const useContactStore = create<State>((set) => ({
  allNews: null,
  publishedNews: null,
  highlightNews: null,
  fetchNews: () => {
    //Add API call here, table "news"
  },
  fetchHighlightNews: () => {
    //Add API call here, table "news"
  },
  addnews: (news) => {
    //Add API call here, table "news"
  },
  updatenews: (id, updatednews) => {
    //Add API call here, table "news"
  },
  deletenews: (id) => {
    //Add API call here, table "news"
  },
}));
