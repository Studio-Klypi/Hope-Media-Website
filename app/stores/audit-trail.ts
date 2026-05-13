import { type AuditEntry, type AuditTrailState, defaults } from "~/types/states/audit-trail";

export const useAuditTrailStore = defineStore("audit-trail", {
  state: (): AuditTrailState => ({ ...defaults }),
  actions: {
    async load() {
      this.loading = true;

      try {
        const response = await $fetch<{
          list: Listed<AuditEntry>;
          total: number;
        }>("/api/audit-trail");
        this.entries = response.list;
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loading = false;
      }
    },
  },
});
