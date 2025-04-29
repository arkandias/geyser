<script setup lang="ts">
import { useMutation } from "@urql/vue";
import {
  type ComponentPublicInstance,
  type ShallowRef,
  computed,
  shallowRef,
} from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import {
  CUSTOM_TEXT_KEYS,
  type CustomTextKey,
  isCustomTextKey,
} from "@/config/custom-text-keys.ts";
import { graphql } from "@/gql";
import {
  DeleteCustomTextDocument,
  UpdateCustomTextDocument,
} from "@/gql/graphql.ts";
import { customTextDefault, customTextLabel } from "@/locales/helpers.ts";
import { useCustomTextsStore } from "@/stores/useCustomTextsStore.ts";

import EditableText from "@/components/core/EditableText.vue";

const { t } = useTypedI18n();
const { getCustomText } = useCustomTextsStore();

const customTextOptions = computed(() =>
  CUSTOM_TEXT_KEYS.map((key) => ({
    key,
    value: getCustomText(key).value,
    label: customTextLabel(t, key),
    default: customTextDefault(t, key),
    edit: false,
  })),
);

graphql(`
  mutation UpdateCustomText($key: String!, $value: String) {
    customText: insertAppSettingOne(
      object: { key: $key, value: $value }
      onConflict: { constraint: app_setting_pkey, updateColumns: [value] }
    ) {
      key
    }
  }

  mutation DeleteCustomText($key: String!) {
    customText: deleteAppSettingByPk(key: $key) {
      key
    }
  }
`);

const updateCustomText = useMutation(UpdateCustomTextDocument);
const deleteCustomText = useMutation(DeleteCustomTextDocument);

const updateCustomTextHandle = (key: string, value: string) =>
  value
    ? updateCustomText.executeMutation({ key, value }).then((result) => ({
        returnId: result.data?.customText?.key,
        error: result.error,
      }))
    : deleteCustomText.executeMutation({ key }).then((result) => ({
        returnId: result.data?.customText?.key,
        error: result.error,
      }));

// For deletion, use EditableText's exposed method
type EditableTextInstance = {
  clear: () => Promise<void>;
};

const editableTextRefs = Object.fromEntries(
  CUSTOM_TEXT_KEYS.map((key) => [
    key,
    shallowRef<EditableTextInstance | null>(null),
  ]),
) as Record<CustomTextKey, ShallowRef<EditableTextInstance | null>>;

const setRef = (key: string, el: Element | ComponentPublicInstance | null) => {
  if (isCustomTextKey(key)) {
    if (el && "clear" in el) {
      editableTextRefs[key].value = el as EditableTextInstance;
    } else if (el === null) {
      editableTextRefs[key].value = null;
    }
  }
};

const callOnDelete = async (key: CustomTextKey, label: string) => {
  if (confirm(t("admin.general.customTexts.confirm.delete", { label }))) {
    await editableTextRefs[key].value?.clear();
  }
};
</script>

<template>
  <QList bordered separator dense>
    <QExpansionItem
      v-for="opt in customTextOptions"
      :key="opt.key"
      :label="opt.label"
      dense
      dense-toggle
    >
      <QCard>
        <QCardSection>
          <EditableText
            :ref="(el) => setRef(opt.key, el)"
            v-model="opt.edit"
            :text="opt.value"
            :set-text="(value) => updateCustomTextHandle(opt.key, value)"
            :default-text="opt.default"
          />
        </QCardSection>
        <QCardActions dense>
          <QBtn
            :label="t('admin.general.customTexts.button.edit')"
            icon="sym_s_edit"
            color="primary"
            no-caps
            outline
            dense
            @click="opt.edit = true"
          />
          <QBtn
            :label="t('admin.general.customTexts.button.delete')"
            icon="sym_s_delete"
            color="primary"
            :disable="!opt"
            no-caps
            outline
            dense
            @click="callOnDelete(opt.key, opt.label)"
          />
        </QCardActions>
      </QCard>
    </QExpansionItem>
  </QList>
</template>

<style scoped lang="scss"></style>
