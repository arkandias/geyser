<script setup lang="ts">
import { computed } from "vue";

import { useDownloadAssignments } from "@/composables/useDownloadAssignments.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  type RequestBoolExp,
  type TeacherCoordinationsFragment,
  TeacherCoordinationsFragmentDoc,
} from "@/gql/graphql.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";
import type { ArrayElement } from "@/types/misc.ts";

import DetailsSection from "@/components/core/DetailsSection.vue";
import ServiceList from "@/components/service/ServiceList.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof TeacherCoordinationsFragmentDoc>;
}>();

graphql(`
  fragment TeacherCoordinations on Teacher {
    coordinations(
      orderBy: [
        { programId: ASC_NULLS_LAST }
        { trackId: ASC_NULLS_LAST }
        { courseId: ASC }
      ]
    ) {
      id
      program {
        id
        name: nameDisplay
        degree {
          name: nameDisplay
        }
      }
      track {
        id
        name: nameDisplay
        program {
          name: nameDisplay
          degree {
            name: nameDisplay
          }
        }
      }
      course {
        id
        yearValue
        name: nameDisplay
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
      }
      comment
    }
  }
`);

const { t } = useTypedI18n();
const { activeYear } = useYearsStore();
const perm = usePermissions();
const { downloadAssignments } = useDownloadAssignments();

const coordinations = computed(() =>
  useFragment(
    TeacherCoordinationsFragmentDoc,
    dataFragment,
  ).coordinations.filter(
    (c) => !c.course || c.course.yearValue === activeYear.value,
  ),
);

const formatProgram = (program: {
  name?: string | null;
  degree: { name?: string | null };
}) =>
  !program.degree.name || !program.name
    ? ""
    : program.degree.name + " " + program.name;

type Coordination = ArrayElement<TeacherCoordinationsFragment["coordinations"]>;

const formatCoordinationType = (coordination: Coordination) =>
  coordination.program
    ? t("service.coordinations.type.program")
    : coordination.track
      ? t("service.coordinations.type.track")
      : coordination.course
        ? t("service.coordinations.type.course")
        : "";

const formatCoordination = (coordination: Coordination) =>
  (coordination.program
    ? formatProgram(coordination.program)
    : (coordination.track?.name ?? coordination.course?.name ?? "")) +
  (coordination.comment ? ` (${coordination.comment})` : "");

const formatCoordinationExtra = (coordination: Coordination) =>
  coordination.track
    ? formatProgram(coordination.track.program)
    : coordination.course
      ? formatProgram(coordination.course.program) +
        (coordination.course.track
          ? `, ${t("service.coordinations.format.track", { track: coordination.course.track.name })}`
          : "")
      : "";

const downloadProgramAssignments = async (coordination: Coordination) => {
  if (activeYear.value === null) {
    return;
  }

  let where: RequestBoolExp;
  let filename: string;
  if (coordination.program) {
    where = {
      course: { programId: { _eq: coordination.program.id } },
    };
    filename = `${activeYear.value} ${formatProgram(coordination.program)}`;
  } else if (coordination.track) {
    where = {
      course: { trackId: { _eq: coordination.track.id } },
    };
    filename = `${activeYear.value} ${formatProgram(coordination.track.program)} ${coordination.track.name}`;
  } else if (coordination.course) {
    where = {
      course: { id: { _eq: coordination.course.id } },
    };
    filename =
      `${activeYear.value} ${formatProgram(coordination.course.program)} ` +
      (coordination.course.track ? ` ${coordination.course.track.name})` : "") +
      `${coordination.course.name}`;
  } else {
    console.error("Invalid coordination:", coordination);
    return;
  }

  await downloadAssignments(
    {
      year: activeYear.value,
      where,
    },
    filename,
  );
};
</script>

<template>
  <DetailsSection :title="t('service.coordinations.title')">
    <ServiceList>
      <QItem v-for="c in coordinations" :key="c.id">
        <QItemSection>
          <QItemLabel overline>
            {{ formatCoordinationType(c) }}
          </QItemLabel>
          <QItemLabel>
            {{ formatCoordination(c) }}
          </QItemLabel>
          <QItemLabel caption>
            {{ formatCoordinationExtra(c) }}
          </QItemLabel>
        </QItemSection>
        <QItemSection v-if="perm.toViewAssignments" side>
          <QBtn
            icon="sym_s_download"
            color="primary"
            size="md"
            flat
            square
            dense
            @click="downloadProgramAssignments(c)"
          >
            <QTooltip :delay="TOOLTIP_DELAY">
              {{ t("service.coordinations.tooltip.downloadAssignments") }}
            </QTooltip>
          </QBtn>
        </QItemSection>
      </QItem>
    </ServiceList>
  </DetailsSection>
</template>

<style scoped lang="scss"></style>
