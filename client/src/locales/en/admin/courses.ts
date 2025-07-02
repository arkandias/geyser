import type { AdminColNameOptions } from "@/locales/types.ts";

import type {
  AdminCoursesCourseTypesColName,
  AdminCoursesCoursesColName,
  AdminCoursesDegreesColName,
  AdminCoursesProgramsColName,
  AdminCoursesTermsColName,
  AdminCoursesTracksColName,
} from "@/components/admin/col-names.ts";

export default {
  courses: {
    title: "Courses",
    degrees: {
      label: "Degrees",
      column: {
        name: {
          label: "Name",
          tooltip: "",
        },
        nameShort: {
          label: "Short name",
          tooltip: "",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesDegreesColName, AdminColNameOptions>,
      form: {
        title: "Creating a degree | Editing a degree | Editing {count} degrees",
      },
      data: {
        success: {
          insert:
            "No degree created | Degree created | {count} degrees created",
          update:
            "No degree updated | Degree updated | {count} degrees updated",
          delete:
            "No degree deleted | Degree deleted | {count} degrees deleted",
          import:
            "0 degrees imported | 1 degree imported | {count} degrees imported",
          export:
            "0 degrees exported | 1 degree exported | {count} degrees exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected degree?
If this degree contains programs, you will not be able to delete it. ` +
            `| Are you sure you want to delete the {count} selected degrees?
If these degrees contain programs, you will not be able to delete them.`,
        },
      },
    },
    programs: {
      label: "Programs",
      column: {
        degreeName: {
          label: "Degree",
          tooltip: "",
        },
        name: {
          label: "Name",
          tooltip: "",
        },
        nameShort: {
          label: "Short name",
          tooltip: "",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesProgramsColName, AdminColNameOptions>,
      form: {
        title:
          "Creating a program | Editing a program | Editing {count} programs",
        error: {
          degreeNotFound: 'No degree with the name "{degreeName}" exists',
        },
      },
      data: {
        success: {
          insert:
            "No program created | Program created | {count} programs created",
          update:
            "No program updated | Program updated | {count} programs updated",
          delete:
            "No program deleted | Program deleted | {count} programs deleted",
          import:
            "0 programs imported | 1 program imported | {count} programs imported",
          export:
            "0 programs exported | 1 program exported | {count} programs exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected program?
If there are tracks, courses, or coordinations for this program, you will not be able to delete it. ` +
            `| Are you sure you want to delete the {count} selected programs?
If there are tracks, courses, or coordinations for these programs, you will not be able to delete them.`,
        },
      },
    },
    tracks: {
      label: "Tracks",
      column: {
        degreeName: {
          label: "Degree",
          tooltip: "",
        },
        programName: {
          label: "Program",
          tooltip: "",
        },
        name: {
          label: "Name",
          tooltip: "",
        },
        nameShort: {
          label: "Short name",
          tooltip: "",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesTracksColName, AdminColNameOptions>,
      form: {
        title: "Creating a track | Editing a track | Editing {count} tracks",
        error: {
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
          insert: "No track created | Track created | {count} tracks created",
          update: "No track updated | Track updated | {count} tracks updated",
          delete: "No track deleted | Track deleted | {count} tracks deleted",
          import:
            "0 tracks imported | 1 track imported | {count} tracks imported",
          export:
            "0 tracks exported | 1 track exported | {count} tracks exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected track?
If there are courses or coordinations for this track, you will not be able to delete it. ` +
            `| Are you sure you want to delete the {count} selected tracks?
If there are courses or coordinations for these tracks, you will not be able to delete them.`,
        },
      },
    },
    terms: {
      label: "Terms",
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
        title: "Creating a term | Editing a term | Editing {count} terms",
      },
      data: {
        success: {
          insert: "No term created | Term created | {count} terms created",
          update: "No term updated | Term updated | {count} terms updated",
          delete: "No term deleted | Term deleted | {count} terms deleted",
          import: "0 terms imported | 1 term imported | {count} terms imported",
          export: "0 terms exported | 1 term exported | {count} terms exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected term?
If this term contains courses, you will not be able to delete it. ` +
            `| Are you sure you want to delete the {count} selected terms?
If these terms contain courses, you will not be able to delete them.`,
        },
      },
    },
    courses: {
      label: "Courses",
      column: {
        year: {
          label: "Year",
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
        name: {
          label: "Name",
          tooltip: "",
        },
        nameShort: {
          label: "Short name",
          tooltip: "",
        },
        termLabel: {
          label: "Term",
          tooltip: "",
        },
        typeLabel: {
          label: "Type",
          tooltip: "",
        },
        hours: {
          label: "Hours",
          tooltip: "Number of hours per group",
        },
        hoursAdjusted: {
          label: "Adj. hrs.",
          tooltip: "Adjusted number of hours per group",
        },
        groups: {
          label: "Groups",
          tooltip: "Number of groups",
        },
        groupsAdjusted: {
          label: "Adj. grps.",
          tooltip: "Adjusted number of groups",
        },
        description: {
          label: "Description",
          tooltip: "",
        },
        priorityRule: {
          label: "Priority rule",
          tooltip: "Priority rule",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
      } satisfies Record<AdminCoursesCoursesColName, AdminColNameOptions>,
      form: {
        title: "Creating a course | Editing a course | Editing {count} courses",
        error: {
          updateDegreeWithoutProgram:
            "You cannot modify the degree without selecting a program",
          updateProgramWithoutDegree:
            "You cannot modify the program without selecting a degree",
          updateTrackWithoutProgram:
            "You cannot modify the track without selecting a program",
          updateTrackWithoutDegree:
            "You cannot modify the track without selecting a degree",
          degreeNotFound: 'No degree with the name "{degreeName}" exists',
          programNotFound:
            'No program in the degree "{degreeName}" with the name "{programName}" exists',
          trackNotFound:
            'No track in the program "{programName}" of the degree "{degreeName}" with the name "{trackName}" exists',
          termNotFound: 'No term with the label "{termLabel}" exists',
          typeNotFound: 'No course type with the label "{typeLabel}" exists',
          hoursNegative: "Enter a positive or zero number of hours",
          hoursAdjustedNegative:
            "Enter a positive or zero adjusted number of hours",
          groupsNegative: "Enter a positive or zero number of groups",
          groupsAdjustedNegative:
            "Enter a positive or zero adjusted number of groups",
          priorityRule: "The priority rule must be a positive integer or zero",
        },
      },
      data: {
        success: {
          insert:
            "No course created | Course created | {count} courses created",
          update:
            "No course updated | Course updated | {count} courses updated",
          delete:
            "No course deleted | Course deleted | {count} courses deleted",
          import:
            "0 courses imported | 1 course imported | {count} courses imported",
          export:
            "0 courses exported | 1 course exported | {count} courses exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected course?
If there are requests or coordinations for this course, you will not be able to delete it. ` +
            `| Are you sure you want to delete the {count} selected courses?
If there are requests or coordinations for these courses, you will not be able to delete them.`,
        },
      },
    },
    courseTypes: {
      label: "Course types",
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
          "Creating a course type | Editing a course type | Editing {count} course types",
      },
      data: {
        success: {
          insert:
            "No course type created | Course type created | {count} course types created",
          update:
            "No course type updated | Course type updated | {count} course types updated",
          delete:
            "No course type deleted | Course type deleted | {count} course types deleted",
          import:
            "0 course types imported | 1 course type imported | {count} course types imported",
          export:
            "0 course types exported | 1 course type exported | {count} course types exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected course type?
If this type is assigned to courses, you will not be able to delete it. ` +
            `| Are you sure you want to delete the {count} selected course types?
If these types are assigned to courses, you will not be able to delete them.`,
        },
      },
    },
  },
} as const;
