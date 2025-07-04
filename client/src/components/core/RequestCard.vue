<script setup lang="ts">
import { useMutation, useQuery } from "@urql/vue";
import { computed } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  DeleteRequestCardDocument,
  GetAssignmentDocument,
  InsertAssignmentDocument,
  RequestCardDataFragmentDoc,
  RequestTypeEnum,
  UpdateAssignmentDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { priorityColor } from "@/utils";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof RequestCardDataFragmentDoc>;
  archive?: boolean;
}>();

graphql(`
  fragment RequestCardData on Request {
    oid
    id
    year
    service {
      id
      teacher {
        displayname
      }
    }
    course {
      id
      hoursPerGroup: hoursEffective
    }
    type
    hours
    isPriority
  }

  query GetAssignment($oid: Int!, $serviceId: Int!, $courseId: Int!) {
    requests: request(
      where: {
        _and: [
          { oid: { _eq: $oid } }
          { serviceId: { _eq: $serviceId } }
          { courseId: { _eq: $courseId } }
          { type: { _eq: ASSIGNMENT } }
        ]
      }
      limit: 1 # unique
    ) {
      oid
      id
      hours
    }
  }

  mutation InsertAssignment(
    $oid: Int!
    $year: Int!
    $serviceId: Int!
    $courseId: Int!
    $hours: Float!
  ) {
    insertRequestOne(
      object: {
        oid: $oid
        year: $year
        serviceId: $serviceId
        courseId: $courseId
        type: ASSIGNMENT
        hours: $hours
      }
    ) {
      oid
      id
    }
  }

  mutation UpdateAssignment($oid: Int!, $id: Int!, $hours: Float!) {
    updateRequestByPk(
      pkColumns: { oid: $oid, id: $id }
      _set: { hours: $hours }
    ) {
      oid
      id
    }
  }

  mutation DeleteRequestCard($oid: Int!, $id: Int!) {
    deleteRequestByPk(oid: $oid, id: $id) {
      oid
      id
    }
  }
`);

const { t, n } = useTypedI18n();
const { notify } = useNotify();
const { organization } = useOrganizationStore();
const perm = usePermissions();

const request = computed(() =>
  useFragment(RequestCardDataFragmentDoc, dataFragment),
);

const getAssignment = useQuery({
  query: GetAssignmentDocument,
  variables: () => ({
    oid: organization.id,
    serviceId: request.value.service.id,
    courseId: request.value.course.id,
  }),
  pause: true,
  context: { requestPolicy: "network-only" },
});
const insertAssignment = useMutation(InsertAssignmentDocument);
const updateAssignment = useMutation(UpdateAssignmentDocument);
const deleteRequestCard = useMutation(DeleteRequestCardDocument);

const groups = computed(() =>
  request.value.course.hoursPerGroup
    ? request.value.hours / request.value.course.hoursPerGroup
    : 0,
);

const displayAssignButton = computed(
  () => (requestType: RequestTypeEnum) =>
    requestType !== RequestTypeEnum.Assignment && perm.toEditAssignments,
);
const displayDeleteButton = computed(
  () => (requestType: RequestTypeEnum) =>
    requestType === RequestTypeEnum.Assignment
      ? perm.toEditAssignments
      : perm.toDeleteRequests,
);
const displayActions = computed(
  () => (requestType: RequestTypeEnum) =>
    displayAssignButton.value(requestType) ||
    displayDeleteButton.value(requestType),
);

const validateRequest = async (): Promise<void> => {
  const result = await getAssignment.executeQuery();

  if (!result.data.value?.requests || result.error.value) {
    notify(NotifyType.Error, {
      message: t("requestCard.validate.error"),
      caption: result.error.value?.message,
    });
    return;
  }

  const assignment = result.data.value.requests[0];

  if (assignment) {
    if (assignment.hours === request.value.hours) {
      notify(NotifyType.Default, {
        message: t("requestCard.validate.identical"),
      });
      return;
    }

    const { data, error } = await updateAssignment.executeMutation({
      oid: assignment.oid,
      id: assignment.id,
      hours: request.value.hours,
    });

    if (data?.updateRequestByPk && !error) {
      notify(NotifyType.Success, {
        message: t("requestCard.validate.updated"),
      });
    } else {
      notify(NotifyType.Error, {
        message: t("requestCard.validate.error"),
        caption: error?.message,
      });
    }
  } else {
    const { data, error } = await insertAssignment.executeMutation({
      oid: request.value.oid,
      year: request.value.year,
      serviceId: request.value.service.id,
      courseId: request.value.course.id,
      hours: request.value.hours,
    });

    if (data?.insertRequestOne && !error) {
      notify(NotifyType.Success, {
        message: t("requestCard.validate.created"),
      });
    } else {
      notify(NotifyType.Error, {
        message: t("requestCard.validate.error"),
        caption: error?.message,
      });
    }
  }
};

const deleteRequest = async (): Promise<void> => {
  const { data, error } = await deleteRequestCard.executeMutation({
    oid: request.value.oid,
    id: request.value.id,
  });

  if (data?.deleteRequestByPk && !error) {
    notify(NotifyType.Success, {
      message: t("requestCard.delete.success"),
    });
  } else {
    notify(NotifyType.Error, {
      message: t("requestCard.delete.error"),
      caption: error?.message,
    });
  }
};
</script>

<template>
  <QCard bordered square class="request-card">
    <QCardSection class="request-card__titre q-pa-xs text-body2">
      <QBadge
        v-if="request.isPriority !== null"
        :color="priorityColor(request.isPriority)"
        rounded
      />
      {{ request.service?.teacher?.displayname }}
      <QTooltip :delay="TOOLTIP_DELAY" anchor="top middle" self="bottom middle">
        {{ request.service?.teacher?.displayname }}
      </QTooltip>
    </QCardSection>
    <QCardSection class="q-pa-xs text-caption">
      {{ n(groups, "decimal") }}
      {{ t("requestCard.group", Math.ceil(groups)) }}
      <br />
      {{ n(request.hours, "decimal") }}
      {{ t("requestCard.hour", Math.ceil(request.hours)) }}
    </QCardSection>
    <QSeparator v-if="!archive && displayActions(request.type)" />
    <QCardActions
      v-if="!archive && displayActions(request.type)"
      align="evenly"
      class="q-pa-xs"
    >
      <QBtn
        v-if="displayAssignButton(request.type)"
        icon="sym_s_check"
        color="positive"
        size="sm"
        flat
        square
        dense
        @click="validateRequest()"
      >
        <QTooltip
          :delay="TOOLTIP_DELAY"
          anchor="bottom middle"
          self="top middle"
        >
          {{ t("requestCard.tooltip.validate") }}
        </QTooltip>
      </QBtn>
      <QBtn
        v-if="displayDeleteButton(request.type)"
        icon="sym_s_close"
        color="negative"
        size="sm"
        flat
        square
        dense
        @click="deleteRequest()"
      >
        <QTooltip
          :delay="TOOLTIP_DELAY"
          anchor="bottom middle"
          self="top middle"
        >
          {{ t("requestCard.tooltip.delete") }}
        </QTooltip>
      </QBtn>
    </QCardActions>
  </QCard>
</template>

<style scoped lang="scss">
.request-card {
  width: 120px;
  text-align: center;
}

.request-card__titre {
  background-color: $grey-3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.body--dark .request-card__titre {
  background-color: $grey-9;
}
</style>
