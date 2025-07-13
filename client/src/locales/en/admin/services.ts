import type { AdminColNameOptions } from "@/locales/types.ts";

import type {
  AdminServicesExternalCoursesColName,
  AdminServicesMessagesColName,
  AdminServicesServiceModificationsColName,
  AdminServicesServicesColName,
} from "@/components/admin/col-names.ts";

export default {
  services: {
    title: "Services",
    services: {
      label: "Services",
      column: {
        year: {
          label: "Year",
          tooltip: "",
        },
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        positionLabel: {
          label: "Position",
          tooltip: "",
        },
        hours: {
          label: "Hours (@:unit.weightedHours)",
          tooltip: "",
        },
      } satisfies Record<AdminServicesServicesColName, AdminColNameOptions>,
      form: {
        title:
          "Creating a service | Editing a service | Editing {count} services",
        error: {
          teacherNotFound: 'No teacher with email "{teacherEmail}"',
          positionNotFound: 'No position exists with the label "{position}"',
          hoursNegative: "Enter a positive or zero number of hours",
        },
      },
      data: {
        success: {
          insert:
            "No service created | Service created | {count} services created",
          update:
            "No service updated | Service updated | {count} services updated",
          delete:
            "No service deleted | Service deleted | {count} services deleted",
          import:
            "0 services imported | 1 service imported | {count} services imported",
          export:
            "0 services exported | 1 service exported | {count} services exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected service?
If there are modifications, external courses, requests, or a message for this service, you will not be able to delete it. ` +
            `| Are you sure you want to delete the {count} selected services?
If there are modifications, external courses, requests, or messages for these services, you will not be able to delete them.`,
        },
      },
    },
    serviceModifications: {
      label: "Service modifications",
      column: {
        year: {
          label: "Year",
          tooltip: "",
        },
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        label: {
          label: "Label",
          tooltip: "",
        },
        hours: {
          label: "Hours (@:unit.weightedHours)",
          tooltip: "",
        },
      } satisfies Record<
        AdminServicesServiceModificationsColName,
        AdminColNameOptions
      >,
      form: {
        title:
          "Creating a service modification | Editing a service modification | Editing {count} service modification",
        error: {
          updateYearWithoutTeacher:
            "You cannot modify the year without selecting a teacher",
          updateTeacherWithoutYear:
            "You cannot modify the teacher without selecting a year",
          serviceNotFound:
            "No service exists for teacher {teacherEmail} and year {year}",
          hoursNegative: "Enter a positive or zero number of hours",
        },
      },
      data: {
        success: {
          insert:
            "No service modification created | Service modification created | {count} service modifications created",
          update:
            "No service modification updated | Service modification updated | {count} service modifications updated",
          delete:
            "No service modification deleted | Service modification deleted | {count} service modifications deleted",
          import:
            "0 service modifications imported | 1 service modification imported | {count} service modifications imported",
          export:
            "0 service modifications exported | 1 service modification exported | {count} service modifications exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected service modification? | Are you sure you want to delete the {count} selected service modifications?",
        },
      },
    },
    externalCourses: {
      label: "External courses",
      column: {
        year: {
          label: "Year",
          tooltip: "",
        },
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        label: {
          label: "Label",
          tooltip: "",
        },
        hours: {
          label: "Hours (@:unit.weightedHours)",
          tooltip: "",
        },
      } satisfies Record<
        AdminServicesExternalCoursesColName,
        AdminColNameOptions
      >,
      form: {
        title:
          "Creating an external course | Editing an external course | Editing {count} external course",
        error: {
          updateYearWithoutTeacher:
            "You cannot modify the year without selecting a teacher",
          updateTeacherWithoutYear:
            "You cannot modify the teacher without selecting a year",
          serviceNotFound:
            "No service exists for teacher {teacherEmail} and year {year}",
          hoursNegative: "Enter a positive or zero number of hours",
        },
      },
      data: {
        success: {
          insert:
            "No external course created | External course created | {count} external courses created",
          update:
            "No external course updated | External course updated | {count} external courses updated",
          delete:
            "No external course deleted | External course deleted | {count} external courses deleted",
          import:
            "0 external courses imported | 1 external course imported | {count} external courses imported",
          export:
            "0 external courses exported | 1 external course exported | {count} external courses exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected external course? | Are you sure you want to delete the {count} selected external courses?",
        },
      },
    },
    messages: {
      label: "Messages",
      column: {
        year: {
          label: "Year",
          tooltip: "",
        },
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        content: {
          label: "Content",
          tooltip: "",
        },
      } satisfies Record<AdminServicesMessagesColName, AdminColNameOptions>,
      form: {
        title:
          "Creating a message | Editing a message | Editing {count} messages",
        error: {
          updateYearWithoutTeacher:
            "You cannot modify the year without selecting a teacher",
          updateTeacherWithoutYear:
            "You cannot modify the teacher without selecting a year",
          serviceNotFound:
            "No service exists for teacher {teacherEmail} and year {year}",
          noContent: "Enter a content",
        },
      },
      data: {
        success: {
          insert:
            "No message created | Message created | {count} messages created",
          update:
            "No message updated | Message updated | {count} messages updated",
          delete:
            "No message deleted | Message deleted | {count} messages deleted",
          import:
            "0 messages imported | 1 message imported | {count} messages imported",
          export:
            "0 messages exported | 1 message exported | {count} messages exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected message? | Are you sure you want to delete the {count} selected messages?",
        },
      },
    },
  },
} as const;
