import { type ContactState, defaults, type SendPayload } from "~/types/states/contact";

export const useContactStore = defineStore("contact", {
  state: (): ContactState => ({ ...defaults }),
  actions: {
    async sendMessage(payload: SendPayload) {
      this.loading = true;

      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(payload);
      this.loading = false;
    },
  },
});
