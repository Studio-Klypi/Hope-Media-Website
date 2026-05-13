export interface PublicArticleState {
  articles: Listed<Article>;
  totalEntities: number;
  loading: boolean;
}

export const defaults: PublicArticleState = {
  articles: [],
  totalEntities: -1,
  loading: false,
};
