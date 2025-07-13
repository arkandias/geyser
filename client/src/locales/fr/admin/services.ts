import type { AdminColNameOptions } from "@/locales/types.ts";

import type {
  AdminServicesExternalCoursesColName,
  AdminServicesMessagesColName,
  AdminServicesServiceModificationsColName,
  AdminServicesServicesColName,
} from "@/components/admin/col-names.ts";

export default {
  services: {
    title: "Services",
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
      } satisfies Record<AdminServicesServicesColName, AdminColNameOptions>,
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
        label: {
          label: "Libellé",
          tooltip: "",
        },
        hours: {
          label: "Heures (@:unit.weightedHours)",
          tooltip: "",
        },
      } satisfies Record<
        AdminServicesServiceModificationsColName,
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
        AdminServicesExternalCoursesColName,
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
      } satisfies Record<AdminServicesMessagesColName, AdminColNameOptions>,
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
