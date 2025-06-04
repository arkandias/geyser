<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useQueryParam } from "@/composables/useQueryParam.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetServiceDetailsDocument } from "@/gql/graphql.ts";
import { useServicesStore } from "@/stores/useServicesStore.ts";

import ServiceDetails from "@/components/service/ServiceDetails.vue";
import ServiceMessage from "@/components/service/ServiceMessage.vue";
import ServicePriorities from "@/components/service/ServicePriorities.vue";
import ServiceRequests from "@/components/service/ServiceRequests.vue";
import ServiceTeacher from "@/components/service/ServiceTeacher.vue";

graphql(`
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
const { serviceId: myServiceId } = useServicesStore();
const { getValue: selectedService } = useQueryParam("serviceId", true);

const serviceId = computed(() => selectedService.value ?? myServiceId.value);

const { data, fetching } = useQuery({
  query: GetServiceDetailsDocument,
  variables: () => ({ id: serviceId.value ?? -1 }),
  pause: () => serviceId.value === null,
  context: {
    additionalTypenames: [
      "All",
      "Coordination",
      "Priority",
      "Request",
      "Service",
      "ServiceModification",
    ],
  },
});

const service = computed(() => data.value?.service ?? null);
</script>

<template>
  <QPage class="column items-center">
    <QCard v-if="serviceId === null" flat square>
      <QCardSection class="text-h4 q-pa-xl">
        {{ t("service.noService") }}
      </QCardSection>
    </QCard>
    <QCard v-else-if="fetching" flat square>
      <QCardSection class="text-h4 q-pa-xl">
        {{ t("service.fetchingService") }}
      </QCardSection>
    </QCard>
    <QCard v-else-if="service" flat square>
      <ServiceTeacher :data-fragment="service.teacher" />
      <ServiceDetails :data-fragment="service" />
      <ServiceRequests :data-fragment="service" />
      <ServicePriorities :data-fragment="service" />
      <ServiceMessage :data-fragment="service" />
    </QCard>
    <QCard v-else flat square>
      <QCardSection class="text-h4 q-pa-xl">
        {{ t("service.serviceNotFound") }}
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
