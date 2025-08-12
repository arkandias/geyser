import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminOrganizationsColName } from "@/components/admin/AdminOrganizations.vue";

export default {
  organizations: {
    organizations: {
      label: "Organizations",
      column: {
        key: {
          label: "Key",
          tooltip: "",
        },
        label: {
          label: "Label",
          tooltip: "",
        },
        sublabel: {
          label: "Sublabel",
          tooltip: "",
        },
        email: {
          label: "Email",
          tooltip: "",
        },
        locale: {
          label: "Locale",
          tooltip: "",
        },
        privateService: {
          label: "Private service",
          tooltip: "",
        },
        active: {
          label: "Active",
          tooltip: "",
        },
      } satisfies Record<AdminOrganizationsColName, AdminColNameOptions>,
      form: {
        title:
          "Creating an organization | Editing an organization | Editing {count} organizations",
        error: {
          localeNotFound: 'Locale "{locale}" does not exist',
        },
      },
      data: {
        success: {
          insert:
            "No organization created | Organisation created | {count} organizations created",
          update:
            "No organization updated | Organisation updated | {count} organizations updated",
          delete:
            "No organization deleted | Organisation deleted | {count} organizations deleted",
          import:
            "0 organizations imported | 1 organization imported | {count} organizations imported",
          export:
            "0 organizations exported | 1 organization exported | {count} organizations exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected organization? | Are you sure you want to delete the {count} selected organizations?",
        },
      },
    },
  },
} as const;
