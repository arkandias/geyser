import type { AdminColNameOptions } from "@/locales/types.ts";

import type {
  AdminCoordinationsCoursesColNames,
  AdminCoordinationsProgramsColNames,
  AdminCoordinationsTracksColNames,
} from "@/components/admin/col-names.ts";

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
          updateDegreeWithoutProgram:
            "You cannot modify the degree without selecting a program",
          updateProgramWithoutDegree:
            "You cannot modify the program without selecting a degree",
          degreeNotFound: 'No degree with the name "{degreeName}" exists',
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
          updateProgramOrTrackWithoutDegree:
            "You cannot modify the program or track without selecting a degree",
          updateDegreeOrTrackWithoutProgram:
            "You cannot modify the degree or track without selecting a program",
          updateDegreeOrProgramWithoutTrack:
            "You cannot modify the degree or program without selecting a track",
          degreeNotFound: 'No degree with the name "{degreeName}" exists',
          programNotFound:
            'No program in the degree "{degreeName}" with the name "{programName}" exists',
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
            "To update the course, you must select a year, degree, program, track (possibly empty), course, term, and course type",
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
