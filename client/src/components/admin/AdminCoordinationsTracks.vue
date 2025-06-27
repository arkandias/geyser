<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminCoordinationTrackFragment,
  AdminCoordinationTrackFragmentDoc,
  AdminCoordinationsTracksDegreeFragmentDoc,
  AdminCoordinationsTracksProgramFragmentDoc,
  AdminCoordinationsTracksTeacherFragmentDoc,
  AdminCoordinationsTracksTrackFragmentDoc,
  CoordinationConstraint,
  type CoordinationInsertInput,
  CoordinationUpdateColumn,
  DeleteCoordinationsTracksDocument,
  InsertCoordinationsTracksDocument,
  UpdateCoordinationsTracksDocument,
  UpsertCoordinationsTracksDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";

import type { AdminCoordinationsTracksColNames } from "@/components/admin/col-names.ts";
import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminCoordinationTrackFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = CoordinationInsertInput;

const {
  coordinationFragments,
  teacherFragments,
  degreeFragments,
  programFragments,
  trackFragments,
} = defineProps<{
  fetching: boolean;
  coordinationFragments: FragmentType<
    typeof AdminCoordinationTrackFragmentDoc
  >[];
  teacherFragments: FragmentType<
    typeof AdminCoordinationsTracksTeacherFragmentDoc
  >[];
  degreeFragments: FragmentType<
    typeof AdminCoordinationsTracksDegreeFragmentDoc
  >[];
  programFragments: FragmentType<
    typeof AdminCoordinationsTracksProgramFragmentDoc
  >[];
  trackFragments: FragmentType<
    typeof AdminCoordinationsTracksTrackFragmentDoc
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
    field: (row) => row.track?.program.degree.name,
    formComponent: "select",
  },
  programName: {
    type: "string",
    field: (row) => row.track?.program.name,
    formComponent: "select",
  },
  trackName: {
    type: "string",
    field: (row) => row.track?.name,
    formComponent: "select",
  },
  comment: {
    type: "string",
    formComponent: "input",
  },
} as const satisfies RowDescriptorExtra<AdminCoordinationsTracksColNames, Row>;

graphql(`
  fragment AdminCoordinationTrack on Coordination {
    id
    teacher {
      email
    }
    track {
      name
      program {
        name
        degree {
          name
        }
      }
    }
    comment
  }

  fragment AdminCoordinationsTracksTeacher on Teacher {
    id
    email
    displayname
  }

  fragment AdminCoordinationsTracksDegree on Degree {
    name
    programs {
      name
      tracks {
        id
        name
      }
    }
  }

  fragment AdminCoordinationsTracksProgram on Program {
    name
  }

  fragment AdminCoordinationsTracksTrack on Track {
    name
  }

  mutation InsertCoordinationsTracks($objects: [CoordinationInsertInput!]!) {
    insertData: insertCoordination(objects: $objects) {
      returning {
        oid
        id
      }
    }
  }

  mutation UpsertCoordinationsTracks(
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

  mutation UpdateCoordinationsTracks(
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

  mutation DeleteCoordinationsTracks($ids: [Int!]!) {
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
    .map((f) => useFragment(AdminCoordinationTrackFragmentDoc, f))
    .filter((c) => c.track),
);
const teachers = computed(() =>
  teacherFragments.map((f) =>
    useFragment(AdminCoordinationsTracksTeacherFragmentDoc, f),
  ),
);
const degrees = computed(() =>
  degreeFragments.map((f) =>
    useFragment(AdminCoordinationsTracksDegreeFragmentDoc, f),
  ),
);
const programs = computed(() =>
  programFragments.map((f) =>
    useFragment(AdminCoordinationsTracksProgramFragmentDoc, f),
  ),
);
const tracks = computed(() =>
  trackFragments.map((f) =>
    useFragment(AdminCoordinationsTracksTrackFragmentDoc, f),
  ),
);
const insertCoordinationsTracks = useMutation(
  InsertCoordinationsTracksDocument,
);
const upsertCoordinationsTracks = useMutation(
  UpsertCoordinationsTracksDocument,
);
const updateCoordinationsTracks = useMutation(
  UpdateCoordinationsTracksDocument,
);
const deleteCoordinationsTracks = useMutation(
  DeleteCoordinationsTracksDocument,
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
        t("admin.coordinations.tracks.form.error.teacherNotFound", {
          email: flatRow.teacherEmail,
        }),
      );
    }
    object.teacherId = teacher.id;
  }

  // trackId
  if (
    flatRow.degreeName !== undefined ||
    flatRow.programName !== undefined ||
    flatRow.trackName !== undefined
  ) {
    if (flatRow.degreeName === undefined) {
      throw new Error(
        t(
          "admin.coordinations.tracks.form.error.updateProgramOrTrackWithoutDegree",
        ),
      );
    }
    if (flatRow.programName === undefined) {
      throw new Error(
        t(
          "admin.coordinations.tracks.form.error.updateDegreeOrTrackWithoutProgram",
        ),
      );
    }
    if (flatRow.trackName === undefined) {
      throw new Error(
        t(
          "admin.coordinations.tracks.form.error.updateDegreeOrProgramWithoutTrack",
        ),
      );
    }
    const degree = degrees.value.find((d) => d.name === flatRow.degreeName);
    if (degree === undefined) {
      throw new Error(
        t("admin.coordinations.tracks.form.error.degreeNotFound", flatRow),
      );
    }
    const program = degree.programs.find((p) => p.name === flatRow.programName);
    if (program === undefined) {
      throw new Error(
        t("admin.coordinations.tracks.form.error.programNotFound", flatRow),
      );
    }
    const track = program.tracks.find((t) => t.name === flatRow.trackName);
    if (track === undefined) {
      throw new Error(
        t("admin.coordinations.tracks.form.error.trackNotFound", flatRow),
      );
    }
    object.trackId = track.id;
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
    trackName:
      degrees.value
        .find((d) => d.name === formValues.value["degreeName"])
        ?.programs.find((p) => p.name === formValues.value["programName"])
        ?.tracks.map((t) => t.name) ?? [],
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed<
  SelectOptions<string, Row, typeof rowDescriptor>
>(() => ({
  programName: programs.value.map((p) => p.name),
  trackName: tracks.value.map((t) => t.name),
}));
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="coordinations"
    name="tracks"
    :row-descriptor
    :rows="coordinations"
    :fetching
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertCoordinationsTracks"
    :upsert-data="upsertCoordinationsTracks"
    :update-data="updateCoordinationsTracks"
    :delete-data="deleteCoordinationsTracks"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
