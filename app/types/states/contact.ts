export interface SendPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactState {
  loading: boolean;
}

export const defaults: ContactState = {
  loading: false,
};
