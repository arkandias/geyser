<script setup lang="ts">
import { useMutation } from "@urql/vue";
import DOMPurify from "dompurify";
import { computed, ref } from "vue";

import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  DeleteMessageDocument,
  ServiceMessageFragmentDoc,
  UpsertMessageDocument,
} from "@/gql/graphql.ts";

import DetailsSection from "@/components/core/DetailsSection.vue";
import EditableText from "@/components/core/EditableText.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof ServiceMessageFragmentDoc>;
}>();

graphql(`
  fragment ServiceMessage on Service {
    oid
    id
    year
    teacherId
    messages {
      id
      content
    }
  }

  mutation UpsertMessage($oid: Int!, $serviceId: Int!, $content: String!) {
    insertMessageOne(
      object: { oid: $oid, serviceId: $serviceId, content: $content }
      onConflict: {
        constraint: message_oid_service_id_key
        updateColumns: [content]
      }
    ) {
      oid
      id
    }
  }

  mutation DeleteMessage($oid: Int!, $serviceId: Int!) {
    deleteMessage(
      where: {
        _and: [{ oid: { _eq: $oid } }, { serviceId: { _eq: $serviceId } }]
      }
    ) {
      returning {
        oid
        id
      }
    }
  }
`);

const { t } = useTypedI18n();
const perm = usePermissions();

const data = computed(() =>
  useFragment(ServiceMessageFragmentDoc, dataFragment),
);

const upsertMessage = useMutation(UpsertMessageDocument);
const deleteMessage = useMutation(DeleteMessageDocument);

const messageSanitized = computed(() =>
  DOMPurify.sanitize(data.value.messages[0]?.content ?? ""),
);

const editMessage = ref(false);
const setMessage = computed(
  () => (message: string) =>
    message
      ? upsertMessage
          .executeMutation({
            oid: data.value.oid,
            serviceId: data.value.id,
            content: message,
          })
          .then((result) => ({
            returnId: result.data?.insertMessageOne?.id ?? null,
            error: result.error,
          }))
      : deleteMessage
          .executeMutation({
            oid: data.value.oid,
            serviceId: data.value.id,
          })
          .then((result) => ({
            returnId: result.data?.deleteMessage?.returning.length ?? null,
            error: result.error,
          })),
);
</script>

<template>
  <DetailsSection
    v-model="editMessage"
    :title="t('service.message.title')"
    :editable="perm.toEditAMessage(data)"
    :edition-tooltip="t('service.message.editionTooltip')"
  >
    <EditableText
      v-model="editMessage"
      :text="messageSanitized"
      :set-text="setMessage"
      text-class="q-pa-md"
    />
  </DetailsSection>
</template>

<style scoped lang="scss"></style>
