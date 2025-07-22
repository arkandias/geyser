import type { AdminColNameOptions } from "@/locales/types.ts";

import type { AdminTeachersPositionsColName } from "@/components/admin/AdminTeachersPositions.vue";
import type { AdminTeachersRolesColName } from "@/components/admin/AdminTeachersRoles.vue";
import type { AdminTeachersTeachersColName } from "@/components/admin/AdminTeachersTeachers.vue";

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
          positionNotFound:
            'No position exists with the label "{positionLabel}"',
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
  },
} as const;
