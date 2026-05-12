import { defaults, type WebContactState } from "~/types/states/web-contact";
import type { WebContact } from "@prisma/client";
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
      toast.promise($fetch<WebContact>(`/api/web-contact/${id}/reply`, {
        method: "POST",
        body: {
          message,
        },
      }), {
        loading: () => this.translate("toasts.admin.web-contact.reply.loading"),
        success: (message: WebContact) => {
          this.messages = this.messages.map(msg => msg.id === message.id ? { ...message } : msg);
          return this.translate("toasts.admin.web-contact.reply.success", { "contact-email": message.email });
        },
        error: () => this.translate("toasts.admin.web-contact.reply.error"),
      });
    },
    async ignore(id: string) {
      toast.promise($fetch<WebContact>(`/api/web-contact/${id}/ignore`, { method: "PATCH" }), {
        loading: () => this.translate("toasts.admin.web-contact.ignore.loading"),
        success: (message: WebContact) => {
          this.messages = this.messages.filter(msg => msg.id === message.id ? { ...message } : msg);
          return this.translate("toasts.admin.web-contact.ignore.success", { "contact-email": message.email });
        },
        error: () => this.translate("toasts.admin.web-contact.ignore.error"),
      });
    },
    async block(id: string, reason?: string) {
      toast.promise($fetch<WebContact>(`/api/web-contact/${id}/block`, { method: "POST", body: { reason } }), {
        loading: () => this.translate("toasts.admin.web-contact.block.loading"),
        success: (message: WebContact) => {
          this.messages = this.messages.filter(msg => msg.id === message.id ? { ...message } : msg);
          return this.translate("toasts.admin.web-contact.block.success", { "contact-email": message.email });
        },
        error: () => this.translate("toasts.admin.web-contact.block.error"),
      });
    },
  },
});
