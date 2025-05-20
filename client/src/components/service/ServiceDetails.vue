<script setup lang="ts">
import { useMutation, useQuery } from "@urql/vue";
import { computed, ref, watch } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  DeleteModificationDocument,
  GetModificationTypesDocument,
  InsertModificationDocument,
  TeacherServiceDetailsFragmentDoc,
  UpdateServiceDocument,
} from "@/gql/graphql.ts";

import DetailsSection from "@/components/core/DetailsSection.vue";
import NumInput from "@/components/core/NumInput.vue";
import ServiceTable from "@/components/service/ServiceTable.vue";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof TeacherServiceDetailsFragmentDoc>;
}>();

graphql(`
  fragment TeacherServiceDetails on Service {
    id
    uid
    year
    hours
    modifications(orderBy: [{ type: { label: ASC } }, { hours: ASC }]) {
      id
      modificationType: type {
        label
      }
      hours
    }
  }

  mutation UpdateService($year: Int!, $uid: String!, $hours: Float!) {
    services: updateService(
      where: { year: { _eq: $year }, uid: { _eq: $uid } }
      _set: { hours: $hours }
    ) {
      returning {
        id
      }
    }
  }

  query GetModificationTypes {
    modificationTypes: serviceModificationType(orderBy: { label: ASC }) {
      id
      label
      description
    }
  }

  mutation InsertModification(
    $serviceId: Int!
    $modificationTypeId: Int!
    $hours: Float!
  ) {
    serviceModification: insertServiceModificationOne(
      object: {
        serviceId: $serviceId
        typeId: $modificationTypeId
        hours: $hours
      }
    ) {
      id
    }
  }

  mutation DeleteModification($id: Int!) {
    serviceModification: deleteServiceModificationByPk(id: $id) {
      id
    }
  }
`);

const { t, n } = useTypedI18n();
const { notify } = useNotify();
const perm = usePermissions();

const updateService = useMutation(UpdateServiceDocument);
const insertModification = useMutation(InsertModificationDocument);
const deleteModification = useMutation(DeleteModificationDocument);

const service = computed(() =>
  useFragment(TeacherServiceDetailsFragmentDoc, dataFragment),
);
const totalService = computed(
  () =>
    service.value.hours -
    service.value.modifications.reduce((t, m) => t + m.hours, 0),
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
    const { data, error } = await updateService.executeMutation({
      year: service.value.year,
      uid: service.value.uid,
      hours: baseServiceHours.value,
    });
    if (data?.services?.returning[0] && !error) {
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
  variables: {},
  pause: () => !isModificationFormOpen.value,
  context: { additionalTypenames: ["All", "ServiceModificationType"] },
});
const modificationTypesOptions = computed(
  () => data.value?.modificationTypes ?? [],
);
const modificationTypeId = ref<number | null>(null);
const modificationHours = ref<number | null>(null);
const resetModificationForm = (): void => {
  isModificationFormOpen.value = false;
  modificationTypeId.value = null;
  modificationHours.value = 0;
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
    serviceId: service.value.id,
    modificationTypeId: modificationTypeId.value,
    hours: modificationHours.value,
  });
  if (data?.serviceModification && !error) {
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

const handleModificationDeletion = async (id: number): Promise<void> => {
  const { data, error } = await deleteModification.executeMutation({ id });
  if (data?.serviceModification && !error) {
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

const formatWH = (hours: number) =>
  n(hours, "decimal") + "\u00A0" + t("unit.weightedHours");
</script>

<template>
  <DetailsSection :title="t('service.details.title')">
    <form
      id="edit-base-service"
      @submit.prevent="submitBaseServiceForm"
      @reset="resetBaseServiceForm"
    />
    <form
      id="add-modification"
      @submit.prevent="submitModificationForm"
      @reset="resetModificationForm"
    />
    <ServiceTable>
      <tbody>
        <tr>
          <td>
            {{ t("service.details.baseServiceHours") }}
            <QBtn
              v-if="isBaseServiceFormOpen"
              form="edit-base-service"
              type="submit"
              icon="sym_s_check_circle"
              color="primary"
              size="sm"
              flat
              square
              dense
            >
              <QTooltip :delay="TOOLTIP_DELAY">
                {{ t("service.details.baseServiceForm.tooltip.validate") }}
              </QTooltip>
            </QBtn>
            <QBtn
              v-else-if="perm.toEditAService(service)"
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
          <td v-if="isBaseServiceFormOpen">
            <NumInput
              v-model="baseServiceHours"
              :label="t('service.details.baseServiceForm.fields.hours')"
              form="edit-base-service"
              class="inline-block"
            />
          </td>
          <td v-else>
            {{ formatWH(service.hours) }}
          </td>
        </tr>
        <tr>
          <td>
            {{ t("service.details.modifications") }}
            <QBtn
              v-if="isModificationFormOpen"
              form="add-modification"
              type="submit"
              icon="sym_s_check_circle"
              color="primary"
              size="sm"
              flat
              square
              dense
            >
              <QTooltip :delay="TOOLTIP_DELAY">
                {{ t("service.details.modificationForm.tooltip.validate") }}
              </QTooltip>
            </QBtn>
            <QBtn
              v-else-if="perm.toEditAService(service)"
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
        <tr v-if="isModificationFormOpen">
          <td>
            <QBtn
              form="add-modification"
              type="reset"
              icon="sym_s_cancel"
              color="primary"
              size="sm"
              flat
              square
              dense
            >
              <QTooltip :delay="TOOLTIP_DELAY">
                {{ t("service.details.modificationForm.tooltip.delete") }}
              </QTooltip>
            </QBtn>
            <QSelect
              v-model="modificationTypeId"
              :options="modificationTypesOptions"
              :label="t('service.details.modificationForm.fields.type')"
              option-value="id"
              emit-value
              map-options
              square
              dense
              options-dense
              form="add-modification"
              class="inline-block q-ml-sm"
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
          </td>
          <td>
            <NumInput
              v-model="modificationHours"
              :label="t('service.details.modificationForm.fields.hours')"
              form="add-modification"
              class="inline-block"
            />
          </td>
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
              @click="handleModificationDeletion(m.id)"
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
</template>

<style scoped lang="scss">
.q-select {
  width: 240px;
}
.q-input {
  width: 60px;
}
</style>
