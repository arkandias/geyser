import type { AdminColNameOptions } from "@/locales/types.ts";

import type {
  AdminTeachersExternalCoursesColName,
  AdminTeachersMessagesColName,
  AdminTeachersPositionsColName,
  AdminTeachersServiceModificationTypesColName,
  AdminTeachersServiceModificationsColName,
  AdminTeachersServicesColName,
  AdminTeachersTeachersColName,
} from "@/components/admin/col-names.ts";

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
        title:
          "Création d'un intervenant | Édition d'un intervenant | Édition de {count} intervenants",
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
          delete:
            `Êtes-vous sûr de vouloir supprimer l'intervenant sélectionné ?
S'il existe des services, des responsabilités ou des rôles pour cet intervenant, vous ne pourrez pas le supprimer. ` +
            `| Êtes-vous sûr de vouloir supprimer les {count} intervenants sélectionnés ?
S'il existe des services, des responsabilités ou des rôles pour ces intervenants, vous ne pourrez pas les supprimer.`,
        },
      },
    },
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
        positionLabel: {
          label: "Fonction",
          tooltip: "",
        },
        hours: {
          label: "Heures (@:unit.weightedHours)",
          tooltip: "",
        },
      } satisfies Record<AdminTeachersServicesColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'un service | Édition d'un service | Édition de {count} services",
        error: {
          teacherNotFound:
            "Il n'existe pas d'intervenant avec l'email « {teacherEmail} »",
          positionNotFound:
            "Il n'existe pas de fonction avec le label « {position} »",
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
          delete:
            `Êtes-vous sûr de vouloir supprimer le service sélectionné ?
S'il existe des modifications, des enseignements extérieurs, des demandes ou un message pour ce service, vous ne pourrez pas le supprimer. ` +
            `| Êtes-vous sûr de vouloir supprimer les {count} services sélectionnés ?
S'il existe des modifications, des enseignements extérieurs, des demandes ou des messages pour ces services, vous ne pourrez pas les supprimer.`,
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
        title:
          "Création d'une modification de service | Édition d'une modification de service | Édition de {count} modifications de service",
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
          delete:
            "Êtes-vous sûr de vouloir supprimer la modification de service sélectionnée ? | Êtes-vous sûr de vouloir supprimer les {count} modifications de service sélectionnées ?",
        },
      },
    },
    serviceModificationTypes: {
      label: "Types de modification de service",
      column: {
        label: {
          label: "Libellé",
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
        title:
          "Création d'un type de modification | Édition d'un type de modification | Édition de {count} types de modification",
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
          delete:
            `Êtes-vous sûr de vouloir supprimer le type de modification sélectionné ?
Si ce type est attribué à des modifications, vous ne pourrez pas le supprimer. ` +
            `| Êtes-vous sûr de vouloir supprimer les {count} types de modification sélectionnés ?
Si ces types sont attribués à des modifications, vous ne pourrez pas les supprimer.`,
        },
      },
    },
    externalCourses: {
      label: "Enseignements extérieurs",
      column: {
        year: {
          label: "Année",
          tooltip: "",
        },
        teacherEmail: {
          label: "Intervenant",
          tooltip: "",
        },
        label: {
          label: "Libellé",
          tooltip: "",
        },
        hours: {
          label: "Heures (@:unit.weightedHours)",
          tooltip: "",
        },
      } satisfies Record<
        AdminTeachersExternalCoursesColName,
        AdminColNameOptions
      >,
      form: {
        title:
          "Création d'un enseignement extérieur | Édition d'un enseignement extérieur | Édition de {count} enseignements extérieurs",
        error: {
          updateYearWithoutTeacher:
            "Vous ne pouvez pas modifier l'année sans sélectionner un intervenant",
          updateTeacherWithoutYear:
            "Vous ne pouvez pas modifier l'intervenant sans sélectionner une année",
          serviceNotFound:
            "Il n'existe pas de service pour l'intervenant {teacherEmail} et l'année {year}",
          hoursNegative: "Entrez un nombre d'heures positif ou nul",
        },
      },
      data: {
        success: {
          insert:
            "Aucune enseignement extérieur créé | Enseignement extérieur créé | {count} enseignements extérieurs créés",
          update:
            "Aucun enseignement extérieur mis à jour | Enseignement extérieur mis à jour | {count} enseignements extérieurs mis à jour",
          delete:
            "Aucun enseignement extérieur supprimé | Enseignement extérieur supprimé | {count} enseignements extérieurs supprimés",
          import:
            "0 enseignement extérieur importé | 1 enseignement extérieur importé | {count} enseignements extérieurs importés",
          export:
            "0 enseignement extérieur exporté | 1 enseignement extérieur exporté | {count} enseignements extérieurs exportés",
        },
        confirm: {
          delete:
            "Êtes-vous sûr de vouloir supprimer l'enseignement extérieur sélectionné ? | Êtes-vous sûr de vouloir supprimer les {count} enseignements extérieurs sélectionnés ?",
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
        title:
          "Création d'un message | Édition d'un message | Édition de {count} messages",
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
          delete:
            "Êtes-vous sûr de vouloir supprimer le message sélectionné ? | Êtes-vous sûr de vouloir supprimer les {count} messages sélectionnés ?",
        },
      },
    },
  },
} as const;
