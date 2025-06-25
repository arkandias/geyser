import { computed, readonly } from "vue";

import { PhaseEnum, RoleEnum } from "@/gql/graphql.ts";
import { useCurrentPhaseStore } from "@/stores/useCurrentPhaseStore.ts";
import { useProfileStore } from "@/stores/useProfileStore.ts";
import { useYearsStore } from "@/stores/useYearsStore.ts";

export const usePermissions = () => {
  const { currentYear, isCurrentYearActive } = useYearsStore();
  const { currentPhase } = useCurrentPhaseStore();
  const { profile, hasService } = useProfileStore();

  const toAdmin = computed(() => profile.activeRole === RoleEnum.Organizer);

  const toSubmitRequestsForSelf = computed(
    () =>
      profile.activeRole === RoleEnum.Organizer ||
      (profile.activeRole === RoleEnum.Teacher &&
        currentPhase.value === PhaseEnum.Requests &&
        isCurrentYearActive.value &&
        hasService.value),
  );

  const toSubmitRequestsForOthers = computed(
    () => profile.activeRole === RoleEnum.Organizer,
  );

  const toSubmitRequests = computed(
    () => toSubmitRequestsForSelf.value || toSubmitRequestsForOthers.value,
  );

  const toDeleteRequests = computed(
    () => profile.activeRole === RoleEnum.Organizer,
  );

  const toViewAssignments = computed(
    () =>
      toEditAssignments.value ||
      currentPhase.value === PhaseEnum.Results ||
      !isCurrentYearActive.value,
  );

  const toEditAssignments = computed(
    () =>
      profile.activeRole === RoleEnum.Organizer ||
      (profile.activeRole === RoleEnum.Commissioner &&
        currentPhase.value === PhaseEnum.Assignments &&
        isCurrentYearActive.value),
  );

  const toEditPriorities = computed(
    () => profile.activeRole === RoleEnum.Organizer,
  );

  const toEditADescription = computed(
    () => (coordinators: number[]) =>
      profile.activeRole === RoleEnum.Organizer ||
      (isCurrentYearActive.value && coordinators.includes(profile.id)),
  );

  const toViewAllServices = computed(
    () =>
      profile.activeRole === RoleEnum.Organizer ||
      (profile.activeRole === RoleEnum.Commissioner &&
        currentPhase.value === PhaseEnum.Assignments),
  );

  const toEditAService = computed(
    () => (service: { year: number; teacherId: number }) =>
      profile.activeRole === RoleEnum.Organizer ||
      (profile.activeRole === RoleEnum.Teacher &&
        currentPhase.value === PhaseEnum.Requests &&
        service.year === currentYear.value &&
        service.teacherId === profile.id),
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
