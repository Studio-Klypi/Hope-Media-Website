import { formatDate } from "date-fns";
import * as locales from "date-fns/locale";

export function useCurrentTime(date: boolean = false) {
  const format = `${date ? "eeee dd MMMM yyyy, " : ""}HH:mm:ss`;
  const locale = useNuxtApp().$i18n.locale;

  const interval = ref<NodeJS.Timeout | null>(null);
  const time = ref<string>(formatDate(new Date(), format, { locale: locales[locale.value] }));

  onMounted(() => {
    clear();
    interval.value = setInterval(update, 500);
  });
  onBeforeUnmount(() => clear());

  function update() {
    time.value = formatDate(new Date(), format, { locale: locales[locale.value] });
  }
  function clear() {
    if (!interval.value) return;

    clearInterval(interval.value);
    interval.value = null;
  }

  return { time };
}
