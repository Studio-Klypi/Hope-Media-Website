export interface ConfirmationDialogProps {
  trigger?: boolean;
  title: string;
  description: string;
  action: string;
}

export interface ConfirmationDialogEmits {
  confirmed: [];
}
