export interface UserState {
  user: Nullable;
  loading: {
    code: boolean;
    login: boolean;
  };
}

export const defaults: UserState = {
  user: null,
  loading: {
    code: false,
    login: false,
  },
};
