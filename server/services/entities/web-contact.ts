import type { Prisma } from "@prisma/client";
import { EntryType } from "@prisma/client";
import { AuditEntryModel, WebContactModel } from "#server/repositories";
import { marked } from "marked";
import type { BlockWebContact, CreateWebContact, CreateWebContactReply } from "#shared/types/entities/web-contact";

export class WebContactEngine {
  async create(event: HttpEvent) {
    const body = await readBody<CreateWebContact>(event);

    try {
      if (await WebContactModel.isBlocked(body.email)) {
        event.node.res.statusCode = HttpCode.CREATED;
        return;
      }

      const message = await WebContactModel.create(body);
      await AuditEntryModel.create({
        type: EntryType.WEB_MESSAGE_RECEIVED,
        data: {
          message,
        },
      });

      await sendMail({
        to: message.email,
        subject: `Message reçu — ${message.subject}`,
        template: "web-contact/received/index",
        variables: {
          firstName: message.firstName,
          subject: message.subject,
          messageHtml: await marked.parse(message.message),
        },
      });

      event.node.res.statusCode = HttpCode.CREATED;
      return;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to send the message",
        }));
      }
    }
  }

  async reply(event: HttpEvent) {
    const user = requireAuth(event);
    const id = getRouterParam(event, "messageId") as string;
    const body = await readBody<CreateWebContactReply>(event);

    try {
      const message = await WebContactModel.reply(id, body, user);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.WEB_MESSAGE_REPLYED,
        data: {
          message,
        },
      });

      await sendMail({
        to: message.email,
        subject: `Re: ${message.subject}`,
        replyTo: user.email,
        template: "web-contact/reply/index",
        variables: {
          firstName: message.firstName,
          subject: message.subject,
          replyHtml: await marked.parse(message.replies![0]!.message),
          originalMessageHtml: await marked.parse(message.message),
        },
      });

      return message;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the message.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to send the message",
        }));
      }
    }
  }

  async ignore(event: HttpEvent) {
    const user = requireAuth(event);
    const id = getRouterParam(event, "messageId") as string;

    try {
      const message = await WebContactModel.ignore(id);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.WEB_MESSAGE_IGNORE,
        data: {
          message,
        },
      });

      return message;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the message.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to ignore the message",
        }));
      }
    }
  }

  async block(event: HttpEvent) {
    const user = requireAuth(event);
    const id = getRouterParam(event, "messageId") as string;
    const body = await readBody<BlockWebContact>(event);

    try {
      const message = await WebContactModel.block(id, body, user);
      await AuditEntryModel.create({
        userId: user.id,
        type: EntryType.WEB_SENDER_BLOCKED,
        data: {
          message,
          ...body,
        },
      });

      return message;
    }
    catch (e) {
      const error = e as Prisma.PrismaClientKnownRequestError;

      switch (error.code) {
        case "P2002": return sendError(event, createError({
          statusCode: HttpCode.CONFLICT,
          statusMessage: "Unable to block the sender",
        }));
        case "P2025": return sendError(event, createError({
          statusCode: HttpCode.NOT_FOUND,
          statusMessage: "Unable to find the message.",
        }));
        default: return sendError(event, createError({
          statusCode: HttpCode.INTERNAL_SERVER_ERROR,
          statusMessage: "Unable to block the sender",
        }));
      }
    }
  }

  async getAll(event: HttpEvent) {
    requireAuth(event);

    try {
      return await WebContactModel.getAll();
    }
    catch {
      return sendError(event, createError({
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        statusMessage: "Unable to fetch messages",
      }));
    }
  }
}
