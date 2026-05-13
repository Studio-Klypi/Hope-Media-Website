import type { Prisma } from "@prisma/client";

export interface CreateTestimonial {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: string;
  content: string;
  ranking: number;
}

export type Testimonial = Prisma.TestimonialGetPayload<{
  include: {
    processor: true;
  };
}>;
