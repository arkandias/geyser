<script setup lang="ts">
import { useMutation } from "@urql/vue";
import DOMPurify from "dompurify";
import { computed, ref } from "vue";

import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  TeacherServiceMessageFragmentDoc,
  UpdateMessageDocument,
} from "@/gql/graphql.ts";

import DetailsSection from "@/components/core/DetailsSection.vue";
import EditableText from "@/components/core/EditableText.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof TeacherServiceMessageFragmentDoc>;
}>();

graphql(`
  fragment TeacherServiceMessage on Service {
    id
    uid
    message
  }

  mutation UpdateMessage($serviceId: Int!, $message: String) {
    service: updateServiceByPk(
      pkColumns: { id: $serviceId }
      _set: { message: $message }
    ) {
      id
    }
  }
`);

const { t } = useTypedI18n();
const perm = usePermissions();

const updateMessage = useMutation(UpdateMessageDocument);

const data = computed(() =>
  useFragment(TeacherServiceMessageFragmentDoc, dataFragment),
);

const editMessage = ref(false);
const message = computed(() => DOMPurify.sanitize(data.value.message ?? ""));
const setMessage = computed(
  () => (message: string) =>
    updateMessage
      .executeMutation({
        serviceId: data.value.id,
        message: message || null,
      })
      .then((result) => ({
        returnId: result.data?.service?.id ?? null,
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
