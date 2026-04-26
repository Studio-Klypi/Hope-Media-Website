import type { ComponentProps } from "~/types/generic/components";

export { default as Flag } from "./Flag.vue";

export interface FlagProps extends ComponentProps {
  code: string;
}
