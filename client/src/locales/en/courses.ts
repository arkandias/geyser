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
          search: "Search…",
        },
        options: {
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
    <i class="q-icon text-primary material-symbols-sharp">vertical_split</i>
    Services table: allows you to show/hide the list of services for the current
    year (feature reserved for committee members and organizers).
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
  (instead of "Courses"). Three shortcuts are present to the right of the teacher's name:
</p>
<ul>
  <li>
    <i class="q-icon text-primary material-symbols-sharp">badge</i>
    allows you to display detailed information about the teacher;
  </li>
  <li>
    <i class="q-icon text-primary material-symbols-sharp">download</i>
    allows you to download the teacher's list of assignments;
  </li>
  <li>
    <i class="q-icon text-primary material-symbols-sharp">close</i>
    allows you to deselect the teacher.
  </li>
</ul>`,
    },
  },
} as const;
