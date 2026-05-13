import type {Testimonial} from "#shared/types/entities/testimonial";

export interface PublicTestimonialState {
  testimonials: Listed<Testimonial>;
  totalEntities: number;
  loading: {
    list: boolean;
    creating: boolean;
  };
}

export const defaults: PublicTestimonialState = {
  testimonials: [],
  totalEntities: -1,
  loading: {
    list: false,
    creating: false,
  },
};
