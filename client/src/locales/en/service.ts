export default {
  service: {
    noService: "No service",
    fetchingService: "Loading service...",
    serviceNotFound: "Service not found",
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
        fields: {
          hours: "Hours",
        },
        tooltip: {
          validate: "Validate base service",
          edit: "Edit base service",
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
        fields: {
          type: "Type",
          hours: "Hours",
        },
        tooltip: {
          create: "Add a modification",
          validate: "Validate modification",
          delete: "Delete modification",
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
    },
  },
} as const;
