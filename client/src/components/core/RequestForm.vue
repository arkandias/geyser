<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  DeleteRequestDocument,
  RequestFormDataFragmentDoc,
  RequestTypeEnum,
  UpsertRequestDocument,
} from "@/gql/graphql.ts";
import { useServicesStore } from "@/stores/useServicesStore.ts";

import NumInput from "@/components/core/NumInput.vue";
import SelectService from "@/components/core/SelectService.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof RequestFormDataFragmentDoc>;
}>();

graphql(`
  fragment RequestFormData on Course {
    year: yearValue
    courseId: id
    hoursPerGroup: hoursEffective
  }

  mutation UpsertRequest(
    $year: Int!
    $serviceId: Int!
    $courseId: Int!
    $requestType: RequestTypeEnum!
    $hours: Float!
  ) {
    request: insertRequestOne(
      object: {
        yearValue: $year
        serviceId: $serviceId
        courseId: $courseId
        type: $requestType
        hours: $hours
      }
      onConflict: {
        constraint: request_service_id_course_id_type_key
        updateColumns: [hours]
      }
    ) {
      id
    }
  }

  mutation DeleteRequest(
    $serviceId: Int!
    $courseId: Int!
    $requestType: RequestTypeEnum!
  ) {
    requests: deleteRequest(
      where: {
        _and: [
          { serviceId: { _eq: $serviceId } }
          { courseId: { _eq: $courseId } }
          { type: { _eq: $requestType } }
        ]
      }
    ) {
      returning {
        id
      }
    }
  }
`);

const { t } = useTypedI18n();
const { notify } = useNotify();
const { serviceId: myServiceId } = useServicesStore();
const perm = usePermissions();

const upsertRequest = useMutation(UpsertRequestDocument);
const deleteRequest = useMutation(DeleteRequestDocument);

const data = computed(() =>
  useFragment(RequestFormDataFragmentDoc, dataFragment),
);

const hours = ref<number | null>(null);
watch(
  () => data.value.hoursPerGroup,
  (value) => {
    hours.value = value ?? null;
  },
  { immediate: true },
);

const groups = computed<number | null>({
  get: () =>
    hours.value === null || data.value.hoursPerGroup == null
      ? null
      : Math.round(
          (hours.value / data.value.hoursPerGroup + Number.EPSILON) * 100,
        ) / 100,
  set: (newValue) => {
    hours.value =
      newValue === null || data.value.hoursPerGroup == null
        ? null
        : newValue * data.value.hoursPerGroup;
  },
});

const requestType = ref<RequestTypeEnum | null>(null);
const requestTypeInit = computed(() =>
  perm.toEditAssignments
    ? RequestTypeEnum.Assignment
    : perm.toSubmitRequests
      ? RequestTypeEnum.Primary
      : null,
);
const requestTypeOptions = computed(() => [
  ...(perm.toEditAssignments
    ? [
        {
          value: RequestTypeEnum.Assignment,
          label: t("requestForm.field.requestType.assignment"),
        },
      ]
    : []),
  ...(perm.toSubmitRequests
    ? [
        {
          value: RequestTypeEnum.Primary,
          label: t("requestForm.field.requestType.primary"),
        },
        {
          value: RequestTypeEnum.Secondary,
          label: t("requestForm.field.requestType.secondary"),
        },
      ]
    : []),
]);
watch(
  requestTypeInit,
  (value) => {
    requestType.value = value;
  },
  { immediate: true },
);

const displayServiceSelection = computed(
  () => perm.toSubmitRequestsForOthers || perm.toEditAssignments,
);

const serviceId = ref<number | null>(null);
const serviceIdInit = computed(() =>
  displayServiceSelection.value ? null : myServiceId.value,
);
watch(
  serviceIdInit,
  (value) => {
    serviceId.value = value;
  },
  { immediate: true },
);

const submitForm = async (): Promise<void> => {
  if (serviceId.value === null) {
    notify(NotifyType.Error, {
      message: t("requestForm.invalid.message"),
      caption: t("requestForm.invalid.caption.service"),
    });
    return;
  }
  if (hours.value === null || hours.value < 0) {
    notify(NotifyType.Error, {
      message: t("requestForm.invalid.message"),
      caption: t("requestForm.invalid.caption.hours"),
    });
    return;
  }
  if (requestType.value === null) {
    notify(NotifyType.Error, {
      message: t("requestForm.invalid.message"),
      caption: t("requestForm.invalid.caption.type"),
    });
    return;
  }

  if (hours.value === 0) {
    const result = await deleteRequest.executeMutation({
      serviceId: serviceId.value,
      courseId: data.value.courseId,
      requestType: requestType.value,
    });

    if (result.data?.requests?.returning && !result.error) {
      notify(NotifyType.Success, {
        message: t("requestForm.success"),
      });
    } else {
      notify(NotifyType.Error, {
        message: t("requestForm.error"),
        caption: result.error?.message,
      });
    }
  } else {
    const result = await upsertRequest.executeMutation({
      year: data.value.year,
      serviceId: serviceId.value,
      courseId: data.value.courseId,
      requestType: requestType.value,
      hours: hours.value,
    });

    if (result.data?.request && !result.error) {
      notify(NotifyType.Success, {
        message: t("requestForm.success"),
      });
    } else {
      notify(NotifyType.Error, {
        message: t("requestForm.error"),
        caption: result.error?.message,
      });
    }
  }
};

const resetForm = (): void => {
  serviceId.value = serviceIdInit.value;
  hours.value = data.value.hoursPerGroup ?? null;
  requestType.value = requestTypeInit.value;
};
</script>

<template>
  <QForm
    class="row q-gutter-md text-body2"
    @submit="submitForm"
    @reset="resetForm"
  >
    <SelectService
      v-if="displayServiceSelection"
      v-model="serviceId"
      dense
      options-dense
    />
    <NumInput v-model="groups" :label="t('requestForm.field.groups')" />
    <NumInput v-model="hours" :label="t('requestForm.field.hours')" />
    <QOptionGroup
      v-model="requestType"
      :options="requestTypeOptions"
      type="radio"
      inline
    />
    <QBtn type="submit" icon="sym_s_check" color="primary" flat square dense>
      <QTooltip>
        {{ t("requestForm.tooltip.submit") }}
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
