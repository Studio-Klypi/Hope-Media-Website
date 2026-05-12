export interface CreateWebContact {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  subject: string;
  message: string;
}

export type CreateWebContactReply = Pick<CreateWebContact, "message">;

export interface BlockWebContact {
  reason?: string;
}
