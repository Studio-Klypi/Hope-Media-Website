import { type DashboardState, defaults } from "~/types/states/dashboard";

export const useDashboardStore = defineStore("dashboard", {
  state: (): DashboardState => ({ ...defaults }),
  getters: {},
  actions: {
    async loadStats() {
      this.loading.stats = true;

      await new Promise(resolve => setTimeout(resolve, 1000 + Math.floor(Math.random() * 1000)));
      this.loading.stats = false;
    },
    async loadGraph() {
      this.loading.graph = true;

      await new Promise(resolve => setTimeout(resolve, 1000 + Math.floor(Math.random() * 1000)));
      this.loading.graph = false;
    },
  },
});
