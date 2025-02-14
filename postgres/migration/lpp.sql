ALTER TABLE public.course
    ADD COLUMN ens_id_import       text UNIQUE,
    ADD COLUMN formation_id_import text,
    ADD COLUMN nom_import          text;

ALTER TABLE public.program
    ADD COLUMN nom_import text;

ALTER TABLE public.track
    ADD COLUMN nom_import text;

INSERT INTO public.ui_text(key, value, label)
VALUES ('legal-notice2', '<p>
  Dans le cadre de la gestion des services prévisionnels des intervenants en
  mathématiques à l''Université de Lille, le département de mathématiques
  collecte et traite vos données personnelles sur la base de votre consentement.
</p>
<p>
  Ces informations sont conservées de manière sécurisée sur les serveurs du
  département pendant 5 ans, sans transmission à des services externes.
</p>

<p>Confidentialité de vos données :</p>
<ul>
  <li>
    <strong>Visibles par tous les intervenants :</strong>
    vos vœux (principaux et secondaires) et vos attributions.
  </li>
  <li>
    <strong>Visibles uniquement par la commission :</strong>
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
  données, vous pouvez contacter le directeur du département de mathématiques :
</p>
<div class="resp-rgpd">
  M. Amaël Broustet<br />
  Bâtiment M2, Bureau 004<br />
  +33 (0) 3 20 43 42 38<br />
  <a href="mailto:direction-dpt-maths@univ-lille.fr"
    >direction-dpt-maths@univ-lille.fr</a
  >
</div>
<p>
  Si vous estimez, après avoir contacté le directeur du département de
  mathématiques, que vos droits «&nbsp;Informatique et Libertés&nbsp;» ne sont
  pas respectés, vous pouvez adresser une réclamation à la CNIL.
</p>', 'Mentions légales');

INSERT INTO public.position(value, label, base_service_hours, description)
VALUES ('MCF', 'Maître de conférences', 192, NULL),
       ('PR', 'Professeur des universités', 192, NULL),
       ('CR', 'Chargé de recherche', 0, NULL),
       ('DR', 'Directeur de recherche', 0, NULL),
       ('PRAG', 'Professeur agrégé', 384, NULL),
       ('ATER', 'ATER', 192, NULL),
       ('demi-ATER', 'Demi-ATER', 96, NULL),
       ('doctorant', 'Doctorant', 64, NULL),
       ('postdoc', 'Post-doctorant', 0, NULL),
       ('administratif', 'Administratif', 0, NULL);
