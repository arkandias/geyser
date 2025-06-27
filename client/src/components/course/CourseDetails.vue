<script setup lang="ts">
import { computed, watch } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { CourseDetailsFragmentDoc } from "@/gql/graphql.ts";

import CourseArchives from "@/components/course/CourseArchives.vue";
import CourseCoordination from "@/components/course/CourseCoordination.vue";
import CourseDescription from "@/components/course/CourseDescription.vue";
import CourseExpansion from "@/components/course/CourseExpansion.vue";
import CoursePriorities from "@/components/course/CoursePriorities.vue";
import CourseRequests from "@/components/course/CourseRequests.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof CourseDetailsFragmentDoc> | null;
}>();

graphql(`
  fragment CourseDetails on Course {
    courseId: id
    ...CourseExpansion
    ...CourseCoordinators
    ...CourseDescription
    ...CourseRequests
    ...CoursePriorities
    ...CourseArchivesData
  }
`);

const { t } = useTypedI18n();

const details = computed(() =>
  useFragment(CourseDetailsFragmentDoc, dataFragment),
);

// When the selected course changes: scroll to top (sync)
watch(
  () => details.value?.courseId,
  () => {
    document.getElementById("volet")?.scrollIntoView();
  },
  {
    flush: "sync",
  },
);
</script>

<template>
  <CourseExpansion :data-fragment="details">
    <QCard flat square class="text-body2">
      <template v-if="details">
        <CourseCoordination :data-fragment="details" />
        <CourseDescription :data-fragment="details" />
      </template>
      <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
      <QCardSection
        v-else
        class="text-justify"
        v-html="t('courses.expansion.defaultText')"
      />
      <!-- eslint-enable vue/no-v-html vue/no-v-text-v-html-on-component -->
    </QCard>
  </CourseExpansion>
  <QCard flat square>
    <template v-if="details">
      <CourseRequests :data-fragment="details" />
      <QSeparator />
      <CoursePriorities :data-fragment="details" />
      <QSeparator />
      <CourseArchives :data-fragment="details" />
    </template>
    <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
    <QCardSection
      v-else
      class="text-body2 text-justify"
      v-html="t('courses.details.defaultText')"
    />
    <!-- eslint-enable vue/no-v-html vue/no-v-text-v-html-on-component -->
  </QCard>
</template>

<style scoped lang="scss">
.q-expansion-item {
  background-color: $grey-3;
}
.body--dark .q-expansion-item {
  background-color: $grey-9;
}
</style>
