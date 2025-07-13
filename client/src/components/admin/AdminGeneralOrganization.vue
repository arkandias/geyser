<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { ref, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { DEFAULT_LOCALE } from "@/config/constants.ts";
import { graphql } from "@/gql";
import { type LocaleEnum, UpdateOrganizationDocument } from "@/gql/graphql.ts";
import { localeOptions } from "@/services/i18n.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

const { t } = useTypedI18n();
const { notify } = useNotify();
const { organization } = useOrganizationStore();

graphql(`
  mutation UpdateOrganization($oid: Int!, $input: OrganizationSetInput!) {
    updateOrganizationByPk(pkColumns: { id: $oid }, _set: $input) {
      id
    }
  }
`);

const updateOrganization = useMutation(UpdateOrganizationDocument);

const label = ref<string>("");
const sublabel = ref<string | null>("");
const email = ref<string>("");
const locale = ref<LocaleEnum>(DEFAULT_LOCALE);
const privateService = ref<boolean>(false);

const resetParameters = () => {
  label.value = organization.label;
  sublabel.value = organization.sublabel;
  email.value = organization.email;
  locale.value = organization.locale;
  privateService.value = organization.privateService;
};

watch(organization, resetParameters, { immediate: true });

const updateParameters = async (): Promise<void> => {
  // Validate parameters
  label.value = label.value.trim();
  if (!label.value) {
    notify(NotifyType.Error, {
      message: t("admin.general.organization.error.emptyLabel"),
    });
    return;
  }
  sublabel.value = sublabel.value?.trim() ?? null;
  email.value = email.value.trim();
  if (!email.value) {
    notify(NotifyType.Error, {
      message: t("admin.general.organization.error.emptyEmail"),
    });
    return;
  }

  const { error } = await updateOrganization.executeMutation({
    oid: organization.id,
    input: {
      label: label.value,
      sublabel: sublabel.value,
      email: email.value,
      locale: locale.value,
      privateService: privateService.value,
    },
  });
  if (error) {
    notify(NotifyType.Error, {
      message: t("admin.general.organization.error.update"),
      caption: error.message,
    });
  } else {
    notify(NotifyType.Success, {
      message: t("admin.general.organization.success.update"),
    });
  }
};
</script>

<template>
  <div class="column q-gutter-md">
    <div>
      <label class="text-subtitle2">
        {{ t("admin.general.organization.parameter.label") }}
      </label>
      <QInput v-model="label" flat square dense />
    </div>

    <div>
      <label class="text-subtitle2">
        {{ t("admin.general.organization.parameter.sublabel") }}
      </label>
      <QInput v-model="sublabel" flat square dense />
    </div>

    <div>
      <label class="text-subtitle2">
        {{ t("admin.general.organization.parameter.email") }}
      </label>
      <QInput v-model="email" flat square dense />
    </div>

    <div>
      <label class="text-subtitle2">
        {{ t("admin.general.organization.parameter.locale") }}
      </label>
      <QOptionGroup
        v-model="locale"
        :options="localeOptions"
        type="radio"
        inline
      />
    </div>

    <div class="column">
      <label class="text-subtitle2">
        {{ t("admin.general.organization.parameter.privateService") }}
      </label>
      <QToggle v-model="privateService" />
    </div>

    <div class="row">
      <QBtn
        :label="t('admin.general.organization.button.submit')"
        icon="sym_s_check"
        color="primary"
        no-caps
        outline
        class="q-mr-md"
        @click="updateParameters()"
      />
      <QBtn
        :label="t('admin.general.organization.button.reset')"
        icon="sym_s_close"
        color="primary"
        no-caps
        outline
        @click="resetParameters()"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
