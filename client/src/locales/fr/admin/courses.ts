import type { AdminColNameOptions } from "@/locales/types.ts";

import type { ColName as AdminCoursesCourseTypesColName } from "@/components/admin/AdminCoursesCourseTypes.vue";
import type { ColName as AdminCoursesCoursesColName } from "@/components/admin/AdminCoursesCourses.vue";
import type { ColName as AdminCoursesDegreesColName } from "@/components/admin/AdminCoursesDegrees.vue";
import type { ColName as AdminCoursesProgramsColName } from "@/components/admin/AdminCoursesPrograms.vue";
import type { ColName as AdminCoursesTracksColName } from "@/components/admin/AdminCoursesTracks.vue";

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
        title: {
          none: "Nouveau diplôme",
          single: "{label}",
          multiple: "{count} diplômes sélectionnés",
        },
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
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer le diplôme « {label} » ?
Si ce diplôme contient des mentions, vous ne pourrez pas le supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} diplômes sélectionnés ?
Si ces diplômes contiennent des mentions, vous ne pourrez pas les supprimer.`,
          },
        },
      },
    },
    programs: {
      label: "Mentions",
      column: {
        degree: {
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
        title: {
          none: "Nouvelle mention",
          single: "{label}",
          multiple: "{count} mentions sélectionnées",
        },
        error: {
          degreeNotFound: "Il n'existe pas de diplôme avec le nom « {degree} »",
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
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer la mention « {label} » ?
S'il existe des parcours, des cours ou des responsables pour cette mention, vous ne pourrez pas la supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} mentions sélectionnées ?
S'il existe des parcours, des cours ou des responsables pour ces mentions, vous ne pourrez pas les supprimer.`,
          },
        },
      },
    },
    tracks: {
      label: "Parcours",
      column: {
        degree: {
          label: "Diplôme",
          tooltip: "",
        },
        program: {
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
        title: {
          none: "Nouveau parcours",
          single: "{label}",
          multiple: "{count} parcours sélectionnés",
        },
        error: {
          updateDegreeWithoutProgram:
            "Vous ne pouvez pas modifier le diplôme sans sélectionner une mention",
          updateProgramWithoutDegree:
            "Vous ne pouvez pas modifier la mention sans sélectionner un diplôme",
          degreeNotFound: "Il n'existe pas de diplôme avec le nom « {degree} »",
          programNotFound:
            "Il n'existe pas de mention du diplôme « {degree} » avec le nom « {program} »",
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
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer le parcours « {label} » ?
S'il existe des cours ou des responsables pour ce parcours, vous ne pourrez pas le supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} parcours sélectionnés ?
S'il existe des cours ou des responsables pour ces parcours, vous ne pourrez pas les supprimer.`,
          },
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
        name: {
          label: "Nom",
          tooltip: "",
        },
        nameShort: {
          label: "Nom court",
          tooltip: "",
        },
        semester: {
          label: "Semestre",
          tooltip: "",
        },
        type: {
          label: "Type d'enseignement",
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
        title: {
          none: "Nouvel enseignement",
          single: "{label}",
          multiple: "{count} enseignements sélectionnés",
        },
        error: {
          updateDegreeWithoutProgram:
            "Vous ne pouvez pas modifier le diplôme sans sélectionner une mention",
          updateProgramWithoutDegree:
            "Vous ne pouvez pas modifier la mention sans sélectionner un diplôme",
          updateTrackWithoutProgram:
            "Vous ne pouvez pas modifier le parcours sans sélectionner une mention",
          updateTrackWithoutDegree:
            "Vous ne pouvez pas modifier le parcours sans sélectionner un diplôme",
          degreeNotFound: "Il n'existe pas de diplôme avec le nom « {degree} »",
          programNotFound:
            "Il n'existe pas de mention du diplôme « {degree} » avec le nom « {program} »",
          trackNotFound:
            "Il n'existe pas de parcours dans la mention « {program} » du diplôme « {degree} » avec le nom « {track} »",
          courseTypeNotFound:
            "Il n'existe pas de type d'enseignement avec le label « {type} »",
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
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer l'enseignement « {label} » ?
S'il existe des demandes, des priorités ou des responsables pour cet enseignement, vous ne pourrez pas le supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} parcours sélectionnés ?
S'il existe des demandes, des priorités ou des responsables pour ces enseignements, vous ne pourrez pas les supprimer.`,
          },
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
        title: {
          none: "Nouveau type d'enseignement",
          single: "{label}",
          multiple: "{count} types d'enseignement' sélectionnés",
        },
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
          delete: {
            single: `Êtes-vous sûr de vouloir supprimer le type d'enseignement « {label} » ?
Si ce type est attribué à des enseignements, vous ne pourrez pas le supprimer.`,
            multiple: `Êtes-vous sûr de vouloir supprimer les {count} types d'enseignement sélectionnés ?
Si ces types sont attribués à des enseignements, vous ne pourrez pas les supprimer.`,
          },
        },
      },
    },
  },
} as const;
