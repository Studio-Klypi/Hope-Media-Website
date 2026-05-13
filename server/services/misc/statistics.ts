import { ArticleModel, TestimonialModel, WebContactModel } from "#server/repositories";

export class StatisticsEngine {
  async get(event: HttpEvent) {
    requireAuth(event);

    try {
      const views = await ArticleModel.getAllViews();
      const messages = await WebContactModel.getAllUnprocessed();
      const newTestimonials = await TestimonialModel.getAllUnprocessed();
      const publicTestimonials = await TestimonialModel.getAllApproved();

      return {
        views,
        messages,
        testimonials: {
          new: newTestimonials,
          public: publicTestimonials,
        },
      };
    }
    catch {
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Error occurred while fetching statistics.",
      }));
    }
  }
}
