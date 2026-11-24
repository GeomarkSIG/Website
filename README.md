# Geomark SIG Solutions — site vitrine

Site statique (HTML/CSS/JS, sans backend) de Geomark SIG Solutions : SIG, topographie, détection de réseau, webmapping et jumeau numérique territorial. Domaine : `geomark-sig.fr`.

## Structure

- **Pages** : `index.html`, `qui-sommes-nous.html`, `contact.html`, `mentions-legales.html`
- **Expertises** : `sig.html`, `topographie.html`, `detection-reseau.html`, `webmapping.html`, `jumeau-numerique.html`
- **Solutions par profil** : `mairie.html`, `intercommunalite.html`, `ecosysteme-etat.html`, `ong-associations.html`, `prive.html`
- `assets/` — `style.css`, `main.js` (menu, FR/EN, formulaire, cookies/Google Analytics), `images/`, `videos/`
- `CNAME` — domaine personnalisé GitHub Pages
- `robots.txt`, `sitemap.xml` — indexation (déjà configurés pour `https://geomark-sig.fr`)

## Hébergement et déploiement

Le site est hébergé sur **GitHub Pages** (réponse `Server: GitHub.com`, fichier `CNAME` présent, cohérent avec `mentions-legales.html`).

1. Pousser le contenu du dossier `geomark-website` sur la branche publiée du dépôt GitHub.
2. Vérifier dans *Settings → Pages* que le domaine `geomark-sig.fr` et *Enforce HTTPS* sont actifs.
3. Après publication, contrôler en ligne : accueil, page Contact (carte + formulaire), jumeau numérique, mentions légales.
4. Soumettre `https://geomark-sig.fr/sitemap.xml` dans Google Search Console (une nouvelle URL a été ajoutée : `jumeau-numerique.html`).

> Une alternative (Cloudflare Pages, Netlify) est possible : dans ce cas, mettre à jour la section « Hébergement » de `mentions-legales.html`.

## Formulaire de contact

Le formulaire (`contact.html`, logique dans `assets/main.js`) fonctionne en deux modes :

- **Mode actuel** : `FORM_ENDPOINT` pointe vers **FormSubmit** (`https://formsubmit.co/ajax/contact@geomark-sig.fr`), service gratuit sans compte qui transmet le message par e-mail à `contact@geomark-sig.fr`. **Activation obligatoire** : à la toute première soumission, FormSubmit envoie un e-mail d'activation à cette adresse ; cliquer sur le lien qu'il contient (vérifier aussi les courriers indésirables). Tant que ce n'est pas fait, les messages ne sont pas livrés.
- **Secours** : si l'envoi échoue, le site ouvre la messagerie du visiteur (mailto) et affiche l'adresse e-mail.
- **Autre service** : changer `FORM_ENDPOINT` (vide = mode mailto seul) et adapter `connect-src` et `form-action` dans la balise CSP de chaque page, puis nommer le sous-traitant dans `mentions-legales.html` (section 4).

Protections intégrées : champ piège anti-spam (honeypot), validation des champs, longueur limitée, case de consentement obligatoire.

## Sécurité

GitHub Pages ne permet pas de définir des en-têtes HTTP personnalisés. Chaque page embarque donc :

- une **Content-Security-Policy** (balise `<meta>`) limitant les sources de scripts, styles, images et connexions (Leaflet/unpkg, Google Fonts, Google Analytics, Plan IGN, prestataire de formulaire) ;
- une politique de **referrer** (`strict-origin-when-cross-origin`) ;
- l'**intégrité SRI** sur Leaflet (page Contact).

Limites connues : la CSP conserve `'unsafe-inline'` (scripts de traduction intégrés aux pages) et ne peut pas inclure `frame-ancestors`. Les polices Google Fonts sont chargées depuis Google sans consentement préalable : l'hébergement local des polices est recommandé à terme (mentions légales déjà mises à jour).

## Carte de la page Contact

Fond **Plan IGN** (Géoplateforme, `data.geopf.fr`), sans clé API ni blocage de référent (CARTO exige une clé, OpenStreetMap bloque les usages sans référent). Le fond OSM ne se charge pas depuis un fichier ouvert en local ; le Plan IGN fonctionne aussi en local.

## Mentions légales

Éditées dans `mentions-legales.html` (accessible depuis le pied de page). Mises à jour pour : formulaire de contact (finalité, base légale, conservation 3 ans, droits, CNIL), ressources tierces chargées (Google Fonts, unpkg, IGN), icônes animées libres de droits. À maintenir à jour en cas de changement de statut juridique, d'adresse, d'hébergeur ou de prestataire de formulaire.

## Versions

Les sauvegardes sont dans `../_versions/` (archives `.tar.gz`). Créer une nouvelle archive avant chaque publication importante.

## À compléter

- Crédit précis des icônes animées (`assets/videos/*.mp4`) : si la licence d'origine exige une attribution, l'ajouter dans la section 3 de `mentions-legales.html`.
- Photos du jumeau numérique : préciser les données sources / droits (Tampon, Mayotte) si nécessaire.
