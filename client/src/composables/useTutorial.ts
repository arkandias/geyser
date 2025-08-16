import { type DriveStep, type Driver, driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useLeftPanelStore } from "@/stores/useLeftPanelStore.ts";

import "@/css/driver.scss";

export const useTutorial = () => {
  const $q = useQuasar();
  const router = useRouter();
  const { openLeftPanel, closeLeftPanel } = useLeftPanelStore();

  const driverObj = ref<Driver | null>(null);

  const dontShowTutorialOnStartup = !!$q.localStorage.getItem(
    "dont_show_tutorial_on_startup",
  );

  const steps: DriveStep[] = [
    {
      popover: {
        title: "Bienvenue dans le tutoriel",
        description: `
<ul>
<li>Vous pouvez avancer ou revenir en arrière en utilisant les flèches gauche/droite du clavier.</li>
<li>Vous pouvez sortir du tutoriel à tout moment en cliquant sur la petite croix en haut à droite de la fenêtre.</li>
</ul>
<br />
<label>
  <input type="checkbox" id="tutorial-checkbox" style="margin-right: 8px;">
  Ne plus afficher ce tutoriel au démarrage.
</label>`,
        showButtons: ["next", "previous", "close"],
        popoverClass: "custom-popover large-popover",
        onPopoverRender: (popover) => {
          const checkbox = document.getElementById(
            "tutorial-checkbox",
          ) as HTMLInputElement;
          checkbox.checked = dontShowTutorialOnStartup;
          checkbox.addEventListener("click", () => {
            $q.localStorage.set(
              "dont_show_tutorial_on_startup",
              checkbox.checked,
            );
          });

          const servicePageButton = document.createElement("button");
          servicePageButton.innerText = ">>> Mon service";
          popover.footerButtons.append(servicePageButton);
          servicePageButton.addEventListener("click", () => {
            driverObj.value?.moveTo(6);
          });

          const coursesPageButton = document.createElement("button");
          coursesPageButton.innerText = ">>> Enseignements";
          popover.footerButtons.append(coursesPageButton);
          coursesPageButton.addEventListener("click", () => {
            driverObj.value?.moveTo(18);
          });

          const toolbarButton = document.createElement("button");
          toolbarButton.innerText = ">>> Barre de menu";
          popover.footerButtons.append(toolbarButton);
          toolbarButton.addEventListener("click", () => {
            driverObj.value?.moveTo(57);
          });
        },
      },
    },
    {
      popover: {
        title: "Principe",
        description: `Le but de Geyser est d'attribuer des enseignements à des intervenants.
<ul>
<li>D'un côté, un certain nombre d'enseignements doivent être attribués.</li>
<li>De l'autre, chaque intervenant a un service (c'est-à-dire un nombre d'heures d'enseignement) à réaliser.</li>
</ul>
Par ailleurs, certaines règles de priorités peuvent être mises en place pour l'attribution des enseignements.`,
        popoverClass: "custom-popover large-popover",
      },
    },
    {
      popover: {
        title: "Phases",
        description: `Le fonctionnement se déroule en trois phases.
<ul>
<li><b>Phase de vœux :</b> les intervenants peuvent consulter les enseignements disponibles et faire des demandes (principales ou secondaires, ces dernières servant au cas où certaines demandes principales ne peuvent être satisfaites).</li>
<li><b>Phase de commission :</b> les membres de la commission des services se réunissent pour attribuer les enseignements aux intervenants.</li>
<li><b>Phase de consultation :</b> les intervenants peuvent consulter leurs attributions.</li>
</ul>`,
        popoverClass: "custom-popover large-popover",
      },
    },
    {
      popover: {
        title: "Début de la visite",
        description:
          "Nous allons à présent visiter chacune des pages de l'application.",
        popoverClass: "custom-popover large-popover",
      },
    },
    {
      element: "#home-page-button",
      popover: {
        title: "Bouton Accueil",
        description: "Ce bouton vous permet d'accéder à la page d'accueil.",
        onNextClick: () => {
          void (async () => {
            await router.push({ name: "home" });
            driverObj.value?.moveNext();
          })();
        },
      },
    },
    {
      popover: {
        title: "Page d'accueil",
        description:
          "Sur cette page, vous pouvez voir quelle est la phase en cours et les instructions associées.",
        popoverClass: "custom-popover large-popover",
      },
    },
    {
      element: "#service-page-button",
      popover: {
        title: "Bouton Mon service",
        description:
          "Ce bouton vous permet d'accéder à la page de votre service.",
        onNextClick: () => {
          void (async () => {
            await router.push({ name: "service" });
            driverObj.value?.moveNext();
          })();
        },
        onPrevClick: () => {
          void (async () => {
            await router.push({ name: "home" });
            driverObj.value?.movePrevious();
          })();
        },
      },
    },
    {
      popover: {
        title: "Page de service",
        description: `Cette page regroupe différentes informations sur vous et votre service pour l'année active.<br />
Elle contient surtout des informations synthétiques (le détail de vos demandes et attributions sera visible sur la page des enseignements).`,
        popoverClass: "custom-popover large-popover",
      },
    },
    {
      element: "#service-teacher",
      popover: {
        title: "Vos informations",
        description:
          "Votre nom, votre fonction (si renseignée) et votre adresse mail.",
      },
    },
    {
      element: "#service-coordinations",
      popover: {
        title: "Vos responsabilités",
        description: `Vos responsabilités éventuelles (mention, parcours ou enseignement).<br />
À côté de chaque responsabilité, un bouton vous permet de télécharger toutes les attributions correspondantes.<br />
Cette section n'apparaît pas si vous n'avez aucune responsabilité.`,
      },
    },
    {
      element: "#service-details",
      popover: {
        title: "Votre service",
        description: "Un résumé de votre service.",
      },
    },
    {
      element: "#service-details-base",
      popover: {
        title: "Votre service de base",
        description: `Le nombre d'heures équivalent TD que vous devez enseigner, avant toute modification de service (décharges, délégations, etc.).<br />
Vous pouvez modifier cette information lors de la phase de vœux.`,
      },
    },
    {
      element: "#service-details-modifications",
      popover: {
        title: "Vos modifications de services",
        description:
          "Vous devez ajouter ici vos modifications de services (décharges, délégations, congés, etc.) lors de la phase de vœux.",
      },
    },
    {
      element: "#service-details-external-courses",
      popover: {
        title: "Vos enseignements extérieurs",
        description:
          "Vous devez ajouter ici vos enseignements extérieurs (c'est-à-dire tous les enseignements qui compteront dans votre service mais qui ne figurent pas dans Geyser) lors de la phase de vœux.",
      },
    },
    {
      element: "#service-details-total",
      popover: {
        title: "Le nombre d'heures total à attribuer",
        description: `La différence entre votre service de base d'une part et la somme de vos modifications de services et de vos enseignements extérieurs d'autre part.<br />
Il s'agit du nombre d'heures équivalent TD que la commission des services doit vous attribuer avec des enseignements présents dans Geyser.<br />
<b>Il est très important pour faciliter le travail de la commission que ce total soit correct.</b>`,
      },
    },
    {
      element: "#service-requests",
      popover: {
        title: "Vos demandes",
        description:
          "Le nombre d'heures équivalent TD demandées en vœux principaux et en vœux secondaire et, lors de la phase de consultation, le nombre d'heures équivalent TD attribuées.",
      },
    },
    {
      element: "#service-priorities",
      popover: {
        title: "Vos priorités",
        description:
          "Les enseignements sur lesquels vous avez une priorité (positive en vert ou négative en rouge) et votre ancienneté dans chacun d'eux.",
      },
    },
    {
      element: "#service-message",
      popover: {
        title: "Votre message à l'attention de la commission",
        description:
          "Vous pouvez laisser un message à l'attention de la commission des services lors de la phase de vœux.",
      },
    },
    {
      element: "#courses-page-button",
      popover: {
        title: "Bouton Enseignements",
        description:
          "Ce bouton vous permet d'accéder à la page des enseignements.",
        onNextClick: () => {
          void (async () => {
            await router.push({ name: "courses" });
            closeLeftPanel();
            driverObj.value?.moveNext();
          })();
        },
        onPrevClick: () => {
          void (async () => {
            await router.push({ name: "service" });
            driverObj.value?.movePrevious();
          })();
        },
      },
    },
    {
      popover: {
        title: "Page des enseignements",
        description: "Cette page est composée de plusieurs panneaux.",
        popoverClass: "custom-popover large-popover",
      },
    },
    {
      element: ".table-courses",
      popover: {
        title: "Panneau I : Table des enseignements",
        description:
          "Cette table contient tous les enseignements de l'année active.",
      },
    },
    {
      element: ".course-details",
      popover: {
        title: "Panneau II : Détails de l'enseignement sélectionné",
        description:
          "Ce panneau contient des informations détaillées sur l'enseignement sélectionné.",
      },
    },
    {
      element: "#second-splitter .q-splitter__separator",
      popover: {
        title: "Séparateur horizontal",
        description:
          "Vous pouvez redimensionner les panneaux I et II en faisant glisser le séparateur horizontal.",
        onNextClick: () => {
          openLeftPanel();
          driverObj.value?.moveNext();
        },
      },
    },
    {
      element: ".table-services",
      popover: {
        title: "Panneau III : Table des services",
        description: `Cette table contient tous les intervenants qui ont un service pour l'année active.<br />
Elle peut être ouverte ou fermée grâce à un bouton dans la barre des menus (nous y reviendrons).<br />
<br />
N.B. Si Geyser est configuré en mode « service privé », seul votre propre service est visible.`,
        onPrevClick: () => {
          closeLeftPanel();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: "#first-splitter .q-splitter__separator",
      popover: {
        title: "Séparateur vertical",
        description:
          "Vous pouvez redimensionner le panneau III en faisant glisser le séparateur vertical.",
        onNextClick: () => {
          closeLeftPanel();
          driverObj.value?.moveNext();
        },
      },
    },
    {
      element: ".table-courses",
      popover: {
        title: "Table des enseignements",
        description:
          "Cette table contient tous les enseignements de l'année active.",
        onPrevClick: () => {
          openLeftPanel();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: "#table-courses-filter-degree-program",
      popover: {
        title: "Filtre formations",
        description:
          "Vous pouvez filter les enseignements par formation (diplôme et mention).",
      },
    },
    {
      element: "#table-courses-filter-term",
      popover: {
        title: "Filtre périodes",
        description:
          "Vous pouvez filter les enseignements par période (typiquement par semestre).",
      },
    },
    {
      element: "#table-courses-filter-type",
      popover: {
        title: "Filtre types",
        description:
          "Vous pouvez filter les enseignements par type (cours, TD, etc.).",
      },
    },
    {
      element: ".table-courses-filter-search",
      popover: {
        title: "Champ de recherche",
        description: "Vous pouvez également faire une recherche dans la table.",
      },
    },
    {
      element: "#table-courses-weighted-hours",
      popover: {
        title: "Heures équivalent TD",
        description:
          "Ce bouton permet de convertir toutes les heures affichées dans les différentes colonnes en heures équivalent TD.",
      },
    },
    {
      element: "#table-courses-sticky-header",
      popover: {
        title: "En-tête toujours visible",
        description:
          "Ce bouton permet de garder l'en-tête de la table visible lors du défilement des lignes.",
      },
    },
    {
      element: "#table-courses-columns",
      popover: {
        title: "Colonnes de la table",
        description:
          "Ce bouton permet de choisir les colonnes visibles et de les ordonner.",
        onNextClick: () => {
          void (async () => {
            document.getElementById("table-courses-columns")?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.moveNext();
          })();
        },
      },
    },
    {
      element: "#table-courses-columns-menu",
      popover: {
        title: "Menu des colonnes",
        description: `Chaque ligne correspond à une colonne de la table.<br />
Le bouton à bascule permet de choisir si la colonne est visible ou non (certaines colonnes sont toujours visibles) et les flèches permettent de changer l'ordre des colonnes.<br />
Pour obtenir plus d'informations sur une colonne (typiquement celles dont le nom est abrégé), survolez la ligne correspondante avec votre souris.`,
        onNextClick: () => {
          const columnsMenu = document.getElementById(
            "table-courses-columns-menu",
          );
          if (columnsMenu) {
            columnsMenu.scrollTop = columnsMenu.scrollHeight;
            columnsMenu.scrollTo({
              top: columnsMenu.scrollHeight,
              behavior: "smooth",
            });
          }
          driverObj.value?.moveNext();
        },
        onPrevClick: () => {
          document.getElementById("table-courses-columns")?.click();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: "#table-courses-columns-reset",
      popover: {
        title: "Réinitialiser les colonnes",
        description:
          "Ce bouton permet de réinitialiser la visibilité et l'ordre des colonnes.",
        onNextClick: () => {
          document.getElementById("table-courses-columns")?.click();
          const splitterPane =
            document.querySelector<HTMLElement>(".table-courses");
          if (splitterPane) {
            splitterPane.scrollTop = splitterPane.scrollHeight;
            splitterPane.scrollTo({
              top: splitterPane.scrollHeight,
              behavior: "smooth",
            });
          }
          driverObj.value?.moveNext();
        },
        onPrevClick: () => {
          const columnsMenu = document.getElementById(
            "table-courses-columns-menu",
          );
          if (columnsMenu) {
            columnsMenu.scrollTop = 0;
            columnsMenu.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: ".table-courses .q-table__bottom",
      popover: {
        title: "Pagination",
        description: `Par défaut, le nombre de lignes affichées par page est limité.<br />
Vous pouvez parcourir les pages ou modifier le nombre de lignes affichées par page en bas de la table.`,
        side: "top",
        align: "end",
        onNextClick: () => {
          const splitterPane =
            document.querySelector<HTMLElement>(".table-courses");
          if (splitterPane) {
            splitterPane.scrollTop = 0;
            splitterPane.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
          document.querySelector<HTMLElement>(".table-courses-row")?.click();
          driverObj.value?.moveNext();
        },
        onPrevClick: () => {
          void (async () => {
            document.getElementById("table-courses-columns")?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            const columnsMenu = document.getElementById(
              "table-courses-columns-menu",
            );
            if (columnsMenu) {
              columnsMenu.scrollTop = columnsMenu.scrollHeight;
              columnsMenu.scrollTo({
                top: columnsMenu.scrollHeight,
                behavior: "smooth",
              });
            }
            driverObj.value?.movePrevious();
          })();
        },
      },
    },
    {
      element: ".table-courses-row",
      popover: {
        title: "Sélection d'un enseignement",
        description:
          "Vous pouvez sélectionner un enseignement en cliquant sur la ligne correspondante.",
        onPrevClick: () => {
          document.querySelector<HTMLElement>(".table-courses-row")?.click();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: ".course-details",
      popover: {
        title: "Détails de l'enseignement sélectionné",
        description:
          "Ce panneau contient des informations détaillées sur l'enseignement sélectionné.",
      },
    },
    {
      element: "#course-details-expansion-item",
      popover: {
        title: "Volet déroulant fermé",
        description: `Ceci est un volet déroulant. Il est fermé par défaut.<br />
<b>Vous pouvez cliquer dessus pour faire apparaître des informations supplémentaires.</b>`,
        onNextClick: () => {
          void (async () => {
            document
              .querySelector<HTMLElement>(".course-details-expansion-header")
              ?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.moveNext();
          })();
        },
      },
    },
    {
      element: "#course-details-expansion-item",
      popover: {
        title: "Volet déroulant ouvert",
        description: "Le volet est ouvert.",
        onPrevClick: () => {
          void (async () => {
            document
              .querySelector<HTMLElement>(".course-details-expansion-header")
              ?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.movePrevious();
          })();
        },
      },
    },
    {
      element: "#course-details-coordination",
      popover: {
        title: "Responsables",
        description:
          "La liste des responsables de l'enseignement, du parcours ou de la mention (à contacter pour toutes questions relatives à cet enseignement).",
      },
    },
    {
      element: "#course-details-description",
      popover: {
        title: "Description",
        description: `Une description du contenu de l'enseignement (ou toute information utile aux intervenants pour faire leur choix).<br />
<b>Cette section peut être complétée par n'importe quel responsable de l'enseignement.</b>`,
        onNextClick: () => {
          void (async () => {
            document
              .querySelector<HTMLElement>(".course-details-expansion-header")
              ?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.moveNext();
          })();
        },
      },
    },
    {
      element: "#course-details-requests div",
      popover: {
        title: "Demandes",
        description:
          "Dans cette section figurent toutes les demandes pour l'enseignement sélectionné, ainsi que les attributions lors de la phase de consultation.",
        onPrevClick: () => {
          void (async () => {
            document
              .querySelector<HTMLElement>(".course-details-expansion-header")
              ?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.movePrevious();
          })();
        },
      },
    },
    {
      element: "#course-details-request-form",
      popover: {
        title: "Formulaire de demande",
        description: `Ce formulaire, qui n'est visible que lors de la phase de vœux, permet de faire des demandes pour l'enseignement sélectionné.<br />
Vous devez indiquer le nombre (pas nécessairement entier) d'heures ou de groupes (au choix) demandé, sélectionner le type de la demande (principale ou secondaire) et valider la demande en cliquant sur le premier bouton (celui avec une coche).<br />
Si vous aviez déjà fait une demande du même type, la nouvelle demande remplace la précédente.<br />
Vous pouvez supprimer une demande soit en faisant une nouvelle demande du même type de 0 heures / 0 groupes, soit en sélectionnant le type de la demande à supprimer et en cliquant sur le second bouton (celui avec une croix).`,
        popoverClass: "custom-popover large-popover",
      },
    },
    {
      element: "#course-details-priorities div",
      popover: {
        title: "Priorités",
        description:
          "Dans cette section figurent les priorités (positives en vert et négatives en rouge) pour l'enseignement sélectionné, ainsi que l'ancienneté de chaque intervenant dans cet enseignement.",
      },
    },
    {
      element: "#course-details-archives div",
      popover: {
        title: "Archives",
        description:
          "Dans cette section figure l'historique de toutes les attributions passées de l'enseignement sélectionné.",
      },
    },
    {
      popover: {
        title: "Boutons additionnels",
        description:
          "Trois boutons additionnels sont disponibles dans la barre d'outils lorsque vous êtes sur la page des enseignements.",
      },
    },
    {
      element: "#left-panel-button",
      popover: {
        title: "Bouton Table des services",
        description: "Ce bouton permet d'ouvrir le panneau de gauche.",
        onNextClick: () => {
          openLeftPanel();
          driverObj.value?.moveNext();
        },
      },
    },
    {
      element: ".table-services",
      popover: {
        title: "Table des services",
        description: `Cette table contient tous les intervenants qui ont un service pour l'année active.<br />
<br />
N.B. Si Geyser est configuré en mode « service privé », seul votre propre service est visible.<br />
<br />
Vous pouvez voir pour chaque intervenant : le nombre d'heures à attribuer, le nombre d'heures attribuées et le nombre d'heures demandées en vœux principaux et secondaires.<br />
Toutes les heures sont données en équivalent TD.<br />
D'autres informations peuvent également être affichées en utilisant le bouton Colonnes.`,
        onPrevClick: () => {
          closeLeftPanel();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: "#table-services-top",
      popover: {
        title: "Options de la table des services",
        description: `Comme la table des enseignements, la table des services contient un champ de recherche, un bouton pour garder l'en-tête visible et un bouton pour choisir les colonnes visibles et les ordonner.<br />
<br />
Contrairement à la table des enseignements, les heures sont toujours affichées en heures équivalent TD (il n'y a donc pas de bouton pour cela).`,
        onNextClick: () => {
          document.querySelector<HTMLElement>(".table-services-row")?.click();
          driverObj.value?.moveNext();
        },
      },
    },
    {
      element: ".table-services-row",
      popover: {
        title: "Sélection d'un intervenant",
        description:
          "Vous pouvez sélectionner un intervenant en cliquant sur la ligne correspondante.",
        onPrevClick: () => {
          document.querySelector<HTMLElement>(".table-services-row")?.click();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: ".table-courses",
      popover: {
        title: "Table des enseignements lorsqu'un intervenant est sélectionné",
        description: `Lorsqu'un intervenant est sélectionné, la table des enseignements contient exclusivement les enseignements pour lesquels l'intervenant a fait une demande ou reçu une attribution.<br />
Les enseignements qui lui ont été attribués apparaissent en vert clair.<br />
<br />
N.B. Les filtres de la table des enseignements sont désactivés lorsqu'un intervenant est sélectionné.`,
        onPrevClick: () => {
          openLeftPanel();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: ".table-courses .q-table__title",
      popover: {
        title: "Titre et nouveaux boutons",
        description:
          "Le titre de la table des enseignements est remplacé par le nom de l'intervenant et trois nouveaux boutons sont apparaissent à côté.",
      },
    },
    {
      element: "#table-courses-button-service",
      popover: {
        title: "Afficher le service",
        description:
          "Ce bouton permet d'afficher la page du service de l'intervenant dans une fenêtre superposée.",
      },
    },
    {
      element: "#table-courses-button-download",
      popover: {
        title: "Télécharger les attributions",
        description:
          "Ce bouton permet de télécharger les attributions de l'intervenant (lors de la phase de consultation).",
      },
    },
    {
      element: "#table-courses-button-deselect",
      popover: {
        title: "Désélectionner",
        description: "Ce bouton permet de désélectionner l'intervenant.",
      },
    },
    {
      element: "#my-requests-button",
      popover: {
        title: "Bouton Mes demandes",
        description: `Ce bouton permet de sélectionner votre propre service (sans ouvrir le panneau de gauche).<br />
<b>En particulier, il vous permet de consulter rapidement le détail de vos demandes et de vos attributions.</b>`,
      },
    },
    {
      element: "#year-button",
      popover: {
        title: "Bouton Année active",
        description: "Ce bouton permet d'ouvrir le menu Année active.",
        onNextClick: () => {
          void (async () => {
            document.getElementById("year-button")?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.moveNext();
          })();
        },
      },
    },
    {
      element: "#year-menu",
      popover: {
        title: "Menu Année active",
        description: `Ce menu permet de sélectionner l'année active parmi toutes les années (passées et en cours) afin de consulter les services et les enseignements de cette année-là comme si c'était l'année en cours.<br />
Lorsque vous sélectionnez une année passée, un bandeau vous avertit que l'année active n'est pas l'année en cours.`,
        onNextClick: () => {
          document.getElementById("year-button")?.click();
          driverObj.value?.moveNext();
        },
        onPrevClick: () => {
          document.getElementById("year-button")?.click();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      popover: {
        title: "Autres boutons de la barre de menu",
        description:
          "Passons en revue les boutons de la barre de menu restants.",
        popoverClass: "custom-popover large-popover",
        onPrevClick: () => {
          void (async () => {
            await router.push({ name: "courses" });
            openLeftPanel();
            await new Promise((resolve) => setTimeout(resolve, 200));
            document.querySelector<HTMLElement>(".table-services-row")?.click();
            driverObj.value?.movePrevious();
          })();
        },
      },
    },
    {
      element: "#refresh-button",
      popover: {
        title: "Bouton Rafraîchir les données",
        description: `Lorsque vous effectuez une action (par exemple une demande), les données affichées se mettent à jour automatiquement.<br />
Mais vous ne verrez pas les modifications effectuées entre temps par un autre utilisateur.<br />
Ce bouton permet de mettre à jour toutes les données affichées.`,
      },
    },
    {
      element: "#dark-mode-button",
      popover: {
        title: "Bouton Mode sombre",
        description:
          "Ce bouton permet d'activer ou de désactiver le mode sombre.",
      },
    },
    {
      element: "#lang-button",
      popover: {
        title: "Bouton Langue",
        description: "Ce bouton permet d'ouvrir le menu Langue.",
        onNextClick: () => {
          void (async () => {
            document.getElementById("lang-button")?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.moveNext();
          })();
        },
        onPrevClick: () => {
          void (async () => {
            document.getElementById("year-button")?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.movePrevious();
          })();
        },
      },
    },
    {
      element: "#lang-menu",
      popover: {
        title: "Menu Langue",
        description: "Ce menu permet de sélectionner la langue de l'interface.",
        onNextClick: () => {
          document.getElementById("lang-button")?.click();
          driverObj.value?.moveNext();
        },
        onPrevClick: () => {
          document.getElementById("lang-button")?.click();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: "#tutorial-button",
      popover: {
        title: "Bouton Tutoriel",
        description: "Ce bouton permet de démarrer ce tutoriel.",
      },
    },
    {
      element: "#info-button",
      popover: {
        title: "Bouton Informations",
        description: "Ce bouton permet d'afficher le menu Informations.",
        onNextClick: () => {
          void (async () => {
            document.getElementById("info-button")?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.moveNext();
          })();
        },
      },
    },
    {
      element: "#info-menu",
      popover: {
        title: "Menu Informations",
        description:
          "Ce menu permet d'afficher diverses informations sur l'application.",
        onNextClick: () => {
          document.getElementById("info-button")?.click();
          driverObj.value?.moveNext();
        },
        onPrevClick: () => {
          document.getElementById("info-button")?.click();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      element: "#user-button",
      popover: {
        title: "Bouton Utilisateur",
        description: "Ce bouton permet d'ouvrir le menu Utilisateur.",
        onNextClick: () => {
          void (async () => {
            document.getElementById("user-button")?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.moveNext();
          })();
        },
        onPrevClick: () => {
          void (async () => {
            document.getElementById("info-button")?.click();
            await new Promise((resolve) => setTimeout(resolve, 200));
            driverObj.value?.movePrevious();
          })();
        },
      },
    },
    {
      element: "#user-menu",
      popover: {
        title: "Menu Utilisateur",
        description: `Ce bouton permet d'afficher le menu utilisateur.<br />
Il permet de voir son nom, de changer de rôle (intervenant / commissaire / organisateur) et de se décconnecter.`,
        onNextClick: () => {
          document.getElementById("user-button")?.click();
          driverObj.value?.moveNext();
        },
        onPrevClick: () => {
          document.getElementById("user-button")?.click();
          driverObj.value?.movePrevious();
        },
      },
    },
    {
      popover: {
        title: "Fin du tutoriel",
        description: `Merci d'avoir suivi ce tutoriel !<br />
N'hésitez pas à faire part de vos remarques en utilisant l'adresse de contact dans le menu Informations.`,
        popoverClass: "custom-popover large-popover",
      },
    },
  ];

  const initDriver = () => {
    driverObj.value = driver({
      steps,
      showProgress: true,
      progressText: "{{current}} / {{total}}",
      nextBtnText: "Suivant",
      prevBtnText: "Précédent",
      doneBtnText: "Terminer",
      allowClose: false,
      overlayOpacity: 0.5,
      stagePadding: 0,
      stageRadius: 0,
      popoverClass: "custom-popover",
      onPopoverRender: (popover) => {
        popover.closeButton.style.display = "";
      },
    });
  };

  const startTour = () => {
    driverObj.value?.drive();
  };

  onMounted(() => {
    initDriver();

    if (!dontShowTutorialOnStartup) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        startTour();
      }, 500);
    }
  });

  return {
    startTour,
    // resetTutorial,
    // isFirstVisit,
  };
};
