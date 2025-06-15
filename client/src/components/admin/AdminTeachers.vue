<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import { GetAdminTeachersDocument } from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import AdminTeachersMessages from "@/components/admin/AdminTeachersMessages.vue";
import AdminTeachersPositions from "@/components/admin/AdminTeachersPositions.vue";
import AdminTeachersServiceModificationTypes from "@/components/admin/AdminTeachersServiceModificationTypes.vue";
import AdminTeachersServiceModifications from "@/components/admin/AdminTeachersServiceModifications.vue";
import AdminTeachersServices from "@/components/admin/AdminTeachersServices.vue";
import AdminTeachersTeachers from "@/components/admin/AdminTeachersTeachers.vue";
import AdminSection from "@/components/admin/core/AdminSection.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();

graphql(`
  query GetAdminTeachers($oid: Int!) {
    teachers: teacher(
      where: { oid: { _eq: $oid } }
      orderBy: [{ lastname: ASC }, { firstname: ASC }]
    ) {
      ...AdminTeacher
      ...AdminServicesTeacher
      ...AdminServiceModificationsTeacher
      ...AdminMessagesTeacher
    }
    positions: position(
      where: { oid: { _eq: $oid } }
      orderBy: [{ label: ASC }]
    ) {
      ...AdminPosition
      ...AdminTeachersPosition
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
      ...AdminMessagesService
    }
    serviceModifications: serviceModification(
      where: { oid: { _eq: $oid } }
      orderBy: [
        { service: { year: DESC } }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
        { type: { label: ASC } }
      ]
    ) {
      ...AdminServiceModification
    }
    serviceModificationTypes: serviceModificationType(
      where: { oid: { _eq: $oid } }
      orderBy: [{ label: ASC }]
    ) {
      ...AdminServiceModificationType
      ...AdminServiceModificationsServiceModificationType
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

const { data } = useQuery({
  query: GetAdminTeachersDocument,
  variables: { oid: organization.id },
  context: {
    additionalTypenames: [
      "All",
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
const serviceModificationTypes = computed(
  () => data.value?.serviceModificationTypes ?? [],
);
const messages = computed(() => data.value?.messages ?? []);
</script>

<template>
  <QList bordered>
    <AdminSection
      icon="sym_s_groups"
      :label="t('admin.teachers.teachers.label')"
    >
      <AdminTeachersTeachers
        :teacher-fragments="teachers"
        :position-fragments="positions"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_work"
      :label="t('admin.teachers.positions.label')"
    >
      <AdminTeachersPositions :position-fragments="positions" />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_assignment_ind"
      :label="t('admin.teachers.services.label')"
    >
      <AdminTeachersServices
        :service-fragments="services"
        :teacher-fragments="teachers"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_assignment_returned"
      :label="t('admin.teachers.serviceModifications.label')"
    >
      <AdminTeachersServiceModifications
        :service-fragments="services"
        :service-modification-fragments="serviceModifications"
        :service-modification-type-fragments="serviceModificationTypes"
        :teacher-fragments="teachers"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection
      icon="sym_s_format_list_bulleted"
      :label="t('admin.teachers.serviceModificationTypes.label')"
    >
      <AdminTeachersServiceModificationTypes
        :service-modification-type-fragments="serviceModificationTypes"
      />
    </AdminSection>

    <QSeparator />

    <AdminSection icon="sym_s_chat" :label="t('admin.teachers.messages.label')">
      <AdminTeachersMessages
        :message-fragments="messages"
        :service-fragments="services"
        :teacher-fragments="teachers"
      />
    </AdminSection>
  </QList>
</template>

<style scoped lang="scss"></style>
