import type { CustomTextKey } from "@/config/custom-texts.ts";
import type { PrimitiveTypeName } from "@/types/data.ts";

export default {
  adminName: "Administrator",
  phase: {
    requests: "Requests",
    assignments: "Assignment",
    results: "Results",
    shutdown: "Closed",
  },
  requestType: {
    assignment: "Assignment | Assignments",
    primary: "Primary | Primary",
    secondary: "Secondary | Secondary",
  },
  role: {
    organizer: "Organizer | Organizers",
    commissioner: "Commissioner | Commissioners",
    teacher: "Teacher | Teachers",
  },
  customTextLabel: {
    homeTitle: "Homepage title",
    homeSubtitleRequests: "Homepage subtitle during requests phase",
    homeSubtitleAssignments: "Homepage subtitle during assignments phase",
    homeSubtitleResults: "Homepage subtitle during results phase",
    homeSubtitleShutdown: "Homepage subtitle during shutdown phase",
    homeMessageRequests: "Homepage message during requests phase",
    homeMessageAssignments: "Homepage message during assignments phase",
    homeMessageResults: "Homepage message during results phase",
    homeMessageShutdown: "Homepage message during shutdown phase",
  } satisfies Record<CustomTextKey, string>,
  primitiveTypeName: {
    string: "text",
    number: "number",
    boolean: "boolean",
  } satisfies Record<PrimitiveTypeName, string>,
  unit: {
    hours: "h",
    weightedHours: "wh",
  },
  yes: "Yes",
  no: "No",
} as const;
