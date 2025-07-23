<script lang="ts">
export const adminServicesMessagesColNames = [
  "year",
  "teacherEmail",
  "content",
] as const;

export type AdminServicesMessagesColName =
  (typeof adminServicesMessagesColNames)[number];
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminMessageFragment,
  AdminMessageFragmentDoc,
  AdminMessagesServiceFragmentDoc,
  AdminMessagesTeacherFragmentDoc,
  DeleteMessagesDocument,
  InsertMessagesDocument,
  MessageConstraint,
  type MessageInsertInput,
  MessageUpdateColumn,
  UpdateMessagesDocument,
  UpsertMessagesDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  AdminColumns,
  NullableParsedRow,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminMessageFragment;
type FlatRow = NullableParsedRow<typeof adminColumns>;
type InsertInput = MessageInsertInput;

const { messageFragments, serviceFragments, teacherFragments } = defineProps<{
  fetching: boolean;
  messageFragments: FragmentType<typeof AdminMessageFragmentDoc>[];
  serviceFragments: FragmentType<typeof AdminMessagesServiceFragmentDoc>[];
  teacherFragments: FragmentType<typeof AdminMessagesTeacherFragmentDoc>[];
}>();

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();
const { years } = useYearsStore();

const adminColumns = {
  year: {
    type: "number",
    field: (row) => row.service.year,
    formComponent: "select",
  },
  teacherEmail: {
    type: "string",
    field: (row) => row.service.teacher.email,
    format: (val: string) =>
      teachers.value.find((t) => t.email === val)?.displayname,
    formComponent: "select",
  },
  content: {
    type: "string",
    formComponent: "input",
    inputType: "textarea",
  },
} as const satisfies AdminColumns<AdminServicesMessagesColName, Row>;

graphql(`
  fragment AdminMessage on Message {
    id
    service {
      year
      teacher {
        email
      }
    }
    content
  }

  fragment AdminMessagesService on Service {
    id
    year
    teacher {
      email
      displayname
    }
  }

  fragment AdminMessagesTeacher on Teacher {
    email
    displayname
  }

  mutation InsertMessages($objects: [MessageInsertInput!]!) {
    insertData: insertMessage(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertMessages(
    $objects: [MessageInsertInput!]!
    $onConflict: MessageOnConflict
  ) {
    upsertData: insertMessage(objects: $objects, onConflict: $onConflict) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateMessages($ids: [Int!]!, $changes: MessageSetInput!) {
    updateData: updateMessage(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteMessages($ids: [Int!]!) {
    deleteData: deleteMessage(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const messages = computed(() =>
  messageFragments.map((f) => useFragment(AdminMessageFragmentDoc, f)),
);
const services = computed(() =>
  serviceFragments.map((f) => useFragment(AdminMessagesServiceFragmentDoc, f)),
);
const teachers = computed(() =>
  teacherFragments.map((f) => useFragment(AdminMessagesTeacherFragmentDoc, f)),
);
const insertMessages = useMutation(InsertMessagesDocument);
const upsertMessages = useMutation(UpsertMessagesDocument);
const updateMessages = useMutation(UpdateMessagesDocument);
const deleteMessages = useMutation(DeleteMessagesDocument);

const importConstraint = MessageConstraint.MessagePkey;
const importUpdateColumns = [
  MessageUpdateColumn.ServiceId,
  MessageUpdateColumn.Content,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  // serviceId
  if (flatRow.year !== undefined || flatRow.teacherEmail !== undefined) {
    if (flatRow.year === undefined || flatRow.teacherEmail === undefined) {
      throw new Error(
        t("admin.services.messages.form.error.updateServiceMissingFields"),
      );
    }
    object.serviceId = services.value.find(
      (s) =>
        s.year === flatRow.year && s.teacher.email === flatRow.teacherEmail,
    )?.id;
    if (object.serviceId === undefined) {
      throw new Error(
        t("admin.services.messages.form.error.serviceNotFound", flatRow),
      );
    }
  }

  if (flatRow.content !== undefined) {
    if (flatRow.content === null) {
      throw new Error(t("admin.services.messages.form.error.noContent"));
    }
    object.content = flatRow.content;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    year: years.value.map((y) => y.value),
    teacherEmail: services.value
      .filter((s) => s.year === formValues.value["year"])
      .map((s) => ({
        value: s.teacher.email,
        label: s.teacher.displayname ?? "",
      })),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    teacherEmail: teachers.value.map((t) => ({
      value: t.email,
      label: t.displayname ?? "",
    })),
  }),
);
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="services"
    name="messages"
    :admin-columns
    :rows="messages"
    :fetching
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertMessages"
    :upsert-data="upsertMessages"
    :update-data="updateMessages"
    :delete-data="deleteMessages"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
