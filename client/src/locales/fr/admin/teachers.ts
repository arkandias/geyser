import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminTeachersPositionsColName } from "@/components/admin/AdminTeachersPositions.vue";
import type { AdminTeachersRolesColName } from "@/components/admin/AdminTeachersRoles.vue";
import type { AdminTeachersTeachersColName } from "@/components/admin/AdminTeachersTeachers.vue";

export default {
  teachers: {
    title: "Intervenants",
    positions: {
      label: "Fonctions",
      column: {
        label: {
          label: "Libellé",
          tooltip: "",
        },
        labelShort: {
          label: "Libellé court",
          tooltip: "",
        },
        description: {
          label: "Description",
          tooltip: "",
        },
        baseServiceHours: {
          label: "S. base (@:unit.weightedHours)",
          tooltip: "Service de base (@:unit.weightedHours)",
        },
      } satisfies Record<AdminTeachersPositionsColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'une fonction | Édition d'une fonction | Édition de {count} fonctions",
        error: {
          baseServiceHoursNegative:
            "Entrez un nombre d'heures de service de base positif ou nul",
        },
      },
      data: {
        success: {
          insert:
            "Aucune fonction créée | Fonction créée | {count} fonctions créées",
          update:
            "Aucune fonction mise à jour | Fonction mise à jour | {count} fonctions mises à jour",
          delete:
            "Aucune fonction supprimée | Fonction supprimée | {count} fonctions supprimées",
          import:
            "0 fonction importée | 1 fonction importée | {count} fonctions importées",
          export:
            "0 fonction exportée | 1 fonction exportée | {count} fonctions exportées",
        },
        confirm: {
          delete:
            `Êtes-vous sûr de vouloir supprimer la fonction sélectionnée ?
Si cette fonction est attribuée à des intervenants, vous ne pourrez pas la supprimer. ` +
            `| Êtes-vous sûr de vouloir supprimer les {count} fonctions sélectionnées ?
Si ces fonctions sont attribuées à des intervenants, vous ne pourrez pas les supprimer.`,
        },
      },
    },
    teachers: {
      label: "Intervenants",
      column: {
        email: {
          label: "Email",
          tooltip: "",
        },
        firstname: {
          label: "Prénom",
          tooltip: "",
        },
        lastname: {
          label: "Nom",
          tooltip: "",
        },
        alias: {
          label: "Alias",
          tooltip: "",
        },
        positionLabel: {
          label: "Fonction",
          tooltip: "",
        },
        baseServiceHours: {
          label: "S. base (@:unit.weightedHours)",
          tooltip: "",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
        active: {
          label: "Actif",
          tooltip: "",
        },
        access: {
          label: "Accès",
          tooltip: "",
        },
      } satisfies Record<AdminTeachersTeachersColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'un intervenant | Édition d'un intervenant | Édition de {count} intervenants",
        error: {
          positionNotFound:
            "Il n'existe pas de fonction avec le label « {positionLabel} »",
          baseServiceHoursNegative:
            "Entrez un nombre d'heures de service de base positif ou nul",
        },
      },
      data: {
        success: {
          insert:
            "Aucun intervenant créé | Intervenant créé | {count} intervenants créés",
          update:
            "Aucun intervenant mis à jour | Intervenant mis à jour | {count} intervenants mis à jour",
          delete:
            "Aucun intervenant supprimé | Intervenant supprimé | {count} intervenants supprimés",
          import:
            "0 intervenant importé | 1 intervenant importé | {count} intervenants importés",
          export:
            "0 intervenant exporté | 1 intervenant exporté | {count} intervenants exportés",
        },
        confirm: {
          delete:
            `Êtes-vous sûr de vouloir supprimer l'intervenant sélectionné ?
S'il existe des services, des responsabilités ou des rôles pour cet intervenant, vous ne pourrez pas le supprimer. ` +
            `| Êtes-vous sûr de vouloir supprimer les {count} intervenants sélectionnés ?
S'il existe des services, des responsabilités ou des rôles pour ces intervenants, vous ne pourrez pas les supprimer.`,
        },
      },
    },
    roles: {
      label: "Rôles",
      column: {
        teacherEmail: {
          label: "Intervenant",
          tooltip: "",
        },
        role: {
          label: "Type",
          tooltip: "",
        },
        comment: {
          label: "Commentaire",
          tooltip: "",
        },
      } satisfies Record<AdminTeachersRolesColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'un rôle | Édition d'un rôle | Édition de {count} rôles",
        error: {
          teacherNotFound:
            "Il n'existe pas d'intervenant avec l'email « {teacherEmail} »",
          invalidRole:
            "Le type de rôle doit être @:role.organizer ou @:role.commissioner",
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
          delete:
            "Êtes-vous sûr de vouloir supprimer le rôle sélectionné ? | Êtes-vous sûr de vouloir supprimer les {count} rôles sélectionnés ?",
        },
      },
    },
  },
} as const;
