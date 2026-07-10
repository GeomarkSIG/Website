# Geomark SIG Solutions — site vitrine

Site statique (HTML/CSS/JS, sans backend) de Geomark SIG Solutions : SIG, topographie, détection de réseau et webmapping.

## Structure

- `index.html`, `qui-sommes-nous.html`, `sig.html`, `topographie.html`, `detection-reseau.html`, `webmapping.html`, `mairie.html`, `intercommunalite.html`, `ecosysteme-etat.html`, `ong-associations.html`, `prive.html`, `contact.html`, `mentions-legales.html` — pages du site
- `assets/` — styles (`style.css`), scripts (`main.js`), images et vidéos
- `robots.txt`, `sitemap.xml` — indexation SEO (⚠️ mettre à jour l'URL du domaine une fois celui-ci acheté)

## Déploiement

1. Créer un compte [Cloudflare Pages](https://pages.cloudflare.com/) (gratuit).
2. **Workers & Pages → Créer une application → Pages → Connecter à Git** (ce dépôt GitHub), ou upload direct du dossier.
3. Une fois le domaine `.fr` acheté (OVH, Gandi…), l'ajouter dans **Custom domains** sur Cloudflare Pages et pointer les DNS.
4. Mettre à jour `robots.txt` et `sitemap.xml` avec le nom de domaine définitif, puis soumettre le sitemap dans [Google Search Console](https://search.google.com/search-console).

## Mentions légales

Éditées dans `mentions-legales.html`, accessible depuis le pied de page de chaque page. À maintenir à jour en cas de changement de statut juridique, d'adresse ou d'hébergeur.
