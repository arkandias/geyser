import { computed, inject, readonly } from "vue";

import { PhaseTypeEnum, RoleTypeEnum } from "@/gql/graphql.ts";
import type { AuthManager } from "@/services/auth.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

export const usePermissions = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { activeRole } = inject<AuthManager>("authManager")!;
  const { currentYear, isCurrentYearActive } = useYearsStore();
  const { currentPhase } = useCurrentPhaseStore();
  const { profile, hasService } = useProfileStore();

  const toAdmin = computed(() => activeRole.value === RoleTypeEnum.Admin);

  const toSubmitRequestsForSelf = computed(
    () =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Teacher &&
        currentPhase.value === PhaseTypeEnum.Requests &&
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
      currentPhase.value === PhaseTypeEnum.Results ||
      !isCurrentYearActive.value,
  );

  const toEditAssignments = computed(
    () =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Commissioner &&
        currentPhase.value === PhaseTypeEnum.Assignments &&
        isCurrentYearActive.value),
  );

  const toEditPriorities = computed(
    () => activeRole.value === RoleTypeEnum.Admin,
  );

  const toEditADescription = computed(
    () => (coordinators: number[]) =>
      activeRole.value === RoleTypeEnum.Admin ||
      (isCurrentYearActive.value && coordinators.includes(profile.value.id)),
  );

  const toViewAllServices = computed(
    () =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Commissioner &&
        currentPhase.value === PhaseTypeEnum.Assignments),
  );

  const toEditAService = computed(
    () => (service: { year: number; teacherId: number }) =>
      activeRole.value === RoleTypeEnum.Admin ||
      (activeRole.value === RoleTypeEnum.Teacher &&
        currentPhase.value === PhaseTypeEnum.Requests &&
        service.year === currentYear.value &&
        service.teacherId === profile.value.id),
  );

  const toEditAMessage = computed(
    () => (service: { year: number; teacherId: number }) =>
      toEditAService.value(service),
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
