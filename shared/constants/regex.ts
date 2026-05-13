export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{10,}$/;

export const PHONE_REGEX = /^(\+[0-9]{2}\(0\)|0)[0-9]([. ]?[0-9]{2}){4}$/;

export const NAME_REGEX = /^[a-zA-Z\u00C0-\u024F\s-]+$/;
