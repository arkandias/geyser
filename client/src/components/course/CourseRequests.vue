<script setup lang="ts">
import { computed } from "vue";

import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { CourseRequestsFragmentDoc, RequestTypeEnum } from "@/gql/graphql.ts";
import { requestTypeLabel } from "@/locales/helpers.ts";

import DetailsSection from "@/components/core/DetailsSection.vue";
import DetailsSubsection from "@/components/core/DetailsSubsection.vue";
import RequestCard from "@/components/core/RequestCard.vue";
import RequestForm from "@/components/core/RequestForm.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof CourseRequestsFragmentDoc>;
}>();

graphql(`
  fragment CourseRequests on Course {
    ...RequestFormData

    requests(orderBy: [{ service: { teacher: { displayname: ASC } } }]) {
      id
      type
      ...RequestCardData
    }
  }
`);

const { t } = useTypedI18n();
const perm = usePermissions();

const data = computed(() =>
  useFragment(CourseRequestsFragmentDoc, dataFragment),
);

const requestsByType = computed(() =>
  (perm.toViewAssignments
    ? [
        RequestTypeEnum.Assignment,
        RequestTypeEnum.Primary,
        RequestTypeEnum.Secondary,
      ]
    : [RequestTypeEnum.Primary, RequestTypeEnum.Secondary]
  ).map((value) => ({
    value,
    label: requestTypeLabel(t, value, 2),
    requests: data.value.requests.filter((r) => r.type === value),
  })),
);
</script>

<template>
  <DetailsSection :title="t('courses.details.requests.title')">
    <DetailsSubsection v-if="perm.toSubmitRequests || perm.toEditAssignments">
      <RequestForm :data-fragment="data" />
    </DetailsSubsection>
    <DetailsSubsection
      v-for="opt in requestsByType"
      :key="opt.value"
      :title="opt.label"
    >
      <QCardSection class="row q-gutter-xs">
        <RequestCard v-for="r in opt.requests" :key="r.id" :data-fragment="r" />
      </QCardSection>
    </DetailsSubsection>
  </DetailsSection>
</template>

<style scoped lang="scss"></style>
