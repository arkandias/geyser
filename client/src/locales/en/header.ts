import type { InfoTextKey } from "@/config/info-text-keys.ts";

export default {
  header: {
    warning: {
      noActiveYear: "No year selected",
      archive: "You are viewing an archive ({year})",
    },
    home: {
      label: "Home",
    },
    service: {
      label: "My Info",
    },
    courses: {
      label: "Courses",
      servicesTable: "Services table",
      myRequests: "My requests",
    },
    admin: {
      label: "Parameters",
    },
    refreshData: {
      label: "Refresh data",
    },
    darkMode: {
      label: "Dark mode",
    },
    year: {
      label: "Active year",
    },
    lang: {
      label: "Language",
    },
    tutorial: {
      label: "Tutorial",
    },
    info: {
      label: "Information",
      contact: {
        label: "Contact",
        message: `
<div>
  For any questions or comments, you can send a message to the following
  email address:
  <a href="mailto:{email}" style="white-space: nowrap;">{email}</a>
</div>`,
      },
      legalNotice: {
        label: "Legal Notice",
        message: `
<p>
  As part of managing provisional teaching services, <i>GeyserFlow</i>
  collects and processes your personal data based on your consent.
</p>
<p>
  This information is securely stored on <i>GeyserFlow</i> servers,
  without transmission to external services.
</p>
<p>Privacy of your data:</p>
<ul>
  <li>
    <strong>Visible to all teachers:</strong>
    your requests (primary and secondary) and your assignments.
  </li>
  <li>
    <strong>Visible only to the commission:</strong>
    your service modifications (releases, delegations, etc.) and your
    message to the commission.
  </li>
</ul>
<p>
  You can access your data, rectify it, request its deletion, or exercise
  your right to limit the processing of your data. You can also withdraw
  your consent to the processing of your data at any time. Visit
  <a href="https://www.cnil.fr/fr" target="_blank" rel="noopener noreferrer"
    style="white-space: nowrap;">cnil.fr</a
  >
  for more information about your rights.
</p>
<p>
  To exercise your rights or for any questions about the processing of your
  data, you can send a message to the following email address:
  <a href="mailto:{email}" style="white-space: nowrap;">{email}</a>
</div>
<p>
  If, after sending a message to the above address, you believe that your
  "Information Technology and Freedom" rights are not being respected, you
  can file a complaint with the CNIL.
</p>`,
      },
      license: {
        label: "License",
        message: `
<p>
  Geyser &mdash; Provisional teaching management<br />
  Copyright &copy; 2021-2025 Amaël Broustet, Julien Hauseux
</p>
<p>
  Geyser is free software distributed under the terms of the
  <a
    href="https://www.gnu.org/licenses/agpl-3.0.html#license-text"
    target="_blank"
    rel="noopener noreferrer"
    >GNU Affero GPL v3</a
  > license.
</p>
<p class="text-italic">
  The GNU Affero General Public License is a modified version of the ordinary
  GNU GPL version 3. It has one added requirement: if you run a modified program
  on a server and let other users communicate with it there, your server must
  also allow them to download the source code corresponding to the modified
  version running there.
</p>
<p class="text-right">
  Excerpt from
  <a
    href="https://www.gnu.org/licenses/why-affero-gpl.en.html"
    target="_blank"
    rel="noopener noreferrer"
    >https://www.gnu.org/licenses/why-affero-gpl.html</a
  >
  on 03/03/2024.
</p>
The source code for Geyser is available at
<a
  href="https://github.com/arkandias/geyser-monorepo"
  target="_blank"
  rel="noopener noreferrer"
  >https://github.com/arkandias/geyser-monorepo</a
>.`,
      },
    } satisfies Record<InfoTextKey, { label: string; message: string }> &
      Record<string, unknown>,
    user: {
      label: "User",
      login: "Login",
      logout: "Logout",
    },
  },
} as const;
