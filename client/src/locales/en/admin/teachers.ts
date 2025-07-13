import type { AdminColNameOptions } from "@/locales/types.ts";

import type {
  AdminTeachersExternalCoursesColName,
  AdminTeachersMessagesColName,
  AdminTeachersPositionsColName,
  AdminTeachersRolesColName,
  AdminTeachersServiceModificationsColName,
  AdminTeachersServicesColName,
  AdminTeachersTeachersColName,
} from "@/components/admin/col-names.ts";

export default {
  teachers: {
    title: "Teachers",
    teachers: {
      label: "Teachers",
      column: {
        email: {
          label: "Email",
          tooltip: "",
        },
        firstname: {
          label: "First name",
          tooltip: "",
        },
        lastname: {
          label: "Last name",
          tooltip: "",
        },
        alias: {
          label: "Alias",
          tooltip: "",
        },
        positionLabel: {
          label: "Position",
          tooltip: "",
        },
        baseServiceHours: {
          label: "Base service (@:unit.weightedHours)",
          tooltip: "",
        },
        visible: {
          label: "Visible",
          tooltip: "",
        },
        active: {
          label: "Active",
          tooltip: "",
        },
        access: {
          label: "Access",
          tooltip: "",
        },
      } satisfies Record<AdminTeachersTeachersColName, AdminColNameOptions>,
      form: {
        title:
          "Creating a teacher | Editing a teacher | Editing {count} teachers",
        error: {
          positionNotFound: 'No position exists with the label "{position}"',
          baseServiceHoursNegative:
            "Enter a positive or zero number of base service hours",
        },
      },
      data: {
        success: {
          insert:
            "No teacher created | Teacher created | {count} teachers created",
          update:
            "No teacher updated | Teacher updated | {count} teachers updated",
          delete:
            "No teacher deleted | Teacher deleted | {count} teachers deleted",
          import:
            "0 teachers imported | 1 teacher imported | {count} teachers imported",
          export:
            "0 teachers exported | 1 teacher exported | {count} teachers exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected teacher?
If there are services, responsibilities, or roles for this teacher, you will not be able to delete them. ` +
            `| Are you sure you want to delete the {count} selected teachers?
If there are services, responsibilities, or roles for these teachers, you will not be able to delete them.`,
        },
      },
    },
    positions: {
      label: "Positions",
      column: {
        label: {
          label: "Label",
          tooltip: "",
        },
        labelShort: {
          label: "Label short",
          tooltip: "",
        },
        description: {
          label: "Description",
          tooltip: "",
        },
        baseServiceHours: {
          label: "Base service (@:unit.weightedHours)",
          tooltip: "Base service (@:unit.weightedHours)",
        },
      } satisfies Record<AdminTeachersPositionsColName, AdminColNameOptions>,
      form: {
        title:
          "Creating a position | Editing a position | Editing {count} positions",
        error: {
          baseServiceHoursNegative:
            "Enter a positive or zero number of base service hours",
        },
      },
      data: {
        success: {
          insert:
            "No position created | Position created | {count} positions created",
          update:
            "No position updated | Position updated | {count} positions updated",
          delete:
            "No position deleted | Position deleted | {count} positions deleted",
          import:
            "0 positions imported | 1 position imported | {count} positions imported",
          export:
            "0 positions exported | 1 position exported | {count} positions exported",
        },
        confirm: {
          delete:
            `Are you sure you want to delete the selected position?
If this position is assigned to teachers, you will not be able to delete it. ` +
            `| Are you sure you want to delete the {count} selected positions?
If these positions are assigned to teachers, you will not be able to delete them.`,
        },
      },
    },
    roles: {
      label: "Roles",
      column: {
        teacherEmail: {
          label: "Teacher",
          tooltip: "",
        },
        role: {
          label: "Type",
          tooltip: "",
        },
        comment: {
          label: "Comment",
          tooltip: "",
        },
      } satisfies Record<AdminTeachersRolesColName, AdminColNameOptions>,
      form: {
        title: "Creating a role | Editing a role | Editing {count} roles",
        error: {
          teacherNotFound: 'No teacher with email "{teacherEmail}"',
          invalidRole:
            "Role type must be @:role.organizer or @:role.commissioner",
        },
      },
      data: {
        success: {
          insert: "No role created | Role created | {count} roles created",
          update: "No role updated | Role updated | {count} roles updated",
          delete: "No role deleted | Role deleted | {count} roles deleted",
          import: "0 roles imported | 1 role imported | {count} roles imported",
          export: "0 roles exported | 1 role exported | {count} roles exported",
        },
        confirm: {
          delete:
            "Are you sure you want to delete the selected role? | Are you sure you want to delete the {count} selected roles?",
        },
      },
    },
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
      } satisfies Record<AdminTeachersServicesColName, AdminColNameOptions>,
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
        AdminTeachersServiceModificationsColName,
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
        AdminTeachersExternalCoursesColName,
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
      } satisfies Record<AdminTeachersMessagesColName, AdminColNameOptions>,
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
