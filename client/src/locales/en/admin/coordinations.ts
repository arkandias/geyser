import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminCoordinationsCoursesColNames } from "@/components/admin/AdminCoordinationsCourses.vue";
import type { AdminCoordinationsProgramsColNames } from "@/components/admin/AdminCoordinationsPrograms.vue";
import type { AdminCoordinationsTracksColNames } from "@/components/admin/AdminCoordinationsTracks.vue";

export default {
  coordinations: {
    title: "Coordinations",
    programs: {
      label: "Program coordinations",
      column: {
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        degreeName: {
          label: "Degree",
          tooltip: "",
        },
        programName: {
          label: "Program",
          tooltip: "",
        },
        comment: {
          label: "Comment",
          tooltip: "",
        },
      } satisfies Record<
        AdminCoordinationsProgramsColNames,
        AdminColNameOptions
      >,
      form: {
        title:
          "Creating a coordination | Editing a coordination | Editing {count} coordinations",
        error: {
          teacherNotFound: 'No teacher with email "{teacherEmail}"',
          updateProgramMissingFields:
            "To update the program, you must select a degree and a program",
          programNotFound:
            'No program in the degree "{degreeName}" with the name "{programName}" exists',
        },
      },
      data: {
        success: {
          insert:
            "No coordination created | Coordination created | {count} coordinations created",
          update:
            "No coordination updated | Coordination updated | {count} coordinations updated",
          delete:
            "No coordination deleted | Coordination deleted | {count} coordinations deleted",
          import:
            "0 coordinations imported | 1 coordination imported | {count} coordinations imported",
          export:
            "0 coordinations exported | 1 coordination exported | {count} coordinations exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected coordination? | Are you sure you want to delete the {count} selected coordinations?",
        },
      },
    },
    tracks: {
      label: "Track coordinations",
      column: {
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        degreeName: {
          label: "Degree",
          tooltip: "",
        },
        programName: {
          label: "Program",
          tooltip: "",
        },
        trackName: {
          label: "Track",
          tooltip: "",
        },
        comment: {
          label: "Comment",
          tooltip: "",
        },
      } satisfies Record<AdminCoordinationsTracksColNames, AdminColNameOptions>,
      form: {
        title:
          "Creating a coordination | Editing a coordination | Editing {count} coordinations",
        error: {
          teacherNotFound: 'No teacher with email "{teacherEmail}"',
          updateTrackMissingFields:
            "To update the track, you must select a degree, a program, and a track",
          trackNotFound:
            'No track in the program "{programName}" of the degree "{degreeName}" with the name "{trackName}" exists',
        },
      },
      data: {
        success: {
          insert:
            "No coordination created | Coordination created | {count} coordinations created",
          update:
            "No coordination updated | Coordination updated | {count} coordinations updated",
          delete:
            "No coordination deleted | Coordination deleted | {count} coordinations deleted",
          import:
            "0 coordinations imported | 1 coordination imported | {count} coordinations imported",
          export:
            "0 coordinations exported | 1 coordination exported | {count} coordinations exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected coordination? | Are you sure you want to delete the {count} selected coordinations?",
        },
      },
    },
    courses: {
      label: "Course coordinations",
      column: {
        year: {
          label: "Year",
          tooltip: "",
        },
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        degreeName: {
          label: "Degree",
          tooltip: "",
        },
        programName: {
          label: "Program",
          tooltip: "",
        },
        trackName: {
          label: "Track",
          tooltip: "",
        },
        courseName: {
          label: "Course",
          tooltip: "",
        },
        termLabel: {
          label: "Term",
          tooltip: "",
        },
        courseTypeLabel: {
          label: "Course type",
          tooltip: "",
        },
        comment: {
          label: "Comment",
          tooltip: "",
        },
      } satisfies Record<
        AdminCoordinationsCoursesColNames,
        AdminColNameOptions
      >,
      form: {
        title:
          "Creating a coordination | Editing a coordination | Editing {count} coordinations",
        error: {
          teacherNotFound: 'No teacher with email "{teacherEmail}"',
          updateCourseMissingFields:
            "To update the course, you must select a year, a degree, a program, a track (possibly empty), a course, a term, and a course type",
          courseNotFound:
            'No {typeLabel} in term {termLabel} with the name "{courseName}" in the track "{trackName}" of the program "{programName}" of the degree "{degreeName}" for year {year} exists',
        },
      },
      data: {
        success: {
          insert:
            "No coordination created | Coordination created | {count} coordinations created",
          update:
            "No coordination updated | Coordination updated | {count} coordinations updated",
          delete:
            "No coordination deleted | Coordination deleted | {count} coordinations deleted",
          import:
            "0 coordinations imported | 1 coordination imported | {count} coordinations imported",
          export:
            "0 coordinations exported | 1 coordination exported | {count} coordinations exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected coordination? | Are you sure you want to delete the {count} selected coordinations?",
        },
      },
    },
  },
} as const;
