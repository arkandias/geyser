export default {
  general: {
    title: "Paramètres généraux",
    organization: {
      label: "Organisation",
      parameter: {
        label: "Libellé",
        sublabel: "Sous-libellé",
        email: "Email de contact",
        locale: "Langue par défaut",
        privateService: "Services privés",
      },
      button: {
        submit: "Enregistrer",
        reset: "Réinitialiser",
      },
      error: {
        emptyLabel: "Entrez un libellé",
        emptyEmail: "Entez un email de contact",
        update: "Échec de la mise à jour des paramètres",
      },
      success: {
        update: "Paramètres mis à jour",
      },
    },
    phase: {
      label: "Phase en cours",
      error: {
        setCurrent: "Échec de la mise à jour de la phase en cours",
      },
      success: {
        setCurrent: "Phase en cours mise à jour",
      },
    },
    years: {
      label: "Années",
      year: "Année",
      visible: "Visible",
      current: "En cours",
      button: {
        create: "Créer",
        update: "Mettre à jour",
        createServices: "Créer les services des intervenants actifs",
        copyServices: "Copier les services de l'année précédente",
        copyCourses: "Copier les enseignements de l'année précédente",
        computePriorities: "Calculer les priorités",
      },
      tooltip: {
        manage: "Administrer l'année",
        edit: "Modifier l'année",
        delete: "Supprimer l'année",
      },
      confirm: {
        delete: `Êtes-vous sûr de vouloir supprimer l'année {year} ?
Si des cours ou des services sont associés à cette année, vous ne pourrez pas \
la supprimer.`,
      },
      error: {
        setCurrent: "Échec de la mise à jour de l'année en cours",
        createServices: "Échec de la création des services",
        copyServices: "Échec de la copie des services",
        copyCourses: "Échec de la copie des enseignements",
        computePriorities: "Échec du calcul des priorités",
        emptyValue: "Entrez une valeur pour l'année",
      },
      success: {
        setCurrent: "Année en cours mise à jour",
        insert: "Année créée",
        update: "Année mise à jour",
        delete: "Année supprimée",
        createServices:
          "0 service créé | 1 service créé | {count} services créés",
        copyServices:
          "0 service copié | 1 service copié | {count} services copiés",
        copyCourses: "0 cours copié | 1 cours copié | {count} cours copiés",
        computePriorities:
          "0 priorité calculée | 1 priorité calculée | {count} priorités calculées",
      },
    },
    customTexts: {
      label: "Personnalisation de l'interface",
      button: {
        edit: "Éditer",
        delete: "Supprimer",
      },
      confirm: {
        delete:
          "Êtes-vous sûr de vouloir réinitialiser « {label} » à sa valeur par défaut ?",
      },
    },
  },
} as const;
