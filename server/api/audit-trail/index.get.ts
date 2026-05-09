import { AuditTrailService } from "#server/services";

export default defineEventHandler(event => AuditTrailService.getAll(event));
