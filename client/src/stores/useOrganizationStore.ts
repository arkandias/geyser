import { reactive, readonly } from "vue";

type Organization = {
  oid: number;
  label: string;
  sublabel: string | null;
  email: string;
};

const organization = reactive<Organization>({
  oid: -1,
  label: "",
  sublabel: null,
  email: "",
});

const setOrganization = (newOrganization: Organization) => {
  Object.assign(organization, newOrganization);
};

export const useOrganizationStore = () => ({
  organization: readonly(organization),
  setOrganization,
});
