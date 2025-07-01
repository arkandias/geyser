import { RequestTypeEnum } from "@/gql/graphql.ts";
import type { AdminColNameOptions } from "@/locales/types.ts";

import type {
  AdminRequestsPrioritiesColName,
  AdminRequestsRequestsColName,
} from "@/components/admin/col-names.ts";

export default {
  requests: {
    title: "Requests and priorities",
    requests: {
      label: "Requests",
      column: {
        year: {
          label: "Year",
          tooltip: "",
        },
        type: {
          label: "Type",
          tooltip: "",
        },
        hours: {
          label: "Hours",
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
      } satisfies Record<AdminRequestsRequestsColName, AdminColNameOptions>,
      form: {
        title:
          "Creating a request | Editing a request | Editing {count} requests",
        error: {
          updateTeacherWithoutYear:
            "You cannot modify the teacher without selecting a year",
          serviceNotFound:
            "No service exists for teacher {teacherEmail} for year {year}",
          updateCourseMissingFields:
            "To update the course, you must select a year, degree, program, track (possibly empty), course, term, and course type",
          courseNotFound:
            'No course of type "{typeLabel}" in the term "{termLabel}" with the name "{courseName}" in the track "{trackName}" of the program "{programName}" of the degree "{degreeName}" for the year {year} exists',
          invalidType: `The request type must be ${RequestTypeEnum.Assignment}, ${RequestTypeEnum.Primary} or ${RequestTypeEnum.Secondary}`,
          hoursNegative: "Enter a positive or zero number of hours",
        },
      },
      data: {
        success: {
          insert:
            "No request created | Request created | {count} requests created",
          update:
            "No request updated | Request updated | {count} requests updated",
          delete:
            "No request deleted | Request deleted | {count} requests deleted",
          import:
            "0 requests imported | 1 request imported | {count} requests imported",
          export:
            "0 requests exported | 1 request exported | {count} requests exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected request? | Are you sure you want to delete the {count} selected requests?",
        },
      },
    },
    priorities: {
      label: "Priorities",
      column: {
        year: {
          label: "Year",
          tooltip: "",
        },
        seniority: {
          label: "Seniority",
          tooltip: "",
        },
        isPriority: {
          label: "Priority",
          tooltip: "",
        },
        computed: {
          label: "Computed",
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
      } satisfies Record<AdminRequestsPrioritiesColName, AdminColNameOptions>,
      form: {
        title:
          "Creating a priority | Editing a priority | Editing {count} priorities",
        error: {
          updateTeacherWithoutYear:
            "You cannot modify the teacher without selecting a year",
          serviceNotFound:
            "No service exists for teacher {teacherEmail} for year {year}",
          updateCourseMissingFields:
            "To update the course, you must select a year, degree, program, track (possibly empty), course, term, and course type",
          courseNotFound:
            'No course of type "{typeLabel}" in the term "{termLabel}" with the name "{courseName}" in the track "{trackName}" of the program "{programName}" of the degree "{degreeName}" for the year {year} exists',
        },
      },
      data: {
        success: {
          insert:
            "No priority created | Priority created | {count} priorities created",
          update:
            "No priority updated | Priority updated | {count} priorities updated",
          delete:
            "No priority deleted | Priority deleted | {count} priorities deleted",
          import:
            "0 priorities imported | 1 priority imported | {count} priorities imported",
          export:
            "0 priorities exported | 1 priority exported | {count} priorities exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected priority? | Are you sure you want to delete the {count} selected priorities?",
        },
      },
    },
  },
} as const;
