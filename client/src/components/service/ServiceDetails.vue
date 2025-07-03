<script setup lang="ts">
import { useMutation, useQuery } from "@urql/vue";
import { computed, ref, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  DeleteExternalCourseDocument,
  DeleteModificationDocument,
  GetModificationTypesDocument,
  InsertExternalCourseDocument,
  InsertModificationDocument,
  ServiceDetailsFragmentDoc,
  UpdateServiceHoursDocument,
} from "@/gql/graphql.ts";
import { useOrganizationStore } from "@/stores/useOrganizationStore.ts";

import DetailsSection from "@/components/core/DetailsSection.vue";
import NumInput from "@/components/core/NumInput.vue";
import ServiceTable from "@/components/service/ServiceTable.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof ServiceDetailsFragmentDoc>;
}>();

graphql(`
  fragment ServiceDetails on Service {
    oid
    id
    year
    teacherId
    hours
    modifications(orderBy: [{ type: { label: ASC } }, { hours: ASC }]) {
      oid
      id
      modificationType: type {
        label
      }
      hours
    }
    externalCourses(orderBy: [{ label: ASC }]) {
      oid
      id
      label
      hours
    }
  }

  mutation UpdateServiceHours($oid: Int!, $id: Int!, $hours: Float!) {
    updateServiceByPk(
      pkColumns: { oid: $oid, id: $id }
      _set: { hours: $hours }
    ) {
      oid
      id
    }
  }

  query GetModificationTypes($oid: Int!) {
    modificationTypes: serviceModificationType(
      where: { oid: { _eq: $oid } }
      orderBy: { label: ASC }
    ) {
      id
      label
      description
    }
  }

  mutation InsertModification(
    $oid: Int!
    $serviceId: Int!
    $modificationTypeId: Int!
    $hours: Float!
  ) {
    insertServiceModificationOne(
      object: {
        oid: $oid
        serviceId: $serviceId
        typeId: $modificationTypeId
        hours: $hours
      }
    ) {
      oid
      id
    }
  }

  mutation DeleteModification($oid: Int!, $id: Int!) {
    deleteServiceModificationByPk(oid: $oid, id: $id) {
      oid
      id
    }
  }

  mutation InsertExternalCourse(
    $oid: Int!
    $serviceId: Int!
    $label: String!
    $hours: Float!
  ) {
    insertExternalCourseOne(
      object: { oid: $oid, serviceId: $serviceId, label: $label, hours: $hours }
    ) {
      oid
      id
    }
  }

  mutation DeleteExternalCourse($oid: Int!, $id: Int!) {
    deleteExternalCourseByPk(oid: $oid, id: $id) {
      oid
      id
    }
  }
`);

const { t, n } = useTypedI18n();
const { notify } = useNotify();
const perm = usePermissions();
const { organization } = useOrganizationStore();

const service = computed(() =>
  useFragment(ServiceDetailsFragmentDoc, dataFragment),
);

const updateServiceHours = useMutation(UpdateServiceHoursDocument);
const insertModification = useMutation(InsertModificationDocument);
const deleteModification = useMutation(DeleteModificationDocument);
const insertExternalCourse = useMutation(InsertExternalCourseDocument);
const deleteExternalCourse = useMutation(DeleteExternalCourseDocument);

const totalService = computed(
  () =>
    service.value.hours -
    service.value.modifications.reduce((t, m) => t + m.hours, 0) -
    service.value.externalCourses.reduce((t, c) => t + c.hours, 0),
);

// Base service hours form
const isBaseServiceFormOpen = ref(false);
const baseServiceHours = ref<number | null>(null);
const resetBaseServiceForm = (): void => {
  isBaseServiceFormOpen.value = false;
  baseServiceHours.value = service.value.hours;
};
const submitBaseServiceForm = async (): Promise<void> => {
  if (baseServiceHours.value === null || baseServiceHours.value < 0) {
    notify(NotifyType.Error, {
      message: t("service.details.baseServiceForm.invalid.message"),
      caption: t("service.details.baseServiceForm.invalid.caption.hours"),
    });
    return;
  }
  if (baseServiceHours.value === service.value.hours) {
    notify(NotifyType.Default, {
      message: t("service.details.baseServiceForm.noChanges"),
    });
  } else {
    const { data, error } = await updateServiceHours.executeMutation({
      oid: service.value.oid,
      id: service.value.id,
      hours: baseServiceHours.value,
    });
    if (data?.updateServiceByPk && !error) {
      notify(NotifyType.Success, {
        message: t("service.details.baseServiceForm.success"),
      });
    } else {
      notify(NotifyType.Error, {
        message: t("service.details.baseServiceForm.error"),
        caption: error?.message,
      });
    }
  }
  resetBaseServiceForm();
};
watch(service, resetBaseServiceForm, { immediate: true });

// Modifications form
const isModificationFormOpen = ref(false);
const { data } = useQuery({
  query: GetModificationTypesDocument,
  variables: { oid: organization.id },
  pause: () => !isModificationFormOpen.value,
  context: {
    additionalTypenames: ["All", "ServiceModificationType"],
  },
});
const modificationTypesOptions = computed(
  () => data.value?.modificationTypes ?? [],
);
const modificationTypeId = ref<number | null>(null);
const modificationHours = ref<number | null>(null);
const resetModificationForm = (): void => {
  isModificationFormOpen.value = false;
  modificationTypeId.value = null;
  modificationHours.value = null;
};
const submitModificationForm = async (): Promise<void> => {
  if (!modificationTypeId.value) {
    notify(NotifyType.Error, {
      message: t("service.details.modificationForm.invalid.message"),
      caption: t("service.details.modificationForm.invalid.caption.type"),
    });
    return;
  }
  if (modificationHours.value === null || modificationHours.value <= 0) {
    notify(NotifyType.Error, {
      message: t("service.details.modificationForm.invalid.message"),
      caption: t("service.details.modificationForm.invalid.caption.hours"),
    });
    return;
  }
  const { data, error } = await insertModification.executeMutation({
    oid: service.value.oid,
    serviceId: service.value.id,
    modificationTypeId: modificationTypeId.value,
    hours: modificationHours.value,
  });
  if (data?.insertServiceModificationOne && !error) {
    notify(NotifyType.Success, {
      message: t("service.details.modificationForm.success.create"),
    });
  } else {
    notify(NotifyType.Error, {
      message: t("service.details.modificationForm.error.create"),
      caption: error?.message,
    });
  }
  resetModificationForm();
};
const handleModificationDeletion = async (
  oid: number,
  id: number,
): Promise<void> => {
  const { data, error } = await deleteModification.executeMutation({
    oid,
    id,
  });
  if (data?.deleteServiceModificationByPk && !error) {
    notify(NotifyType.Success, {
      message: t("service.details.modificationForm.success.delete"),
    });
  } else {
    notify(NotifyType.Error, {
      message: t("service.details.modificationForm.error.delete"),
      caption: error?.message,
    });
  }
};

// External courses form
const isExternalCourseFormOpen = ref(false);
const externalCourseLabel = ref<string | null>(null);
const externalCourseHours = ref<number | null>(null);
const resetExternalCourseForm = (): void => {
  isExternalCourseFormOpen.value = false;
  externalCourseLabel.value = null;
  externalCourseHours.value = null;
};
const submitExternalCourseForm = async (): Promise<void> => {
  if (!externalCourseLabel.value) {
    notify(NotifyType.Error, {
      message: t("service.details.externalCourseForm.invalid.message"),
      caption: t("service.details.externalCourseForm.invalid.caption.label"),
    });
    return;
  }
  if (externalCourseHours.value === null || externalCourseHours.value < 0) {
    notify(NotifyType.Error, {
      message: t("service.details.externalCourseForm.invalid.message"),
      caption: t("service.details.externalCourseForm.invalid.caption.hours"),
    });
    return;
  }
  const { data, error } = await insertExternalCourse.executeMutation({
    oid: service.value.oid,
    serviceId: service.value.id,
    label: externalCourseLabel.value,
    hours: externalCourseHours.value,
  });
  if (data?.insertExternalCourseOne && !error) {
    notify(NotifyType.Success, {
      message: t("service.details.externalCourseForm.success.create"),
    });
  } else {
    notify(NotifyType.Error, {
      message: t("service.details.externalCourseForm.error.create"),
      caption: error?.message,
    });
  }
  resetExternalCourseForm();
};
const handleExternalCourseDeletion = async (
  oid: number,
  id: number,
): Promise<void> => {
  const { data, error } = await deleteExternalCourse.executeMutation({
    oid,
    id,
  });
  if (data?.deleteExternalCourseByPk && !error) {
    notify(NotifyType.Success, {
      message: t("service.details.externalCourseForm.success.delete"),
    });
  } else {
    notify(NotifyType.Error, {
      message: t("service.details.externalCourseForm.error.delete"),
      caption: error?.message,
    });
  }
};

const formatWH = (hours: number) =>
  n(hours, "decimal") + "\u00A0" + t("unit.weightedHours");
</script>

<template>
  <DetailsSection :title="t('service.details.title')">
    <ServiceTable>
      <tbody>
        <tr>
          <td>
            {{ t("service.details.baseServiceHours") }}
            <QBtn
              v-if="perm.toEditAService(service)"
              form="edit-base-service"
              icon="sym_s_edit"
              color="primary"
              size="sm"
              flat
              square
              dense
              @click="isBaseServiceFormOpen = true"
            >
              <QTooltip :delay="TOOLTIP_DELAY">
                {{ t("service.details.baseServiceForm.tooltip.edit") }}
              </QTooltip>
            </QBtn>
          </td>
          <td>
            {{ formatWH(service.hours) }}
          </td>
        </tr>
        <tr>
          <td>
            {{ t("service.details.modifications") }}
            <QBtn
              v-if="perm.toEditAService(service)"
              icon="sym_s_add_circle"
              color="primary"
              size="sm"
              flat
              square
              dense
              @click="isModificationFormOpen = true"
            >
              <QTooltip :delay="TOOLTIP_DELAY">
                {{ t("service.details.modificationForm.tooltip.create") }}
              </QTooltip>
            </QBtn>
          </td>
          <td />
        </tr>
        <tr v-for="m in service.modifications" :key="m.id">
          <td>
            <QBtn
              v-if="perm.toEditAService(service)"
              icon="sym_s_cancel"
              color="primary"
              size="sm"
              flat
              square
              dense
              @click="handleModificationDeletion(m.oid, m.id)"
            >
              <QTooltip :delay="TOOLTIP_DELAY">
                {{ t("service.details.modificationForm.tooltip.delete") }}
              </QTooltip>
            </QBtn>
            {{ m.modificationType.label }}
          </td>
          <td>
            {{ formatWH(m.hours) }}
          </td>
        </tr>
        <tr>
          <td>
            {{ t("service.details.externalCourses") }}
            <QBtn
              v-if="perm.toEditAService(service)"
              icon="sym_s_add_circle"
              color="primary"
              size="sm"
              flat
              square
              dense
              @click="isExternalCourseFormOpen = true"
            >
              <QTooltip :delay="TOOLTIP_DELAY">
                {{ t("service.details.externalCourseForm.tooltip.create") }}
              </QTooltip>
            </QBtn>
          </td>
          <td />
        </tr>
        <tr v-for="c in service.externalCourses" :key="c.id">
          <td>
            <QBtn
              v-if="perm.toEditAService(service)"
              icon="sym_s_cancel"
              color="primary"
              size="sm"
              flat
              square
              dense
              @click="handleExternalCourseDeletion(c.oid, c.id)"
            >
              <QTooltip :delay="TOOLTIP_DELAY">
                {{ t("service.details.externalCourseForm.tooltip.delete") }}
              </QTooltip>
            </QBtn>
            {{ c.label }}
          </td>
          <td>
            {{ formatWH(c.hours) }}
          </td>
        </tr>
        <tr class="text-bold">
          <td>
            {{ t("service.details.total") }}
          </td>
          <td>
            {{ formatWH(totalService) }}
          </td>
        </tr>
      </tbody>
    </ServiceTable>
  </DetailsSection>

  <QDialog v-model="isBaseServiceFormOpen" square>
    <QCard flat square>
      <QCardSection>
        <QForm
          id="edit-base-service"
          class="q-gutter-md"
          @submit.prevent="submitBaseServiceForm"
          @reset="resetBaseServiceForm"
        >
          <NumInput
            v-model="baseServiceHours"
            :label="t('service.details.baseServiceForm.field.hours')"
          />
        </QForm>
      </QCardSection>
      <QSeparator />
      <QCardActions align="right">
        <QBtn
          form="edit-base-service"
          type="submit"
          :label="t('service.details.baseServiceForm.button.update')"
          color="primary"
          flat
          square
        />
      </QCardActions>
    </QCard>
  </QDialog>

  <QDialog v-model="isModificationFormOpen" square>
    <QCard flat square>
      <QCardSection>
        <QForm
          id="add-modification"
          class="q-gutter-md"
          @submit.prevent="submitModificationForm"
          @reset="resetModificationForm"
        >
          <QSelect
            v-model="modificationTypeId"
            :options="modificationTypesOptions"
            :label="t('service.details.modificationForm.field.type')"
            option-value="id"
            emit-value
            map-options
            square
            dense
            options-dense
          >
            <template #option="scope">
              <QItem v-bind="scope.itemProps">
                <QItemSection>
                  <QItemLabel>
                    {{ scope.opt.label }}
                  </QItemLabel>
                  <QItemLabel v-if="scope.opt.description" caption>
                    {{ scope.opt.description }}
                  </QItemLabel>
                </QItemSection>
              </QItem>
            </template>
          </QSelect>
          <NumInput
            v-model="modificationHours"
            :label="t('service.details.modificationForm.field.hours')"
          />
        </QForm>
      </QCardSection>
      <QSeparator />
      <QCardActions align="right">
        <QBtn
          form="add-modification"
          type="submit"
          :label="t('service.details.modificationForm.button.add')"
          color="primary"
          flat
          square
        />
      </QCardActions>
    </QCard>
  </QDialog>

  <QDialog v-model="isExternalCourseFormOpen" square>
    <QCard flat square>
      <QCardSection>
        <QForm
          id="add-external-course"
          class="q-gutter-md"
          @submit.prevent="submitExternalCourseForm"
          @reset="resetExternalCourseForm"
        >
          <QInput
            v-model="externalCourseLabel"
            :label="t('service.details.externalCourseForm.field.label')"
            square
            dense
          />
          <NumInput
            v-model="externalCourseHours"
            :label="t('service.details.externalCourseForm.field.hours')"
          />
        </QForm>
      </QCardSection>
      <QSeparator />
      <QCardActions align="right">
        <QBtn
          form="add-external-course"
          type="submit"
          :label="t('service.details.externalCourseForm.button.add')"
          color="primary"
          flat
          square
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<style scoped lang="scss">
.q-dialog .q-card {
  width: 360px;
}
</style>
