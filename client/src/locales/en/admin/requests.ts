import { RequestTypeEnum } from "@/gql/graphql.ts";
import type { AdminColNameOptions } from "@/locales/types.ts";

import type { ColName as AdminRequestsPrioritiesColNames } from "@/components/admin/AdminRequestsPriorities.vue";
import type { ColName as AdminRequestsRequestsColNames } from "@/components/admin/AdminRequestsRequests.vue";

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
        uid: {
          label: "Teacher",
          tooltip: "",
        },
        degree: {
          label: "Degree",
          tooltip: "",
        },
        program: {
          label: "Program",
          tooltip: "",
        },
        track: {
          label: "Track",
          tooltip: "",
        },
        course: {
          label: "Course",
          tooltip: "",
        },
        semester: {
          label: "Semester",
          tooltip: "",
        },
        courseType: {
          label: "Course type",
          tooltip: "Course type",
        },
      } satisfies Record<AdminRequestsRequestsColNames, AdminColNameOptions>,
      form: {
        title: {
          none: "New request",
          single: "{label}",
          multiple: "{count} requests selected",
        },
        error: {
          updateUidWithoutYear:
            "You cannot modify the teacher without selecting a year",
          serviceNotFound:
            "No service exists for teacher {uid} for year {year}",
          updateCourseMissingFields:
            "To update the course, you must select a year, degree, program, track (possibly empty), course, semester, and course type",
          courseNotFound:
            'No {type} in semester {semester} with the name "{name}" in the track "{track}" of the program "{program}" of the degree "{degree}" for year {year} exists',
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
            "0 request imported | 1 request imported | {count} requests imported",
          export:
            "0 request exported | 1 request exported | {count} requests exported",
        },
        confirm: {
          delete: {
            single: 'Are you sure you want to delete the request "{label}"?',
            multiple:
              "Are you sure you want to delete the {count} selected requests?",
          },
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
        uid: {
          label: "Teacher",
          tooltip: "",
        },
        degree: {
          label: "Degree",
          tooltip: "",
        },
        program: {
          label: "Program",
          tooltip: "",
        },
        track: {
          label: "Track",
          tooltip: "",
        },
        course: {
          label: "Course",
          tooltip: "",
        },
        semester: {
          label: "Semester",
          tooltip: "",
        },
        courseType: {
          label: "Course type",
          tooltip: "Course type",
        },
      } satisfies Record<AdminRequestsPrioritiesColNames, AdminColNameOptions>,
      form: {
        title: {
          none: "New priority",
          single: "{label}",
          multiple: "{count} priorities selected",
        },
        error: {
          updateUidWithoutYear:
            "You cannot modify the teacher without selecting a year",
          serviceNotFound:
            "No service exists for teacher {uid} for year {year}",
          updateCourseMissingFields:
            "To update the course, you must select a year, degree, program, track (possibly empty), course, semester, and course type",
          courseNotFound:
            'No {type} in semester {semester} with the name "{name}" in the track "{track}" of the program "{program}" of the degree "{degree}" for year {year} exists',
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
            "0 priority imported | 1 priority imported | {count} priorities imported",
          export:
            "0 priority exported | 1 priority exported | {count} priorities exported",
        },
        confirm: {
          delete: {
            single: 'Are you sure you want to delete the priority "{label}"?',
            multiple:
              "Are you sure you want to delete the {count} selected priorities?",
          },
        },
      },
    },
  },
} as const;
