import type { Entity } from "#shared/types/entities";
import type { Nullable } from "#shared/types/primitives";

export interface UserEntity extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  phone: Nullable<string>;
}

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: Nullable<string>;
}
export type PartialUserPayload = Partial<UserPayload>;
