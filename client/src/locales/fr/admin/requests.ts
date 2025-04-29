import { RequestTypeEnum } from "@/gql/graphql.ts";
import type { AdminColNameOptions } from "@/locales/types.ts";

import type { ColName as AdminRequestsPrioritiesColNames } from "@/components/admin/AdminRequestsPriorities.vue";
import type { ColName as AdminRequestsRequestsColNames } from "@/components/admin/AdminRequestsRequests.vue";

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
        uid: {
          label: "Intervenant",
          tooltip: "",
        },
        degree: {
          label: "Diplôme",
          tooltip: "",
        },
        program: {
          label: "Mention",
          tooltip: "",
        },
        track: {
          label: "Parcours",
          tooltip: "",
        },
        course: {
          label: "Enseignement",
          tooltip: "",
        },
        semester: {
          label: "Semestre",
          tooltip: "",
        },
        courseType: {
          label: "Type ens.",
          tooltip: "Type d'enseignement",
        },
      } satisfies Record<AdminRequestsRequestsColNames, AdminColNameOptions>,
      form: {
        title: {
          none: "Nouvelle demande",
          single: "{label}",
          multiple: "{count} demandes sélectionnées",
        },
        error: {
          updateUidWithoutYear:
            "Vous ne pouvez pas modifier l'intervenant sans sélectionner une année'",
          serviceNotFound:
            "Il n'existe pas de service pour l'intervenant {uid} pour l'année {year}",
          updateCourseMissingFields:
            "Pour mettre à jour le cours, vous devez sélectionner une année, un diplôme, une mention, un parcours (éventuellement vide), un enseignement, un semestre et un type d'enseignement",
          courseNotFound:
            "Il n'existe pas de {type} au semestre {semester} avec le nom « {name} » dans le parcours « {track} » de la mention « {program} » du diplôme « {degree} » pour l'année {year}",
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
          delete: {
            single:
              "Êtes-vous sûr de vouloir supprimer la demande « {label} » ?",
            multiple:
              "Êtes-vous sûr de vouloir supprimer les {count} demandes sélectionnées ?",
          },
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
        uid: {
          label: "Intervenant",
          tooltip: "",
        },
        degree: {
          label: "Diplôme",
          tooltip: "",
        },
        program: {
          label: "Mention",
          tooltip: "",
        },
        track: {
          label: "Parcours",
          tooltip: "",
        },
        course: {
          label: "Enseignement",
          tooltip: "",
        },
        semester: {
          label: "Semestre",
          tooltip: "",
        },
        courseType: {
          label: "Type ens.",
          tooltip: "Type d'enseignement",
        },
      } satisfies Record<AdminRequestsPrioritiesColNames, AdminColNameOptions>,
      form: {
        title: {
          none: "Nouvelle priorité",
          single: "{label}",
          multiple: "{count} priorités sélectionnées",
        },
        error: {
          updateUidWithoutYear:
            "Vous ne pouvez pas modifier l'intervenant sans sélectionner une année'",
          serviceNotFound:
            "Il n'existe pas de service pour l'intervenant {uid} pour l'année {year}",
          updateCourseMissingFields:
            "Pour mettre à jour le cours, vous devez sélectionner une année, un diplôme, une mention, un parcours (éventuellement vide), un enseignement, un semestre et un type d'enseignement",
          courseNotFound:
            "Il n'existe pas de {type} au semestre {semester} avec le nom « {name} » dans le parcours « {track} » de la mention « {program} » du diplôme « {degree} » pour l'année {year}",
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
          delete: {
            single:
              "Êtes-vous sûr de vouloir supprimer la priorité « {label} » ?",
            multiple:
              "Êtes-vous sûr de vouloir supprimer les {count} priorités sélectionnées ?",
          },
        },
      },
    },
  },
} as const;
