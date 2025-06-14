import { contactEmail } from "@/config/environment.ts";
import type { InfoTextKey } from "@/config/info-text-keys.ts";

export default {
  header: {
    home: {
      label: "Accueil",
    },
    service: {
      label: "Mon service",
    },
    courses: {
      label: "Enseignements",
      year: "Année",
      servicesTable: "Table des services",
      myService: "Mes demandes",
    },
    admin: {
      label: "Administration",
    },
    lang: {
      label: "Langue",
    },
    refreshData: {
      label: "Rafraîchir les données",
    },
    darkMode: {
      label: "Mode sombre",
    },
    info: {
      label: "Infos",
      contact: {
        label: "Contact",
        message: `
          <div>
            Pour toute question ou remarque, vous pouvez envoyer un message à l'adresse
            électronique suivante&nbsp;:
            <a href="mailto:${contactEmail}">${contactEmail}</a>
          </div>`,
      },
      legalNotice: {
        label: "Mentions légales",
        message: `
          <p>
            Dans le cadre de la gestion des services prévisionnels, <i>GeyserFlow</i>
            collecte et traite vos données personnelles sur la base de votre consentement.
          </p>
          <p>
            Ces informations sont conservées de manière sécurisée sur les serveurs de
            <i>GeyserFlow</i>, sans transmission à des services externes.
          </p>
          <p>Confidentialité de vos données&nbsp;:</p>
          <ul>
            <li>
              <strong>Visibles par tous les intervenants&nbsp;:</strong>
              vos vœux (principaux et secondaires) et vos attributions.
            </li>
            <li>
              <strong>Visibles uniquement par la commission&nbsp;:</strong>
              vos modifications de services (décharges, délégations, etc.) et votre
              message à l''attention de celle-ci.
            </li>
          </ul>
          <p>
            Vous pouvez accéder aux données vous concernant, les rectifier, demander leur
            effacement ou exercer votre droit à la limitation du traitement de vos
            données. Vous pouvez également retirer à tout moment votre consentement au
            traitement de vos données. Consultez le site
            <a href="https://www.cnil.fr/fr" target="_blank" rel="noopener noreferrer"
              >cnil.fr</a
            >
            pour plus d’informations sur vos droits.
          </p>
          <p>
            Pour exercer vos droits ou pour toute question sur le traitement de vos
            données, vous pouvez envoyer un message à l'adresse électronique suivante&nbsp;:
            <a href="mailto:${contactEmail}">${contactEmail}</a>
          </div>
          <p>
            Si, après avoir envoyé un message à l'adresse ci-dessus, vous estimez que vos
            droits «&nbsp;Informatique et Libertés&nbsp;» ne sont pas respectés, vous
            pouvez adresser une réclamation à la CNIL.
          </p>`,
      },
      license: {
        label: "Licence",
        message: `
          <p>
            Geyser &mdash; Gestion des enseignements prévisionnels<br />
            Copyright &copy; 2021-2025 Amaël Broustet, Julien Hauseux
          </p>
          <p>
            Geyser est un logiciel libre distribué sous les termes de la licence
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.html#license-text"
              target="_blank"
              rel="noopener noreferrer"
              >GNU Affero GPL v3</a
            >.
          </p>
          <p class="text-italic">
            La licence publique générale GNU Affero (GNU AGPL) est une version
            modifiée de la version 3 de la GNU GPL ordinaire. Elle a une seule
            exigence supplémentaire&nbsp;: si vous exécutez un programme modifié sur un
            serveur et laissez d'autres utilisateurs communiquer avec lui, votre
            serveur doit aussi leur permettre de télécharger le code source
            correspondant à la version modifiée en fonctionnement.
          </p>
          <p class="text-right">
            Extrait de
            <a
              href="https://www.gnu.org/licenses/why-affero-gpl.fr.html"
              target="_blank"
              rel="noopener noreferrer"
              >https://www.gnu.org/licenses/why-affero-gpl.fr.html</a
            >
            le 03/03/2024.
          </p>
          Le code source de Geyser est disponible sur
          <a
            href="https://github.com/arkandias/geyser-monorepo"
            target="_blank"
            rel="noopener noreferrer"
            >https://github.com/arkandias/geyser-monorepo</a
          >`,
      },
    } satisfies Record<InfoTextKey, { label: string; message: string }> &
      Record<string, unknown>,
    user: {
      label: "Utilisateur",
      logout: "Déconnexion",
    },
  },
} as const;
