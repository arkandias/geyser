import { reactive, readonly } from "vue";

import { DEFAULT_LOCALE } from "@/config/constants.ts";
import type { LocaleEnum } from "@/gql/graphql.ts";

type Organization = {
  id: number;
  label: string;
  sublabel: string | null;
  email: string;
  locale: LocaleEnum;
  privateService: boolean;
};

const organization = reactive<Organization>({
  id: -1,
  label: "",
  sublabel: null,
  email: "",
  locale: DEFAULT_LOCALE,
  privateService: false,
});

const setOrganization = (newOrganization: Organization) => {
  Object.assign(organization, newOrganization);
};

export const useOrganizationStore = () => ({
  organization: readonly(organization),
  setOrganization,
});
