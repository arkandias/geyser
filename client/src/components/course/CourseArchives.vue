<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  CourseArchivesDataFragmentDoc,
  GetCourseArchivesDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import DetailsSection from "@/components/core/DetailsSection.vue";
import DetailsSubsection from "@/components/core/DetailsSubsection.vue";
import RequestCard from "@/components/core/RequestCard.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof CourseArchivesDataFragmentDoc>;
}>();

graphql(`
  fragment CourseArchivesData on Course {
    year
    programId
    trackId
    name
    termId
    typeId
  }

  query GetCourseArchives(
    $oid: Int!
    $year: Int!
    $programId: Int!
    $trackIdComp: IntComparisonExp
    $name: String!
    $termId: Int!
    $typeId: Int!
  ) {
    courses: course(
      where: {
        _and: [
          { oid: { _eq: $oid } }
          { year: { _lt: $year } }
          { programId: { _eq: $programId } }
          { trackId: $trackIdComp }
          { name: { _eq: $name } }
          { termId: { _eq: $termId } }
          { typeId: { _eq: $typeId } }
        ]
      }
      orderBy: [{ year: DESC }]
    ) {
      year
      requests(
        where: { type: { _eq: ASSIGNMENT } }
        orderBy: [{ service: { teacher: { displayname: ASC } } }]
      ) {
        id
        ...RequestCardData
      }
    }
  }
`);

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

const data = computed(() =>
  useFragment(CourseArchivesDataFragmentDoc, dataFragment),
);

const getCourseArchives = useQuery({
  query: GetCourseArchivesDocument,
  variables: () => ({
    oid: organization.id,
    year: data.value.year,
    programId: data.value.programId,
    trackIdComp:
      data.value.trackId != null
        ? { _eq: data.value.trackId }
        : { _isNull: true },
    name: data.value.name,
    termId: data.value.termId,
    typeId: data.value.typeId,
  }),
  context: { additionalTypenames: ["All"] },
});

const archives = computed(() => getCourseArchives.data.value?.courses ?? []);
</script>

<template>
  <DetailsSection :title="t('courses.details.archives.title')">
    <DetailsSubsection
      v-for="a in archives"
      :key="a.year"
      :title="a.year.toString()"
    >
      <QCardSection class="row q-gutter-xs">
        <RequestCard
          v-for="r in a.requests"
          :key="r.id"
          :data-fragment="r"
          archive
        />
      </QCardSection>
    </DetailsSubsection>
  </DetailsSection>
</template>

<style scoped lang="scss"></style>
