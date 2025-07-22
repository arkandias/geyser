export default {
  data: {
    button: {
      create: "Créer",
      edit: "Éditer",
      update: "Mettre à jour",
      delete: "Supprimer",
      import: "Importer",
      export: "Exporter",
    },
    search: "Rechercher…",
    error: {
      unknownError: "Erreur inconnue",
      invalidForm: "Formulaire non valide",
      emptyField: "Le champ « {field} » est requis",
      notANumber: "Le champ « {field} » n'est pas un nombre valide",
      insertFailed: "Échec de la création",
      updateFailed: "Échec de la mise à jour",
      deleteFailed: "Échec de la suppression",
      importFailed: "Échec de l'import",
      exportFailed: "Échec de l'export",
      noReturnData: "Pas de réponse",
      noFile: "Sélectionnez un fichier",
      unreadableFile: "Fichier illisible: {reason}",
      emptyFile: "Fichier vide",
      parsingError: "Erreur durant l'extraction des données: {reason}",
      invalidRow: "Ligne {index} invalide: {reason}",
    },
    import: {
      title: "Import depuis un fichier CSV",
      csvInstructions: `
Pour être valide, le fichier CSV doit impérativement respecter les règles suivantes&nbsp;:
<ul>
  <li>Le fichier doit contenir exactement les colonnes listées dans le tableau ci-dessous, toutes sont obligatoires.</li>
  <li>Les noms des colonnes doivent être écrits exactement comme indiqué dans le tableau (en minuscules).</li>
  <li>Les valeurs doivent être séparées par des virgules.</li>
  <li>Les textes contenant des virgules doivent être entre guillemets doubles.</li>
  <li>Si un texte contient lui-même des guillemets doubles, ceux-ci doivent être doublés (ex&nbsp;: "Il a dit&nbsp;: ""Bonjour""").</li>
  <li>Les nombres doivent utiliser le point comme séparateur décimal et ne pas contenir d'espaces (ex&nbsp;: 1234.56).</li>
  <li>Les valeurs booléennes doivent être écrites "true" ou "false" (en minuscules).</li>
  <li>Si le fichier fait plus de 1 Mo, il doit être découpé en plusieurs fichiers plus petits, chacun importé séparément.</li>
</ul>`,
      table: {
        column: {
          key: "Nom",
          type: "Type",
          nonNullable: "Requis",
          info: "Remarques",
        },
      },
      filePickerLabel: "Sélectionnez un fichier CSV",
      overwrite: "Écraser les données en cas de conflit",
    },
  },
} as const;
