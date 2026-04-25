import type { ComponentProps } from "~/types/generic/components";

export interface ComposingProps extends ComponentProps {
  name?: string;
}

export interface PageProps extends ComposingProps {
  seoKey?: string;
  seoData?: {
    title?: string;
    description?: string;
  };
}
