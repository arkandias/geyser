<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  PriorityFormDataFragmentDoc,
  UpsertPriorityDocument,
} from "@/gql/graphql.ts";

import NumInput from "@/components/core/NumInput.vue";
import SelectService from "@/components/core/SelectService.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof PriorityFormDataFragmentDoc>;
}>();

graphql(`
  fragment PriorityFormData on Course {
    oid
    year
    courseId: id
  }

  mutation UpsertPriority(
    $oid: Int!
    $year: Int!
    $serviceId: Int!
    $courseId: Int!
    $seniority: Int
    $isPriority: Boolean
  ) {
    insertPriorityOne(
      object: {
        oid: $oid
        year: $year
        serviceId: $serviceId
        courseId: $courseId
        seniority: $seniority
        isPriority: $isPriority
        computed: false
      }
      onConflict: {
        constraint: priority_oid_service_id_course_id_key
        updateColumns: [seniority, isPriority, computed]
      }
    ) {
      oid
      id
    }
  }
`);

const { t } = useTypedI18n();
const { notify } = useNotify();

const data = computed(() =>
  useFragment(PriorityFormDataFragmentDoc, dataFragment),
);

const upsertPriority = useMutation(UpsertPriorityDocument);

const serviceId = ref<number | null>(null);
const seniority = ref<number | null>(null);
const isPriority = ref<boolean | null>(null);

const priorityOptions = [
  { value: null, label: t("priorityForm.field.isPriority.null") },
  { value: true, label: t("priorityForm.field.isPriority.true") },
  { value: false, label: t("priorityForm.field.isPriority.false") },
];

const submitForm = async (): Promise<void> => {
  if (serviceId.value === null) {
    notify(NotifyType.Error, {
      message: t("priorityForm.invalid.message"),
      caption: t("priorityForm.invalid.caption.service"),
    });
    return;
  }
  if (
    seniority.value !== null &&
    (!Number.isInteger(seniority.value) || seniority.value < 0)
  ) {
    notify(NotifyType.Error, {
      message: t("priorityForm.invalid.message"),
      caption: t("priorityForm.invalid.caption.seniority"),
    });
    return;
  }

  const result = await upsertPriority.executeMutation({
    oid: data.value.oid,
    year: data.value.year,
    serviceId: serviceId.value,
    courseId: data.value.courseId,
    seniority: seniority.value,
    isPriority: isPriority.value,
  });

  if (result.data?.insertPriorityOne && !result.error) {
    notify(NotifyType.Success, {
      message: t("priorityForm.success"),
    });
  } else {
    notify(NotifyType.Error, {
      message: t("priorityForm.error"),
      caption: result.error?.message,
    });
  }
};

const resetForm = (): void => {
  serviceId.value = null;
  seniority.value = null;
  isPriority.value = null;
};

watch(() => data.value.courseId, resetForm);
</script>

<template>
  <QForm
    class="row q-gutter-md text-body2"
    @submit="submitForm"
    @reset="resetForm"
  >
    <SelectService v-model="serviceId" dense options-dense />
    <NumInput v-model="seniority" :label="t('priorityForm.field.seniority')" />
    <QOptionGroup
      v-model="isPriority"
      :options="priorityOptions"
      type="radio"
      inline
    />
    <QBtn type="submit" icon="sym_s_check" color="primary" flat square dense>
      <QTooltip>
        {{ t("priorityForm.tooltip.submit") }}
      </QTooltip>
    </QBtn>
  </QForm>
</template>

<style scoped lang="scss">
.q-select {
  width: 180px;
}
.q-input {
  width: 60px;
}
</style>
