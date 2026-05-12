import { defaults, type WebContact, type WebContactState } from "~/types/states/web-contact";
import { toast } from "vue-sonner";

export const useWebContactStore = defineStore("web-contact", {
  state: (): WebContactState => ({ ...defaults }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,

    hasLoaded: state => state.totalEntities > -1,
  },
  actions: {
    async load() {
      this.loading.list = true;

      try {
        const response = await $fetch<ApiListResponse<WebContact>>("/api/web-contact");

        this.messages = response.data;
        this.totalEntities = response.meta.total;
      }
      catch {
        toast.error(this.translate("toasts.error.default"));
      }
      finally {
        this.loading.list = false;
      }
    },

    async reply(id: string, message: string) {
      this.loading.replying = true;

      try {
        const reply = await $fetch<WebContact>(`/api/web-contact/${id}/reply`, {
          method: "POST",
          body: {
            message,
          },
        });

        this.messages = this.messages.map(msg => msg.id === reply.id ? { ...reply } : msg);
        toast.success(this.translate("toasts.admin.web-contact.reply.success", { "contact-email": reply.email }));
      }
      catch {
        toast.error(this.translate("toasts.admin.web-contact.reply.error"));
      }
      finally {
        this.loading.replying = false;
      }
    },
    async ignore(id: string) {
      toast.promise($fetch<WebContact>(`/api/web-contact/${id}/ignore`, { method: "PATCH" }), {
        loading: () => this.translate("toasts.admin.web-contact.ignore.loading"),
        success: (message: WebContact) => {
          this.messages = this.messages.map(msg => msg.id === message.id ? { ...message } : msg);
          return this.translate("toasts.admin.web-contact.ignore.success", { "contact-email": message.email });
        },
        error: () => this.translate("toasts.admin.web-contact.ignore.error"),
      });
    },
    async block(id: string, reason?: string) {
      this.loading.blocking = true;
      let state = true;

      try {
        const message = await $fetch<WebContact>(`/api/web-contact/${id}/block`, { method: "POST", body: { reason } });

        this.messages = this.messages.map(msg => msg.id === message.id ? { ...message } : msg);
        toast.error(this.translate("toasts.admin.web-contact.block.success", { "contact-email": message.email }));
      }
      catch {
        toast.error(this.translate("toasts.admin.web-contact.block.error"));
        state = false;
      }
      finally {
        this.loading.blocking = false;
      }

      return state;
    },
  },
});
