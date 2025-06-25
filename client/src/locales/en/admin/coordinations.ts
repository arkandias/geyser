import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminCoordinationsProgramsColNames } from "@/components/admin/col-names.ts";

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
        title: {
          none: "New coordination",
          single: "{label}",
          multiple: "{count} coordinations selected",
        },
        error: {
          teacherNotFound: "No teacher with email '{email}'",
          updateDegreeWithoutProgram:
            "You cannot modify the degree without selecting a program",
          updateProgramWithoutDegree:
            "You cannot modify the program without selecting a degree",
          degreeNotFound: 'No degree with the name "{degree}" exists',
          programNotFound:
            'No program in the degree "{degree}" with the name "{program}" exists',
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
          delete: {
            single: `Are you sure you want to delete the coordination "{label}"?`,
            multiple: `Are you sure you want to delete the {count} selected coordinations?`,
          },
        },
      },
    },
    tracks: {
      label: "Track coordinations",
    },
    courses: {
      label: "Course coordinations",
    },
  },
} as const;
