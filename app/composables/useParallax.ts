import { useWindowScroll } from "@vueuse/core";
import { computed, type MaybeRefOrGetter, toValue } from "vue";

export function useParallax(speed: MaybeRefOrGetter<number> = 0.5) {
  const { y } = useWindowScroll();

  const offset = computed(() => y.value * toValue(speed));

  const style = computed(() => ({
    transform: `translateY(${offset.value}px)`,
  }));

  return { offset, style };
}
