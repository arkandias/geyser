<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { CourseExpansionFragmentDoc } from "@/gql/graphql.ts";

const isExpanded = defineModel<boolean>();
const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof CourseExpansionFragmentDoc> | null;
}>();
defineSlots<{ default(): unknown }>();

graphql(`
  fragment CourseExpansion on Course {
    program {
      degree {
        name
      }
      name
    }
    track {
      name
    }
    name
    semester
    courseType: type {
      label
    }
  }
`);

const { t } = useTypedI18n();

const data = computed(() =>
  useFragment(CourseExpansionFragmentDoc, dataFragment),
);

const label = computed(() =>
  data.value ? data.value.name : t("courses.expansion.defaultLabel"),
);

const caption = computed(() =>
  data.value
    ? `${data.value.program.degree.name} — ` +
      `${data.value.program.name} — ` +
      (data.value.track ? `${data.value.track.name} — ` : "") +
      `${t("semester", { semester: data.value.semester })} — ` +
      data.value.courseType.label
    : t("courses.expansion.defaultCaption"),
);
</script>

<template>
  <QExpansionItem
    id="volet"
    v-model="isExpanded"
    expand-separator
    :label
    :caption
    dense
    dense-toggle
  >
    <slot />
  </QExpansionItem>
</template>

<style scoped lang="scss"></style>
