import type { ArticleStatus } from "@prisma/client";
import type { Nullable } from "#shared/types/primitives";

export interface CreateArticlePayload {
  title: string;
  content: string;
  excerpt?: string;
  status?: ArticleStatus;
  publishedAt?: Nullable<Date>;
  archivedAt?: Nullable<Date>;
}

export type UpdateArticlePayload = Partial<CreateArticlePayload>;
