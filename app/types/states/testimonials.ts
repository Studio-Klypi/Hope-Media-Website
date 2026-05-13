import type { Testimonial } from "#shared/types/entities/testimonial";

export interface TestimonialState {
  testimonials: Listed<Testimonial>;
  totalEntities: number;
  loading: {
    list: boolean;
  };
}

export const defaults: TestimonialState = {
  testimonials: [],
  totalEntities: -1,
  loading: {
    list: false,
  },
};
