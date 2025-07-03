export default {
  service: {
    fetching: "Loading service...",
    notFound: "Service not found",
    coordinations: {
      title: "Responsibilities",
      type: {
        program: "Program",
        track: "Track",
        course: "Course",
      },
      format: {
        track: "track {track}",
      },
      tooltip: {
        downloadAssignments: "Download assignments",
      },
    },
    details: {
      title: "Service",
      baseServiceHours: "Base",
      modifications: "Modifications",
      externalCourses: "External courses",
      total: "Total to assign",
      baseServiceForm: {
        field: {
          hours: "Hours (@:unit.weightedHours)",
        },
        tooltip: {
          edit: "Edit base service",
        },
        button: {
          update: "Update",
        },
        invalid: {
          message: "Invalid form",
          caption: {
            hours: "Select a positive or zero number of hours",
          },
        },
        noChanges: "No changes",
        success: "Base service modified",
        error: "Modification failed",
      },
      modificationForm: {
        field: {
          type: "Type",
          hours: "Hours (@:unit.weightedHours)",
        },
        tooltip: {
          create: "Add a modification",
          delete: "Delete modification",
        },
        button: {
          add: "Add",
        },
        invalid: {
          message: "Invalid form",
          caption: {
            type: "Select a service modification type",
            hours: "Select a positive number of hours",
          },
        },
        success: {
          create: "Modification added",
          delete: "Modification deleted",
        },
        error: {
          create: "Addition failed",
          delete: "Deletion failed",
        },
      },
      externalCourseForm: {
        field: {
          label: "Label",
          hours: "Hours (@:unit.weightedHours)",
        },
        tooltip: {
          create: "Add an external course",
          delete: "Delete external course",
        },
        button: {
          add: "Add",
        },
        invalid: {
          message: "Invalid form",
          caption: {
            label: "Enter a label",
            hours: "Select a non-negative number of hours",
          },
        },
        success: {
          create: "External course added",
          delete: "External course deleted",
        },
        error: {
          create: "Addition failed",
          delete: "Deletion failed",
        },
      },
    },
    requests: {
      title: "Requests",
      assignments: "Assignments",
      primary: "Primary requests",
      secondary: "Secondary requests",
    },
    priorities: {
      title: "Priorities",
      format: {
        typeInTerm: "{type} in {term}",
        track: "{track} track",
      },
    },
    message: {
      title: "Message for the commission",
      editionTooltip: "Edit message",
      defaultText: "[No message]",
      defaultTextWithEdition: `[Click on the icon <i class="q-icon text-primary material-symbols-sharp">edit</i> to add a message.]`,
    },
  },
} as const;
