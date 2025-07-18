export default {
  courses: {
    table: {
      services: {
        title: "Services",
        column: {
          lastname: {
            label: "Last name",
            tooltip: "",
          },
          firstname: {
            label: "First name",
            tooltip: "",
          },
          alias: {
            label: "Alias",
            tooltip: "",
          },
          position: {
            label: "Position",
            tooltip: "",
          },
          message: {
            label: "M",
            tooltip: "Message",
          },
          modifiedService: {
            label: "S ({unit})",
            tooltip: "Service to complete (@:unit.weightedHours)",
          },
          totalAssignment: {
            label: "A ({unit})",
            tooltip: "Number of hours assigned (@:unit.weightedHours)",
          },
          diffAssignment: {
            label: "ΔA ({unit})",
            tooltip:
              "Difference between service to complete and number of hours assigned (@:unit.weightedHours)",
          },
          totalPrimary: {
            label: "R1 ({unit})",
            tooltip:
              "Number of hours requested as primary requests (@:unit.weightedHours)",
          },
          diffPrimary: {
            label: "ΔR1 ({unit})",
            tooltip:
              "Difference between service to complete and number of hours requested as primary requests (@:unit.weightedHours)",
          },
          totalSecondary: {
            label: "R2 ({unit})",
            tooltip:
              "Number of hours requested as secondary requests (@:unit.weightedHours)",
          },
        },
        filters: {
          position: "Position",
          search: "Search…",
        },
        options: {
          filters: "Filters",
          stickyHeader: "Sticky header",
          columns: "Columns",
          resetColumns: "Reset",
        },
        loading: "Loading services…",
        noData: "No services found",
        noResults: "No services match the filters",
      },
      courses: {
        title: "Courses",
        column: {
          degreeProgram: {
            label: "Program",
            tooltip: "",
          },
          track: {
            label: "Track",
            tooltip: "",
          },
          name: {
            label: "Name",
            tooltip: "",
          },
          term: {
            label: "Période",
            tooltip: "",
          },
          type: {
            label: "Type",
            tooltip: "",
          },
          groups: {
            label: "Grps",
            tooltip: "Number of groups",
          },
          hours: {
            label: "Hrs ({unit})",
            tooltip: "Number of hours per group",
          },
          totalAssignment: {
            label: "A ({unit})",
            tooltip: "Number of hours assigned",
          },
          diffAssignment: {
            label: "ΔA ({unit})",
            tooltip: "Number of hours remaining to assign",
          },
          totalPrimary: {
            label: "R1 ({unit})",
            tooltip: "Number of hours requested as primary requests",
          },
          diffPrimary: {
            label: "ΔR1 ({unit})",
            tooltip:
              "Difference between number of hours to assign and number of hours requested as primary requests",
          },
          diffPrimaryPriority: {
            label: "ΔR1 Prio ({unit})",
            tooltip:
              "Difference between number of hours to assign and number of hours requested as priority primary requests",
          },
          totalSecondary: {
            label: "R2 ({unit})",
            tooltip: "Number of hours requested as secondary requests",
          },
        },
        filters: {
          degreeProgram: "Program",
          term: "Term",
          type: "Type",
          search: "Search…",
        },
        options: {
          teacher: {
            viewService: "View teacher service",
            downloadAssignments: "Download teacher assignments",
            deselect: "Deselect teacher",
          },
          weightedHours: "Teaching equivalent hours",
          stickyHeader: "Sticky header",
          columns: "Columns",
          resetColumns: "Reset",
        },
        loading: "Loading courses…",
        noData: "No courses found",
        noResults: "No courses match the filters",
      },
    },
    expansion: {
      defaultLabel: "Select a course from the list above",
      defaultCaption: "Click on this panel to display additional information",
      coordinators: {
        title: "Coordinators",
        program: "Program coordinator: | Program coordinators:",
        track: "Track coordinator: | Track coordinators:",
        course: "Course coordinator: | Course coordinators:",
      },
      description: {
        title: "Description",
        editionTooltip: "Edit the description",
        defaultText: "No description (contact a coordinator)",
        defaultTextWithEdition: `[Click on the icon <i class="q-icon text-primary material-symbols-sharp">edit</i> to add a description.]`,
      },
      defaultText:
        "When a course is selected, some additional information is displayed here.",
    },
    details: {
      requests: {
        title: "Requests",
      },
      priorities: {
        title: "Priorities",
      },
      archives: {
        title: "Archives",
      },
    },
  },
} as const;
