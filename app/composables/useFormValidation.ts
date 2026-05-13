import type { FormContext } from "vee-validate";

export function useFormValidation(form: FormContext) {
  return computed(() => form.meta.value.valid);
}

export function useFormUtils(form: FormContext) {
  const valid = computed(() => form.meta.value.valid);
  const touched = computed(() => form.meta.value.touched);

  return {
    valid,
    touched,
  };
}
