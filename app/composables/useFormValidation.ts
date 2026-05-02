import type { FormContext } from "vee-validate";

export function useFormValidation(form: FormContext) {
  return computed(() => form.meta.value.valid);
}
