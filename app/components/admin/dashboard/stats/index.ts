import type { ComponentProps } from "~/types/generic/components";

export interface AdminStatCardProps extends ComponentProps {
  value: number;
  label: string;
  loading: boolean;
}
