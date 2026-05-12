import UserRepository from "#server/repositories/entities/user";
import { SessionRepository } from "#server/repositories/entities/session";
import OTPRepository from "#server/repositories/entities/otp";
import AuditEntryRepository from "#server/repositories/entities/auditEntry";
import { ArticleRepository } from "#server/repositories/entities/article";
import { WebContactRepository } from "#server/repositories/entities/web-contact";

export const UserModel = new UserRepository();
export const SessionModel = new SessionRepository();
export const OTPModel = new OTPRepository();

export const AuditEntryModel = new AuditEntryRepository();

export const ArticleModel = new ArticleRepository();

export const WebContactModel = new WebContactRepository();
