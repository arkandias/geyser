import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminCoordinationsCoursesColNames } from "@/components/admin/AdminCoordinationsCourses.vue";
import type { AdminCoordinationsProgramsColNames } from "@/components/admin/AdminCoordinationsPrograms.vue";
import type { AdminCoordinationsTracksColNames } from "@/components/admin/AdminCoordinationsTracks.vue";

export default {
  coordinations: {
    title: "Responsabilités",
    programs: {
      label: "Responsabilités de mention",
      column: {
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
        comment: {
          label: "Commentaire",
          tooltip: "",
        },
      } satisfies Record<
        AdminCoordinationsProgramsColNames,
        AdminColNameOptions
      >,
      form: {
        title:
          "Création d'une responsabilité | Édition d'une responsabilité | Édition de {count} responsabilités",
        error: {
          teacherNotFound:
            "Il n'existe pas d'intervenant avec l'email « {teacherEmail} »",
          updateProgramMissingFields:
            "Pour mettre à jour la mention, vous devez sélectionner un diplôme et une mention",
          programNotFound:
            "Il n'existe pas de mention du diplôme « {degreeName} » avec le nom « {program} »",
        },
      },
      data: {
        success: {
          insert:
            "Aucune responsabilité créée | Responsabilité créée | {count} responsabilités créées",
          update:
            "Aucune responsabilité mise à jour | Responsabilité mise à jour | {count} responsabilités mises à jour",
          delete:
            "Aucune responsabilité supprimée | Responsabilité supprimée | {count} responsabilités supprimées",
          import:
            "0 responsabilité importée | 1 responsabilité importée | {count} responsabilités importées",
          export:
            "0 responsabilité exportée | 1 responsabilité exportée | {count} responsabilités exportées",
        },
        confirm: {
          delete:
            "Êtes-vous sûr de vouloir supprimer la responsabilité sélectionnée ? | Êtes-vous sûr de vouloir supprimer les {count} responsabilités sélectionnées ?",
        },
      },
    },
    tracks: {
      label: "Responsabilités de parcours",
      column: {
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
        comment: {
          label: "Commentaire",
          tooltip: "",
        },
      } satisfies Record<AdminCoordinationsTracksColNames, AdminColNameOptions>,
      form: {
        title:
          "Création d'une responsabilité | Édition d'une responsabilité | Édition de {count} responsabilités",
        error: {
          teacherNotFound:
            "Il n'existe pas d'intervenant avec l'email « {teacherEmail} »",
          updateTrackMissingFields:
            "Pour mettre à jour le parcours, vous devez sélectionner un diplôme, une mention et un parcours",
          trackNotFound:
            "Il n'existe pas de parcours dans la mention « {program} » du diplôme « {degreeName} » avec le nom « {track} »",
        },
      },
      data: {
        success: {
          insert:
            "Aucune responsabilité créée | Responsabilité créée | {count} responsabilités créées",
          update:
            "Aucune responsabilité mise à jour | Responsabilité mise à jour | {count} responsabilités mises à jour",
          delete:
            "Aucune responsabilité supprimée | Responsabilité supprimée | {count} responsabilités supprimées",
          import:
            "0 responsabilité importée | 1 responsabilité importée | {count} responsabilités importées",
          export:
            "0 responsabilité exportée | 1 responsabilité exportée | {count} responsabilités exportées",
        },
        confirm: {
          delete:
            "Êtes-vous sûr de vouloir supprimer la responsabilité sélectionnée ? | Êtes-vous sûr de vouloir supprimer les {count} responsabilités sélectionnées ?",
        },
      },
    },
    courses: {
      label: "Responsabilités d'enseignement",
      column: {
        year: {
          label: "Année",
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
        comment: {
          label: "Commentaire",
          tooltip: "",
        },
      } satisfies Record<
        AdminCoordinationsCoursesColNames,
        AdminColNameOptions
      >,
      form: {
        title:
          "Création d'une responsabilité | Édition d'une responsabilité | Édition de {count} responsabilités",
        error: {
          teacherNotFound:
            "Il n'existe pas d'intervenant avec l'email « {teacherEmail} »",
          updateCourseMissingFields:
            "Pour mettre à jour l'enseignement, vous devez sélectionner une année, un diplôme, une mention, un parcours (éventuellement vide), un enseignement, un semestre et un type d'enseignement",
          courseNotFound:
            "Il n'existe pas d'enseignement de type « {type} » durant la période « {term} » avec le nom « {courseName} » dans le parcours « {track} » de la mention « {program} » du diplôme « {degreeName} » pour l'année {year}",
        },
      },
      data: {
        success: {
          insert:
            "Aucune responsabilité créée | Responsabilité créée | {count} responsabilités créées",
          update:
            "Aucune responsabilité mise à jour | Responsabilité mise à jour | {count} responsabilités mises à jour",
          delete:
            "Aucune responsabilité supprimée | Responsabilité supprimée | {count} responsabilités supprimées",
          import:
            "0 responsabilité importée | 1 responsabilité importée | {count} responsabilités importées",
          export:
            "0 responsabilité exportée | 1 responsabilité exportée | {count} responsabilités exportées",
        },
        confirm: {
          delete:
            "Êtes-vous sûr de vouloir supprimer la responsabilité sélectionnée ? | Êtes-vous sûr de vouloir supprimer les {count} responsabilités sélectionnées ?",
        },
      },
    },
  },
} as const;
