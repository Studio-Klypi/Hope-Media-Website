import { type PublicArticleState, defaults } from "~/types/states/public/article";
import type { Article } from "~/types/states/blog";

export const usePublicArticleStore = defineStore("publicArticles", {
  state: (): PublicArticleState => ({ ...defaults }),
  getters: {
    hasLoaded: state => state.totalEntities > -1,

    latest: state => state.articles.slice(0, 3),
  },
  actions: {
    async load() {
      this.loading = true;

      try {
        const response = await $fetch<ApiListResponse<Article>>("/api/articles");

        this.articles = response.data;
        this.totalEntities = response.meta.total;
      }
      catch {
        console.error("something went wrong.");
      }
      finally {
        this.loading = false;
      }
    },

    async loadArticle(slug: string) {
      return $fetch<Article>(`/api/articles/${slug}`);
    },
  },
});
