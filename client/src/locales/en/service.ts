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
      total: "Total",
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
            hours: "Select a strictly positive number of hours",
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
        typeAndSemester: "{type} in S{semester}",
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
