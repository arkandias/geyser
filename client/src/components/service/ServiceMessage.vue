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
    id
    year
    teacherId
    message {
      id
      content
    }
  }

  mutation UpsertMessage($serviceId: Int!, $content: String!) {
    insertMessageOne(
      object: { serviceId: $serviceId, content: $content }
      onConflict: {
        constraint: message_service_id_key
        updateColumns: [content]
      }
    ) {
      id
    }
  }

  mutation DeleteMessage($serviceId: Int!) {
    deleteMessage(where: { serviceId: { _eq: $serviceId } }) {
      returning {
        id
      }
    }
  }
`);

const { t } = useTypedI18n();
const perm = usePermissions();

const upsertMessage = useMutation(UpsertMessageDocument);
const deleteMessage = useMutation(DeleteMessageDocument);

const data = computed(() =>
  useFragment(ServiceMessageFragmentDoc, dataFragment),
);

const editMessage = ref(false);
const message = computed(() =>
  DOMPurify.sanitize(data.value.message?.content ?? ""),
);
const setMessage = computed(
  () => (message: string) =>
    message
      ? upsertMessage
          .executeMutation({
            serviceId: data.value.id,
            content: message,
          })
          .then((result) => ({
            returnId: result.data?.insertMessageOne?.id ?? null,
            error: result.error,
          }))
      : deleteMessage
          .executeMutation({
            serviceId: data.value.id,
          })
          .then((result) => ({
            returnId: result.data?.deleteMessage?.returning[0]?.id ?? null,
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
      :text="message"
      :set-text="setMessage"
      text-class="q-pa-md"
    />
  </DetailsSection>
</template>

<style scoped lang="scss"></style>
