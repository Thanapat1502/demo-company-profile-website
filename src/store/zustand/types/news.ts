export type News = {
  id: string;
  thumbnail: string;
  title: string;
  subtitle: string;
  tag: number[];
  body_th: any;
  body_en: any;
};

export type NewsTag = {
  id: number;
  name: string;
};
