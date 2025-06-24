<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminServiceModificationFragment,
  AdminServiceModificationFragmentDoc,
  AdminServiceModificationsServiceFragmentDoc,
  AdminServiceModificationsServiceModificationTypeFragmentDoc,
  AdminServiceModificationsTeacherFragmentDoc,
  DeleteServiceModificationsDocument,
  InsertServiceModificationsDocument,
  ServiceModificationConstraint,
  type ServiceModificationInsertInput,
  ServiceModificationUpdateColumn,
  UpdateServiceModificationsDocument,
  UpsertServiceModificationsDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";

import type { AdminTeachersServiceModificationsColName } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminServiceModificationFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = ServiceModificationInsertInput;

const {
  serviceFragments,
  serviceModificationFragments,
  serviceModificationTypeFragments,
  teacherFragments,
} = defineProps<{
  serviceFragments: FragmentType<
    typeof AdminServiceModificationsServiceFragmentDoc
  >[];
  serviceModificationFragments: FragmentType<
    typeof AdminServiceModificationFragmentDoc
  >[];
  serviceModificationTypeFragments: FragmentType<
    typeof AdminServiceModificationsServiceModificationTypeFragmentDoc
  >[];
  teacherFragments: FragmentType<
    typeof AdminServiceModificationsTeacherFragmentDoc
  >[];
}>();

const { t, n } = useTypedI18n();
const { organization } = useOrganizationStore();
const { years } = useYearsStore();

const rowDescriptor = {
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
  typeLabel: {
    type: "string",
    field: (row) => row.type.label,
    formComponent: "select",
  },
  hours: {
    type: "number",
    format: (val: number) => n(val, "decimalFixed"),
    formComponent: "input",
    inputType: "number",
  },
} as const satisfies RowDescriptorExtra<
  AdminTeachersServiceModificationsColName,
  Row
>;

graphql(`
  fragment AdminServiceModification on ServiceModification {
    id
    service {
      year
      teacher {
        email
        displayname
      }
    }
    type {
      label
    }
    hours
  }

  fragment AdminServiceModificationsServiceModificationType on ServiceModificationType {
    id
    label
  }

  fragment AdminServiceModificationsService on Service {
    id
    year
    teacher {
      email
      displayname
    }
  }

  fragment AdminServiceModificationsTeacher on Teacher {
    email
    displayname
  }

  mutation InsertServiceModifications(
    $objects: [ServiceModificationInsertInput!]!
  ) {
    insertData: insertServiceModification(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertServiceModifications(
    $objects: [ServiceModificationInsertInput!]!
    $onConflict: ServiceModificationOnConflict
  ) {
    upsertData: insertServiceModification(
      objects: $objects
      onConflict: $onConflict
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateServiceModifications(
    $ids: [Int!]!
    $changes: ServiceModificationSetInput!
  ) {
    updateData: updateServiceModification(
      where: { id: { _in: $ids } }
      _set: $changes
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteServiceModifications($ids: [Int!]!) {
    deleteData: deleteServiceModification(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const services = computed(() =>
  serviceFragments.map((f) =>
    useFragment(AdminServiceModificationsServiceFragmentDoc, f),
  ),
);
const serviceModifications = computed(() =>
  serviceModificationFragments.map((f) =>
    useFragment(AdminServiceModificationFragmentDoc, f),
  ),
);
const serviceModificationTypes = computed(() =>
  serviceModificationTypeFragments.map((f) =>
    useFragment(AdminServiceModificationsServiceModificationTypeFragmentDoc, f),
  ),
);
const teachers = computed(() =>
  teacherFragments.map((f) =>
    useFragment(AdminServiceModificationsTeacherFragmentDoc, f),
  ),
);
const insertServiceModifications = useMutation(
  InsertServiceModificationsDocument,
);
const upsertServiceModifications = useMutation(
  UpsertServiceModificationsDocument,
);
const updateServiceModifications = useMutation(
  UpdateServiceModificationsDocument,
);
const deleteServiceModifications = useMutation(
  DeleteServiceModificationsDocument,
);

const importConstraint = ServiceModificationConstraint.ServiceModificationPkey;
const importUpdateColumns = [
  ServiceModificationUpdateColumn.Oid,
  ServiceModificationUpdateColumn.ServiceId,
  ServiceModificationUpdateColumn.TypeId,
  ServiceModificationUpdateColumn.Hours,
];

const formatRow = (row: Row): string =>
  `${row.service.year} — ${row.service.teacher.displayname} — ${row.type.label}`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  // serviceId
  if (flatRow.year !== undefined || flatRow.teacherEmail !== undefined) {
    if (flatRow.teacherEmail === undefined) {
      throw new Error(
        t(
          "admin.teachers.serviceModifications.form.error.updateYearWithoutTeacher",
        ),
      );
    }
    if (flatRow.year === undefined) {
      throw new Error(
        t(
          "admin.teachers.serviceModifications.form.error.updateTeacherWithoutYear",
        ),
      );
    }
    object.serviceId = services.value.find(
      (s) =>
        s.year === flatRow.year && s.teacher.email === flatRow.teacherEmail,
    )?.id;
    if (object.serviceId === undefined) {
      throw new Error(
        t(
          "admin.teachers.serviceModifications.form.error.serviceNotFound",
          flatRow,
        ),
      );
    }
  }

  // typeId
  if (flatRow.typeLabel !== undefined) {
    const type = serviceModificationTypes.value.find(
      (smt) => smt.label === flatRow.typeLabel,
    );
    if (type === undefined) {
      throw new Error(
        t(
          "admin.teachers.serviceModifications.form.error.typeNotFound",
          flatRow,
        ),
      );
    }
    object.typeId = type.id;
  }

  if (flatRow.hours !== undefined) {
    if (flatRow.hours === null || flatRow.hours < 0) {
      throw new Error(
        t("admin.teachers.serviceModifications.form.error.hoursNegative"),
      );
    }
    object.hours = flatRow.hours;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed<SelectOptions<string, Row, typeof rowDescriptor>>(
  () => ({
    year: years.value.map((y) => y.value),
    teacherEmail: teachers.value.map((t) => ({
      value: t.email,
      label: t.displayname ?? "",
    })),
    typeLabel: serviceModificationTypes.value.map((smt) => smt.label),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="teachers"
    name="serviceModifications"
    :row-descriptor
    :rows="serviceModifications"
    :format-row
    :validate-flat-row
    :form-options
    :insert-data="insertServiceModifications"
    :upsert-data="upsertServiceModifications"
    :update-data="updateServiceModifications"
    :delete-data="deleteServiceModifications"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
