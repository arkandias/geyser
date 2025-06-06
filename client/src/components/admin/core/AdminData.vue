<script
  setup
  lang="ts"
  generic="
    Row extends SimpleObject,
    IdKey extends string & keyof Row,
    T extends RowDescriptorExtra<string, Row>,
    InsertInput extends object,
    Constraint extends string,
    UpdateColumn extends string
  "
>
import { errorMessage } from "@geyser/shared";
import type { UseMutationResponse } from "@urql/vue";
import { type Ref, computed, ref, toValue, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import type { PrimitiveType } from "@/config/primitive-types.ts";
import { primitiveTypeName } from "@/locales/helpers.ts";
import type { Column } from "@/types/column.ts";
import type {
  FieldDescriptor,
  NullableParsedRow,
  Option,
  RowDescriptorExtra,
  Scalar,
  SelectOptions,
  SimpleObject,
} from "@/types/data.ts";
import { downloadCSV, getField, importCSV, normalizeForSearch } from "@/utils";

import AdminInput from "@/components/admin/core/AdminInput.vue";
import AdminSelect from "@/components/admin/core/AdminSelect.vue";
import AdminToggle from "@/components/admin/core/AdminToggle.vue";

type Id = Row[IdKey];
type FlatRow = Partial<NullableParsedRow<T>>;
type CustomMutationResponse<
  Name extends string,
  V extends object,
> = UseMutationResponse<
  Partial<Record<Name, { returning: Record<IdKey, Id>[] } | null>>,
  V
>;

const formValues = defineModel<Record<string, Scalar>>("formValues", {
  required: true,
});
const filterValues = defineModel<Record<string, Scalar[]>>("filterValues", {
  required: true,
});
const {
  section,
  name,
  idKey,
  rowDescriptor,
  rows,
  formatRow,
  validateFlatRow,
  formOptions = {},
  filterOptions = {},
  insertData,
  upsertData,
  updateData,
  deleteData,
  importConstraint,
  importUpdateColumns,
} = defineProps<{
  section: string;
  name: string;
  idKey: IdKey;
  rowDescriptor: T;
  rows: Row[];
  formatRow: (row: Row) => string;
  validateFlatRow: (flatRow: FlatRow) => InsertInput;
  formOptions?: SelectOptions<string, Row, T>;
  filterOptions?: SelectOptions<string, Row, T>;
  insertData: CustomMutationResponse<
    "insertData",
    { objects: InsertInput | InsertInput[] }
  >;
  upsertData: CustomMutationResponse<
    "upsertData",
    {
      objects: InsertInput | InsertInput[];
      onConflict?: {
        constraint: Constraint;
        updateColumns?: UpdateColumn[];
      } | null;
    }
  >;
  updateData: CustomMutationResponse<
    "updateData",
    {
      ids: Id | Id[];
      changes: InsertInput;
    }
  >;
  deleteData: CustomMutationResponse<"deleteData", { ids: Id | Id[] }>;
  importConstraint: Constraint;
  importUpdateColumns: UpdateColumn[];
}>();

const { t, n } = useTypedI18n();
const { notify } = useNotify();

const keyPrefix = `admin.${section}.${name}`;

// ===== Data Table =====
const columns = computed<Column<Row>[]>(() =>
  Object.entries(rowDescriptor).map(([key, descriptor]) => ({
    name: key,
    label: t(`${keyPrefix}.column.${key}.label`),
    tooltip: t(`${keyPrefix}.column.${key}.tooltip`),
    align:
      descriptor.type === "string"
        ? "left"
        : descriptor.type === "number"
          ? "right"
          : "center",
    field: descriptor.field ?? key,
    format:
      descriptor.type === "boolean"
        ? (val: boolean | null) => (val ? "✓" : "✗")
        : descriptor.numberFormat
          ? (val: number | null) =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              val === null ? null : n(val, descriptor.numberFormat!)
          : descriptor.format,
    sortable: true,
    searchable: descriptor.type === "string",
  })),
);

const selectedRows: Ref<Row[]> = ref([]);
const selection = computed(() => !!selectedRows.value.length);
const multipleSelection = computed<boolean>(
  () => selectedRows.value.length > 1,
);

// ===== Data Form =====
const isFormOpen = ref(false);
const formTitle = computed(() => {
  switch (selectedRows.value.length) {
    case 0:
      return t(`${keyPrefix}.form.title.none`);
    case 1:
      return t(`${keyPrefix}.form.title.single`, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        label: formatRow(selectedRows.value[0]!),
      });
    default:
      return t(`${keyPrefix}.form.title.multiple`, {
        count: selectedRows.value.length,
      });
  }
});
const selectedFields = ref<string[]>([]);

const initForm = (rows: Row[]) =>
  Object.fromEntries(
    Object.entries(rowDescriptor).map(([key, descriptor]) => [
      key,
      getField(rows[0], descriptor.field ?? key),
    ]),
  ) as Record<string, Scalar>;

const openForm = (rows?: Row[]) => {
  if (rows) {
    selectedRows.value = rows;
  }
  formValues.value = initForm(selectedRows.value);
  isFormOpen.value = true;
};

// ===== Data Operations =====
const validateForm = (fields?: (keyof T)[]): FlatRow => {
  const flatRow: Record<string, Scalar> = {};

  Object.entries(rowDescriptor).forEach(([key, fieldDescriptor]) => {
    if (fields && !fields.includes(key)) {
      return;
    }

    let value = formValues.value[key] ?? null;

    if (value === null) {
      if (!fieldDescriptor.nullable) {
        throw new Error(
          t("admin.data.error.emptyField", {
            field: t(`${keyPrefix}.column.${key}.label`),
          }),
        );
      }
    } else {
      switch (fieldDescriptor.type) {
        case "string":
          value = String(value).trim() || null;
          break;
        case "number":
          value = Number(value);
          if (!Number.isFinite(value)) {
            throw new Error(
              t("admin.data.error.notANumber", {
                field: t(`${keyPrefix}.column.${key}.label`),
              }),
            );
          }
          break;
        case "boolean":
          value = Boolean(value);
          break;
      }
    }

    flatRow[key] = value;
  });

  return flatRow as FlatRow;
};

const insertDataHandle = async () => {
  let object: InsertInput;
  try {
    object = validateFlatRow(validateForm());
  } catch (error) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.invalidForm"),
      caption: errorMessage(error, t("admin.data.error.unknownError")),
    });
    return;
  }

  const { data, error } = await insertData.executeMutation({
    objects: [object],
  });
  if (error || !data?.insertData?.returning) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.insertFailed"),
      caption: error
        ? errorMessage(error, t("admin.data.error.unknownError"))
        : t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t(
        `${keyPrefix}.data.success.insert`,
        data.insertData.returning.length,
      ),
    });
  }

  isFormOpen.value = false;
};

const updateDataHandle = async () => {
  let changes: InsertInput;
  try {
    changes = validateFlatRow(
      multipleSelection.value
        ? validateForm(selectedFields.value)
        : validateForm(),
    );
  } catch (error) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.invalidForm"),
      caption: errorMessage(error, t("admin.data.error.unknownError")),
    });
    return;
  }

  const { data, error } = await updateData.executeMutation({
    ids: selectedRows.value.map((row) => row[idKey]),
    changes,
  });
  if (error || !data?.updateData?.returning) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.updateFailed"),
      caption: error
        ? errorMessage(error, t("admin.data.error.unknownError"))
        : t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t(
        `${keyPrefix}.data.success.update`,
        data.updateData.returning.length,
      ),
    });
  }

  isFormOpen.value = false;
  selectedRows.value = [];
};

const deleteDataHandle = async () => {
  if (
    !selection.value ||
    !confirm(
      selectedRows.value.length === 1
        ? t(`${keyPrefix}.data.confirm.delete.single`, {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            label: formatRow(selectedRows.value[0]!),
          })
        : t(
            `${keyPrefix}.data.confirm.delete.multiple`,
            selectedRows.value.length,
          ),
    )
  ) {
    return;
  }

  const { data, error } = await deleteData.executeMutation({
    ids: selectedRows.value.map((row) => row[idKey]),
  });
  if (error || !data?.deleteData?.returning) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.deleteFailed"),
      caption: error ? errorMessage(error) : t("admin.data.error.noReturnData"),
    });
  } else {
    notify(NotifyType.Success, {
      message: t(
        `${keyPrefix}.data.success.delete`,
        data.deleteData.returning.length,
      ),
    });
  }

  selectedRows.value = [];
};

// ===== Search & Filtering =====
const search = ref<string | null>(null);
const searchableColumns = computed(() =>
  columns.value.filter((col) => toValue(col.searchable)).map((col) => col.name),
);

type Filter = {
  name: string;
  options: Scalar[] | Option[];
};

const showFilters = ref(false);
const filters: Ref<Filter[]> = ref(
  Object.entries(rowDescriptor)
    .filter(([_, descriptor]) => !descriptor.formType.startsWith("input"))
    .map(([key, descriptor]) => ({
      name: key,
      options: computed(() =>
        descriptor.formType === "select"
          ? (filterOptions[key] ?? formOptions[key] ?? [])
          : [
              // formType === 'toggle'
              { value: "✓", label: t("yes") },
              { value: "✗", label: t("no") },
            ],
      ),
    })),
);
const hasFilters = computed(() => !!filters.value.length);

const resetFilters = () => {
  filters.value.forEach((filter) => {
    filterValues.value[filter.name] = [];
  });
};

watch(showFilters, (value) => {
  if (!value) {
    resetFilters();
  }
});

const filterObj = computed(() => ({
  search: normalizeForSearch(search.value ?? ""),
  searchColumns: columns.value.filter((col) =>
    searchableColumns.value.includes(col.name),
  ),
  filters: filters.value,
}));

const filterMethod = (
  rows: readonly Row[],
  terms: typeof filterObj.value,
  cols: readonly Column<Row>[],
  getCellValue: (col: Column<Row>, row: Row) => Scalar,
): readonly Row[] =>
  rows.filter(
    (row) =>
      terms.searchColumns.some((col) =>
        normalizeForSearch(String(getField(row, col.field))).includes(
          terms.search,
        ),
      ) &&
      (!showFilters.value ||
        terms.filters.every((filter) => {
          if (!filterValues.value[filter.name]?.length) {
            return true;
          }
          const col = cols.find((col) => col.name === filter.name);
          return (
            !col ||
            filterValues.value[filter.name]?.includes(getCellValue(col, row))
          );
        })),
  );

// ===== Data Import =====
const isImportDialogOpen = ref(false);
const selectedFile = ref<File | null>(null);
const overwrite = ref(false);
const importing = ref(false);

watch(isImportDialogOpen, (value) => {
  if (value) {
    selectedFile.value = null;
    overwrite.value = false;
  }
});

const importColumns: Column<[string, FieldDescriptor]>[] = [
  {
    name: "key",
    label: t("admin.data.import.table.column.key"),
    align: "left",
    field: ([key]) => key,
  },
  {
    name: "type",
    label: t("admin.data.import.table.column.type"),
    align: "left",
    field: ([_, fieldDescriptor]) => fieldDescriptor.type,
    format: (val: PrimitiveType) => primitiveTypeName(t, val),
  },
  {
    name: "nonNullable",
    label: t("admin.data.import.table.column.nonNullable"),
    align: "center",
    field: ([_, fieldDescriptor]) => !fieldDescriptor.nullable,
    format: (val: boolean) => (val ? "✓" : "✗"),
  },
  {
    name: "info",
    label: t("admin.data.import.table.column.info"),
    align: "left",
    field: ([_, fieldDescriptor]) => fieldDescriptor.info,
  },
];

const importRowsHandle = async () => {
  if (!selectedFile.value) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.importFailed"),
      caption: t("admin.data.error.emptyFile"),
    });
    return;
  }

  importing.value = true;

  try {
    let text: string;
    try {
      text = await selectedFile.value.text();
    } catch (error) {
      throw new Error(
        t("admin.data.error.unreadableFile", {
          reason: errorMessage(error, t("admin.data.error.unknownError")),
        }),
      );
    }

    let flatRows: FlatRow[];
    try {
      flatRows = importCSV(text, rowDescriptor);
    } catch (error) {
      throw new Error(
        t("admin.data.error.parsingError", {
          reason: errorMessage(error, t("admin.data.error.unknownError")),
        }),
      );
    }

    const objects = flatRows.map((row, index) => {
      try {
        return validateFlatRow(row);
      } catch (error) {
        throw new Error(
          t("admin.data.error.invalidRow", {
            index,
            reason: errorMessage(error, t("admin.data.error.unknownError")),
          }),
        );
      }
    });

    const { data, error } = await upsertData.executeMutation({
      objects,
      onConflict: {
        constraint: importConstraint,
        updateColumns: overwrite.value ? importUpdateColumns : [],
      },
    });
    if (error || !data?.upsertData?.returning) {
      throw new Error(error?.message ?? t("admin.data.error.noReturnData"));
    } else {
      notify(NotifyType.Success, {
        message: t(
          `${keyPrefix}.data.success.import`,
          data.upsertData.returning.length,
        ),
      });
    }
    isImportDialogOpen.value = false;
  } catch (error) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.importFailed"),
      caption: errorMessage(error, t("admin.data.error.unknownError")),
    });
  } finally {
    importing.value = false;
  }
};

// ===== Data Export =====
const exportDataHandle = () => {
  try {
    downloadCSV(
      `${name}_${Date.now()}`,
      selectedRows.value.length ? selectedRows.value : rows,
      Object.keys(rowDescriptor),
    );
    notify(NotifyType.Success, {
      message: t(
        `${keyPrefix}.data.success.export`,
        selectedRows.value.length || rows.length,
      ),
    });
  } catch (error) {
    notify(NotifyType.Error, {
      message: t("admin.data.error.exportFailed"),
      caption: errorMessage(error, t("admin.data.error.unknownError")),
    });
  }
};
</script>

<template>
  <div class="q-mb-md">
    <div class="q-gutter-md row">
      <QBtn
        :label="t('admin.data.button.create')"
        icon="sym_s_add"
        color="primary"
        no-caps
        outline
        @click="openForm([])"
      />
      <QBtn
        :label="t('admin.data.button.edit')"
        icon="sym_s_edit"
        color="primary"
        :disable="!selection"
        no-caps
        outline
        @click="openForm()"
      />
      <QBtn
        :label="t('admin.data.button.delete')"
        icon="sym_s_delete"
        color="primary"
        :disable="!selection"
        no-caps
        outline
        @click="deleteDataHandle()"
      />
      <QSpace />
      <QBtn
        :label="t('admin.data.button.import')"
        icon="sym_s_upload"
        color="primary"
        no-caps
        outline
        @click="isImportDialogOpen = true"
      />
      <QBtn
        :label="t('admin.data.button.export')"
        icon="sym_s_download"
        color="primary"
        no-caps
        outline
        @click="exportDataHandle()"
      />
    </div>
  </div>

  <QTable
    v-model:selected="selectedRows"
    :columns
    :rows
    :pagination="{ rowsPerPage: 100 }"
    :rows-per-page-options="[0, 10, 20, 50, 100]"
    :filter="filterObj"
    :filter-method
    :row-key="idKey"
    selection="multiple"
    bordered
    flat
    dense
  >
    <template #top>
      <QInput
        v-if="searchableColumns.length"
        v-model="search"
        :placeholder="t('admin.data.search')"
        clearable
        clear-icon="sym_s_close"
        square
        dense
        :class="
          hasFilters
            ? 'search-input-with-filters'
            : 'search-input-without-filters'
        "
      />
      <QSpace />
      <QBtn
        v-if="hasFilters"
        icon="sym_s_filter_list"
        :color="showFilters ? 'primary' : 'grey'"
        flat
        round
        dense
        @click="showFilters = !showFilters"
      />
      <template v-if="showFilters">
        <AdminSelect
          v-for="filter in filters"
          :key="filter.name"
          v-model="filterValues[filter.name]"
          :options="filter.options"
          :key-prefix
          :name="filter.name"
          multiple
          style="width: 100%"
        />
      </template>
    </template>
    <template #header-cell="scope">
      <QTh :props="scope">
        {{ scope.col.label }}
        <QTooltip
          v-if="scope.col.tooltip"
          :delay="TOOLTIP_DELAY"
          anchor="top middle"
          self="center middle"
        >
          {{ scope.col.tooltip }}
        </QTooltip>
      </QTh>
    </template>
  </QTable>

  <QDialog v-model="isFormOpen" square>
    <QCard flat square>
      <QCardSection v-if="isFormOpen" class="text-h6">
        {{ formTitle }}
      </QCardSection>
      <QCardSection>
        <QForm
          :id="`admin-data-${name}-form`"
          class="q-gutter-md"
          @submit="selection ? updateDataHandle() : insertDataHandle()"
        >
          <div v-for="key in Object.keys(rowDescriptor)" :key>
            <AdminInput
              v-if="rowDescriptor[key]?.formType.startsWith('input')"
              v-model="formValues[key] as string | number | null | undefined"
              v-model:selected-fields="selectedFields"
              :key-prefix
              :name="key"
              :numeric="rowDescriptor[key]?.formType === 'inputNum'"
              :multiple-selection
            />
            <AdminSelect
              v-if="rowDescriptor[key]?.formType === 'select'"
              v-model="formValues[key]"
              v-model:selected-fields="selectedFields"
              :options="formOptions[key]"
              :key-prefix
              :name="key"
              :multiple-selection
            />
            <AdminToggle
              v-if="rowDescriptor[key]?.formType === 'toggle'"
              v-model="formValues[key]"
              v-model:selected-fields="selectedFields"
              :key-prefix
              :name="key"
              :multiple-selection
            />
          </div>
        </QForm>
      </QCardSection>
      <QCardActions align="right">
        <QBtn
          :form="`admin-data-${name}-form`"
          type="submit"
          :label="
            selection
              ? t('admin.data.button.update')
              : t('admin.data.button.create')
          "
          color="primary"
          :disable="multipleSelection && !selectedFields?.length"
          flat
          square
        />
      </QCardActions>
    </QCard>
  </QDialog>

  <QDialog v-model="isImportDialogOpen" square>
    <QCard flat square>
      <QCardSection class="text-h6">
        {{ t("admin.data.import.title") }}
      </QCardSection>
      <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
      <QCardSection v-html="t('admin.data.import.csvInstructions')" />
      <QCardSection>
        <QTable
          :columns="importColumns"
          :rows="Object.entries(rowDescriptor)"
          :pagination="{ rowsPerPage: 0 }"
          hide-bottom
          bordered
          flat
          dense
        />
      </QCardSection>
      <QCardSection>
        <div class="column q-gutter-md">
          <QFile
            v-model="selectedFile"
            accept=".csv"
            :label="t('admin.data.import.filePickerLabel')"
            clearable
            clear-icon="sym_s_close"
            outlined
            dense
          >
            <template #prepend>
              <QIcon name="sym_s_attach_file" />
            </template>
          </QFile>
          <QCheckbox
            v-model="overwrite"
            :label="t('admin.data.import.overwrite')"
            dense
          />
        </div>
      </QCardSection>
      <QCardActions align="right">
        <QBtn
          :loading="importing"
          :label="t('admin.data.button.import')"
          color="primary"
          flat
          square
          @click="importRowsHandle()"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<style scoped lang="scss">
.q-dialog .q-card {
  max-width: unset;
  width: $dialog-admin-data-width;
}
.search-input-with-filters {
  width: calc(100% - 50px);
}
.search-input-without-filters {
  width: 100%;
}
</style>
