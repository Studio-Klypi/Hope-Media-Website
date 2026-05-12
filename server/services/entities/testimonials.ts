import { AuditEntryModel, TestimonialModel } from "#server/repositories";
import type { CreateTestimonial } from "#shared/types/entities/testimonial";
import type { Prisma } from "@prisma/client";
import { EntryType } from "@prisma/client";
import { marked } from "marked";

export class TestimonialEngine {
  async getAll(event: HttpEvent) {
    requireAuth(event);

    try {
      return await TestimonialModel.getAll();
    }
    catch {
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Error occurred while fetching testimonials.",
      }));
    }
  }

  async create(event: HttpEvent) {
    const body = await readBody<CreateTestimonial>(event);

    try {
      const testimonial = await TestimonialModel.create(body);
      await AuditEntryModel.create({
        type: EntryType.TESTIMONIAL_SENT,
        data: {
          testimonial,
        },
      });

      await sendMail({
        to: testimonial.email,
        subject: "Nous avons bien reçu votre témoignage",
        template: "testimonial/received/index",
        variables: {
          firstName: testimonial.firstName,
          contentHtml: await marked.parse(testimonial.content),
          content: testimonial.content,
        },
      });

      return;
    }
    catch {
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Error occurred while creating a testimonial.",
      }));
    }
  }

  async approve(event: HttpEvent) {
    const user = requireAuth(event);
    const id = getRouterParam(event, "testimonialId") as string;

    try {
      const testimonial = await TestimonialModel.approve(id, user);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.TESTIMONIAL_APPROVED,
        data: {
          testimonial,
        },
      });

      await sendMail({
        to: testimonial.email,
        subject: "Votre témoignage est en ligne !",
        template: "testimonial/published/index",
        variables: {
          firstName: testimonial.firstName,
          contentHtml: await marked.parse(testimonial.content),
          content: testimonial.content,
        },
      });

      return testimonial;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the testimonial.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to approve the testimonial.",
        }));
      }
    }
  }

  async reject(event: HttpEvent) {
    const user = requireAuth(event);
    const id = getRouterParam(event, "testimonialId") as string;

    try {
      const testimonial = await TestimonialModel.reject(id, user);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.TESTIMONIAL_REJECTED,
        data: {
          testimonial,
        },
      });

      return testimonial;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the testimonial.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to reject the testimonial.",
        }));
      }
    }
  }
}
