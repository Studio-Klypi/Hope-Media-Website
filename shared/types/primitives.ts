import type { H3Event } from "h3";

export type Nullable<T = any> = T | null;
export type Listed<T = any> = T[];

export type HttpEvent = H3Event<Request>;
export enum HttpCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  INTERNAL_SERVER_ERROR = 500,
}

export interface ApiListResponse<T = any> {
  data: Listed<T>;
  meta: {
    total: number;
    count: number;
  };
}
