import { StatisticService } from "#server/services";

export default defineEventHandler(event => StatisticService.get(event));
