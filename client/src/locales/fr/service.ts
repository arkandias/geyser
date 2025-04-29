export default {
  service: {
    fetchingService: "Chargement du service…",
    noService: "Pas de service",
    coordinations: {
      title: "Responsabilités",
      type: {
        program: "Mention",
        track: "Parcours",
        course: "Enseignement",
      },
      format: {
        track: "parcours {track}",
      },
      tooltip: {
        downloadAssignments: "Télécharger les attributions",
      },
    },
    details: {
      title: "Service",
      baseServiceHours: "Base",
      modifications: "Modifications",
      total: "Total",
      baseServiceForm: {
        fields: {
          hours: "Heures",
        },
        tooltip: {
          validate: "Valider le service de base",
          edit: "Éditer le service de base",
        },
        invalid: {
          message: "Formulaire non valide",
          caption: {
            hours: "Sélectionnez un nombre d'heures positif ou nul",
          },
        },
        noChanges: "Pas de changement",
        success: "Service de base modifié",
        error: "Échec de la modification",
      },
      modificationForm: {
        fields: {
          type: "Type",
          hours: "Heures",
        },
        tooltip: {
          create: "Ajouter une modification",
          validate: "Valider la modification",
          delete: "Supprimer la modification",
        },
        invalid: {
          message: "Formulaire non valide",
          caption: {
            type: "Sélectionnez un type de modification de service",
            hours: "Sélectionnez un nombre d'heures strictement positif",
          },
        },
        success: {
          create: "Modification ajoutée",
          delete: "Modification supprimée",
        },
        error: {
          create: "Échec de l'ajout",
          delete: "Échec de la suppression",
        },
      },
    },
    requests: {
      title: "Demandes",
      assignments: "Attributions",
      primary: "Demandes principales",
      secondary: "Demandes secondaires",
    },
    priorities: {
      title: "Priorités",
      format: {
        typeAndSemester: "{type} au S{semester}",
        track: "parcours {track}",
      },
    },
    message: {
      title: "Message pour la commission",
      editionTooltip: "Éditer le message",
    },
  },
} as const;
