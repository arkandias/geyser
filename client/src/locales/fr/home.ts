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
        <p>
          Sur la page <i class="q-icon text-primary material-symbols-sharp">badge</i>
          Mes informations, entrez votre service de base (en heures EQTD), puis ajoutez
          vos modifications de service éventuelles (délégation, décharge, congé, etc.).
          <b>
            Le total indiqué doit correspondre au nombre d'heures EQTD que la commission
            doit vous attribuer avec des enseignements disponibles sur Geyser.
          </b>
        </p>
        <p>
          Vous pouvez ensuite faire des demandes principales et secondaires sur la page
          <i class="q-icon text-primary material-symbols-sharp">menu_book</i>
          Enseignements. Merci de demander l’équivalent de votre service total en
          demandes principales et en demandes secondaires.
        </p>`,
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
      noAuth: "Vous n'êtes pas authentifié",
      loadingProfile: "Chargement de votre profil…",
      profileNotLoaded: "Votre profil n'a pas pu être chargé",
      profileNotActive: "Votre profil n'est pas actif",
      loadingAppData: "Chargement des paramètres de l'application…",
      shutdown: "Geyser est actuellement fermé",
      pageNotFound: "Page non trouvée",
    },
  },
} as const;
