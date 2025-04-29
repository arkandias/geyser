<script lang="ts">
export type ColName = "degree" | "program" | "name" | "nameShort" | "visible";
</script>

<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type AdminTrackFragment,
  AdminTrackFragmentDoc,
  AdminTracksDegreeFragmentDoc,
  AdminTracksProgramFragmentDoc,
  DeleteTracksDocument,
  InsertTracksDocument,
  TrackConstraint,
  type TrackInsertInput,
  TrackUpdateColumn,
  UpdateTracksDocument,
  UpsertTracksDocument,
} from "@/gql/graphql.ts";
import type {
  NullableParsedRow,
  RowDescriptorExtra,
  Scalar,
} from "@/types/data.ts";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminTrackFragment;
type FlatRow = NullableParsedRow<typeof rowDescriptor>;
type InsertInput = TrackInsertInput;

const { degreeFragments, programFragments, trackFragments } = defineProps<{
  degreeFragments: FragmentType<typeof AdminTracksDegreeFragmentDoc>[];
  programFragments: FragmentType<typeof AdminTracksProgramFragmentDoc>[];
  trackFragments: FragmentType<typeof AdminTrackFragmentDoc>[];
}>();

const { t } = useTypedI18n();

const idKey: keyof Row = "id";
const rowDescriptor = {
  degree: {
    type: "string",
    field: (row) => row.program.degree.name,
    format: (val: string) =>
      degrees.value.find((d) => d.name === val)?.nameDisplay,
    formType: "select",
  },
  program: {
    type: "string",
    field: (row) => row.program.name,
    format: (val: string) =>
      programs.value.find((p) => p.name === val)?.nameDisplay,
    formType: "select",
  },
  name: {
    type: "string",
    formType: "input",
  },
  nameShort: {
    type: "string",
    nullable: true,
    formType: "input",
  },
  visible: {
    type: "boolean",
    formType: "toggle",
  },
} as const satisfies RowDescriptorExtra<ColName, Row>;

graphql(`
  fragment AdminTrack on Track {
    id
    program {
      id
      name
      nameDisplay
      degree {
        name
        nameDisplay
      }
    }
    name
    nameShort
    nameDisplay
    visible
  }

  fragment AdminTracksDegree on Degree {
    id
    name
    nameDisplay
    programs {
      id
      name
    }
  }

  fragment AdminTracksProgram on Program {
    id
    name
    nameDisplay
  }

  mutation InsertTracks($objects: [TrackInsertInput!]!) {
    insertData: insertTrack(objects: $objects) {
      returning {
        id
      }
    }
  }

  mutation UpsertTracks(
    $objects: [TrackInsertInput!]!
    $onConflict: TrackOnConflict
  ) {
    upsertData: insertTrack(objects: $objects, onConflict: $onConflict) {
      returning {
        id
      }
    }
  }

  mutation UpdateTracks($ids: [Int!]!, $changes: TrackSetInput!) {
    updateData: updateTrack(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        id
      }
    }
  }

  mutation DeleteTracks($ids: [Int!]!) {
    deleteData: deleteTrack(where: { id: { _in: $ids } }) {
      returning {
        id
      }
    }
  }
`);

const degrees = computed(() =>
  degreeFragments.map((f) => useFragment(AdminTracksDegreeFragmentDoc, f)),
);
const programs = computed(() =>
  programFragments.map((f) => useFragment(AdminTracksProgramFragmentDoc, f)),
);
const tracks = computed(() =>
  trackFragments.map((f) => useFragment(AdminTrackFragmentDoc, f)),
);
const insertTracks = useMutation(InsertTracksDocument);
const upsertTracks = useMutation(UpsertTracksDocument);
const updateTracks = useMutation(UpdateTracksDocument);
const deleteTracks = useMutation(DeleteTracksDocument);

const importConstraint = TrackConstraint.TrackProgramIdNameKey;
const importUpdateColumns = [
  TrackUpdateColumn.ProgramId,
  TrackUpdateColumn.Name,
  TrackUpdateColumn.NameShort,
  TrackUpdateColumn.Visible,
];

const formatRow = (row: Row) =>
  `${row.nameDisplay} (${row.program.degree.nameDisplay} — ${row.program.nameDisplay})`;

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {};

  // programId
  if (flatRow.degree !== undefined || flatRow.program !== undefined) {
    if (flatRow.program === undefined) {
      throw new Error(
        t("admin.courses.tracks.form.error.updateDegreeWithoutProgram"),
      );
    }
    if (flatRow.degree === undefined) {
      throw new Error(
        t("admin.courses.tracks.form.error.updateProgramWithoutDegree"),
      );
    }
    const degree = degrees.value.find((d) => d.name === flatRow.degree);
    if (degree === undefined) {
      throw new Error(
        t("admin.courses.tracks.form.error.degreeNotFound", flatRow),
      );
    }
    const program = degree.programs.find((p) => p.name === flatRow.program);
    if (program === undefined) {
      throw new Error(
        t("admin.courses.tracks.form.error.programNotFound", flatRow),
      );
    }
    object.programId = program.id;
  }

  if (flatRow.name !== undefined) {
    object.name = flatRow.name;
  }

  if (flatRow.nameShort !== undefined) {
    object.nameShort = flatRow.nameShort;
  }

  if (flatRow.visible !== undefined) {
    object.visible = flatRow.visible;
  }

  return object;
};

const formValues = ref<Record<string, Scalar>>({});
const formOptions = computed(() => ({
  degree: degrees.value.map((d) => d.name),
  program:
    degrees.value
      .find((d) => d.name === formValues.value["degree"])
      ?.programs.map((p) => p.name) ?? [],
}));
const filterOptions = computed(() => ({
  program: programs.value.map((p) => p.name),
}));
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    section="courses"
    name="tracks"
    :id-key
    :row-descriptor
    :rows="tracks"
    :format-row
    :validate-flat-row
    :form-options
    :filter-options
    :insert-data="insertTracks"
    :upsert-data="upsertTracks"
    :update-data="updateTracks"
    :delete-data="deleteTracks"
    :import-constraint
    :import-update-columns
  />
</template>

<style scoped lang="scss"></style>
