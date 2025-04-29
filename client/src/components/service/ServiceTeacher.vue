<script setup lang="ts">
import { computed } from "vue";

import { type FragmentType, graphql, useFragment } from "@/gql";
import { ServiceTeacherFragmentDoc } from "@/gql/graphql.ts";

import ServiceTeacherCoordinations from "@/components/service/ServiceTeacherCoordinations.vue";
import ServiceTeacherTitle from "@/components/service/ServiceTeacherTitle.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof ServiceTeacherFragmentDoc>;
}>();

graphql(`
  fragment ServiceTeacher on Teacher {
    ...TeacherTitle
    ...TeacherCoordinations
    coordinationIds: coordinations {
      id
    }
  }
`);

const teacher = computed(() =>
  useFragment(ServiceTeacherFragmentDoc, dataFragment),
);

const isCoordinator = computed(() => !!teacher.value.coordinationIds.length);
</script>

<template>
  <ServiceTeacherTitle :data-fragment="teacher" />
  <ServiceTeacherCoordinations v-if="isCoordinator" :data-fragment="teacher" />
</template>

<style scoped lang="scss"></style>
