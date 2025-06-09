import { computed, inject, readonly } from "vue";

import { PhaseEnum, RoleEnum } from "@/gql/graphql.ts";
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

  const toAdmin = computed(() => activeRole.value === RoleEnum.Admin);

  const toSubmitRequestsForSelf = computed(
    () =>
      activeRole.value === RoleEnum.Admin ||
      (activeRole.value === RoleEnum.Teacher &&
        currentPhase.value === PhaseEnum.Requests &&
        isCurrentYearActive.value &&
        hasService.value),
  );

  const toSubmitRequestsForOthers = computed(
    () => activeRole.value === RoleEnum.Admin,
  );

  const toSubmitRequests = computed(
    () => toSubmitRequestsForSelf.value || toSubmitRequestsForOthers.value,
  );

  const toDeleteRequests = computed(() => activeRole.value === RoleEnum.Admin);

  const toViewAssignments = computed(
    () =>
      toEditAssignments.value ||
      currentPhase.value === PhaseEnum.Results ||
      !isCurrentYearActive.value,
  );

  const toEditAssignments = computed(
    () =>
      activeRole.value === RoleEnum.Admin ||
      (activeRole.value === RoleEnum.Commissioner &&
        currentPhase.value === PhaseEnum.Assignments &&
        isCurrentYearActive.value),
  );

  const toEditPriorities = computed(() => activeRole.value === RoleEnum.Admin);

  const toEditADescription = computed(
    () => (coordinators: number[]) =>
      activeRole.value === RoleEnum.Admin ||
      (isCurrentYearActive.value && coordinators.includes(profile.value.id)),
  );

  const toViewAllServices = computed(
    () =>
      activeRole.value === RoleEnum.Admin ||
      (activeRole.value === RoleEnum.Commissioner &&
        currentPhase.value === PhaseEnum.Assignments),
  );

  const toEditAService = computed(
    () => (service: { year: number; teacherId: number }) =>
      activeRole.value === RoleEnum.Admin ||
      (activeRole.value === RoleEnum.Teacher &&
        currentPhase.value === PhaseEnum.Requests &&
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
