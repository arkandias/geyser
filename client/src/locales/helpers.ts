import type { ComposerTranslation } from "vue-i18n";

import type { CustomTextKey } from "@/config/custom-text-keys.ts";
import type { PrimitiveType } from "@/config/primitive-types.ts";
import { PhaseEnum, RequestTypeEnum, RoleEnum } from "@/gql/graphql.ts";

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

export const roleLabel = (
  t: ComposerTranslation,
  role: RoleEnum,
  plural = 1,
) => {
  switch (role) {
    case RoleEnum.Admin:
      return t("role.admin", plural);
    case RoleEnum.Commissioner:
      return t("role.commissioner", plural);
    case RoleEnum.Teacher:
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
    case "homeSubtitleRequests":
      return t("home.subtitle.requests");
    case "homeSubtitleAssignments":
      return t("home.subtitle.assignments");
    case "homeSubtitleResults":
      return t("home.subtitle.results");
    case "homeSubtitleShutdown":
      return t("home.subtitle.shutdown");
    case "homeMessageRequests":
      return t("home.message.requests");
    case "homeMessageAssignments":
      return t("home.message.assignments");
    case "homeMessageResults":
      return t("home.message.results");
    case "homeMessageShutdown":
      return t("home.message.shutdown");
    case "contact":
      return t("header.info.contact.message");
    case "legalNotice":
      return t("header.info.legalNotice.message");
  }
};

export const primitiveTypeName = (
  t: ComposerTranslation,
  type: PrimitiveType,
) => t(`primitiveTypeName.${type}`);
