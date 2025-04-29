import type { CustomTextKey } from "@/config/custom-text-keys.ts";
import type { PrimitiveType } from "@/config/primitive-types.ts";

export default {
  phase: {
    requests: "Vœux",
    assignments: "Commission",
    results: "Consultation",
    shutdown: "Fermeture",
  },
  requestType: {
    assignment: "Attribution | Attributions",
    primary: "Principale | Principales",
    secondary: "Secondaire | Secondaires",
  },
  role: {
    admin: "Administrateur | Administrateurs",
    commissioner: "Commissaire | Commissaires",
    teacher: "Intervenant | Intervenants",
  },
  customTextLabel: {
    homeTitle: "Titre de la page d'accueil",
    homeSubtitleRequests: "Sous-titre de la page d'accueil en phase de vœux",
    homeSubtitleAssignments:
      "Sous-titre de la page d'accueil en phase de commission",
    homeSubtitleResults:
      "Sous-titre de la page d'accueil en phase de consultation",
    homeSubtitleShutdown:
      "Sous-titre de la page d'accueil en phase de fermeture",
    homeMessageRequests: "Message de la page d'accueil en phase de vœux",
    homeMessageAssignments:
      "Message de la page d'accueil en phase de commission",
    homeMessageResults: "Message de la page d'accueil en phase de consultation",
    homeMessageShutdown: "Message de la page d'accueil en phase de fermeture",
    contact: "Contact",
    legalNotice: "Mentions légales",
  } satisfies Record<CustomTextKey, string>,
  primitiveTypeName: {
    string: "texte",
    number: "nombre",
    boolean: "booléen",
  } satisfies Record<PrimitiveType, string>,
  semester: "S{semester}",
  unit: {
    hours: "h",
    weightedHours: "htd",
  },
  yes: "Oui",
  no: "Non",
} as const;
