export function useDayPeriod() {
  const now = new Date();
  const hours = now.getHours();

  if (6 <= hours && hours < 12) return 0;
  if (12 <= hours && hours < 17) return 1;
  if (17 <= hours && hours < 22) return 2;
  return 3;
}
