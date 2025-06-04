import { computed, inject, readonly } from "vue";

import { PhaseEnum, RoleTypeEnum } from "@/gql/graphql.ts";
import type { AuthManager } from "@/services/auth.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useServicesStore } from "@/stores/useServicesStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

export const usePermissions = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { userId, activeRole } = inject<AuthManager>("authManager")!;
  const { isCurrentYearActive } = useYearsStore();
  const { currentPhase } = useCurrentPhaseStore();
  const { hasService } = useServicesStore();

  const toAdmin = computed(() => activeRole.value === RoleTypeEnum.Admin);

  const toSubmitRequestsForSelf = computed(
    () =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Teacher &&
        currentPhase.value === PhaseEnum.Requests &&
        isCurrentYearActive.value &&
        hasService.value),
  );

  const toSubmitRequestsForOthers = computed(
    () => activeRole.value === RoleTypeEnum.Admin,
  );

  const toSubmitRequests = computed(
    () => toSubmitRequestsForSelf.value || toSubmitRequestsForOthers.value,
  );

  const toDeleteRequests = computed(
    () => activeRole.value === RoleTypeEnum.Admin,
  );

  const toViewAssignments = computed(
    () =>
      toEditAssignments.value ||
      currentPhase.value === PhaseEnum.Results ||
      !isCurrentYearActive.value,
  );

  const toEditAssignments = computed(
    () =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Commissioner &&
        currentPhase.value === PhaseEnum.Assignments &&
        isCurrentYearActive.value),
  );

  const toEditPriorities = computed(
    () => activeRole.value === RoleTypeEnum.Admin,
  );

  const toEditADescription = computed(
    () => (coordinators: string[]) =>
      activeRole.value === RoleTypeEnum.Admin ||
      (isCurrentYearActive.value && coordinators.includes(userId)),
  );

  const toViewAllServices = computed(
    () =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Commissioner &&
        currentPhase.value === PhaseEnum.Assignments),
  );

  const toEditAService = computed(
    () => (service: { uid: string }) =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Teacher &&
        currentPhase.value === PhaseEnum.Requests &&
        isCurrentYearActive.value &&
        service.uid === userId),
  );

  const toEditAMessage = computed(
    () => (message: { uid: string }) =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Teacher &&
        currentPhase.value === PhaseEnum.Requests &&
        isCurrentYearActive.value &&
        message.uid === userId),
  );

  return readonly({
    toAdmin,
    toSubmitRequestsForSelf,
    toSubmitRequestsForOthers,
    toSubmitRequests,
    toDeleteRequests,
    toViewAssignments,
    toEditAssignments,
    toEditPriorities,
    toEditADescription,
    toViewAllServices,
    toEditAService,
    toEditAMessage,
  });
};
