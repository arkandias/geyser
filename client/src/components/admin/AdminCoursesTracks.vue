<script lang="ts">
export const adminCoursesTracksColNames = [
  "degreeName",
  "programName",
  "name",
  "nameShort",
  "visible",
] as const;

export type AdminCoursesTracksColName =
  (typeof adminCoursesTracksColNames)[number];
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
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import type {
  AdminColumns,
  ParsedRow,
  Scalar,
  SelectOptions,
} from "@/types/data.ts";
import { unique } from "@/utils";

import AdminData from "@/components/admin/core/AdminData.vue";

type Row = AdminTrackFragment;
type FlatRow = Partial<ParsedRow<typeof adminColumns>>;
type InsertInput = TrackInsertInput;

const { degreeFragments, programFragments, trackFragments } = defineProps<{
  fetching: boolean;
  degreeFragments: FragmentType<typeof AdminTracksDegreeFragmentDoc>[];
  programFragments: FragmentType<typeof AdminTracksProgramFragmentDoc>[];
  trackFragments: FragmentType<typeof AdminTrackFragmentDoc>[];
}>();

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

const adminColumns = {
  degreeName: {
    type: "string",
    field: (row) => row.program.degree.name,
    formComponent: "select",
  },
  programName: {
    type: "string",
    field: (row) => row.program.name,
    formComponent: "select",
  },
  name: {
    type: "string",
    formComponent: "input",
    inputType: "text",
  },
  nameShort: {
    type: "string",
    nullable: true,
    formComponent: "input",
    inputType: "text",
  },
  visible: {
    type: "boolean",
    formComponent: "toggle",
  },
} as const satisfies AdminColumns<AdminCoursesTracksColName, Row>;

graphql(`
  fragment AdminTrack on Track {
    id
    program {
      name
      degree {
        name
      }
    }
    name
    nameShort
    visible
  }

  fragment AdminTracksDegree on Degree {
    name
  }

  fragment AdminTracksProgram on Program {
    id
    name
    degree {
      name
    }
  }

  mutation InsertTracks($objects: [TrackInsertInput!]!) {
    insertData: insertTrack(objects: $objects) {
      returning {
        oid
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
        oid
        id
      }
    }
  }

  mutation UpdateTracks($ids: [Int!]!, $changes: TrackSetInput!) {
    updateData: updateTrack(where: { id: { _in: $ids } }, _set: $changes) {
      returning {
        oid
        id
      }
    }
  }

  mutation DeleteTracks($ids: [Int!]!) {
    deleteData: deleteTrack(where: { id: { _in: $ids } }) {
      returning {
        oid
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

const importConstraint = TrackConstraint.TrackOidProgramIdNameKey;
const importUpdateColumns = [
  TrackUpdateColumn.ProgramId,
  TrackUpdateColumn.Name,
  TrackUpdateColumn.NameShort,
  TrackUpdateColumn.Visible,
];

const validateFlatRow = (flatRow: FlatRow): InsertInput => {
  const object: InsertInput = {
    oid: organization.id,
  };

  // programId
  if (flatRow.degreeName !== undefined || flatRow.programName !== undefined) {
    if (flatRow.degreeName === undefined || flatRow.programName === undefined) {
      throw new Error(
        t("admin.courses.tracks.form.error.updateProgramMissingFields"),
      );
    }
    const program = programs.value.find(
      (p) =>
        p.degree.name === flatRow.degreeName && p.name === flatRow.programName,
    );
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
const formOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    degreeName: programs.value.map((p) => p.degree.name).filter(unique),
    programName: programs.value
      .filter((p) => p.degree.name === formValues.value["degreeName"])
      .map((p) => p.name),
  }),
);

const filterValues = ref<Record<string, Scalar[]>>({});
const filterOptions = computed<SelectOptions<string, Row, typeof adminColumns>>(
  () => ({
    degreeName: degrees.value.map((d) => d.name),
    programName: programs.value
      .map((p) => p.name)
      .filter(unique)
      .sort(),
  }),
);
</script>

<template>
  <AdminData
    v-model:form-values="formValues"
    v-model:filter-values="filterValues"
    section="courses"
    name="tracks"
    :admin-columns
    :rows="tracks"
    :fetching
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
