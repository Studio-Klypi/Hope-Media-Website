import type { WebContact } from "@prisma/client";

export interface WebContactState {
  messages: Listed<WebContact>;
  totalEntities: number;
  loading: {
    list: boolean;
    replying: boolean;
  };
}

export const defaults: WebContactState = {
  messages: [],
  totalEntities: -1,
  loading: {
    list: false,
    replying: false,
  },
};
