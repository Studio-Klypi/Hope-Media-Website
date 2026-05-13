import type { Prisma } from "@prisma/client";

export type Article = Prisma.ArticleGetPayload<{ include: {
  author: true;
  _count: {
    select: {
      articleViews: true;
    };
  };
}; }>;

export interface BlogState {
  articles: Listed<Article>;
  totalEntities: number;
  loading: {
    list: boolean;
    creating: boolean;
    saving: boolean;
  };
}

export const defaults: BlogState = {
  articles: [],
  totalEntities: -1,
  loading: {
    list: false,
    creating: false,
    saving: false,
  },
};
