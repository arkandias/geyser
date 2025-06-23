export default {
  editableText: {
    markdownNotice: `
      You can use
          <a
            href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            target="_blank"
            rel="noopener noreferrer"
            >Markdown syntax</a
          >
          to format your text.`,
    button: {
      save: "Save",
      cancel: "Cancel",
    },
    save: {
      noChanges: "No changes",
      success: {
        updated: "Text updated",
        deleted: "Text deleted",
      },
      error: {
        update: "Update failed",
        delete: "Deletion failed",
      },
    },
  },
  requestCard: {
    group: "group | groups",
    hour: "hour | hours",
    tooltip: {
      validate: "Validate request",
      delete: "Delete request",
    },
    validate: {
      identical: "Request already validated",
      created: "Assignment created",
      updated: "Assignment updated",
      error: "Assignment failed",
    },
    delete: {
      success: "Request deleted",
      error: "Deletion failed",
    },
  },
  priorityChip: {
    delete: {
      success: "Priority deleted",
      error: "Deletion failed",
    },
    deleteComputed: {
      success: {
        message: "Calculated priority deleted",
        caption:
          "A neutral priority has been created to prevent the deleted priority from being recreated in the next calculation",
      },
      error: "Deletion failed",
    },
  },
  requestForm: {
    field: {
      groups: "Groups",
      hours: "Hours",
      requestType: {
        assignment: "Assignment",
        primary: "Primary",
        secondary: "Secondary",
      },
    },
    invalid: {
      message: "Invalid form",
      caption: {
        service: "Select a service",
        hours: "Select a non-negative number of hours",
        type: "Select a request type",
      },
    },
    get: {
      error: "Fetch failed",
    },
    update: {
      success: "Request updated",
      error: "Update failed",
      noChanges: "No changes",
    },
    delete: {
      success: "Request deleted",
      error: "Deletion failed",
      noChanges: "No changes",
    },
    tooltip: {
      submit: "Save request",
      reset: "Delete request",
    },
  },
  priorityForm: {
    field: {
      seniority: "Seniority",
      isPriority: {
        null: "Neutral",
        true: "Positive",
        false: "Negative",
      },
    },
    invalid: {
      message: "Invalid form",
      caption: {
        service: "Select a service",
        seniority: "Select a positive or zero integer number of years",
      },
    },
    success: "Priority saved",
    error: "Save failed",
    tooltip: {
      submit: "Save priority",
    },
  },
  selectService: {
    label: "Service",
  },
} as const;
