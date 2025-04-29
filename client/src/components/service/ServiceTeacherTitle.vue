<script setup lang="ts">
import { computed } from "vue";

import { type FragmentType, graphql, useFragment } from "@/gql";
import { TeacherTitleFragmentDoc } from "@/gql/graphql.ts";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof TeacherTitleFragmentDoc>;
}>();

graphql(`
  fragment TeacherTitle on Teacher {
    displayname
    position {
      label
    }
  }
`);

const teacher = computed(() =>
  useFragment(TeacherTitleFragmentDoc, dataFragment),
);
</script>

<template>
  <QCard flat square class="text-center">
    <QCardSection>
      <div class="text-h5">
        {{ teacher.displayname }}
      </div>
      <div v-if="teacher.position" class="text-body1 text-italic">
        {{ teacher.position.label }}
      </div>
    </QCardSection>
  </QCard>
</template>

<style scoped lang="scss"></style>
