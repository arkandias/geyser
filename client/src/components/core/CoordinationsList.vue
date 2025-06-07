<script setup lang="ts">
import { type FragmentType, graphql, useFragment } from "@/gql";
import { CoordinationDataFragmentDoc } from "@/gql/graphql.ts";

const { dataFragments } = defineProps<{
  title: string;
  dataFragments: FragmentType<typeof CoordinationDataFragmentDoc>[];
}>();

graphql(`
  fragment CoordinationData on Coordination {
    id
    teacher {
      email
      displayname
    }
    comment
  }
`);

const coordinations = dataFragments.map((f) =>
  useFragment(CoordinationDataFragmentDoc, f),
);
</script>

<template>
  {{ title }}
  <template v-for="(c, ind) in coordinations" :key="c.id">
    <a :href="'mailto:' + c.teacher.email">{{ c.teacher.displayname }}</a>
    {{
      (c.comment ? ` (${c.comment})` : "") +
      (ind < coordinations.length - 1 ? ", " : ".")
    }}
  </template>
</template>

<style scoped lang="scss"></style>
