import type { ComponentProps } from "~/types/generic/components";

export interface QuoteBlock extends ComponentProps {
  hover?: boolean;
}

export interface RankingProps {
  value: number;
  max: number;
  length?: number;
  normalize?: boolean;
}
