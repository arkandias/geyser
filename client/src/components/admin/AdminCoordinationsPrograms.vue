<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminCoordinationProgramFragment,
  AdminCoordinationProgramFragmentDoc,
  AdminCoordinationsProgramsDegreeFragmentDoc,
  AdminCoordinationsProgramsProgramFragmentDoc,
  AdminCoordinationsProgramsTeacherFragmentDoc,
  CoordinationConstraint,
  type CoordinationInsertInput,
  CoordinationUpdateColumn,
  DeleteCoordinationsProgramsDocument,
  InsertCoordinationsProgramsDocument,
  UpdateCoordinationsProgramsDocument,
  UpsertCoordinationsProgramsDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";

import type { AdminCoordinationsProgramsColNames } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminCoordinationProgramFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = CoordinationInsertInput;

const {
  coordinationFragments,
  teacherFragments,
  degreeFragments,
  programFragments,
} = defineProps<{
  coordinationFragments: FragmentType<
    typeof AdminCoordinationProgramFragmentDoc
  >[];
  teacherFragments: FragmentType<
    typeof AdminCoordinationsProgramsTeacherFragmentDoc
  >[];
  degreeFragments: FragmentType<
    typeof AdminCoordinationsProgramsDegreeFragmentDoc
  >[];
  programFragments: FragmentType<
    typeof AdminCoordinationsProgramsProgramFragmentDoc
  >[];
}>();

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

const rowDescriptor = {
  teacherEmail: {
    type: "string",
    field: (row) => row.teacher.email,
    format: (val: string) =>
      teachers.value.find((t) => t.email === val)?.displayname,
    formComponent: "select",
  },
  degreeName: {
    type: "string",
    field: (row) => row.program?.degree.name,
    formComponent: "select",
  },
  programName: {
    type: "string",
    field: (row) => row.program?.name,
    formComponent: "select",
  },
  comment: {
    type: "string",
    formComponent: "input",
  },
} as const satisfies RowDescriptorExtra<
  AdminCoordinationsProgramsColNames,
  Row
>;

graphql(`
  fragment AdminCoordinationProgram on Coordination {
    id
    teacher {
      email
    }
    program {
      name
      degree {
        name
      }
    }
    comment
  }

  fragment AdminCoordinationsProgramsTeacher on Teacher {
    id
    email
    displayname
  }

  fragment AdminCoordinationsProgramsDegree on Degree {
    name
    programs {
      id
      name
    }
  }

  fragment AdminCoordinationsProgramsProgram on Program {
    name
  }

  mutation InsertCoordinationsPrograms($objects: [CoordinationInsertInput!]!) {
    insertData: insertCoordination(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertCoordinationsPrograms(
    $objects: [CoordinationInsertInput!]!
    $onConflict: CoordinationOnConflict
  ) {
    upsertData: insertCoordination(objects: $objects, onConflict: $onConflict) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpdateCoordinationsPrograms(
    $ids: [Int!]!
    $changes: CoordinationSetInput!
  ) {
    updateData: updateCoordination(
      where: { id: { _in: $ids } }
      _set: $changes
    ) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteCoordinationsPrograms($ids: [Int!]!) {
    deleteData: deleteCoordination(where: { id: { _in: $ids } }) {
      returning {
        oid
        id
      }
    }
  }
`);

const coordinations = computed(() =>
  coordinationFragments
    .map((f) => useFragment(AdminCoordinationProgramFragmentDoc, f))
    .filter((c) => c.program),
);
const teachers = computed(() =>
  teacherFragments.map((f) =>
    useFragment(AdminCoordinationsProgramsTeacherFragmentDoc, f),
  ),
);
const degrees = computed(() =>
  degreeFragments.map((f) =>
    useFragment(AdminCoordinationsProgramsDegreeFragmentDoc, f),
  ),
);
const programs = computed(() =>
  programFragments.map((f) =>
    useFragment(AdminCoordinationsProgramsProgramFragmentDoc, f),
  ),
);
const insertCoordinationsPrograms = useMutation(
  InsertCoordinationsProgramsDocument,
);
const upsertCoordinationsPrograms = useMutation(
  UpsertCoordinationsProgramsDocument,
);
const updateCoordinationsPrograms = useMutation(
  UpdateCoordinationsProgramsDocument,
);
const deleteCoordinationsPrograms = useMutation(
  DeleteCoordinationsProgramsDocument,
);

const importConstraint =
  CoordinationConstraint.CoordinationOidTeacherIdCourseIdTrackIdProgramIdKey;
const importUpdateColumns = [
  CoordinationUpdateColumn.Oid,
  CoordinationUpdateColumn.TeacherId,
  CoordinationUpdateColumn.ProgramId,
  CoordinationUpdateColumn.Comment,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  // teacherId
  if (flatRow.teacherEmail !== undefined) {
    const teacher = teachers.value.find(
      (t) => t.email === flatRow.teacherEmail,
    );
    if (teacher === undefined) {
      throw new Error(
        t("admin.coordinations.programs.form.error.teacherNotFound", {
          email: flatRow.teacherEmail,
        }),
      );
    }
    object.teacherId = teacher.id;
  }

  // programId
  if (flatRow.degreeName !== undefined || flatRow.programName !== undefined) {
    if (flatRow.programName === undefined) {
      throw new Error(
        t("admin.coordinations.programs.form.error.updateDegreeWithoutProgram"),
      );
    }
    if (flatRow.degreeName === undefined) {
      throw new Error(
        t("admin.coordinations.programs.form.error.updateProgramWithoutDegree"),
      );
    }
    const degree = degrees.value.find((d) => d.name === flatRow.degreeName);
    if (degree === undefined) {
      throw new Error(
        t("admin.coordinations.programs.form.error.degreeNotFound", flatRow),
      );
    }
    const program = degree.programs.find((p) => p.name === flatRow.programName);
    if (program === undefined) {
      throw new Error(
        t("admin.coordinations.programs.form.error.programNotFound", flatRow),
      );
    }
    object.programId = program.id;
  }

  if (flatRow.comment !== undefined) {
    object.comment = flatRow.comment;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed<SelectOptions<string, Row, typeof rowDescriptor>>(
  () => ({
    teacherEmail: teachers.value.map((t) => ({
      value: t.email,
      label: t.displayname ?? "",
    })),
    degreeName: degrees.value.map((d) => d.name),
    programName:
      degrees.value
        .find((d) => d.name === formValues.value["degreeName"])
        ?.programs.map((p) => p.name) ?? [],
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed<
  SelectOptions<string, Row, typeof rowDescriptor>
>(() => ({
  programName: programs.value.map((p) => p.name),
}));
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="coordinations"
    name="programs"
    :row-descriptor
    :rows="coordinations"
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertCoordinationsPrograms"
    :upsert-data="upsertCoordinationsPrograms"
    :update-data="updateCoordinationsPrograms"
    :delete-data="deleteCoordinationsPrograms"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
