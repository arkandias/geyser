<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type CourseCoordinatorsFragment,
  CourseCoordinatorsFragmentDoc,
} from "@/gql/graphql.ts";
import type { ArrayElement } from "@/types/misc.ts";

import DetailsSubsection from "@/components/core/DetailsSubsection.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof CourseCoordinatorsFragmentDoc>;
}>();

graphql(`
  fragment CourseCoordinators on Course {
    coordinations(orderBy: [{ teacher: { displayname: ASC } }]) {
      teacher: vTeacher {
        displayname
      }
      comment
    }
    program {
      coordinations(orderBy: [{ teacher: { displayname: ASC } }]) {
        teacher: vTeacher {
          displayname
        }
        comment
      }
    }
    track {
      coordinations(orderBy: [{ teacher: { displayname: ASC } }]) {
        teacher: vTeacher {
          displayname
        }
        comment
      }
    }
  }
`);

const { t } = useTypedI18n();

const data = computed(() =>
  useFragment(CourseCoordinatorsFragmentDoc, dataFragment),
);
const courseCoordinators = computed(() => data.value.coordinations);
const programCoordinators = computed(() => data.value.program.coordinations);
const trackCoordinators = computed(() => data.value.track?.coordinations ?? []);

// Helpers
type Coordinator = ArrayElement<CourseCoordinatorsFragment["coordinations"]>;

const formatCoordinators = (coordinators: Coordinator[]) =>
  coordinators
    .map(
      (c) =>
        (c.teacher?.displayname ?? "") + (c.comment ? ` (${c.comment})` : ""),
    )
    .join(", ");
</script>

<template>
  <DetailsSubsection :title="t('courses.expansion.coordinators.title')">
    <div v-if="programCoordinators.length">
      {{
        t("courses.expansion.coordinators.program", programCoordinators.length)
      }}
      {{ formatCoordinators(programCoordinators) }}
    </div>
    <div v-if="trackCoordinators.length">
      {{ t("courses.expansion.coordinators.track", trackCoordinators.length) }}
      {{ formatCoordinators(trackCoordinators) }}
    </div>
    <div v-if="courseCoordinators.length">
      {{
        t("courses.expansion.coordinators.course", courseCoordinators.length)
      }}
      {{ formatCoordinators(courseCoordinators) }}
    </div>
  </DetailsSubsection>
</template>

<style scoped lang="scss"></style>
