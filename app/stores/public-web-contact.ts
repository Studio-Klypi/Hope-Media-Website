import { type ContactState, defaults, type SendPayload } from "~/types/states/contact";
import { toast } from "vue-sonner";

export const usePublicContactStore = defineStore("contact", {
  state: (): ContactState => ({ ...defaults }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,
  },
  actions: {
    async sendMessage(payload: SendPayload) {
      this.loading = true;

      try {
        await $fetch("/api/web-contact", {
          method: "POST",
          body: payload,
        });
        toast.success(this.translate("toasts.contact-message.sent.title"), {
          description: this.translate("toasts.contact-message.sent.description"),
        });
      }
      catch {
        toast.error(this.translate("toasts.error.default"));
      }
      finally {
        this.loading = false;
      }
    },
  },
});
