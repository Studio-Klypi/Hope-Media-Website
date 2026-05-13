import { type DashboardState, defaults } from "~/types/states/dashboard";
import { toast } from "vue-sonner";

export const useDashboardStore = defineStore("dashboard", {
  state: (): DashboardState => ({ ...defaults }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,
  },
  actions: {
    async loadStats() {
      this.loading.stats = true;

      try {
        this.stats = await $fetch<DashboardState["stats"]>("/api/statistics");
      }
      catch {
        toast.error(this.translate("toasts.error.default"));
      }
      finally {
        this.loading.stats = false;
      }
    },
    async loadGraph() {
      this.loading.graph = true;

      try {
        this.graph = await $fetch<Listed<Record<string, number>>>("/api/articles/stats");
      }
      catch {
        toast.error(this.translate("toasts.error.default"));
      }
      finally {
        this.loading.graph = false;
      }

      await new Promise(resolve => setTimeout(resolve, 1000 + Math.floor(Math.random() * 1000)));
    },
  },
});
