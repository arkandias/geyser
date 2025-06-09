import type { AdminColNameOptions } from "@/locales/types.ts";

import type { ColName as AdminTeachersMessagesColName } from "@/components/admin/AdminTeachersMessages.vue";
import type { ColName as AdminTeachersPositionsColName } from "@/components/admin/AdminTeachersPositions.vue";
import type { ColName as AdminTeachersServiceModificationTypesColName } from "@/components/admin/AdminTeachersServiceModificationTypes.vue";
import type { ColName as AdminTeachersServiceModificationsColName } from "@/components/admin/AdminTeachersServiceModifications.vue";
import type { ColName as AdminTeachersServicesColName } from "@/components/admin/AdminTeachersServices.vue";
import type { ColName as AdminTeachersTeachersColName } from "@/components/admin/AdminTeachersTeachers.vue";

export default {
  teachers: {
    title: "Intervenants",
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
        title: {
          none: "Nouvel intervenant",
          single: "{label}",
          multiple: "{count} intervenants sélectionnés",
        },
        error: {
          positionNotFound:
            "Il n'existe pas de fonction avec le label « {position} »",
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
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer l'intervenant « {label} » ?
S'il existe des services, des responsabilités ou des rôles pour cet intervenant, vous ne pourrez pas le supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} intervenants sélectionnés ?
S'il existe des services, des responsabilités ou des rôles pour ces intervenants, vous ne pourrez pas les supprimer.`,
          },
        },
      },
    },
    positions: {
      label: "Fonctions",
      column: {
        label: {
          label: "Label",
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
        title: {
          none: "Nouvelle fonction",
          single: "{label}",
          multiple: "{count} fonctions sélectionnées",
        },
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
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer la fonction « {label} » ?
Si cette fonction est attribuée à des intervenants, vous ne pourrez pas la supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} fonctions sélectionnées ?
Si ces fonctions sont attribuées à des intervenants, vous ne pourrez pas les supprimer.`,
          },
        },
      },
    },
    services: {
      label: "Services",
      column: {
        year: {
          label: "Année",
          tooltip: "",
        },
        teacherEmail: {
          label: "Intervenant",
          tooltip: "",
        },
        hours: {
          label: "Heures (@:unit.weightedHours)",
          tooltip: "",
        },
      } satisfies Record<AdminTeachersServicesColName, AdminColNameOptions>,
      form: {
        title: {
          none: "Nouveau service",
          single: "{label}",
          multiple: "{count} services sélectionnés",
        },
        error: {
          teacherNotFound: `Il n'existe pas d'intervenant avec l'email « {email} »`,
          hoursNegative: "Entrez un nombre d'heures positif ou nul",
        },
      },
      data: {
        success: {
          insert: "Aucun service créé | Service créé | {count} services créés",
          update:
            "Aucun service mis à jour | Service mis à jour | {count} services mis à jour",
          delete:
            "Aucun service supprimé | Service supprimé | {count} services supprimés",
          import:
            "0 service importé | 1 service importé | {count} services importés",
          export:
            "0 service exporté | 1 service exporté | {count} services exportés",
        },
        confirm: {
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer le service « {label} » ?
S'il existe des modifications, des demandes ou des priorités pour ce service, vous ne pourrez pas le supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} services sélectionnés ?
S'il existe des modifications, des demandes ou des priorités pour ces services, vous ne pourrez pas les supprimer.`,
          },
        },
      },
    },
    serviceModifications: {
      label: "Modifications de services",
      column: {
        year: {
          label: "Année",
          tooltip: "",
        },
        teacherEmail: {
          label: "Intervenant",
          tooltip: "",
        },
        typeLabel: {
          label: "Type",
          tooltip: "",
        },
        hours: {
          label: "Heures (@:unit.weightedHours)",
          tooltip: "",
        },
      } satisfies Record<
        AdminTeachersServiceModificationsColName,
        AdminColNameOptions
      >,
      form: {
        title: {
          none: "Nouvelle modification de service",
          single: "{label}",
          multiple: "{count} modifications de service sélectionnées",
        },
        error: {
          updateYearWithoutTeacher:
            "Vous ne pouvez pas modifier l'année sans sélectionner un intervenant",
          updateTeacherWithoutYear:
            "Vous ne pouvez pas modifier l'intervenant sans sélectionner une année",
          serviceNotFound:
            "Il n'existe pas de service pour l'intervenant {teacherEmail} et l'année {year}",
          typeNotFound:
            "Il n'existe pas de modification de service avec le label « {type} »",
          hoursNegative: "Entrez un nombre d'heures positif ou nul",
        },
      },
      data: {
        success: {
          insert:
            "Aucune modification de service créée | Modification de service créée | {count} modifications de service créées",
          update:
            "Aucune modification de service mise à jour | Modification de service mise à jour | {count} modifications de service mises à jour",
          delete:
            "Aucune modification de service supprimée | Modification de service supprimée | {count} modifications de service supprimées",
          import:
            "0 modification de service importée | 1 modification de service importée | {count} modifications de service importées",
          export:
            "0 modification de service exportée | 1 modification de service exportée | {count} modifications de service exportées",
        },
        confirm: {
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer la modification de service « {label} » ?`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} modifications de service sélectionnées ?`,
          },
        },
      },
    },
    serviceModificationTypes: {
      label: "Types de modification de service",
      column: {
        label: {
          label: "Label",
          tooltip: "",
        },
        description: {
          label: "Description",
          tooltip: "",
        },
      } satisfies Record<
        AdminTeachersServiceModificationTypesColName,
        AdminColNameOptions
      >,
      form: {
        title: {
          none: "Nouveau type de modification",
          single: "{label}",
          multiple: "{count} types de modification sélectionnés",
        },
      },
      data: {
        success: {
          insert:
            "Aucun type de modification créé | Type de modification créé | {count} types de modification créés",
          update:
            "Aucun type de modification mis à jour | Type de modification mis à jour | {count} types de modification mis à jour",
          delete:
            "Aucun type de modification supprimé | Type de modification supprimé | {count} types de modification supprimés",
          import:
            "0 type de modification importé | 1 type de modification importé | {count} types de modification importés",
          export:
            "0 type de modification exporté | 1 type de modification exporté | {count} types de modification exportés",
        },
        confirm: {
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer le type de modification « {label} » ?
Si ce type est attribué à des modifications, vous ne pourrez pas le supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} types de modification sélectionnés ?
Si ces types sont attribués à des modifications, vous ne pourrez pas les supprimer.`,
          },
        },
      },
    },
    messages: {
      label: "Messages",
      column: {
        year: {
          label: "Année",
          tooltip: "",
        },
        teacherEmail: {
          label: "Intervenant",
          tooltip: "",
        },
        content: {
          label: "Contenu",
          tooltip: "",
        },
      } satisfies Record<AdminTeachersMessagesColName, AdminColNameOptions>,
      form: {
        title: {
          none: "Nouveau message",
          single: "{label}",
          multiple: "{count} messages sélectionnés",
        },
        error: {
          updateYearWithoutTeacher:
            "Vous ne pouvez pas modifier l'année sans sélectionner un intervenant",
          updateTeacherWithoutYear:
            "Vous ne pouvez pas modifier l'intervenant sans sélectionner une année",
          serviceNotFound:
            "Il n'existe pas de service pour l'intervenant {teacherEmail} et l'année {year}",
          noContent: "Entrez un contenu",
        },
      },
      data: {
        success: {
          insert: "Aucun message créé | Message créé | {count} messages créés",
          update:
            "Aucun message mis à jour | Message mis à jour | {count} messages mis à jour",
          delete:
            "Aucun message supprimé | Message supprimé | {count} messages supprimés",
          import:
            "0 message importé | 1 message importé | {count} messages importés",
          export:
            "0 message exporté | 1 message exporté | {count} messages exportés",
        },
        confirm: {
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer le message « {label} » ?`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} messages sélectionnés ?`,
          },
        },
      },
    },
  },
} as const;
