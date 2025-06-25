import type { AdminColNameOptions } from "@/locales/types.ts";

import type {
  AdminCoordinationsCoursesColNames,
  AdminCoordinationsProgramsColNames,
  AdminCoordinationsTracksColNames,
} from "@/components/admin/col-names.ts";

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
            "Il n'existe pas d'intervenant avec l'email « {email} »",
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
            "Il n'existe pas d'intervenant avec l'email « {email} »",
          updateProgramOrTrackWithoutDegree:
            "Vous ne pouvez pas modifier la mention ou le parcours sans sélectionner un diplôme",
          updateDegreeOrTrackWithoutProgram:
            "Vous ne pouvez pas modifier le diplôme ou le parcours sans sélectionner une mention",
          updateDegreeOrProgramWithoutTrack:
            "Vous ne pouvez pas modifier le diplôme ou la mention sans sélectionner un parcours",
          degreeNotFound: "Il n'existe pas de diplôme avec le nom « {degree} »",
          programNotFound:
            "Il n'existe pas de mention du diplôme « {degree} » avec le nom « {program} »",
          trackNotFound:
            "Il n'existe pas de parcours dans la mention « {program} » du diplôme « {degree} » avec le nom « {track} »",
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
        courseSemester: {
          label: "Semestre",
          tooltip: "",
        },
        courseType: {
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
            "Il n'existe pas d'intervenant avec l'email « {email} »",
          updateCourseMissingFields:
            "Pour mettre à jour le cours, vous devez sélectionner une année, un diplôme, une mention, un parcours (éventuellement vide), un enseignement, un semestre et un type d'enseignement",
          courseNotFound:
            "Il n'existe pas de {type} au semestre {semester} avec le nom « {name} » dans le parcours « {track} » de la mention « {program} » du diplôme « {degree} » pour l'année {year}",
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
