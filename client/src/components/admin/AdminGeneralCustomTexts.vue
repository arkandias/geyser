<script setup lang="ts">
import { useMutation } from "@urql/vue";
import {
  type ComponentPublicInstance,
  type ShallowRef,
  ref,
  shallowRef,
} from "vue";

import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import {
  CUSTOM_TEXTS,
  type CustomTextKey,
  isCustomTextKey,
} from "@/config/custom-texts.ts";
import { graphql } from "@/gql";
import {
  DeleteCustomTextDocument,
  UpdateCustomTextDocument,
} from "@/gql/graphql.ts";
import { useCustomTextsStore } from "@/stores/useCustomTextsStore.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import EditableText from "@/components/core/EditableText.vue";

const { t } = useTypedI18n();
const { organization } = useOrganizationStore();
const { customTextsData } = useCustomTextsStore();

const editStates = ref(
  Object.fromEntries(CUSTOM_TEXTS.map(({ key }) => [key, false])) as Record<
    CustomTextKey,
    boolean
  >,
);

graphql(`
  mutation UpdateCustomText($oid: Int!, $key: String!, $value: String) {
    insertCustomTextOne(
      object: { oid: $oid, key: $key, value: $value }
      onConflict: { constraint: custom_text_pkey, updateColumns: [value] }
    ) {
      oid
      key
    }
  }

  mutation DeleteCustomText($oid: Int!, $key: String!) {
    deleteCustomTextByPk(oid: $oid, key: $key) {
      oid
      key
    }
  }
`);

const updateCustomText = useMutation(UpdateCustomTextDocument);
const deleteCustomText = useMutation(DeleteCustomTextDocument);

const updateCustomTextHandle = (key: string, value: string) =>
  value
    ? updateCustomText
        .executeMutation({ oid: organization.id, key, value })
        .then((result) => ({
          success: !!result.data?.insertCustomTextOne,
          error: result.error,
        }))
    : deleteCustomText
        .executeMutation({ oid: organization.id, key })
        .then((result) => ({
          success: !!result.data?.deleteCustomTextByPk,
          error: result.error,
        }));

// For deletion, use EditableText's exposed method
type EditableTextInstance = {
  clear: () => Promise<void>;
};

const editableTextRefs = Object.fromEntries(
  CUSTOM_TEXTS.map(({ key }) => [
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

const callOnDelete = async (key: CustomTextKey) => {
  if (
    confirm(
      t("admin.general.customTexts.confirm.delete", {
        label: t(`customTextLabel.${key}`),
      }),
    )
  ) {
    await editableTextRefs[key].value?.clear();
  }
};
</script>

<template>
  <QList bordered separator dense>
    <QExpansionItem
      v-for="{ key, value, defaultValue, markdown } in customTextsData"
      :key
      :label="t(`customTextLabel.${key}`)"
      dense
      dense-toggle
    >
      <QCard flat square>
        <QCardSection>
          <EditableText
            :ref="(el) => setRef(key, el)"
            v-model="editStates[key]"
            :text="value"
            :set-text="(value) => updateCustomTextHandle(key, value)"
            :default-text="defaultValue"
            :markdown
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
            @click="editStates[key] = true"
          />
          <QBtn
            :label="t('admin.general.customTexts.button.delete')"
            icon="sym_s_delete"
            color="primary"
            :disable="!value"
            no-caps
            outline
            dense
            @click="callOnDelete(key)"
          />
        </QCardActions>
      </QCard>
    </QExpansionItem>
  </QList>
</template>

<style scoped lang="scss"></style>
