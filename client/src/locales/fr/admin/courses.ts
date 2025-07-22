import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminCoursesCourseTypesColName } from "@/components/admin/AdminCoursesCourseTypes.vue";
import type { AdminCoursesCoursesColName } from "@/components/admin/AdminCoursesCourses.vue";
import type { AdminCoursesDegreesColName } from "@/components/admin/AdminCoursesDegrees.vue";
import type { AdminCoursesProgramsColName } from "@/components/admin/AdminCoursesPrograms.vue";
import type { AdminCoursesTermsColName } from "@/components/admin/AdminCoursesTerms.vue";
import type { AdminCoursesTracksColName } from "@/components/admin/AdminCoursesTracks.vue";

export default {
  courses: {
    title: "Enseignements",
    degrees: {
      label: "Diplômes",
      column: {
        name: {
          label: "Nom",
          tooltip: "",
        },
        nameShort: {
          label: "Nom court",
          tooltip: "",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesDegreesColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'un diplôme | Édition d'un diplôme | Édition de {count} diplômes",
      },
      data: {
        success: {
          insert: "Aucun diplôme créé | Diplôme créé | {count} diplômes créés",
          update:
            "Aucun diplôme mis à jour | Diplôme mis à jour | {count} diplômes mis à jour",
          delete:
            "Aucun diplôme supprimé | Diplôme supprimé | {count} diplômes supprimés",
          import:
            "0 diplôme importé | 1 diplôme importé | {count} diplômes importés",
          export:
            "0 diplôme exporté | 1 diplôme exporté | {count} diplômes exportés",
        },
        confirm: {
          delete:
            `Êtes-vous sûr de vouloir supprimer le diplôme sélectionné ?
Si ce diplôme contient des mentions, vous ne pourrez pas le supprimer. ` +
            `| Êtes-vous sûr de vouloir supprimer les {count} diplômes sélectionnés ?
Si ces diplômes contiennent des mentions, vous ne pourrez pas les supprimer.`,
        },
      },
    },
    programs: {
      label: "Mentions",
      column: {
        degreeName: {
          label: "Diplôme",
          tooltip: "",
        },
        name: {
          label: "Nom",
          tooltip: "",
        },
        nameShort: {
          label: "Nom court",
          tooltip: "",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesProgramsColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'une mention | Édition d'une mention | Édition de {count} mentions",
        error: {
          degreeNotFound:
            "Il n'existe pas de diplôme avec le nom « {degreeName} »",
        },
      },
      data: {
        success: {
          insert:
            "Aucune mention créée | Mention créée | {count} mentions créées",
          update:
            "Aucune mention mise à jour | Mention mise à jour | {count} mentions mises à jour",
          delete:
            "Aucune mention supprimée | Mention supprimée | {count} mentions supprimées",
          import:
            "0 mention importée | 1 mention importée | {count} mentions importées",
          export:
            "0 mention exportée | 1 mention exportée | {count} mentions exportées",
        },
        confirm: {
          delete:
            `Êtes-vous sûr de vouloir supprimer la mention sélectionnée ?
S'il existe des parcours, des enseignements ou des responsabilités pour cette mention, vous ne pourrez pas la supprimer. ` +
            `| Êtes-vous sûr de vouloir supprimer les {count} mentions sélectionnées ?
S'il existe des parcours, des enseignements ou des responsabilités pour ces mentions, vous ne pourrez pas les supprimer.`,
        },
      },
    },
    tracks: {
      label: "Parcours",
      column: {
        degreeName: {
          label: "Diplôme",
          tooltip: "",
        },
        programName: {
          label: "Mention",
          tooltip: "",
        },
        name: {
          label: "Nom",
          tooltip: "",
        },
        nameShort: {
          label: "Nom court",
          tooltip: "",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesTracksColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'un parcours | Édition d'un parcours | Édition de {count} parcours",
        error: {
          updateProgramMissingFields:
            "Pour mettre à jour la mention, vous devez sélectionner un diplôme et une mention",
          programNotFound:
            "Il n'existe pas de mention du diplôme « {degreeName} » avec le nom « {programName} »",
        },
      },
      data: {
        success: {
          insert:
            "Aucun parcours créé | Parcours créé | {count} parcours créés",
          update:
            "Aucun parcours mis à jour | Parcours mis à jour | {count} parcours mis à jour",
          delete:
            "Aucun parcours supprimé | Parcours supprimé | {count} parcours supprimés",
          import:
            "0 parcours importé | 1 parcours importé | {count} parcours importés",
          export:
            "0 parcours exporté | 1 parcours exporté | {count} parcours exportés",
        },
        confirm: {
          delete:
            `Êtes-vous sûr de vouloir supprimer le parcours sélectionné ?
S'il existe des enseignements ou des responsabilités pour ce parcours, vous ne pourrez pas le supprimer. ` +
            `Êtes-vous sûr de vouloir supprimer les {count} parcours sélectionnés ?
S'il existe des enseignements ou des responsabilités pour ces parcours, vous ne pourrez pas les supprimer.`,
        },
      },
    },
    terms: {
      label: "Périodes",
      column: {
        label: {
          label: "Label",
          tooltip: "",
        },
        description: {
          label: "Description",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesTermsColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'une période | Édition d'une période | Édition de {count} périodes",
      },
      data: {
        success: {
          insert:
            "Aucune période créée | Période créée | {count} périodes créées",
          update:
            "Aucune période mise à jour | Période mise à jour | {count} périodes mises à jour",
          delete:
            "Aucune période supprimée | Période supprimée | {count} périodes supprimées",
          import:
            "0 période importée | 1 période importée | {count} périodes importées",
          export:
            "0 période exportée | 1 période exportée | {count} périodes exportées",
        },
        confirm: {
          delete:
            `Êtes-vous sûr de vouloir supprimer la période sélectionnée ?
Si cette période contient des enseignements, vous ne pourrez pas la supprimer. ` +
            `Êtes-vous sûr de vouloir supprimer les {count} périodes sélectionnées ?
Si ces périodes contiennent des enseignements, vous ne pourrez pas les supprimer.`,
        },
      },
    },
    courses: {
      label: "Enseignements",
      column: {
        year: {
          label: "Année",
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
        name: {
          label: "Nom",
          tooltip: "",
        },
        nameShort: {
          label: "Nom court",
          tooltip: "",
        },
        termLabel: {
          label: "Période",
          tooltip: "",
        },
        typeLabel: {
          label: "Type",
          tooltip: "",
        },
        hours: {
          label: "Heures",
          tooltip: "Nombre d'heures par groupe",
        },
        hoursAdjusted: {
          label: "H. cor.",
          tooltip: "Nombre d'heures par groupe corrigé",
        },
        groups: {
          label: "Groupes",
          tooltip: "Nombre de groupes",
        },
        groupsAdjusted: {
          label: "G. cor.",
          tooltip: "Nombre de groupes corrigé",
        },
        description: {
          label: "Description",
          tooltip: "",
        },
        priorityRule: {
          label: "Règle prio.",
          tooltip: "Règle de priorité",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesCoursesColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'un enseignement | Édition d'un enseignement | Édition de {count} enseignements",
        error: {
          updateProgramMissingFields:
            "Pour mettre à jour la mention, vous devez sélectionner un diplôme et une mention",
          updateTrackMissingFields:
            "Pour mettre à jour le parcours, vous devez sélectionner un diplôme, une mention et un parcours",
          programNotFound:
            "Il n'existe pas de mention du diplôme « {degreeName} » avec le nom « {programName} »",
          trackNotFound:
            "Il n'existe pas de parcours dans la mention « {programName} » du diplôme « {degreeName} » avec le nom « {trackName} »",
          termNotFound:
            "Il n'existe pas de période avec le label « {termLabel} »",
          typeNotFound:
            "Il n'existe pas de type d'enseignement avec le label « {typeLabel} »",
          hoursNegative: "Entrez un nombre d'heures positif ou nul",
          hoursAdjustedNegative:
            "Entrez un nombre d'heures corrigé positif ou nul",
          groupsNegative: "Entrez un nombre de groupes positif ou nul",
          groupsAdjustedNegative:
            "Entrez un nombre de groupes corrigé positif ou nul",
          priorityRule:
            "La règle de priorité doit être un entier positif ou nul",
        },
      },
      data: {
        success: {
          insert:
            "Aucun enseignement créé | Enseignement créé | {count} enseignements créés",
          update:
            "Aucun enseignement mis à jour | Enseignement mis à jour | {count} enseignements mis à jour",
          delete:
            "Aucun enseignement supprimé | Enseignement supprimé | {count} enseignements supprimés",
          import:
            "0 enseignement importé | 1 enseignement importé | {count} enseignements importés",
          export:
            "0 enseignement exporté | 1 enseignement exporté | {count} enseignements exportés",
        },
        confirm: {
          delete:
            `Êtes-vous sûr de vouloir supprimer l'enseignement sélectionné ?
S'il existe des demandes ou des responsabilités pour cet enseignement, vous ne pourrez pas le supprimer. ` +
            `| Êtes-vous sûr de vouloir supprimer les {count} enseignements sélectionnés ?
S'il existe des demandes ou des responsabilités pour ces enseignements, vous ne pourrez pas les supprimer.`,
        },
      },
    },
    courseTypes: {
      label: "Types d'enseignement",
      column: {
        label: {
          label: "Label",
          tooltip: "",
        },
        coefficient: {
          label: "Coefficient",
          tooltip: "",
        },
        description: {
          label: "Description",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesCourseTypesColName, AdminColNameOptions>,
      form: {
        title:
          "Création d'un type d'enseignement | Édition d'un type d'enseignement | Édition de {count} types d'enseignement",
      },
      data: {
        success: {
          insert:
            "Aucun type d'enseignement créé | Type d'enseignement créé | {count} types d'enseignement créés",
          update:
            "Aucun type d'enseignement mis à jour | Type d'enseignement mis à jour | {count} types d'enseignement mis à jour",
          delete:
            "Aucun type d'enseignement supprimé | Type d'enseignement supprimé | {count} types d'enseignement supprimés",
          import:
            "0 type d'enseignement importé | 1 type d'enseignement importé | {count} types d'enseignement importés",
          export:
            "0 type d'enseignement exporté | 1 type d'enseignement exporté | {count} types d'enseignement exportés",
        },
        confirm: {
          delete:
            `Êtes-vous sûr de vouloir supprimer le type d'enseignement sélectionné ?
Si ce type est attribué à des enseignements, vous ne pourrez pas le supprimer. ` +
            `Êtes-vous sûr de vouloir supprimer les {count} types d'enseignement sélectionnés ?
Si ces types sont attribués à des enseignements, vous ne pourrez pas les supprimer.`,
        },
      },
    },
  },
} as const;
