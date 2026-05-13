import { WebContactService } from "#server/services";

export default defineEventHandler(event => WebContactService.block(event));
