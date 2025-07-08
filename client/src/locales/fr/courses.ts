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
          search: "Rechercher…",
        },
        options: {
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
      defaultText: `
<p>
  Lorsqu'un course est sélectionné, les informations suivantes sont affichées
  ici :
</p>
<ul>
  <li>les responsables de la mention, du parcours et de l'enseignement ;</li>
  <li>une description de l'enseignement.</li>
</ul>
<p>
  La description peut être éditée par les responsables sus-mentionnés en
  cliquant sur le bouton
  <i class="q-icon text-primary material-symbols-sharp">edit</i>
  (visible par eux seuls) qui apparaît à côté de «&nbsp;Description&nbsp;».
</p>`,
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
      defaultText: `
<p>
  Cliquez sur la ligne d'un enseignement pour afficher ici des informations
  détaillées. Si un enseignement et un intervenant sont sélectionnés en même
  temps, ce sont les informations de l'enseignement qui sont affichées. Vous
  pouvez désélectionner un enseignement ou un intervenant en cliquant à nouveau
  sur la ligne correspondante.
</p>
<p>Boutons dans la barre de menu (accessibles uniquement depuis cette page) :</p>
<ul>
  <li>
    <i class="q-icon text-primary material-symbols-sharp">vertical_split</i>
    Table des services : permet d'afficher/masquer la liste des services de
    l'année en cours (fonctionnalité réservée aux membres de la commission et
    aux organisateurs).
  </li>
  <li>
    <i class="q-icon text-primary material-symbols-sharp">assignment</i>
    Mes demandes : permet de sélectionner/désélectionner votre propre service
    afin de voir vos demandes (sans passer par la table des services).
  </li>
</ul>
<p>
  Lorsqu'un intervenant est sélectionné dans la table des services, les
  enseignements qui apparaissent dans la table ci-dessus sont seulement ceux
  qui ont été demandés par l'intervenant ou attribués à l'intervenant et les
  filtres de recherche sont désactivés. Le nom de l'intervenant apparaît alors
  en haut de la table (à la place de «&nbsp;Enseignements&nbsp;»).
  Trois raccourcis sont présents à droite du nom de l'intervenant :
</p>
<ul>
  <li>
    <i class="q-icon text-primary material-symbols-sharp">badge</i>
    permet d'afficher des informations détaillées sur l'intervenant ;
  </li>
  <li>
    <i class="q-icon text-primary material-symbols-sharp">download</i>
    permet de télécharger les attributions de l'intervenant ;
  </li>
  <li>
    <i class="q-icon text-primary material-symbols-sharp">close</i>
    permet de désélectionner l'intervenant.
  </li>
</ul>`,
    },
  },
} as const;
