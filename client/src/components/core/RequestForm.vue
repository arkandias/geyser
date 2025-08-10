<script setup lang="ts">
import { useMutation, useQuery } from "@urql/vue";
import { computed, ref, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  DeleteRequestDocument,
  GetRequestDocument,
  RequestFormDataFragmentDoc,
  RequestTypeEnum,
  UpsertRequestDocument,
} from "@/gql/graphql.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";

import NumInput from "@/components/core/NumInput.vue";
import SelectService from "@/components/core/SelectService.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof RequestFormDataFragmentDoc>;
}>();

graphql(`
  fragment RequestFormData on Course {
    oid
    year
    courseId: id
    hoursPerGroup: hoursEffective
  }

  query GetRequest(
    $oid: Int!
    $serviceId: Int!
    $courseId: Int!
    $requestType: RequestTypeEnum!
  ) {
    requests: request(
      where: {
        _and: [
          { oid: { _eq: $oid } }
          { serviceId: { _eq: $serviceId } }
          { courseId: { _eq: $courseId } }
          { type: { _eq: $requestType } }
        ]
      }
    ) {
      oid
      id
      hours
    }
  }

  mutation UpsertRequest(
    $oid: Int!
    $year: Int!
    $serviceId: Int!
    $courseId: Int!
    $requestType: RequestTypeEnum!
    $hours: Float!
  ) {
    insertRequestOne(
      object: {
        oid: $oid
        year: $year
        serviceId: $serviceId
        courseId: $courseId
        type: $requestType
        hours: $hours
      }
      onConflict: {
        constraint: request_oid_service_id_course_id_type_key
        updateColumns: [hours]
      }
    ) {
      oid
      id
    }
  }

  mutation DeleteRequest(
    $oid: Int!
    $serviceId: Int!
    $courseId: Int!
    $requestType: RequestTypeEnum!
  ) {
    deleteRequest(
      where: {
        _and: [
          { oid: { _eq: $oid } }
          { serviceId: { _eq: $serviceId } }
          { courseId: { _eq: $courseId } }
          { type: { _eq: $requestType } }
        ]
      }
    ) {
      returning {
        oid
        id
      }
    }
  }
`);

const { t } = useTypedI18n();
const { notify } = useNotify();
const { currentServiceId: myServiceId } = useProfileStore();
const perm = usePermissions();

const data = computed(() =>
  useFragment(RequestFormDataFragmentDoc, dataFragment),
);

const getRequest = useQuery({
  query: GetRequestDocument,
  variables: () => ({
    oid: data.value.oid,
    serviceId: serviceId.value ?? -1,
    courseId: data.value.courseId,
    requestType: requestType.value ?? RequestTypeEnum.Assignment,
  }),
  pause: true,
  context: { requestPolicy: "network-only" },
});

const upsertRequest = useMutation(UpsertRequestDocument);
const deleteRequest = useMutation(DeleteRequestDocument);

const hours = ref<number | null>(null);
watch(
  data,
  (value) => {
    hours.value = value.hoursPerGroup ?? null;
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

  const current = await getRequest.executeQuery();
  if (!current.data.value?.requests || current.error.value) {
    notify(NotifyType.Error, {
      message: t("requestForm.get.error"),
      caption: current.error.value?.message,
    });
    return;
  }

  if (hours.value === 0) {
    if (!current.data.value.requests.length) {
      notify(NotifyType.Default, {
        message: t("requestForm.delete.noChanges"),
      });
      return;
    }

    const result = await deleteRequest.executeMutation({
      oid: data.value.oid,
      serviceId: serviceId.value,
      courseId: data.value.courseId,
      requestType: requestType.value,
    });

    if (result.data?.deleteRequest?.returning.length && !result.error) {
      notify(NotifyType.Success, {
        message: t("requestForm.delete.success"),
      });
    } else {
      notify(NotifyType.Error, {
        message: t("requestForm.delete.error"),
        caption: result.error?.message,
      });
    }
  } else {
    if (current.data.value.requests[0]?.hours === hours.value) {
      notify(NotifyType.Default, {
        message: t("requestForm.update.noChanges"),
      });
      return;
    }

    const result = await upsertRequest.executeMutation({
      oid: data.value.oid,
      year: data.value.year,
      serviceId: serviceId.value,
      courseId: data.value.courseId,
      requestType: requestType.value,
      hours: hours.value,
    });

    if (result.data?.insertRequestOne && !result.error) {
      notify(NotifyType.Success, {
        message: t("requestForm.update.success"),
      });
    } else {
      notify(NotifyType.Error, {
        message: t("requestForm.update.error"),
        caption: result.error?.message,
      });
    }
  }
};

const resetForm = async (): Promise<void> => {
  const hoursBackup = hours.value;
  hours.value = 0;
  await submitForm();
  hours.value = hoursBackup;
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
    <QBtn type="reset" icon="sym_s_close" color="primary" flat square dense>
      <QTooltip>
        {{ t("requestForm.tooltip.reset") }}
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
