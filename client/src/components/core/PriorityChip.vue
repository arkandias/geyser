<script setup lang="ts">
import { useMutation } from "@urql/vue";
import { computed } from "vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { usePermissions } from "@/composables/usePermissions.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { TOOLTIP_DELAY } from "@/config/constants.ts";
import { type FragmentType, graphql, useFragment } from "@/gql";
import {
  DeleteComputedPriorityDocument,
  DeletePriorityDocument,
  PriorityChipDataFragmentDoc,
} from "@/gql/graphql.ts";
import { priorityColor } from "@/utils/colors.ts";

const { dataFragment } = defineProps<{
  dataFragment: FragmentType<typeof PriorityChipDataFragmentDoc>;
}>();

graphql(`
  fragment PriorityChipData on Priority {
    id
    service: vService {
      teacher: vTeacher {
        displayname
      }
    }
    seniority
    isPriority
    computed
  }

  mutation DeletePriority($id: Int!) {
    priority: deletePriorityByPk(id: $id) {
      id
    }
  }

  mutation DeleteComputedPriority($id: Int!) {
    priority: updatePriorityByPk(
      pkColumns: { id: $id }
      _set: { seniority: null, isPriority: null, computed: false }
    ) {
      id
    }
  }
`);

const { t } = useTypedI18n();
const { notify } = useNotify();
const perm = usePermissions();

const deletePriority = useMutation(DeletePriorityDocument);
const deleteComputedPriority = useMutation(DeleteComputedPriorityDocument);

const priority = computed(() =>
  useFragment(PriorityChipDataFragmentDoc, dataFragment),
);

const remove = async () => {
  const { data, error } = await (priority.value.computed
    ? deleteComputedPriority.executeMutation({ id: priority.value.id })
    : deletePriority.executeMutation({ id: priority.value.id }));

  if (data?.priority && !error) {
    notify(
      NotifyType.Success,
      priority.value.computed
        ? {
            message: t("priorityChip.deleteComputed.success.message"),
            caption: t("priorityChip.deleteComputed.success.caption"),
          }
        : { message: t("priorityChip.delete.success") },
    );
  } else {
    notify(NotifyType.Error, {
      message: priority.value.computed
        ? t("priorityChip.deleteComputed.error")
        : t("priorityChip.delete.error"),
      caption: error?.message,
    });
  }
};
</script>

<template>
  <QChip
    :removable="perm.toEditPriorities"
    icon-remove="sym_s_close"
    :color="priorityColor(priority.isPriority)"
    outline
    square
    dense
    class="priority-chip"
    @remove="remove()"
  >
    <QAvatar
      :color="priorityColor(priority.isPriority)"
      text-color="white"
      square
    >
      {{ priority.seniority }}
    </QAvatar>
    <div class="priority-chip__title q-pa-xs text-body2">
      {{ priority.service?.teacher?.displayname }}
    </div>
    <QIcon
      v-if="perm.toEditPriorities && priority.computed"
      name="sym_s_copyright"
      size="xs"
    />
    <QTooltip :delay="TOOLTIP_DELAY" anchor="top middle" self="bottom middle">
      {{ priority.service?.teacher?.displayname }}
    </QTooltip>
  </QChip>
</template>

<style scoped lang="scss">
.priority-chip {
  width: 150px;
}
.priority-chip__title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
