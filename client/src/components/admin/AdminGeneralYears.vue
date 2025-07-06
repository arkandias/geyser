<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { ref } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import { graphql } from "@/gql";
import {
  ComputePrioritiesDocument,
  CopyCoursesDocument,
  CopyServicesDocument,
  CreateServicesDocument,
  DeleteYearDocument,
  InsertYearDocument,
  SetCurrentYearDocument,
  UpdateYearDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

import NumInput from "@/components/core/NumInput.vue";

const { t } = useTypedI18n();
const { notify } = useNotify();
const { organization } = useOrganizationStore();
const { years, currentYear } = useYearsStore();

const selectedYear = ref<number | null>(null);
const isFormOpen = ref(false);
const yearValue = ref<number | null>(null);

graphql(`
  mutation SetCurrentYear($oid: Int!, $value: Int!) {
    updateYearByPk(
      pkColumns: { oid: $oid, value: $value }
      _set: { current: true }
    ) {
      oid
      value
    }
  }

  mutation InsertYear($oid: Int!, $value: Int!, $visible: Boolean!) {
    insertYearOne(object: { oid: $oid, value: $value, visible: $visible }) {
      oid
      value
    }
  }

  mutation UpdateYear($oid: Int!, $value: Int!, $changes: YearSetInput!) {
    updateYearByPk(pkColumns: { oid: $oid, value: $value }, _set: $changes) {
      oid
      value
    }
  }

  mutation DeleteYear($oid: Int!, $value: Int!) {
    deleteYearByPk(oid: $oid, value: $value) {
      oid
      value
    }
  }

  mutation CreateServices($year: Int!) {
    createYearServices(args: { p_year: $year }) {
      oid
      id
    }
  }

  mutation CopyServices($year: Int!) {
    copyYearServices(args: { p_year: $year }) {
      oid
      id
    }
  }

  mutation CopyCourses($year: Int!) {
    copyYearCourses(args: { p_year: $year }) {
      oid
      id
    }
  }

  mutation ComputePriorities($year: Int!) {
    computeYearPriorities(args: { p_year: $year }) {
      oid
      id
    }
  }
`);

const setCurrentYear = useMutation(SetCurrentYearDocument);
const insertYear = useMutation(InsertYearDocument);
const updateYear = useMutation(UpdateYearDocument);
const deleteYear = useMutation(DeleteYearDocument);
const createServices = useMutation(CreateServicesDocument);
const copyServices = useMutation(CopyServicesDocument);
const copyCourses = useMutation(CopyCoursesDocument);
const computePriorities = useMutation(ComputePrioritiesDocument);

const setCurrentYearHandle = async (year: number): Promise<void> => {
  const { error } = await setCurrentYear.executeMutation({
    oid: organization.id,
    value: year,
  });

  if (error) {
    notify(NotifyType.Error, {
      message: t("admin.general.years.error.setCurrent"),
      caption: error.message,
    });
  } else {
    notify(NotifyType.Success, {
      message: t("admin.general.years.success.setCurrent"),
    });
  }
};

const insertYearHandle = async () => {
  if (yearValue.value === null) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.invalidForm"),
      caption: t("admin.general.years.error.emptyValue"),
    });
    return;
  }

  const { data, error } = await insertYear.executeMutation({
    oid: organization.id,
    value: yearValue.value,
    visible: false,
  });

  isFormOpen.value = false;

  if (error || data?.insertYearOne?.value === undefined) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.insertFailed"),
      caption: error?.message ?? t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t("admin.general.years.success.insert", {
        value: data.insertYearOne.value,
      }),
    });
  }
};

const updateYearHandle = async (
  value: number,
  changes: {
    value?: number;
    visible?: boolean;
  },
) => {
  const { data, error } = await updateYear.executeMutation({
    oid: organization.id,
    value,
    changes,
  });

  isFormOpen.value = false;

  if (error || data?.updateYearByPk?.value === undefined) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.updateFailed"),
      caption: error?.message ?? t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t("admin.general.years.success.update", {
        value: data.updateYearByPk.value,
      }),
    });
  }
};

const updateYearValueHandle = async () => {
  if (selectedYear.value === null) {
    return;
  }

  if (yearValue.value === null) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.invalidForm"),
      caption: t("admin.general.years.error.emptyValue"),
    });
    return;
  }

  await updateYearHandle(selectedYear.value, { value: yearValue.value });
};

const updateYearVisibilityHandle = async (value: number, visible: boolean) => {
  await updateYearHandle(value, { visible });
};

const deleteYearHandle = async (value: number) => {
  if (!confirm(t("admin.general.years.confirm.delete", { year: value }))) {
    return;
  }

  const { data, error } = await deleteYear.executeMutation({
    oid: organization.id,
    value,
  });
  if (error || data?.deleteYearByPk?.value === undefined) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.deleteFailed"),
      caption: error?.message ?? t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t("admin.general.years.success.delete"),
    });
  }
};

const createServicesHandle = async () => {
  if (selectedYear.value === null) {
    return;
  }

  const { data, error } = await createServices.executeMutation(
    { year: selectedYear.value },
    { additionalTypenames: ["Service"] },
  );

  if (error || !data?.createYearServices) {
    notify(NotifyType.Error, {
      message: t("admin.general.years.error.createServices"),
      caption: error?.message ?? t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t(
        "admin.general.years.success.createServices",
        data.createYearServices.length,
      ),
    });
  }
};

const copyServicesHandle = async () => {
  if (selectedYear.value === null) {
    return;
  }

  const { data, error } = await copyServices.executeMutation(
    { year: selectedYear.value },
    { additionalTypenames: ["Service"] },
  );

  if (error || !data?.copyYearServices) {
    notify(NotifyType.Error, {
      message: t("admin.general.years.error.copyServices"),
      caption: error?.message ?? t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t(
        "admin.general.years.success.copyServices",
        data.copyYearServices.length,
      ),
    });
  }
};

const copyCoursesHandle = async () => {
  if (selectedYear.value === null) {
    return;
  }

  const { data, error } = await copyCourses.executeMutation(
    { year: selectedYear.value },
    { additionalTypenames: ["Coordination", "Course"] },
  );

  if (error || !data?.copyYearCourses) {
    notify(NotifyType.Error, {
      message: t("admin.general.years.error.copyCourses"),
      caption: error?.message ?? t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t(
        "admin.general.years.success.copyCourses",
        data.copyYearCourses.length,
      ),
    });
  }
};

const computePrioritiesHandle = async () => {
  if (selectedYear.value === null) {
    return;
  }

  const { data, error } = await computePriorities.executeMutation(
    { year: selectedYear.value },
    { additionalTypenames: ["Priority", "Request"] },
  );

  if (error || !data?.computeYearPriorities) {
    notify(NotifyType.Error, {
      message: t("admin.general.years.error.computePriorities"),
      caption: error?.message ?? t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t("admin.general.years.success.computePriorities", {
        count: data.computeYearPriorities.length,
      }),
    });
  }
};

const create = () => {
  selectedYear.value = null;
  yearValue.value = null;
  isFormOpen.value = true;
};

const edit = (value: number) => {
  selectedYear.value = value;
  yearValue.value = value;
  isFormOpen.value = true;
};
</script>

<template>
  <div class="q-mb-md">
    <QBtn
      :label="t('admin.general.years.button.create')"
      icon="sym_s_add"
      color="primary"
      no-caps
      outline
      @click="create()"
    />
  </div>

  <QList bordered separator dense>
    <QItem v-for="year in years" :key="year.value" dense>
      <QItemSection side>
        <QBtn
          icon="sym_s_settings"
          color="primary"
          flat
          square
          dense
          @click="selectedYear = year.value"
        >
          <QMenu square auto-close>
            <QList>
              <QItem clickable @click="createServicesHandle()">
                <QItemSection side>
                  <QIcon name="sym_s_assignment_ind" color="primary" />
                </QItemSection>
                <QItemSection>
                  {{ t("admin.general.years.button.createServices") }}
                </QItemSection>
              </QItem>
              <QItem clickable @click="copyServicesHandle()">
                <QItemSection side>
                  <QIcon name="sym_s_content_copy" color="primary" />
                </QItemSection>
                <QItemSection>
                  {{ t("admin.general.years.button.copyServices") }}
                </QItemSection>
              </QItem>
              <QItem clickable @click="copyCoursesHandle()">
                <QItemSection side>
                  <QIcon name="sym_s_content_copy" color="primary" />
                </QItemSection>
                <QItemSection>
                  {{ t("admin.general.years.button.copyCourses") }}
                </QItemSection>
              </QItem>
              <QItem clickable @click="computePrioritiesHandle()">
                <QItemSection side>
                  <QIcon name="sym_s_assignment_late" color="primary" />
                </QItemSection>
                <QItemSection>
                  {{ t("admin.general.years.button.computePriorities") }}
                </QItemSection>
              </QItem>
            </QList>
          </QMenu>
          <QTooltip :delay="TOOLTIP_DELAY">
            {{ t("admin.general.years.tooltip.manage") }}
          </QTooltip>
        </QBtn>
      </QItemSection>
      <QItemSection side>
        <QBtn
          icon="sym_s_edit"
          color="primary"
          flat
          square
          dense
          @click="edit(year.value)"
        >
          <QTooltip :delay="TOOLTIP_DELAY">
            {{ t("admin.general.years.tooltip.edit") }}
          </QTooltip>
        </QBtn>
      </QItemSection>
      <QItemSection side>
        <QBtn
          icon="sym_s_delete"
          color="primary"
          flat
          square
          dense
          @click="deleteYearHandle(year.value)"
        >
          <QTooltip :delay="TOOLTIP_DELAY">
            {{ t("admin.general.years.tooltip.delete") }}
          </QTooltip>
        </QBtn>
      </QItemSection>
      <QItemSection>
        {{ year.value }}
      </QItemSection>
      <QItemSection side>
        <QToggle
          v-model="year.visible"
          :label="t('admin.general.years.visible')"
          :disable="year.current"
          @update:model-value="
            (value) => updateYearVisibilityHandle(year.value, value)
          "
        />
      </QItemSection>
      <QItemSection side>
        <QRadio
          :model-value="currentYear"
          :val="year.value"
          :label="t('admin.general.years.current')"
          :disable="!year.visible"
          dense
          @update:model-value="setCurrentYearHandle"
        />
      </QItemSection>
    </QItem>
  </QList>

  <QDialog v-model="isFormOpen" square>
    <QCard flat square>
      <QCardSection>
        <QForm
          id="year-insert"
          class="q-gutter-md"
          @submit="selectedYear ? updateYearValueHandle() : insertYearHandle()"
        >
          <NumInput
            v-model="yearValue"
            :label="t('admin.general.years.year')"
          />
        </QForm>
      </QCardSection>
      <QSeparator />
      <QCardActions align="right">
        <QBtn
          form="year-insert"
          type="submit"
          :label="
            selectedYear
              ? t('admin.general.years.button.update')
              : t('admin.general.years.button.create')
          "
          color="primary"
          :disable="yearValue === null"
          flat
          square
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<style scoped lang="scss"></style>
