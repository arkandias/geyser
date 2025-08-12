import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminOrganizationsColName } from "@/components/admin/AdminOrganizations.vue";

export default {
  organizations: {
    organizations: {
      label: "Organisations",
      column: {
        key: {
          label: "Clé",
          tooltip: "",
        },
        label: {
          label: "Libellé",
          tooltip: "",
        },
        sublabel: {
          label: "Sous-libellé",
          tooltip: "",
        },
        email: {
          label: "Email",
          tooltip: "",
        },
        locale: {
          label: "Langue",
          tooltip: "",
        },
        privateService: {
          label: "Service privé",
          tooltip: "",
        },
        active: {
          label: "Active",
          tooltip: "",
        },
      } satisfies Record<AdminOrganizationsColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'une organisation | Édition d'une organisation | Édition de {count} organisations",
        error: {
          localeNotFound: "La langue « {locale} » n'existe pas",
        },
      },
      data: {
        success: {
          insert:
            "Aucune organisation créée | Organisation créée | {count} organisations créées",
          update:
            "Aucune organisation mise à jour | Organisation mise à jour | {count} organisations mises à jour",
          delete:
            "Aucune organisation supprimée | Organisation supprimée | {count} organisations supprimées",
          import:
            "0 organisation importée | 1 organisation importée | {count} organisations importées",
          export:
            "0 organisation exportée | 1 organisation exportée | {count} organisations exportées",
        },
        confirm: {
          delete:
            "Êtes-vous sûr de vouloir supprimer la organisation sélectionnée ? | Êtes-vous sûr de vouloir supprimer les {count} organisations sélectionnées ?",
        },
      },
    },
  },
} as const;
