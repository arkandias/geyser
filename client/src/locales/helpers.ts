import type { ComposerTranslation } from "vue-i18n";

import type { CustomTextKey } from "@/config/custom-text-keys.ts";
import type { PrimitiveType } from "@/config/primitive-types.ts";
import { PhaseTypeEnum, RequestTypeEnum, RoleTypeEnum } from "@/gql/graphql.ts";
import { capitalize, toLowerCase } from "@/utils";

export const phaseSubtitle = (t: ComposerTranslation, phase: PhaseTypeEnum) => {
  switch (phase) {
    case PhaseTypeEnum.Requests:
      return t("home.subtitle.requests");
    case PhaseTypeEnum.Assignments:
      return t("home.subtitle.assignments");
    case PhaseTypeEnum.Results:
      return t("home.subtitle.results");
    case PhaseTypeEnum.Shutdown:
      return t("home.subtitle.shutdown");
  }
};

export const phaseMessage = (t: ComposerTranslation, phase: PhaseTypeEnum) => {
  switch (phase) {
    case PhaseTypeEnum.Requests:
      return t("home.message.requests");
    case PhaseTypeEnum.Assignments:
      return t("home.message.assignments");
    case PhaseTypeEnum.Results:
      return t("home.message.results");
    case PhaseTypeEnum.Shutdown:
      return t("home.message.shutdown");
  }
};

export const phaseLabel = (t: ComposerTranslation, phase: PhaseTypeEnum) => {
  switch (phase) {
    case PhaseTypeEnum.Requests:
      return t("phase.requests");
    case PhaseTypeEnum.Assignments:
      return t("phase.assignments");
    case PhaseTypeEnum.Results:
      return t("phase.results");
    case PhaseTypeEnum.Shutdown:
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
    case `homeSubtitle${capitalize(toLowerCase(PhaseTypeEnum.Requests))}`:
      return t("home.subtitle.requests");
    case `homeSubtitle${capitalize(toLowerCase(PhaseTypeEnum.Assignments))}`:
      return t("home.subtitle.assignments");
    case `homeSubtitle${capitalize(toLowerCase(PhaseTypeEnum.Results))}`:
      return t("home.subtitle.results");
    case `homeSubtitle${capitalize(toLowerCase(PhaseTypeEnum.Shutdown))}`:
      return t("home.subtitle.shutdown");
    case `homeMessage${capitalize(toLowerCase(PhaseTypeEnum.Requests))}`:
      return t("home.message.requests");
    case `homeMessage${capitalize(toLowerCase(PhaseTypeEnum.Assignments))}`:
      return t("home.message.assignments");
    case `homeMessage${capitalize(toLowerCase(PhaseTypeEnum.Results))}`:
      return t("home.message.results");
    case `homeMessage${capitalize(toLowerCase(PhaseTypeEnum.Shutdown))}`:
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
