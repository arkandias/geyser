<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed, inject } from "vue";

import { useQueryParam } from "@/composables/useQueryParam.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetServiceDetailsDocument } from "@/gql/graphql.ts";
import type { AuthManager } from "@/services/auth.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";

import ServiceDetails from "@/components/service/ServiceDetails.vue";
import ServiceMessage from "@/components/service/ServiceMessage.vue";
import ServicePriorities from "@/components/service/ServicePriorities.vue";
import ServiceRequests from "@/components/service/ServiceRequests.vue";
import ServiceTeacher from "@/components/service/ServiceTeacher.vue";

graphql(`
  query GetServiceDetails($oid: Int!, $id: Int!) {
    service: serviceByPk(oid: $oid, id: $id) {
      teacher {
        ...ServiceTeacher
      }
      ...ServiceDetails
      ...ServiceRequests
      ...ServicePriorities
      ...ServiceMessage
    }
  }
`);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const authManager = inject<AuthManager>("authManager")!;
const { t } = useTypedI18n();
const { currentServiceId: myServiceId } = useProfileStore();
const { getValue: selectedService } = useQueryParam("serviceId", true);

const serviceId = computed(() => selectedService.value ?? myServiceId.value);

const getServiceDetails = useQuery({
  query: GetServiceDetailsDocument,
  variables: () => ({
    oid: authManager.orgId,
    id: serviceId.value ?? -1,
  }),
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
const fetching = computed(() => getServiceDetails.fetching.value);
const service = computed(() => getServiceDetails.data.value?.service ?? null);
</script>

<template>
  <QPage class="column items-center">
    <QCard v-if="fetching" flat square>
      <QCardSection class="text-h4 q-pa-xl">
        {{ t("service.fetching") }}
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
