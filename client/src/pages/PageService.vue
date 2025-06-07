<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useQueryParam } from "@/composables/useQueryParam.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import {
  GetServiceDetailsDocument,
  GetTeacherDetailsDocument,
} from "@/gql/graphql.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";

import ServiceDetails from "@/components/service/ServiceDetails.vue";
import ServiceMessage from "@/components/service/ServiceMessage.vue";
import ServicePriorities from "@/components/service/ServicePriorities.vue";
import ServiceRequests from "@/components/service/ServiceRequests.vue";
import ServiceTeacher from "@/components/service/ServiceTeacher.vue";

graphql(`
  query GetTeacherDetails($id: Int!) {
    teacher: teacherByPk(id: $id) {
      ...ServiceTeacher
    }
  }

  query GetServiceDetails($id: Int!) {
    service: serviceByPk(id: $id) {
      teacher {
        ...ServiceTeacher
      }
      ...TeacherServiceDetails
      ...TeacherServiceRequests
      ...TeacherServicePriorities
      ...TeacherServiceMessage
    }
  }
`);

const { t } = useTypedI18n();
const { profile, currentServiceId: myServiceId } = useProfileStore();
const { getValue: selectedService } = useQueryParam("serviceId", true);

const serviceId = computed(() => selectedService.value ?? myServiceId.value);

const getServiceDetails = useQuery({
  query: GetServiceDetailsDocument,
  variables: () => ({ id: serviceId.value ?? -1 }),
  pause: () => serviceId.value === null,
  context: {
    additionalTypenames: [
      "All",
      "Coordination",
      "Message",
      "Priority",
      "Request",
      "Service",
      "ServiceModification",
    ],
  },
});
const service = computed(() => getServiceDetails.data.value?.service ?? null);

const getTeacherDetails = useQuery({
  query: GetTeacherDetailsDocument,
  variables: () => ({ id: profile.value.id }),
  pause: () => serviceId.value !== null,
  context: {
    additionalTypenames: ["All", "Coordination"],
  },
});

const fetching = computed(
  () => getServiceDetails.fetching.value || getTeacherDetails.fetching.value,
);
const teacher = computed(
  () => service.value?.teacher ?? getTeacherDetails.data.value?.teacher ?? null,
);
</script>

<template>
  <QPage class="column items-center">
    <QCard v-if="fetching" flat square>
      <QCardSection class="text-h4 q-pa-xl">
        {{ t("service.fetching") }}
      </QCardSection>
    </QCard>
    <QCard v-else-if="teacher" flat square>
      <ServiceTeacher :data-fragment="teacher" />
      <template v-if="service">
        <ServiceDetails :data-fragment="service" />
        <ServiceRequests :data-fragment="service" />
        <ServicePriorities :data-fragment="service" />
        <ServiceMessage :data-fragment="service" />
      </template>
    </QCard>
    <QCard v-else flat square>
      <QCardSection class="text-h4 q-pa-xl">
        {{ t("service.notFound") }}
      </QCardSection>
    </QCard>
  </QPage>
</template>

<style scoped lang="scss">
.q-card {
  width: $page-service-width;
}
:deep(.q-card__section) {
  text-align: center;
}
</style>
