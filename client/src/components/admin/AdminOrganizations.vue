<script lang="ts">
export const adminOrganizationsColNames = [
  "key",
  "label",
  "sublabel",
  "email",
  "locale",
  "privateService",
  "active",
] as const;

export type AdminOrganizationsColName =
  (typeof adminOrganizationsColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminOrganizationFragment,
  AdminOrganizationFragmentDoc,
  DeleteOrganizationsDocument,
  InsertOrganizationsDocument,
  OrganizationConstraint,
  type OrganizationInsertInput,
  OrganizationUpdateColumn,
  UpdateOrganizationsDocument,
  UpsertOrganizationsDocument,
} from "@/gql/graphql.ts";
import { localeLabels } from "@/services/i18n.ts";
import type {
  AdminColumns,
  ParsedRow,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";
import { isLocale } from "@/utils";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminOrganizationFragment;
type FlatRow = Partial<ParsedRow<typeof adminColumns>>;
type InsertInput = OrganizationInsertInput;

const { organizationFragments } = defineProps<{
  fetching: boolean;
  organizationFragments: FragmentType<typeof AdminOrganizationFragmentDoc>[];
}>();

const { t } = useTypedI18n();

const adminColumns = {
  key: {
    type: "string",
    formComponent: "input",
    inputType: "text",
  },
  label: {
    type: "string",
    formComponent: "input",
    inputType: "text",
  },
  sublabel: {
    type: "string",
    nullable: true,
    formComponent: "input",
    inputType: "text",
  },
  email: {
    type: "string",
    formComponent: "input",
    inputType: "text",
  },
  locale: {
    type: "string",
    formComponent: "select",
  },
  privateService: {
    type: "boolean",
    formComponent: "toggle",
  },
  active: {
    type: "boolean",
    formComponent: "toggle",
  },
} as const satisfies AdminColumns<AdminOrganizationsColName, Row>;

graphql(`
  fragment AdminOrganization on Organization {
    id
    key
    label
    sublabel
    email
    locale
    privateService
    active
  }

  mutation InsertOrganizations($objects: [OrganizationInsertInput!]!) {
    insertData: insertOrganization(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertOrganizations(
    $objects: [OrganizationInsertInput!]!
    $onConflict: OrganizationOnConflict
  ) {
    upsertData: insertOrganization(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdateOrganizations($ids: [Int!]!, $changes: OrganizationSetInput!) {
    updateData: updateOrganization(
      where: { id: { _in: $ids } }
      _set: $changes
    ) {
      returning {
        id
      }
    }
  }

  mutation DeleteOrganizations($ids: [Int!]!) {
    deleteData: deleteOrganization(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const organizations = computed(() =>
  organizationFragments.map((f) =>
    useFragment(AdminOrganizationFragmentDoc, f),
  ),
);
const insertOrganizations = useMutation(InsertOrganizationsDocument);
const upsertOrganizations = useMutation(UpsertOrganizationsDocument);
const updateOrganizations = useMutation(UpdateOrganizationsDocument);
const deleteOrganizations = useMutation(DeleteOrganizationsDocument);

const importConstraint = OrganizationConstraint.OrganizationKeyKey;
const importUpdateColumns = [
  OrganizationUpdateColumn.Key,
  OrganizationUpdateColumn.Label,
  OrganizationUpdateColumn.Sublabel,
  OrganizationUpdateColumn.Email,
  OrganizationUpdateColumn.Locale,
  OrganizationUpdateColumn.PrivateService,
  OrganizationUpdateColumn.Active,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  if (flatRow.key !== undefined) {
    object.key = flatRow.key;
  }

  if (flatRow.label !== undefined) {
    object.label = flatRow.label;
  }

  if (flatRow.sublabel !== undefined) {
    object.sublabel = flatRow.sublabel;
  }

  if (flatRow.email !== undefined) {
    object.email = flatRow.email;
  }

  if (flatRow.locale !== undefined) {
    const locale = flatRow.locale.toUpperCase();
    if (!isLocale(locale)) {
      throw new Error(
        t(
          "admin.organizations.organizations.form.error.localeNotFound",
          flatRow.locale,
        ),
      );
    }
    object.locale = locale;
  }

  if (flatRow.privateService !== undefined) {
    object.privateService = flatRow.privateService;
  }

  if (flatRow.active !== undefined) {
    object.active = flatRow.active;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    locale: Object.entries(localeLabels).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="organizations"
    name="organizations"
    :admin-columns
    :rows="organizations"
    :fetching
    :validate-flat-row
    :form-options
    :insert-data="insertOrganizations"
    :upsert-data="upsertOrganizations"
    :update-data="updateOrganizations"
    :delete-data="deleteOrganizations"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
