import { prisma } from "#server/utils/prisma";
import type { CreateTestimonial } from "#shared/types/entities/testimonial";
import type { UserEntity } from "#shared/types/entities/user";

export class TestimonialRepository {
  async getAll() {
    const total = await prisma.testimonial.count();
    const data = await prisma.testimonial.findMany({
      include: {
        processor: true,
      },
    });

    return {
      data,
      meta: {
        total,
        count: data.length,
      },
    };
  }

  async create(payload: CreateTestimonial) {
    return prisma.testimonial.create({
      data: payload,
      include: {
        processor: true,
      },
    });
  }

  async approve(id: string, user: UserEntity) {
    return prisma.testimonial.update({
      where: {
        id,
        publishedAt: null,
        rejectedAt: null,
      },
      data: {
        processedBy: user.id,
        publishedAt: new Date(),
      },
      include: {
        processor: true,
      },
    });
  }

  async reject(id: string, user: UserEntity) {
    return prisma.testimonial.update({
      where: {
        id,
        publishedAt: null,
        rejectedAt: null,
      },
      data: {
        processedBy: user.id,
        rejectedAt: new Date(),
      },
      include: {
        processor: true,
      },
    });
  }
}
