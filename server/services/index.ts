import UserEngine from "#server/services/entities/user";
import OTPEngine from "#server/services/entities/otp";
import AuditTrailEngine from "#server/services/entities/audit-trail";
import { ArticleEngine } from "#server/services/entities/article";
import { WebContactEngine } from "#server/services/entities/web-contact";

export const UserService = new UserEngine();
export const OTPService = new OTPEngine();

export const AuditTrailService = new AuditTrailEngine();

export const ArticleService = new ArticleEngine();

export const WebContactService = new WebContactEngine();
