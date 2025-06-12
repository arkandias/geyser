import { RoleEnum } from "@/gql/graphql.ts";
import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminGeneralRolesColName } from "@/components/admin/col-names.ts";

export default {
  general: {
    title: "General Settings",
    phase: {
      label: "Current phase",
      error: {
        setCurrent: "Failed to update current phase",
      },
      success: {
        setCurrent: "Current phase updated",
      },
    },
    years: {
      label: "Years",
      year: "Year",
      visible: "Visible",
      current: "Current",
      button: {
        create: "Create",
        update: "Update",
        createServices: "Create services for active teachers",
        copyServices: "Copy services from previous year",
        copyCourses: "Copy courses from previous year",
        computePriorities: "Compute priorities",
      },
      confirm: {
        delete: `Are you sure you want to delete the year {year}?
If courses or services are associated with this year, you will not be able to delete it.`,
      },
      error: {
        setCurrent: "Failed to update current year",
        createServices: "Failed to create services",
        copyServices: "Failed to copy services",
        copyCourses: "Failed to copy courses",
        computePriorities: "Failed to compute priorities",
        emptyValue: "Enter a value for the year",
      },
      success: {
        setCurrent: "Current year updated",
        insert: "Year created",
        update: "Year updated",
        delete: "Year deleted",
        createServices:
          "0 services created | 1 service created | {count} services created",
        copyServices:
          "0 services copied | 1 service copied | {count} services copied",
        copyCourses:
          "0 courses copied | 1 course copied | {count} courses copied",
        computePriorities:
          "0 priorities computed | 1 priority computed | {count} priorities computed",
      },
    },
    roles: {
      label: "Roles",
      column: {
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        role: {
          label: "Type",
          tooltip: "",
        },
        comment: {
          label: "Comment",
          tooltip: "",
        },
      } satisfies Record<AdminGeneralRolesColName, AdminColNameOptions>,
      form: {
        title: {
          none: "New role",
          single: "{label}",
          multiple: "{count} roles selected",
        },
        error: {
          teacherNotFound: `No teacher with email '{email}'`,
          invalidRole: `Role type must be ${RoleEnum.Admin} or ${RoleEnum.Commissioner}`,
        },
      },
      data: {
        success: {
          insert: "No role created | Role created | {count} roles created",
          update: "No role updated | Role updated | {count} roles updated",
          delete: "No role deleted | Role deleted | {count} roles deleted",
          import: "0 roles imported | 1 role imported | {count} roles imported",
          export: "0 roles exported | 1 role exported | {count} roles exported",
        },
        confirm: {
          delete: {
            single: `Are you sure you want to delete the role "{label}"?`,
            multiple: `Are you sure you want to delete the {count} selected roles?`,
          },
        },
      },
    },
    customTexts: {
      label: "Interface customization",
      button: {
        edit: "Edit",
        delete: "Delete",
      },
      confirm: {
        delete: `Are you sure you want to reset "{label}" to its default value?`,
      },
    },
  },
} as const;
