import { type PublicTestimonialState, defaults } from "~/types/states/public/testimonial";
import type { CreateTestimonial, Testimonial } from "#shared/types/entities/testimonial";
import { toast } from "vue-sonner";

export const usePublicTestimonialStore = defineStore("publicTestimonials", {
  state: (): PublicTestimonialState => ({ ...defaults }),
  getters: {
    translate: () => useNuxtApp().$i18n.t,

    hasLoaded: state => state.totalEntities > -1,
  },
  actions: {
    async load() {
      this.loading.list = true;

      try {
        const response = await $fetch<ApiListResponse<Testimonial>>("/api/testimonials");

        this.testimonials = response.data;
        this.totalEntities = response.meta.total;
      }
      catch {
        toast.error(this.translate("toasts.error.default"));
      }
      finally {
        this.loading.list = false;
      }
    },

    async create(payload: CreateTestimonial) {
      this.loading.creating = true;
      let state = true;

      try {
        await $fetch("/api/testimonials", {
          method: "POST",
          body: payload,
        });
        toast.success(this.translate("toasts.testimonials.sent.title"), {
          description: this.translate("toasts.testimonials.sent.description"),
        });
      }
      catch {
        toast.error(this.translate("toasts.error.default"));
        state = false;
      }
      finally {
        this.loading.creating = false;
      }

      return state;
    },
  },
});
