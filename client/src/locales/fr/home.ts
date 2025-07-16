export default {
  home: {
    title: "Bienvenue",
    subtitle: {
      requests: "Geyser est en phase de vœux",
      assignments: "Geyser est en phase de commission",
      results: "Geyser est en phase de consultation",
      shutdown: "Geyser est fermé",
    },
    message: {
      requests: `
<ol>
  <li>
    Sur la page <i class="q-icon text-primary material-symbols-sharp">badge</i>
    Mes informations, entrez votre service de base, puis ajoutez vos modifications de
    service éventuelles (décharge, délégation, congé, etc.) et vos enseignements
    extérieurs (c'est-à-dire tous les enseignements qui compteront dans votre
    service mais qui ne figurent pas dans Geyser).
    <br />
    <b>
      Le total indiqué doit correspondre au nombre d'heures que la commission
      doit vous attribuer avec des enseignements présents dans Geyser.
    </b>
  </li>
  <br />
  <li>
    Sur la page <i class="q-icon text-primary material-symbols-sharp">menu_book</i>
    Enseignements, faites vos demandes principales et secondaires.
    <br />
    <b>Merci de demander un nombre d'heures au moins équivalent à votre service
    total en vœux principaux et de faire un nombre suffisant de vœux secondaires
    au cas où vos vœux principaux ne pourraient être tous satisfaits.
  </li>
</ol>`,
      assignments: `
<p>
  Les travaux de la commission sont en cours. Vous serez informé lorsqu'ils
  seront terminés pour consulter les attributions.
  En attendant, vous pouvez toujours consulter les demandes mais il n'est plus
  possible de les modifier.
</p>`,
      results: `
<p>
  Vous pouvez à présent consulter les attributions des enseignements de cette
  année. Vous avez également toujours accès aux demandes et aux attributions des
  années précédentes.
</p>`,
      shutdown: "",
    },
    alert: {
      postLogout: "Vous êtes déconnecté",
      organizationNotFound: "Organisation non trouvée",
      noAccess: "Vous n'avez pas accès",
      appDataFetching: "Chargement…",
      appDataError: "Erreur durant le chargement",
      organizationNotLoaded: "L'organisation n'a pas pu être chargée",
      profileNotLoaded: "Le profil n'a pas pu être chargé",
      shutdown: "Geyser est actuellement fermé",
      commissioner: "Geyser n'est pas en phase de commission",
      pageNotFound: "Page non trouvée",
    },
  },
} as const;
