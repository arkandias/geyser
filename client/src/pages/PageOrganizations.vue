<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetOrganizationsDocument } from "@/gql/graphql.ts";

import AdminOrganizations from "@/components/admin/AdminOrganizations.vue";

graphql(`
  query GetOrganizations {
    organizations: organization {
      ...AdminOrganization
    }
  }
`);

const { t } = useTypedI18n();

const getOrganizations = useQuery({
  query: GetOrganizationsDocument,
  context: {
    additionalTypenames: ["All", "Organization"],
  },
});
const fetching = computed(() => getOrganizations.fetching.value);
const organizations = computed(
  () => getOrganizations.data.value?.organizations ?? [],
);
</script>

<template>
  <QPage>
    <QCard flat square>
      <QCardSection class="text-h4 text-center">
        {{ t("admin.organizations.organizations.label") }}
      </QCardSection>
      <QCardSection>
        <AdminOrganizations :fetching :organization-fragments="organizations" />
      </QCardSection>
    </QCard>
  </QPage>
</template>

<style scoped lang="scss"></style>
