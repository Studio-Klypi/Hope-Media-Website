import { UserService } from "#server/services";

export default defineEventHandler(event => UserService.login(event));
