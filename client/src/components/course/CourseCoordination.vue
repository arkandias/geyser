<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { CourseCoordinatorsFragmentDoc } from "@/gql/graphql.ts";

import CoordinationsList from "@/components/core/CoordinationsList.vue";
import DetailsSubsection from "@/components/core/DetailsSubsection.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof CourseCoordinatorsFragmentDoc>;
}>();

graphql(`
  fragment CourseCoordinators on Course {
    coordinations(
      orderBy: [{ teacher: { lastname: ASC } }, { teacher: { firstname: ASC } }]
    ) {
      ...CoordinationData
    }
    program {
      coordinations(
        orderBy: [
          { teacher: { lastname: ASC } }
          { teacher: { firstname: ASC } }
        ]
      ) {
        ...CoordinationData
      }
    }
    track {
      coordinations(
        orderBy: [
          { teacher: { lastname: ASC } }
          { teacher: { firstname: ASC } }
        ]
      ) {
        ...CoordinationData
      }
    }
  }
`);

const { t } = useTypedI18n();

const data = computed(() =>
  useFragment(CourseCoordinatorsFragmentDoc, dataFragment),
);
const courseCoordinations = computed(() => data.value.coordinations);
const programCoordinations = computed(() => data.value.program.coordinations);
const trackCoordinations = computed(
  () => data.value.track?.coordinations ?? [],
);
</script>

<template>
  <DetailsSubsection
    id="course-details-coordination"
    :title="t('courses.expansion.coordinators.title')"
  >
    <CoordinationsList
      v-if="programCoordinations.length"
      :title="
        t('courses.expansion.coordinators.program', programCoordinations.length)
      "
      :data-fragments="programCoordinations"
    />
    <CoordinationsList
      v-if="trackCoordinations.length"
      :title="
        t('courses.expansion.coordinators.track', trackCoordinations.length)
      "
      :data-fragments="trackCoordinations"
    />
    <CoordinationsList
      v-if="courseCoordinations.length"
      :title="
        t('courses.expansion.coordinators.course', courseCoordinations.length)
      "
      :data-fragments="courseCoordinations"
    />
  </DetailsSubsection>
</template>

<style scoped lang="scss"></style>
