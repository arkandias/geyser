<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed, ref } from "vue";

import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  CourseDescriptionFragmentDoc,
  UpdateDescriptionDocument,
} from "@/gql/graphql.ts";

import DetailsSubsection from "@/components/core/DetailsSubsection.vue";
import EditableText from "@/components/core/EditableText.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof CourseDescriptionFragmentDoc>;
}>();

graphql(`
  fragment CourseDescription on Course {
    oid
    courseId: id
    description
    coordinations(
      orderBy: [{ teacher: { lastname: ASC } }, { teacher: { firstname: ASC } }]
    ) {
      teacherId
    }
    program {
      coordinations(
        orderBy: [
          { teacher: { lastname: ASC } }
          { teacher: { firstname: ASC } }
        ]
      ) {
        teacherId
      }
    }
    track {
      coordinations(
        orderBy: [
          { teacher: { lastname: ASC } }
          { teacher: { firstname: ASC } }
        ]
      ) {
        teacherId
      }
    }
  }

  mutation UpdateDescription(
    $oid: Int!
    $courseId: Int!
    $description: String
  ) {
    updateCourseByPk(
      pkColumns: { oid: $oid, id: $courseId }
      _set: { description: $description }
    ) {
      oid
      id
    }
  }
`);

const { t } = useTypedI18n();
const perm = usePermissions();

const data = computed(() =>
  useFragment(CourseDescriptionFragmentDoc, dataFragment),
);

const updateDescription = useMutation(UpdateDescriptionDocument);

const coordinators = computed(() => [
  ...data.value.coordinations.map((c) => c.teacherId),
  ...data.value.program.coordinations.map((c) => c.teacherId),
  ...(data.value.track?.coordinations.map((c) => c.teacherId) ?? []),
]);

const editable = computed(() => perm.toEditADescription(coordinators.value));

const description = computed(() => data.value.description ?? "");
const defaultDescription = computed(() =>
  editable.value
    ? t("courses.expansion.description.defaultTextWithEdition")
    : t("courses.expansion.description.defaultText"),
);

const editDescription = ref(false);
const setDescription = (text: string) =>
  updateDescription
    .executeMutation({
      oid: data.value.oid,
      courseId: data.value.courseId,
      description: text || null,
    })
    .then((result) => ({
      success: !!result.data?.updateCourseByPk,
      error: result.error,
    }));
</script>

<template>
  <DetailsSubsection
    v-model="editDescription"
    :title="t('courses.expansion.description.title')"
    :editable
    :edition-tooltip="t('courses.expansion.description.editionTooltip')"
  >
    <EditableText
      v-model="editDescription"
      :text="description"
      :set-text="setDescription"
      :default-text="defaultDescription"
      markdown
    />
  </DetailsSubsection>
</template>

<style scoped lang="scss"></style>
