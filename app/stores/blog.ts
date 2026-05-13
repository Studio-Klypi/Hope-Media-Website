import { type Article, type BlogState, defaults } from "~/types/states/blog";
import { toast } from "vue-sonner";
import type { ApiListResponse } from "#shared/types/primitives";
import type { CreateArticlePayload, UpdateArticlePayload } from "#shared/types/entities/article";

export const useBlogStore = defineStore("blog", {
  state: (): BlogState => ({ ...defaults }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,

    hasLoaded: state => state.totalEntities > -1,
  },
  actions: {
    async loadArticles() {
      this.loading.list = true;

      try {
        const response = await $fetch<ApiListResponse<Article>>("/api/articles");

        this.articles = response.data;
        this.totalEntities = response.meta.total;
      }
      catch {
        toast.error(this.translate("toasts.error.default"));
      }
      finally {
        this.loading.list = false;
      }
    },

    async create(payload: CreateArticlePayload) {
      this.loading.creating = true;
      let state = true;

      try {
        const article = await $fetch<Article>("/api/articles", {
          method: "POST",
          body: payload,
        });

        this.articles = [article, ...this.articles];
        this.totalEntities--;
        toast.success(this.translate("toasts.admin.blog.article.created"));
        navigateTo(useLocalePath()(`/admin/blog/article/${article.id}-${article.slug}`));
      }
      catch {
        state = false;
        toast.error(this.translate("toasts.error.default"));
      }
      finally {
        this.loading.creating = false;
      }

      return state;
    },
    async save(id: number, payload: UpdateArticlePayload) {
      this.loading.saving = true;

      try {
        const article = await $fetch<Article>(`/api/articles/admin/${id}`, {
          method: "PUT",
          body: payload,
        });

        const oldArticle = this.articles.find(a => a.id === article.id);

        this.articles = this.articles.map(a => a.id === article.id ? { ...article } : a);
        toast.success(this.translate("toasts.admin.blog.article.saved", { title: article.title }));

        if (oldArticle?.slug !== article.slug) navigateTo(useLocalePath()(`/admin/blog/article/${article.id}-${article.slug}`));
      }
      catch {
        toast.error(this.translate("toasts.error.default"));
      }
      finally {
        this.loading.saving = false;
      }
    },
    async delete(id: number) {
      toast.promise($fetch<Article>(`/api/articles/admin/${id}`, { method: "DELETE" }), {
        loading: () => this.translate("toasts.admin.blog.article.delete.loading"),
        success: (article: Article) => {
          this.articles = this.articles.filter(a => a.id !== article.id);
          this.totalEntities--;

          navigateTo(useLocalePath()("/admin/blog"));

          return this.translate("toasts.admin.blog.article.delete.success", { title: article.title });
        },
        error: () => this.translate("toasts.admin.blog.article.delete.error"),
      });
    },

    async publish(id: number) {
      toast.promise($fetch<Article>(`/api/articles/admin/${id}/publish`, { method: "PATCH" }), {
        loading: () => this.translate("toasts.admin.blog.article.publish.loading"),
        success: (article: Article) => {
          this.articles = this.articles.map(a => a.id === article.id ? { ...article } : a);
          return this.translate("toasts.admin.blog.article.publish.success", { title: article.title });
        },
        error: () => this.translate("toasts.admin.blog.article.publish.error"),
      });
    },
    async convertToDraft(id: number) {
      toast.promise($fetch<Article>(`/api/articles/admin/${id}/unpublish`, { method: "PATCH" }), {
        loading: () => this.translate("toasts.admin.blog.article.convert-to-draft.loading"),
        success: (article: Article) => {
          this.articles = this.articles.map(a => a.id === article.id ? { ...article } : a);
          return this.translate("toasts.admin.blog.article.convert-to-draft.success", { title: article.title });
        },
        error: () => this.translate("toasts.admin.blog.article.convert-to-draft.error"),
      });
    },
    async archive(id: number) {
      toast.promise($fetch<Article>(`/api/articles/admin/${id}/archive`, { method: "DELETE" }), {
        loading: () => this.translate("toasts.admin.blog.article.archive.loading"),
        success: (article: Article) => {
          this.articles = this.articles.map(a => a.id === article.id ? { ...article } : a);
          return this.translate("toasts.admin.blog.article.archive.success", { title: article.title });
        },
        error: () => this.translate("toasts.admin.blog.article.archive.error"),
      });
    },
    async restore(id: number) {
      toast.promise($fetch<Article>(`/api/articles/admin/${id}/restore`, { method: "POST" }), {
        loading: () => this.translate("toasts.admin.blog.article.restore.loading"),
        success: (article: Article) => {
          this.articles = this.articles.map(a => a.id === article.id ? { ...article } : a);
          return this.translate("toasts.admin.blog.article.restore.success", { title: article.title });
        },
        error: () => this.translate("toasts.admin.blog.article.restore.error"),
      });
    },
  },
});
