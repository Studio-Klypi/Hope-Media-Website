<script setup lang="ts">
import { columns } from "~/components/admin/testimonials/index";
import TestimonialDetails from "~/components/admin/testimonials/testimonial/TestimonialDetails.vue";

const { testimonials } = storeToRefs(useTestimonialStore());

const selectedTestimonialId = ref<Nullable<string>>(null);
const selectedTestimonial = computed(() => testimonials.value.find(t => t.id === selectedTestimonialId.value));

function selectTestimonial(id: Nullable<string>) {
  selectedTestimonialId.value = id;
}
</script>

<template>
  <div>
    <UiDataTable
      :columns="columns()"
      :data="testimonials"
      :row-action="row => selectTestimonial(row.id)"
    />

    <UiDialog
      :open="!!selectedTestimonialId"
      @update:open="(val) => {
        if (val) return;
        selectTestimonial(null);
      }"
    >
      <UiDialogContent>
        <TestimonialDetails
          v-if="selectedTestimonial"
          :testimonial="selectedTestimonial"
        />
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
