export default {
  courses: {
    warning: {
      noActiveYear: "No year selected",
      archive: "You are viewing an archive ({year})",
    },
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
          message: {
            label: "M.",
            tooltip: "Message",
          },
          modifiedService: {
            label: "S. ({unit})",
            tooltip: "Service to complete (@:unit.weightedHours)",
          },
          totalAssignment: {
            label: "A. ({unit})",
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
          search: "Search…",
        },
        options: {
          stickyHeader: "Sticky header",
          visibleColumns: "Visible columns",
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
          semester: {
            label: "S.",
            tooltip: "Semester",
          },
          type: {
            label: "Type",
            tooltip: "",
          },
          hours: {
            label: "Hrs. ({unit})",
            tooltip: "Number of hours per group",
          },
          groups: {
            label: "Grps.",
            tooltip: "Number of groups",
          },
          totalAssignment: {
            label: "A. ({unit})",
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
          semester: "Semester",
          type: "Type",
          search: "Search…",
        },
        options: {
          teacher: {
            viewDetails: "View teacher information",
            downloadAssignments: "Download teacher assignments",
            deselect: "Deselect teacher",
          },
          weightedHours: "Teaching equivalent hours",
          stickyHeader: "Sticky header",
          visibleColumns: "Visible columns",
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
        defaultText: "No description (contact a coordinator)",
      },
      defaultText: `
        <p>
          When a course is selected, the following information is displayed
          here:
        </p>
        <ul>
          <li>the program, track, and course coordinators;</li>
          <li>a description of the course.</li>
        </ul>
        <p>
          The description can be edited by the above-mentioned coordinators by
          clicking on the
          <i class="q-icon text-primary material-symbols-sharp">edit</i>
          button (visible only to them) that appears next to "Description".
        </p>`,
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
      defaultText: `
        <p>
          Click on a course row to display detailed information here. If both a course
          and a teacher are selected at the same time, the course information will be displayed.
          You can deselect a course or a teacher by clicking again on the corresponding row.
        </p>
        <p>Buttons in the header (accessible only from this page):</p>
        <ul>
          <li>
            <i class="q-icon text-primary material-symbols-sharp">history</i>
            Year: allows you to choose the year to view (by default the current year
            is displayed, but it is possible to view requests and assignments from previous years).
          </li>
          <li>
            <i class="q-icon text-primary material-symbols-sharp">vertical_split</i>
            Services table: allows you to show/hide the list of services for the current
            year (feature reserved for commission members and administrators).
          </li>
          <li>
            <i class="q-icon text-primary material-symbols-sharp">assignment</i>
            My requests: allows you to select/deselect your own service in order to view you requests
            (without going through the services table).
          </li>
        </ul>
        <p>
          When a teacher is selected in the services table, the courses that appear in the table
          above are only those that have been requested by the teacher or assigned to the teacher,
          and the search filters are disabled. The teacher's name then appears at the top of the table
          (instead of "Courses"). Two shortcuts are present to the right of the teacher's name:
        </p>
        <ul>
          <li>
            <i class="q-icon text-primary material-symbols-sharp">visibility</i>
            allows you to display detailed information about the teacher;
          </li>
          <li>
            <i class="q-icon text-primary material-symbols-sharp">close</i>
            allows you to deselect the teacher.
          </li>
        </ul>`,
    },
  },
} as const;
