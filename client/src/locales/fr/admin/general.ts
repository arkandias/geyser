import { RoleTypeEnum } from "@/gql/graphql.ts";
import type { AdminColNameOptions } from "@/locales/types.ts";

import type { ColName as AdminRolesRolesColName } from "@/components/admin/AdminGeneralRoles.vue";

export default {
  general: {
    title: "Paramètres généraux",
    phase: {
      label: "Phase en cours",
      error: {
        setCurrent: "Échec de la mise à jour de la phase en cours",
      },
      success: {
        setCurrent: "Phase en cours mise à jour",
      },
    },
    years: {
      label: "Années",
      year: "Année",
      visible: "Visible",
      current: "En cours",
      button: {
        create: "Créer",
        update: "Mettre à jour",
        createServices: "Créer les services des intervenants actifs",
        copyCourses: "Copier les enseignements de l'année précédente",
        computePriorities: "Calculer les priorités",
      },
      confirm: {
        delete: `Êtes-vous sûr de vouloir supprimer l'année {year} ?
Si des cours ou des services sont associés à cette année, vous ne pourrez pas \
la supprimer.`,
      },
      error: {
        setCurrent: "Échec de la mise à jour de l'année en cours",
        createServices: "Échec de la création des services",
        copyCourses: "Échec de la copie des enseignements",
        computePriorities: "Échec du calcul des priorités",
        emptyValue: "Entrez une valeur pour l'année",
      },
      success: {
        setCurrent: "Année en cours mise à jour",
        insert: "Année créée",
        update: "Année mise à jour",
        delete: "Année supprimée",
        createServices:
          "0 service créé | 1 service créé | {count} services créés",
        copyCourses: "0 cours copié | 1 cours copié | {count} cours copié",
        computePriorities:
          "0 priorité calculée | 1 priorité calculée | {count} priorités calculées",
      },
    },
    roles: {
      label: "Rôles",
      column: {
        uid: {
          label: "Intervenant",
          tooltip: "",
        },
        type: {
          label: "Type",
          tooltip: "",
        },
        comment: {
          label: "Commentaire",
          tooltip: "",
        },
      } satisfies Record<AdminRolesRolesColName, AdminColNameOptions>,
      form: {
        title: {
          none: "Nouveau rôle",
          single: "{label}",
          multiple: "{count} rôles sélectionnés",
        },
        error: {
          invalidRole: `Le type de rôle doit être ${RoleTypeEnum.Admin} ou ${RoleTypeEnum.Commissioner}`,
        },
      },
      data: {
        success: {
          insert: "Aucun rôle créé | Rôle créé | {count} rôles créés",
          update:
            "Aucun rôle mis à jour | Rôle mis à jour | {count} rôles mis à jour",
          delete:
            "Aucun rôle supprimé | Rôle supprimé | {count} rôles supprimés",
          import: "0 rôle importé | 1 rôle importé | {count} rôles importés",
          export: "0 rôle exporté | 1 rôle exporté | {count} rôles exportés",
        },
        confirm: {
          delete: {
            single: "Êtes-vous sûr de vouloir supprimer le rôle « {label} » ?",
            multiple:
              "Êtes-vous sûr de vouloir supprimer les {count} rôles sélectionnés ?",
          },
        },
      },
    },
    customTexts: {
      label: "Personnalisation de l'interface",
      button: {
        edit: "Éditer",
        delete: "Supprimer",
      },
      confirm: {
        delete: `Êtes-vous sûr de vouloir réinitialiser « {label} » à sa valeur par défaut ?`,
      },
    },
  },
} as const;
