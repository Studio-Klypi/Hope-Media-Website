import { defaults, type TestimonialState } from "~/types/states/testimonials";
import type { Testimonial } from "#shared/types/entities/testimonial";
import { toast } from "vue-sonner";

export const useTestimonialStore = defineStore("testimonials", {
  state: (): TestimonialState => ({ ...defaults }),
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

    async approve(id: string) {
      toast.promise($fetch<Testimonial>(`/api/testimonials/${id}/approve`, { method: "PATCH" }), {
        loading: () => this.translate("toasts.admin.testimonials.approve.loading"),
        success: (testimonial: Testimonial) => {
          this.testimonials = this.testimonials.map(t => t.id === testimonial.id ? { ...testimonial } : t);
          return this.translate("toasts.admin.testimonials.approve.success", { name: `${testimonial.firstName} ${testimonial.lastName}` });
        },
        error: () => this.translate("toasts.admin.testimonials.approve.error"),
      });
    },
    async reject(id: string) {
      toast.promise($fetch<Testimonial>(`/api/testimonials/${id}/reject`, { method: "PATCH" }), {
        loading: () => this.translate("toasts.admin.testimonials.reject.loading"),
        success: (testimonial: Testimonial) => {
          this.testimonials = this.testimonials.map(t => t.id === testimonial.id ? { ...testimonial } : t);
          return this.translate("toasts.admin.testimonials.reject.success", { name: `${testimonial.firstName} ${testimonial.lastName}` });
        },
        error: () => this.translate("toasts.admin.testimonials.reject.error"),
      });
    },
  },
});
