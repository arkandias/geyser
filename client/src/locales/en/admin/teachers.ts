import type { AdminColNameOptions } from "@/locales/types.ts";

import type { ColName as AdminTeachersPositionsColName } from "@/components/admin/AdminTeachersPositions.vue";
import type { ColName as AdminTeachersServiceModificationTypesColName } from "@/components/admin/AdminTeachersServiceModificationTypes.vue";
import type { ColName as AdminTeachersServiceModificationsColName } from "@/components/admin/AdminTeachersServiceModifications.vue";
import type { ColName as AdminTeachersServicesColName } from "@/components/admin/AdminTeachersServices.vue";
import type { ColName as AdminTeachersTeachersColName } from "@/components/admin/AdminTeachersTeachers.vue";

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
      } satisfies Record<AdminTeachersTeachersColName, AdminColNameOptions>,
      form: {
        title: {
          none: "New teacher",
          single: "{label}",
          multiple: "{count} teachers selected",
        },
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
            "0 teacher imported | 1 teacher imported | {count} teachers imported",
          export:
            "0 teacher exported | 1 teacher exported | {count} teachers exported",
        },
        confirm: {
          delete: {
            single: `Are you sure you want to delete the teacher "{label}"?
If there are services, responsibilities, or roles for this teacher, you will not be able to delete them.`,
            multiple: `Are you sure you want to delete the {count} selected teachers?
If there are services, responsibilities, or roles for these teachers, you will not be able to delete them.`,
          },
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
        title: {
          none: "New position",
          single: "{label}",
          multiple: "{count} positions selected",
        },
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
            "0 position imported | 1 position imported | {count} positions imported",
          export:
            "0 position exported | 1 position exported | {count} positions exported",
        },
        confirm: {
          delete: {
            single: `Are you sure you want to delete the position "{label}"?
If this position is assigned to teachers, you will not be able to delete it.`,
            multiple: `Are you sure you want to delete the {count} selected positions?
If these positions are assigned to teachers, you will not be able to delete them.`,
          },
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
        hours: {
          label: "Hours (@:unit.weightedHours)",
          tooltip: "",
        },
        message: {
          label: "Message",
          tooltip: "",
        },
      } satisfies Record<AdminTeachersServicesColName, AdminColNameOptions>,
      form: {
        title: {
          none: "New service",
          single: "{label}",
          multiple: "{count} services selected",
        },
        error: {
          teacherNotFound: `No teacher with email '{email}'`,
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
            "0 service imported | 1 service imported | {count} services imported",
          export:
            "0 service exported | 1 service exported | {count} services exported",
        },
        confirm: {
          delete: {
            single: `Are you sure you want to delete the service "{label}"?
If there are modifications, requests, or priorities for this service, you will not be able to delete it.`,
            multiple: `Are you sure you want to delete the {count} selected services?
If there are modifications, requests, or priorities for these services, you will not be able to delete them.`,
          },
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
        typeLabel: {
          label: "Type",
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
        title: {
          none: "New service modification",
          single: "{label}",
          multiple: "{count} service modifications selected",
        },
        error: {
          updateYearWithoutTeacher:
            "You cannot modify the year without selecting a teacher",
          updateTeacherWithoutYear:
            "You cannot modify the teacher without selecting a year",
          serviceNotFound:
            "No service exists for teacher {teacherEmail} and year {year}",
          typeNotFound:
            'No service modification with the label "{type}" exists',
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
            "0 service modification imported | 1 service modification imported | {count} service modifications imported",
          export:
            "0 service modification exported | 1 service modification exported | {count} service modifications exported",
        },
        confirm: {
          delete: {
            single: `Are you sure you want to delete the service modification "{label}"?`,
            multiple: `Are you sure you want to delete the {count} selected service modifications?`,
          },
        },
      },
    },
    serviceModificationTypes: {
      label: "Service modification types",
      column: {
        label: {
          label: "Label",
          tooltip: "",
        },
        description: {
          label: "Description",
          tooltip: "",
        },
      } satisfies Record<
        AdminTeachersServiceModificationTypesColName,
        AdminColNameOptions
      >,
      form: {
        title: {
          none: "New modification type",
          single: "{label}",
          multiple: "{count} modification types selected",
        },
      },
      data: {
        success: {
          insert:
            "No modification type created | Modification type created | {count} modification types created",
          update:
            "No modification type updated | Modification type updated | {count} modification types updated",
          delete:
            "No modification type deleted | Modification type deleted | {count} modification types deleted",
          import:
            "0 modification type imported | 1 modification type imported | {count} modification types imported",
          export:
            "0 modification type exported | 1 modification type exported | {count} modification types exported",
        },
        confirm: {
          delete: {
            single: `Are you sure you want to delete the modification type "{label}"?
If this type is assigned to modifications, you will not be able to delete it.`,
            multiple: `Are you sure you want to delete the {count} selected modification types?
If these types are assigned to modifications, you will not be able to delete them.`,
          },
        },
      },
    },
  },
} as const;
