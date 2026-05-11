import type { CreateArticlePayload, UpdateArticlePayload } from "#shared/types/entities/article";
import { ArticleStatus } from "@prisma/client";
import { generateSlug } from "#server/utils/generator";
import type { UserEntity } from "#shared/types/entities/user";

export class ArticleRepository {
  async create(user: UserEntity, payload: CreateArticlePayload) {
    const slug = generateSlug(payload.title);

    return prisma.article.create({
      data: {
        slug,
        authorId: user.id,
        ...payload,
      },
      include: {
        author: true,
      },
    });
  }

  async update(id: number, payload: UpdateArticlePayload) {
    const { title, ...rest } = payload;

    return {
      old: await prisma.article.findUniqueOrThrow({
        where: { id },
      }),
      new: await prisma.article.update({
        where: { id },
        data: {
          ...rest,
          ...(title ? { title, slug: generateSlug(title) } : {}),
        },
        include: {
          author: true,
          _count: {
            select: {
              articleViews: true,
            },
          },
        },
      }),
    };
  }

  async saveView(articleId: number, ip: string) {
    const now = new Date();

    if (await prisma.articleView.findFirst({
      where: {
        articleId: articleId,
        ip,
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
          lte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999),
        },
      },
    })) return;

    return prisma.articleView.create({
      data: {
        articleId,
        ip,
      },
    });
  }

  async getViews(start: Date, end: Date) {
    return prisma.$queryRaw<Listed<{ day: Date; count: number }>>`SELECT DATE("createdAt") as day, COUNT(*)::int as count FROM "article_views" WHERE "createdAt" >= ${start} AND "createdAt" <= ${end} GROUP BY day ORDER BY day ASC`;
  }

  async getArticleViews(id: number, start: Date, end: Date) {
    return prisma.articleView.findMany({
      where: {
        articleId: id,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });
  }

  async getAll(admin: boolean = false) {
    return prisma.article.findMany({
      where: {
        ...(admin ? {} : { status: ArticleStatus.PUBLISHED }),
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async get(_slug: string, admin: boolean = false) {
    const [articleId, ...rest] = _slug.split("-");
    const id = Number(articleId);
    const slug = rest.join("-");

    return prisma.article.findUniqueOrThrow({
      where: {
        id,
        slug,
        ...(admin ? {} : { status: ArticleStatus.PUBLISHED }),
      },
      ...(admin
        ? {
                include: {
                  _count: {
                    select: {
                      articleViews: true,
                    },
                  },
                },
              }
        : {}),
    });
  }

  async getById(id: number) {
    return prisma.article.findUniqueOrThrow({
      where: { id },
    });
  }

  async publish(id: number) {
    return prisma.article.update({
      where: {
        id,
        status: ArticleStatus.DRAFT,
        publishedAt: null,
      },
      data: {
        status: ArticleStatus.PUBLISHED,
        archivedAt: new Date(),
      },
      include: {
        author: true,
        _count: {
          select: {
            articleViews: true,
          },
        },
      },
    });
  }

  async archive(id: number) {
    return prisma.article.update({
      where: {
        id,
        status: {
          not: ArticleStatus.ARCHIVED,
        },
        archivedAt: null,
      },
      data: {
        status: ArticleStatus.ARCHIVED,
        archivedAt: new Date(),
      },
      include: {
        author: true,
        _count: {
          select: {
            articleViews: true,
          },
        },
      },
    });
  }

  async restore(id: number) {
    const article = await prisma.article.findUniqueOrThrow({
      where: {
        id,
        status: ArticleStatus.ARCHIVED,
        archivedAt: {
          not: null,
        },
      },
    });

    return prisma.article.update({
      where: {
        id,
      },
      data: {
        status: article.publishedAt ? ArticleStatus.PUBLISHED : ArticleStatus.DRAFT,
        archivedAt: null,
      },
      include: {
        author: true,
        _count: {
          select: {
            articleViews: true,
          },
        },
      },
    });
  }
}
