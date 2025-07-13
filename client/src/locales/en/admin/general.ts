export default {
  general: {
    title: "General Settings",
    organization: {
      label: "Organization",
      parameter: {
        label: "Label",
        sublabel: "Sublabel",
        email: "Contact email",
        locale: "Default locale",
        privateService: "Private services",
      },
      button: {
        submit: "Save",
        reset: "Reset",
      },
      error: {
        emptyLabel: "Enter a label",
        emptyEmail: "Enter a contact email",
        update: "Failed to update parameters",
      },
      success: {
        update: "Parameters updated",
      },
    },
    phase: {
      label: "Current phase",
      error: {
        setCurrent: "Failed to update current phase",
      },
      success: {
        setCurrent: "Current phase updated",
      },
    },
    years: {
      label: "Years",
      year: "Year",
      visible: "Visible",
      current: "Current",
      button: {
        create: "Create",
        update: "Update",
        createServices: "Create services for active teachers",
        copyServices: "Copy services from previous year",
        copyCourses: "Copy courses from previous year",
        computePriorities: "Compute priorities",
      },
      tooltip: {
        manage: "Manage year",
        edit: "Edit year",
        delete: "Delete year",
      },
      confirm: {
        delete: `Are you sure you want to delete the year {year}?
If courses or services are associated with this year, you will not be able to delete it.`,
      },
      error: {
        setCurrent: "Failed to update current year",
        createServices: "Failed to create services",
        copyServices: "Failed to copy services",
        copyCourses: "Failed to copy courses",
        computePriorities: "Failed to compute priorities",
        emptyValue: "Enter a value for the year",
      },
      success: {
        setCurrent: "Current year updated",
        insert: "Year created",
        update: "Year updated",
        delete: "Year deleted",
        createServices:
          "0 services created | 1 service created | {count} services created",
        copyServices:
          "0 services copied | 1 service copied | {count} services copied",
        copyCourses:
          "0 courses copied | 1 course copied | {count} courses copied",
        computePriorities:
          "0 priorities computed | 1 priority computed | {count} priorities computed",
      },
    },
    customTexts: {
      label: "Interface customization",
      button: {
        edit: "Edit",
        delete: "Delete",
      },
      confirm: {
        delete:
          'Are you sure you want to reset "{label}" to its default value?',
      },
    },
  },
} as const;
