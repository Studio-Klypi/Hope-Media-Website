<script setup lang="ts">
import { cn } from "@inspira-ui/plugins";
import { createNoise3D } from "simplex-noise";
import { type HTMLAttributes, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

interface WavyBackgroundProps {
  class?: HTMLAttributes["class"];
  containerClass?: HTMLAttributes["class"];
  canvasClass?: HTMLAttributes["class"];
  canvasStyle?: Record<string, string>;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;

  [key: string]: any;
}

const props = withDefaults(defineProps<WavyBackgroundProps>(), {
  colors: () => ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"],
  waveWidth: 50,
  backgroundFill: "var(--color-background)",
  blur: 10,
  speed: "fast",
  waveOpacity: 0.5,
});

const noise = createNoise3D();

// Declare variables with null
let w: number;
let h: number;
let nt = 0;
let ctx: CanvasRenderingContext2D | null = null;
let animationId: number;
let resolvedBgFill: string;
let resolvedColors: string[];
let observer: MutationObserver | null = null;

const canvasRef = useTemplateRef("canvasRef");

function resolveCssValue(el: Element, value: string): string {
  if (value.startsWith("var("))
    return getComputedStyle(el).getPropertyValue(value.slice(4, -1)).trim();
  return value;
}

function resolveColors() {
  const canvas = canvasRef.value;
  if (canvas) {
    resolvedBgFill = resolveCssValue(canvas, props.backgroundFill!);
    resolvedColors = props.colors.map(c => resolveCssValue(canvas, c));
  }
}

function getSpeed(): number {
  return props.speed === "slow" ? 0.001 : 0.002;
}

function init() {
  const canvas = canvasRef.value;
  if (canvas) {
    ctx = canvas.getContext("2d");
    if (ctx) {
      resolveColors();

      const parent = canvasRef.value.parentElement;
      if (parent) {
        w = ctx.canvas.width = parent.clientWidth;
        h = ctx.canvas.height = parent.clientHeight;
      }

      ctx.filter = `blur(${props.blur}px)`;
      window.onresize = () => {
        if (parent) {
          w = ctx!.canvas.width = parent.clientWidth;
          h = ctx!.canvas.height = parent.clientHeight;
        }
        ctx!.filter = `blur(${props.blur}px)`;
      };
      observer = new MutationObserver(() => resolveColors());
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      render();
    }
  }
}

function drawWave(n: number) {
  nt += getSpeed();
  for (let i = 0; i < n; i++) {
    ctx!.beginPath();
    ctx!.lineWidth = props.waveWidth!;
    ctx!.strokeStyle = resolvedColors[i % resolvedColors.length] || "#000000";
    for (let x = 0; x < w; x += 5) {
      const y = noise(x / 800, 0.3 * i, nt) * 100;
      ctx!.lineTo(x, y + h * 0.5); // Adjust for height, at 50% of the container
    }
    ctx!.stroke();
    ctx!.closePath();
  }
}

function render() {
  if (ctx) {
    ctx.fillStyle = resolvedBgFill;
    ctx.globalAlpha = props.waveOpacity!;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  }
}

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  observer?.disconnect();
});

const isSafari = ref(false);
onMounted(() => {
  isSafari.value
    = typeof window !== "undefined"
      && navigator.userAgent.includes("Safari")
      && !navigator.userAgent.includes("Chrome");

  init();
});
</script>

<template>
  <div :class="cn(`flex h-screen flex-col items-center justify-center`, props.containerClass)">
    <canvas
      id="canvas"
      ref="canvasRef"
      :class="cn('absolute z-0 opacity-25', props.canvasClass)"
      :style="{ filter: isSafari ? `blur(${props.blur}px)` : undefined, ...(props.canvasStyle ?? {}) }"
    />
    <div :class="cn(`relative z-10`, props.class)">
      <slot />
    </div>
  </div>
</template>
