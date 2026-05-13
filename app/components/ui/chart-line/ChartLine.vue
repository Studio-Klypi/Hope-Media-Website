<script setup lang="ts" generic="T extends Record<string, any>">
import type { HTMLAttributes } from "vue";
import { CurveType } from "@unovis/ts";
import { VisXYContainer, VisLine, VisArea, VisAxis, VisCrosshair, VisTooltip } from "@unovis/vue";
import type { ChartConfig } from "~/components/ui/chart";
import { ChartContainer, ChartTooltipContent, componentToString } from "~/components/ui/chart";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<{
  data: T[];
  config: ChartConfig;
  index: keyof T & string;
  categories: (keyof T & string)[];
  curveType?: CurveType;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showArea?: boolean;
  xFormatter?: (v: number | Date) => string;
  yFormatter?: (v: number) => string;
  class?: HTMLAttributes["class"];
}>(), {
  curveType: CurveType.MonotoneX,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showArea: false,
});

// Les attributs SVG ne supportent pas les CSS variables.
// Les admin pages ont ssr:false, donc document est disponible dès le setup.
// On résout les couleurs de façon synchrone via getComputedStyle.
function resolveChartColor(colorIndex: number): string {
  if (typeof window === "undefined") return "currentColor";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--chart-${colorIndex}`)
    .trim() || "currentColor";
}

function resolveCssColor(color: string): string {
  if (typeof window === "undefined" || !color.includes("var(")) return color;
  const varMatch = color.match(/var\((--[^),\s]+)\)/);
  if (!varMatch) return color;
  return getComputedStyle(document.documentElement).getPropertyValue(varMatch[1]).trim() || color;
}

function getCategoryColor(category: string, index: number): string {
  const configColor = props.config[category]?.color;
  if (configColor) return resolveCssColor(configColor);
  const colorIndex = props.categories.length === 1 ? 3 : index + 1;
  return resolveChartColor(colorIndex);
}

const resolvedConfig = computed<ChartConfig>(() =>
  Object.fromEntries(
    props.categories.map((category, i) => [
      category,
      { ...props.config[category], color: getCategoryColor(category, i) },
    ]),
  ),
);

const x = (_: T, i: number) => i;
const getY = (category: keyof T) => (d: T) => d[category] as number;
const getColor = (category: string, i: number) => getCategoryColor(category, i);

const tooltipTemplate = componentToString(
  resolvedConfig.value,
  ChartTooltipContent,
  {
    labelFormatter: props.xFormatter,
    indicator: "line" as const,
  },
);
</script>

<template>
  <ChartContainer
    :config="resolvedConfig"
    :class="cn('min-h-48', props.class)"
    cursor
  >
    <VisXYContainer :data="data">
      <VisArea
        v-for="(category, i) in categories"
        v-if="showArea"
        :key="`area-${category}`"
        :x="x"
        :y="getY(category)"
        :curve-type="curveType"
        :color="getColor(category, i)"
        :opacity="0.15"
      />
      <VisLine
        v-for="(category, i) in categories"
        :key="category"
        :x="x"
        :y="getY(category)"
        :curve-type="curveType"
        :color="getColor(category, i)"
      />

      <VisAxis
        v-if="showXAxis"
        type="x"
        :tick-format="xFormatter ?? ((i: number) => String(data[i]?.[index] ?? i))"
      />
      <VisAxis
        v-if="showYAxis"
        type="y"
        :tick-format="yFormatter"
      />

      <VisCrosshair
        v-if="showTooltip"
        :template="tooltipTemplate"
      />
      <VisTooltip v-if="showTooltip" />
    </VisXYContainer>
  </ChartContainer>
</template>
