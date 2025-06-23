<script setup lang="ts">
import type { CombinedError } from "@urql/vue";
import { type StyleValue, computed, ref, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";

import MarkdownContent from "@/components/core/MarkdownContent.vue";

const showEditor = defineModel<boolean>();
const {
  text,
  setText,
  defaultText = "",
  markdown,
  textClass = "",
  textStyle = "",
} = defineProps<{
  text: string;
  setText: (text: string) => Promise<{
    success: boolean;
    error?: CombinedError | null;
  }>;
  defaultText?: string;
  markdown?: boolean;
  textClass?: string | string[] | Record<string, boolean>;
  textStyle?: StyleValue;
}>();

const { t } = useTypedI18n();
const { notify } = useNotify();

const textWithDefault = computed(() => text || defaultText);

const editorText = ref("");

const save = async () => {
  editorText.value = editorText.value.trim();

  if (editorText.value === text) {
    notify(NotifyType.Default, { message: t("editableText.save.noChanges") });
  } else {
    const { success, error } = await setText(editorText.value);
    if (success && !error) {
      notify(NotifyType.Success, {
        message: editorText.value
          ? t("editableText.save.success.updated")
          : t("editableText.save.success.deleted"),
      });
    } else {
      notify(NotifyType.Error, {
        message: editorText.value
          ? t("editableText.save.error.update")
          : t("editableText.save.error.delete"),
        caption: error?.message,
      });
    }
  }

  showEditor.value = false;
};

const abort = () => {
  showEditor.value = false;
  editorText.value = text;
};

const clear = async () => {
  editorText.value = "";
  await save();
};

watch(() => text || defaultText, abort, { immediate: true });

defineExpose({ clear });
</script>

<template>
  <QDialog v-model="showEditor" persistent square>
    <QCard flat square>
      <template v-if="markdown">
        <QCardSection class="text-caption text-grey-6 q-pa-sm">
          <QIcon name="sym_s_info" size="xs" class="q-mr-xs" />
          <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
          <span v-html="t('editableText.markdownNotice')" />
        </QCardSection>
        <QSeparator />
      </template>
      <QCardSection>
        <QInput
          v-model="editorText"
          type="textarea"
          square
          borderless
          autogrow
          input-style="padding: 0"
        />
      </QCardSection>
      <QSeparator />
      <QCardActions align="right">
        <QBtn
          :label="t('editableText.button.cancel')"
          color="primary"
          flat
          square
          dense
          @click="abort()"
        />
        <QBtn
          :label="t('editableText.button.save')"
          color="primary"
          flat
          square
          dense
          @click="save()"
        />
      </QCardActions>
    </QCard>
  </QDialog>

  <MarkdownContent
    :raw-text="textWithDefault"
    :disable="!markdown"
    :class="textClass"
    :style="textStyle"
  />
</template>

<style scoped lang="scss">
.q-dialog .q-card {
  width: 720px;
}
</style>
