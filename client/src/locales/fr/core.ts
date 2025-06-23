export default {
  editableText: {
    markdownNotice: `
      Vous pouvez utiliser la
          <a
            href="https://docs.github.com/fr/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            target="_blank"
            rel="noopener noreferrer"
            >syntaxe Markdown</a
          >
          pour formatter votre texte.`,
    button: {
      save: "Enregistrer",
      cancel: "Annuler",
    },
    save: {
      noChanges: "Pas de changement",
      success: {
        updated: "Texte mis à jour",
        deleted: "Texte supprimé",
      },
      error: {
        update: "Échec de la mise à jour",
        delete: "Échec de la suppression",
      },
    },
  },
  requestCard: {
    group: "groupe | groupes",
    hour: "heure | heures",
    tooltip: {
      validate: "Valider la demande",
      delete: "Supprimer la demande",
    },
    validate: {
      identical: "Demande déjà validée",
      created: "Attribution créée",
      updated: "Attribution mise à jour",
      error: "Échec de l'attribution",
    },
    delete: {
      success: "Demande supprimée",
      error: "Échec de la suppression",
    },
  },
  priorityChip: {
    delete: {
      success: "Priorité supprimée",
      error: "Échec de la suppression",
    },
    deleteComputed: {
      success: {
        message: "Priorité calculée supprimée",
        caption:
          "Une priorité neutre a été créée pour que la priorité supprimée ne soit pas recréée au prochain calcul",
      },
      error: "Échec de la suppression",
    },
  },
  requestForm: {
    field: {
      groups: "Groupes",
      hours: "Heures",
      requestType: {
        assignment: "Attribution",
        primary: "Principale",
        secondary: "Secondaire",
      },
    },
    invalid: {
      message: "Formulaire non valide",
      caption: {
        service: "Sélectionnez un service",
        hours: "Sélectionnez un nombre d'heures positif ou nul",
        type: "Sélectionnez un type de demande",
      },
    },
    get: {
      error: "Échec du chargement",
    },
    update: {
      success: "Demande mise à jour",
      error: "Échec de la mise à jour",
      noChanges: "Pas de changement",
    },
    delete: {
      success: "Demande supprimée",
      error: "Échec de la suppression",
      noChanges: "Pas de changement",
    },
    tooltip: {
      submit: "Enregistrer la demande",
      reset: "Supprimer la demande",
    },
  },
  priorityForm: {
    field: {
      seniority: "Ancienneté",
      isPriority: {
        null: "Neutre",
        true: "Positive",
        false: "Négative",
      },
    },
    invalid: {
      message: "Formulaire non valide",
      caption: {
        service: "Sélectionnez un service",
        seniority: "Sélectionnez un nombre d'années entier positif ou nul",
      },
    },
    success: "Priorité enregistrée",
    error: "Échec de l'enregistrement",
    tooltip: {
      submit: "Enregistrer la priorité",
    },
  },
  selectService: {
    label: "Service",
  },
} as const;
