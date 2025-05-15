import type { ComposerTranslation } from "vue-i18n";

import type { CustomTextKey } from "@/config/custom-text-keys.ts";
import type { PrimitiveType } from "@/config/primitive-types.ts";
import { PhaseEnum, RequestTypeEnum, RoleTypeEnum } from "@/gql/graphql.ts";
import { capitalize, toLowerCase } from "@/utils/misc.ts";

export const phaseSubtitle = (t: ComposerTranslation, phase: PhaseEnum) => {
  switch (phase) {
    case PhaseEnum.Requests:
      return t("home.subtitle.requests");
    case PhaseEnum.Assignments:
      return t("home.subtitle.assignments");
    case PhaseEnum.Results:
      return t("home.subtitle.results");
    case PhaseEnum.Shutdown:
      return t("home.subtitle.shutdown");
  }
};

export const phaseMessage = (t: ComposerTranslation, phase: PhaseEnum) => {
  switch (phase) {
    case PhaseEnum.Requests:
      return t("home.message.requests");
    case PhaseEnum.Assignments:
      return t("home.message.assignments");
    case PhaseEnum.Results:
      return t("home.message.results");
    case PhaseEnum.Shutdown:
      return t("home.message.shutdown");
  }
};

export const phaseLabel = (t: ComposerTranslation, phase: PhaseEnum) => {
  switch (phase) {
    case PhaseEnum.Requests:
      return t("phase.requests");
    case PhaseEnum.Assignments:
      return t("phase.assignments");
    case PhaseEnum.Results:
      return t("phase.results");
    case PhaseEnum.Shutdown:
      return t("phase.shutdown");
  }
};

export const requestTypeLabel = (
  t: ComposerTranslation,
  type: RequestTypeEnum,
  plural = 1,
) => {
  switch (type) {
    case RequestTypeEnum.Assignment:
      return t("requestType.assignment", plural);
    case RequestTypeEnum.Primary:
      return t("requestType.primary", plural);
    case RequestTypeEnum.Secondary:
      return t("requestType.secondary", plural);
  }
};

export const roleTypeLabel = (
  t: ComposerTranslation,
  role: RoleTypeEnum,
  plural = 1,
) => {
  switch (role) {
    case RoleTypeEnum.Admin:
      return t("role.admin", plural);
    case RoleTypeEnum.Commissioner:
      return t("role.commissioner", plural);
    case RoleTypeEnum.Teacher:
      return t("role.teacher", plural);
  }
};

export const customTextLabel = (t: ComposerTranslation, key: CustomTextKey) =>
  t(`customTextLabel.${key}`);

export const customTextDefault = (
  t: ComposerTranslation,
  key: CustomTextKey,
) => {
  switch (key) {
    case "homeTitle":
      return t("home.title");
    case `homeSubtitle${capitalize(toLowerCase(PhaseEnum.Requests))}`:
      return t("home.subtitle.requests");
    case `homeSubtitle${capitalize(toLowerCase(PhaseEnum.Assignments))}`:
      return t("home.subtitle.assignments");
    case `homeSubtitle${capitalize(toLowerCase(PhaseEnum.Results))}`:
      return t("home.subtitle.results");
    case `homeSubtitle${capitalize(toLowerCase(PhaseEnum.Shutdown))}`:
      return t("home.subtitle.shutdown");
    case `homeMessage${capitalize(toLowerCase(PhaseEnum.Requests))}`:
      return t("home.message.requests");
    case `homeMessage${capitalize(toLowerCase(PhaseEnum.Assignments))}`:
      return t("home.message.assignments");
    case `homeMessage${capitalize(toLowerCase(PhaseEnum.Results))}`:
      return t("home.message.results");
    case `homeMessage${capitalize(toLowerCase(PhaseEnum.Shutdown))}`:
      return t("home.message.shutdown");
    case "contact":
      return t("header.info.contact.message");
    case "legalNotice":
      return t("header.info.legalNotice.message");
    default:
      throw new Error(`Custom text key not implemented: ${key}`);
  }
};

export const primitiveTypeName = (
  t: ComposerTranslation,
  type: PrimitiveType,
) => t(`primitiveTypeName.${type}`);
