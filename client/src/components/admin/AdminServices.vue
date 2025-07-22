<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminServicesDocument } from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import AdminServicesExternalCourses from "@/components/admin/AdminServicesExternalCourses.vue";
import AdminServicesMessages from "@/components/admin/AdminServicesMessages.vue";
import AdminServicesServiceModifications from "@/components/admin/AdminServicesServiceModifications.vue";
import AdminServicesServices from "@/components/admin/AdminServicesServices.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

graphql(`
  query GetAdminServices($oid: Int!) {
    teachers: teacher(
      where: { oid: { _eq: $oid } }
      orderBy: [{ lastname: ASC }, { firstname: ASC }]
    ) {
      ...AdminServicesTeacher
      ...AdminServiceModificationsTeacher
      ...AdminExternalCoursesTeacher
      ...AdminMessagesTeacher
    }
    positions: position(
      where: { oid: { _eq: $oid } }
      orderBy: [{ label: ASC }]
    ) {
      ...AdminServicesPosition
    }
    services: service(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { year: DESC }
        { teacher: { lastname: ASC } }
        { teacher: { firstname: ASC } }
      ]
    ) {
      ...AdminService
      ...AdminServiceModificationsService
      ...AdminExternalCoursesService
      ...AdminMessagesService
    }
    serviceModifications: serviceModification(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { service: { year: DESC } }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
        { id: ASC }
      ]
    ) {
      ...AdminServiceModification
    }
    externalCourses: externalCourse(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { service: { year: DESC } }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
        { id: ASC }
      ]
    ) {
      ...AdminExternalCourse
    }
    messages: message(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { service: { year: DESC } }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
      ]
    ) {
      ...AdminMessage
    }
  }
`);

const { data, fetching } = useQuery({
  query: GetAdminServicesDocument,
  variables: { oid: organization.id },
  context: {
    additionalTypenames: [
      "All",
      "ExternalCourse",
      "Message",
      "Position",
      "Service",
      "ServiceModification",
      "ServiceModificationType",
      "Teacher",
    ],
  },
});
const teachers = computed(() => data.value?.teachers ?? []);
const positions = computed(() => data.value?.positions ?? []);
const services = computed(() => data.value?.services ?? []);
const serviceModifications = computed(
  () => data.value?.serviceModifications ?? [],
);
const externalCourses = computed(() => data.value?.externalCourses ?? []);
const messages = computed(() => data.value?.messages ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection
      icon="sym_s_assignment_ind"
      :label="t('admin.services.services.label')"
    >
      <AdminServicesServices
        :fetching
        :service-fragments="services"
        :teacher-fragments="teachers"
        :position-fragments="positions"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_assignment_returned"
      :label="t('admin.services.serviceModifications.label')"
    >
      <AdminServicesServiceModifications
        :fetching
        :service-fragments="services"
        :service-modification-fragments="serviceModifications"
        :teacher-fragments="teachers"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_arrow_outward"
      :label="t('admin.services.externalCourses.label')"
    >
      <AdminServicesExternalCourses
        :fetching
        :external-course-fragments="externalCourses"
        :service-fragments="services"
        :teacher-fragments="teachers"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection icon="sym_s_chat" :label="t('admin.services.messages.label')">
      <AdminServicesMessages
        :fetching
        :message-fragments="messages"
        :service-fragments="services"
        :teacher-fragments="teachers"
      />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
