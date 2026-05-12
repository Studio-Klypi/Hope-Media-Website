import {TestimonialService} from "#server/services";

export default defineEventHandler(event => TestimonialService.approve(event));
