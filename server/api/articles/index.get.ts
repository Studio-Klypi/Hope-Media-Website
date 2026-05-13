import { ArticleService } from "#server/services";

export default defineEventHandler(event => ArticleService.getList(event));
