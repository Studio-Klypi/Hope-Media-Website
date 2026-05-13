import { UserService } from "#server/services";

export default defineEventHandler(async event => UserService.create(event));
