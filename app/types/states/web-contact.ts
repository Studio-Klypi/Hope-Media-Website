import type { Prisma } from "@prisma/client";

export type WebContact = Prisma.WebContactGetPayload<{
  include: {
    replies: true;
    blocked: {
      include: {
        user: true;
      };
    };
  };
}>;

export interface WebContactState {
  messages: Listed<WebContact>;
  totalEntities: number;
  loading: {
    list: boolean;
    replying: boolean;
    blocking: boolean;
  };
}

export const defaults: WebContactState = {
  messages: [],
  totalEntities: -1,
  loading: {
    list: false,
    replying: false,
    blocking: false,
  },
};
