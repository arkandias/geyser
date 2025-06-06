<script setup lang="ts">
import { useMutation } from "@urql/vue";
import DOMPurify from "dompurify";
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
    courseId: id
    description
    coordinations(orderBy: [{ teacher: { displayname: ASC } }]) {
      teacherId
    }
    program {
      coordinations(orderBy: [{ teacher: { displayname: ASC } }]) {
        teacherId
      }
    }
    track {
      coordinations(orderBy: [{ teacher: { displayname: ASC } }]) {
        teacherId
      }
    }
  }

  mutation UpdateDescription($courseId: Int!, $description: String) {
    updateCourseByPk(
      pkColumns: { id: $courseId }
      _set: { description: $description }
    ) {
      id
    }
  }
`);

const { t } = useTypedI18n();
const perm = usePermissions();

const updateDescription = useMutation(UpdateDescriptionDocument);

const data = computed(() =>
  useFragment(CourseDescriptionFragmentDoc, dataFragment),
);

const description = computed(() =>
  DOMPurify.sanitize(data.value.description ?? ""),
);
const coordinators = computed(() => [
  ...data.value.coordinations.map((c) => c.teacherId),
  ...data.value.program.coordinations.map((c) => c.teacherId),
  ...(data.value.track?.coordinations.map((c) => c.teacherId) ?? []),
]);

const editDescription = ref(false);

const setDescription = (text: string) =>
  updateDescription
    .executeMutation({
      courseId: data.value.courseId,
      description: text || null,
    })
    .then((result) => ({
      returnId: result.data?.updateCourseByPk?.id ?? null,
      error: result.error,
    }));
</script>

<template>
  <DetailsSubsection
    v-model="editDescription"
    :title="t('courses.expansion.description.title')"
    :editable="perm.toEditADescription(coordinators)"
  >
    <EditableText
      v-model="editDescription"
      :text="description"
      :set-text="setDescription"
      :default-text="t('courses.expansion.description.defaultText')"
    />
  </DetailsSubsection>
</template>

<style scoped lang="scss"></style>
