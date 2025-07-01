<script setup lang="ts">
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type ServicePrioritiesFragment,
  ServicePrioritiesFragmentDoc,
} from "@/gql/graphql.ts";
import type { ArrayElement } from "@/types/misc.ts";
import { priorityColor } from "@/utils";

import DetailsSection from "@/components/core/DetailsSection.vue";
import ServiceList from "@/components/service/ServiceList.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof ServicePrioritiesFragmentDoc>;
}>();

graphql(`
  fragment ServicePriorities on Service {
    priorities(
      where: { isPriority: { _isNull: false } }
      orderBy: [
        { course: { term: { label: ASC } } }
        { course: { type: { label: ASC } } }
        { course: { programId: ASC } }
        { course: { trackId: ASC } }
        { course: { name: ASC } }
      ]
    ) {
      id
      course {
        program {
          name: nameDisplay
          degree {
            name: nameDisplay
          }
        }
        track {
          name: nameDisplay
          program {
            name: nameDisplay
            degree {
              name: nameDisplay
            }
          }
        }
        name: nameDisplay
        term {
          label
        }
        type {
          label
        }
      }
      seniority
      isPriority
    }
  }
`);

const { t } = useTypedI18n();

const priorities = computed(
  () => useFragment(ServicePrioritiesFragmentDoc, dataFragment).priorities,
);

type Priority = ArrayElement<ServicePrioritiesFragment["priorities"]>;

const formatTypeInTerm = (priority: Priority) =>
  t("service.priorities.format.typeInTerm", {
    type: priority.course.type.label,
    term: priority.course.term.label,
  });

const formatPriority = (priority: Priority) => priority.course.name;

const formatPriorityExtra = (priority: Priority) =>
  `${priority.course.program.degree.name} ${priority.course.program.name}` +
  (priority.course.track
    ? `, ${t("service.priorities.format.track", { track: priority.course.track.name })}`
    : "");
</script>

<template>
  <DetailsSection :title="t('service.priorities.title')">
    <ServiceList>
      <QItem v-for="p in priorities" :key="p.id">
        <QItemSection>
          <QItemLabel overline>
            {{ formatTypeInTerm(p) }}
          </QItemLabel>
          <QItemLabel>
            {{ formatPriority(p) }}
          </QItemLabel>
          <QItemLabel caption>
            {{ formatPriorityExtra(p) }}
          </QItemLabel>
        </QItemSection>
        <QItemSection side>
          <QAvatar
            :color="priorityColor(p.isPriority)"
            text-color="white"
            square
            size="md"
          >
            {{ p.seniority }}
          </QAvatar>
        </QItemSection>
      </QItem>
    </ServiceList>
  </DetailsSection>
</template>

<style scoped lang="scss"></style>
