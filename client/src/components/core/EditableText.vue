<script setup lang="ts">
import type { CombinedError } from "@urql/vue";
import { ref, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";

type SetTextReturn = {
  returnId?: string | number | null;
  error?: CombinedError | null;
};

const showEditor = defineModel<boolean>();
const {
  text,
  setText,
  defaultText = "",
  textClass = "",
  textStyle = "",
} = defineProps<{
  text: string;
  setText: (text: string) => Promise<SetTextReturn>;
  defaultText?: string;
  textClass?: string;
  textStyle?: string;
}>();

const { t } = useTypedI18n();
const { notify } = useNotify();

const editorText = ref("");

const save = async () => {
  if (isOnlyWhitespace(editorText.value)) {
    editorText.value = "";
  }
  if (editorText.value === text) {
    notify(NotifyType.Default, { message: t("editableText.save.noChanges") });
  } else {
    const { returnId, error } = await setText(editorText.value);
    if (!!returnId && !error) {
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
  if (!editorText.value) {
    editorText.value = defaultText;
  }
};

const abort = () => {
  showEditor.value = false;
  editorText.value = text || defaultText;
};

const clear = async () => {
  editorText.value = "";
  await save();
};

watch(() => text || defaultText, abort, { immediate: true });

const toolbar = [
  ["left", "center", "right", "justify"],
  ["bold", "italic", "underline", "strike", "subscript", "superscript"],
  ["hr", "link", "viewsource"],
  ["unordered", "ordered", "outdent", "indent"],
];

const isOnlyWhitespace = (htmlString: string) => {
  // First remove common whitespace HTML entities
  const withoutEntities = htmlString.replace(
    /&nbsp;|&ensp;|&emsp;|&thinsp;/g,
    "",
  );
  // Then remove all HTML tags
  const textOnly = withoutEntities.replace(/<[^>]*>/g, "");
  // Check if remaining content is only whitespace
  return /^\s*$/.test(textOnly);
};

defineExpose({ clear });
</script>

<template>
  <QDialog v-model="showEditor" persistent square>
    <QCard flat square>
      <QCardSection class="q-pa-none">
        <QEditor v-model="editorText" :toolbar square />
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
  <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
  <div :class="textClass" :style="textStyle" v-html="text || defaultText" />
</template>

<style scoped lang="scss">
.q-dialog .q-card {
  max-width: $dialog-text-editor-max-width;
}
:deep(.q-editor__toolbar) {
  background-color: $grey-3;
}
.q-dark :deep(.q-editor__toolbar) {
  background-color: $grey-9;
}
</style>
