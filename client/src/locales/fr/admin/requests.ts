import { RequestTypeEnum } from "@/gql/graphql.ts";
import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminRequestsPrioritiesColName } from "@/components/admin/AdminRequestsPriorities.vue";
import type { AdminRequestsRequestsColName } from "@/components/admin/AdminRequestsRequests.vue";

export default {
  requests: {
    title: "Demandes et priorités",
    requests: {
      label: "Demandes",
      column: {
        year: {
          label: "Année",
          tooltip: "",
        },
        type: {
          label: "Type",
          tooltip: "",
        },
        hours: {
          label: "Heures",
          tooltip: "",
        },
        teacherEmail: {
          label: "Intervenant",
          tooltip: "",
        },
        degreeName: {
          label: "Diplôme",
          tooltip: "",
        },
        programName: {
          label: "Mention",
          tooltip: "",
        },
        trackName: {
          label: "Parcours",
          tooltip: "",
        },
        courseName: {
          label: "Enseignement",
          tooltip: "",
        },
        termLabel: {
          label: "Période",
          tooltip: "",
        },
        courseTypeLabel: {
          label: "Type ens.",
          tooltip: "Type d'enseignement",
        },
      } satisfies Record<AdminRequestsRequestsColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'une demande | Édition d'une demande | Édition de {count} demandes",
        error: {
          updateServiceMissingFields:
            "Pour mettre à jour le service, vous devez sélectionner une année et un intervenant",
          serviceNotFound:
            "Il n'existe pas de service pour l'intervenant {teacherEmail} pour l'année {year}",
          updateCourseMissingFields:
            "Pour mettre à jour l'enseignement, vous devez sélectionner une année, un diplôme, une mention, un parcours (éventuellement vide), un enseignement, un semestre et un type d'enseignement",
          courseNotFound:
            "Il n'existe pas d'enseignement de type « {typeLabel} » durant la période « {termLabel} » avec le nom « {courseName} » dans le parcours « {trackName} » de la mention « {programName} » du diplôme « {degreeName} » pour l'année {year}",
          invalidType: `Le type de la requête doit être ${RequestTypeEnum.Assignment}, ${RequestTypeEnum.Primary} ou ${RequestTypeEnum.Secondary}`,
          hoursNegative: "Entrez un nombre d'heures positif ou nul",
        },
      },
      data: {
        success: {
          insert:
            "Aucune demande créée | Demande créée | {count} demandes créées",
          update:
            "Aucune demande mise à jour | Demande mise à jour | {count} demandes mises à jour",
          delete:
            "Aucune demande supprimée | Demande supprimée | {count} demandes supprimées",
          import:
            "0 demande importée | 1 demande importée | {count} demandes importées",
          export:
            "0 demande exportée | 1 demande exportée | {count} demandes exportées",
        },
        confirm: {
          delete:
            "Êtes-vous sûr de vouloir supprimer la demande sélectionnée ? | Êtes-vous sûr de vouloir supprimer les {count} demandes sélectionnées ?",
        },
      },
    },
    priorities: {
      label: "Priorités",
      column: {
        year: {
          label: "Année",
          tooltip: "",
        },
        seniority: {
          label: "Ancienneté",
          tooltip: "",
        },
        isPriority: {
          label: "Prioritaire",
          tooltip: "",
        },
        computed: {
          label: "Calculée",
          tooltip: "",
        },
        teacherEmail: {
          label: "Intervenant",
          tooltip: "",
        },
        degreeName: {
          label: "Diplôme",
          tooltip: "",
        },
        programName: {
          label: "Mention",
          tooltip: "",
        },
        trackName: {
          label: "Parcours",
          tooltip: "",
        },
        courseName: {
          label: "Enseignement",
          tooltip: "",
        },
        termLabel: {
          label: "Période",
          tooltip: "",
        },
        courseTypeLabel: {
          label: "Type ens.",
          tooltip: "Type d'enseignement",
        },
      } satisfies Record<AdminRequestsPrioritiesColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'une priorité | Édition d'une priorité | Édition de {count} priorités",
        error: {
          updateServiceMissingFields:
            "Pour mettre à jour le service, vous devez sélectionner une année et un intervenant",
          serviceNotFound:
            "Il n'existe pas de service pour l'intervenant {teacherEmail} pour l'année {year}",
          updateCourseMissingFields:
            "Pour mettre à jour l'enseignement, vous devez sélectionner une année, un diplôme, une mention, un parcours (éventuellement vide), un enseignement, un semestre et un type d'enseignement",
          courseNotFound:
            "Il n'existe pas d'enseignement de type « {typeLabel} » durant la période « {termLabel} » avec le nom « {courseName} » dans le parcours « {trackName} » de la mention « {programName} » du diplôme « {degreeName} » pour l'année {year}",
        },
      },
      data: {
        success: {
          insert:
            "Aucune priorité créée | Priorité créée | {count} priorités créées",
          update:
            "Aucune priorité mise à jour | Priorité mise à jour | {count} priorités mises à jour",
          delete:
            "Aucune priorité supprimée | Priorité supprimée | {count} priorités supprimées",
          import:
            "0 priorité importée | 1 priorité importée | {count} priorités importées",
          export:
            "0 priorité exportée | 1 priorité exportée | {count} priorités exportées",
        },
        confirm: {
          delete:
            "Êtes-vous sûr de vouloir supprimer la priorité sélectionnée ? | Êtes-vous sûr de vouloir supprimer les {count} priorités sélectionnées ?",
        },
      },
    },
  },
} as const;
