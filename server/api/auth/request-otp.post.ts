import { OTPService } from "#server/services";

export default defineEventHandler(event => OTPService.create(event));
