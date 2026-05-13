import { EntryType, type Prisma } from "@prisma/client";
import { ArticleModel, AuditEntryModel } from "#server/repositories";
import type { CreateArticlePayload, UpdateArticlePayload } from "#shared/types/entities/article";
import { validateBody } from "#server/utils/body-validation";
import { softRequireAuth } from "#server/utils/auth";

export class ArticleEngine {
  async create(event: HttpEvent) {
    const user = requireAuth(event);
    const body = await readBody<CreateArticlePayload>(event);

    try {
      const article = await ArticleModel.create(user, body);

      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.ARTICLE_CREATED,
        data: {
          article,
        },
      });

      event.node.res.statusCode = HttpCode.CREATED;
      return article;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2002": return sendError(event, createError({
          statusCode: HttpCode.CONFLICT,
          statusMessage: "An article with the same title/slug already exists.",
        }));
        default: {
          console.error(e);
          return sendError(event, createError({
            statusCode: HttpCode.INTERNAL_SERVER_ERROR,
            statusMessage: "Unable to create the article.",
          }));
        }
      }
    }
  }

  async save(event: HttpEvent) {
    const user = requireAuth(event);
    const id = Number(getRouterParam(event, "articleId") as string);
    const body = await validateBody<Pick<UpdateArticlePayload, "title" | "content" | "excerpt">>(event);

    try {
      const article = await ArticleModel.update(Number(id), body);

      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.ARTICLE_UPDATED,
        data: {
          article,
        },
      });

      event.node.res.statusCode = HttpCode.ACCEPTED;
      return article.new;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2002": return sendError(event, createError({
          statusCode: HttpCode.CONFLICT,
          statusMessage: "An article with the same title/slug already exists.",
        }));
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the article.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to save the article.",
        }));
      }
    }
  }

  async delete(event: HttpEvent) {
    const user = requireAuth(event);
    const id = Number(getRouterParam(event, "articleId") as string);

    try {
      const article = await ArticleModel.delete(id);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.ARTICLE_DELETED,
        data: {
          article,
        },
      });

      return article;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the article.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to delete the article.",
        }));
      }
    }
  }

  async getViews(event: HttpEvent) {
    requireAuth(event);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const start = new Date();
    start.setDate(start.getDate() - 29);
    start.setHours(0, 0, 0, 0);

    const views = await ArticleModel.getViews(start, end);

    const formatDay = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    const viewsByDay = views.reduce<Record<string, number>>((acc, v) => {
      const day = formatDay(v.day);
      acc[day] = (acc[day] ?? 0) + 1;
      return acc;
    }, {});

    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const day = formatDay(d);
      return { day, count: viewsByDay[day] ?? 0 };
    });
  }

  async getList(event: HttpEvent) {
    const user = softRequireAuth(event);
    return ArticleModel.getAll(!!user);
  }

  async get(event: HttpEvent) {
    const user = softRequireAuth(event);
    const slug = getRouterParam(event, "articleSlug") as string;
    const ip = getRequestIP(event, { xForwardedFor: true }) ?? "";

    try {
      const article = await ArticleModel.get(slug, !!user);
      if (!user) await ArticleModel.saveView(article.id, ip);

      return article;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the article.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to fetch the article.",
        }));
      }
    }
  }

  async publish(event: HttpEvent) {
    const user = requireAuth(event);
    const id = Number(getRouterParam(event, "articleId") as string);

    try {
      const article = await ArticleModel.publish(id);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.ARTICLE_PUBLISHED,
        data: {
          article,
        },
      });

      return article;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find article.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to publish article.",
        }));
      }
    }
  }

  async convertToDraft(event: HttpEvent) {
    const user = requireAuth(event);
    const id = Number(getRouterParam(event, "articleId") as string);

    try {
      const article = await ArticleModel.convertToDraft(id);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.ARTICLE_UNPUBLISHED,
        data: {
          article,
        },
      });

      return article;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find article.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to publish article.",
        }));
      }
    }
  }

  async archive(event: HttpEvent) {
    const user = requireAuth(event);
    const id = Number(getRouterParam(event, "articleId") as string);

    try {
      const article = await ArticleModel.archive(id);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.ARTICLE_ARCHIVED,
        data: {
          article,
        },
      });

      return article;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find article.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to archive article.",
        }));
      }
    }
  }

  async restore(event: HttpEvent) {
    const user = requireAuth(event);
    const id = Number(getRouterParam(event, "articleId") as string);

    try {
      const article = await ArticleModel.restore(id);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.ARTICLE_RESTORED,
        data: {
          article,
        },
      });

      return article;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find article.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to archive article.",
        }));
      }
    }
  }
}
