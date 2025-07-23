export default {
  courses: {
    table: {
      services: {
        title: "Services",
        column: {
          lastname: {
            label: "Nom",
            tooltip: "",
          },
          firstname: {
            label: "Prénom",
            tooltip: "",
          },
          alias: {
            label: "Alias",
            tooltip: "",
          },
          position: {
            label: "Fonction",
            tooltip: "",
          },
          message: {
            label: "M",
            tooltip: "Message",
          },
          modifiedService: {
            label: "S ({unit})",
            tooltip: "Service à réaliser (@:unit.weightedHours)",
          },
          totalAssignment: {
            label: "A ({unit})",
            tooltip: "Nombre d'heures attribuées (@:unit.weightedHours)",
          },
          diffAssignment: {
            label: "ΔA ({unit})",
            tooltip:
              "Différence entre le service à réaliser et le nombre d'heures attribuées (@:unit.weightedHours)",
          },
          totalPrimary: {
            label: "V1 ({unit})",
            tooltip:
              "Nombre d'heures demandées en vœux principaux (@:unit.weightedHours)",
          },
          diffPrimary: {
            label: "ΔV1 ({unit})",
            tooltip:
              "Différence entre le service à réaliser et le nombre d'heures demandées en vœux principaux (@:unit.weightedHours)",
          },
          totalSecondary: {
            label: "V2 ({unit})",
            tooltip:
              "Nombre d'heures demandées en vœux secondaires (@:unit.weightedHours)",
          },
        },
        filters: {
          position: "Fonction",
          search: "Rechercher…",
        },
        options: {
          filters: "Filtres",
          stickyHeader: "En-tête fixe",
          columns: "Colonnes",
          resetColumns: "Réinitialiser",
        },
        loading: "Chargement des services…",
        noData: "Aucun service trouvé",
        noResults: "Aucun service ne correspond aux filtres",
      },
      courses: {
        title: "Enseignements",
        column: {
          degreeProgram: {
            label: "Formation",
            tooltip: "",
          },
          track: {
            label: "Parcours",
            tooltip: "",
          },
          name: {
            label: "Nom",
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
            label: "G.",
            tooltip: "Nombre de groupes",
          },
          hours: {
            label: "H. ({unit})",
            tooltip: "Nombre d'heures par groupe",
          },
          totalAssignment: {
            label: "A ({unit})",
            tooltip: "Nombre d'heures attribuées",
          },
          diffAssignment: {
            label: "ΔA ({unit})",
            tooltip: "Nombre d'heures restantes à attribuer",
          },
          totalPrimary: {
            label: "V1 ({unit})",
            tooltip: "Nombre d'heures demandées en vœux principaux",
          },
          diffPrimary: {
            label: "ΔV1 ({unit})",
            tooltip:
              "Différence entre le nombre d'heures à attribuer et le nombre d'heures demandées en vœux principaux",
          },
          diffPrimaryPriority: {
            label: "ΔV1 Prio ({unit})",
            tooltip:
              "Différence entre le nombre d'heures à attribuer et le nombre d'heures demandées en vœux principaux prioritaires",
          },
          totalSecondary: {
            label: "V2 ({unit})",
            tooltip: "Nombre d'heures demandées en vœux secondaires",
          },
        },
        filters: {
          degreeProgram: "Formation",
          term: "Période",
          type: "Type",
          search: "Rechercher…",
        },
        options: {
          teacher: {
            viewService: "Afficher le service de l'intervenant",
            downloadAssignments:
              "Télécharger les attributions de l'intervenant",
            deselect: "Désélectionner l'intervenant",
          },
          weightedHours: "Heures équivalent TD",
          stickyHeader: "En-tête fixe",
          columns: "Colonnes",
          resetColumns: "Réinitialiser",
        },
        loading: "Chargement des enseignements…",
        noData: "Aucun enseignement trouvé",
        noResults: "Aucun enseignement ne correspond aux filtres",
        notApplicable: "–",
      },
    },
    expansion: {
      defaultLabel: "Sélectionnez un course dans la liste ci-dessus",
      defaultCaption:
        "Cliquez sur ce volet pour afficher des informations supplémentaires",
      coordinators: {
        title: "Responsables",
        program: "Responsable de la mention : | Responsables de la mention :",
        track: "Responsable du parcours : | Responsables du parcours :",
        course:
          "Responsable de l'enseignement : | Responsables de l'enseignement :",
      },
      description: {
        title: "Description",
        editionTooltip: "Éditer la description",
        defaultText: "Pas de description (contactez un responsable)",
        defaultTextWithEdition: `[Cliquez sur l'icône <i class="q-icon text-primary material-symbols-sharp">edit</i> pour ajouter une description.]`,
      },
      defaultText:
        "Lorsqu'un enseignement est sélectionné, des informations supplémentaires sont affichées ici.",
    },
    details: {
      requests: {
        title: "Demandes",
      },
      priorities: {
        title: "Priorités",
      },
      archives: {
        title: "Archives",
      },
    },
  },
} as const;
