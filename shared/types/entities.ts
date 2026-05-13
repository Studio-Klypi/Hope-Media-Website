import type { Nullable } from "#shared/types/primitives";

export interface Entity {
  id: number;
  key: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
}
