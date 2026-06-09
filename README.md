# Forno Vivo — Site vitrine premium

Site vitrine haut de gamme pour une pizzeria napolitaine artisanale.
Animation phare : on **tire une part de pizza** au drag (souris ou doigt), le
fromage s'étire pour de vrai (séquence de photos réelles scrubbée au rythme du
geste), et passé un seuil un écran de succès mène à la carte.

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 5** (dev server & build)
- **React Router 6** (5 pages, transitions animées)
- **Framer Motion 11** (drag, scrub de frames, transitions de page)
- **Tailwind CSS 3** (design system, glassmorphism, halos lumineux)
- **sharp** (outil de build pour optimiser les images — non requis au runtime)

## Pages

| Route          | Page        | Contenu                                            |
| -------------- | ----------- | -------------------------------------------------- |
| `/`            | Accueil     | Hero + animation « tirer la part »                 |
| `/menu`        | Carte       | 10 pizzas, filtres Classiques / Spécialités / Végé |
| `/a-propos`    | À propos    | Histoire, timeline, valeurs                        |
| `/contact`     | Contact     | Formulaire + horaires + coordonnées                |
| `/reservation` | Réservation | Date / heure / personnes, confirmation animée      |

## Démarrage

```bash
npm install      # installe les dépendances
npm run dev      # lance le serveur de dev (http://localhost:5173)
```

## Scripts

| Commande                  | Effet                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| `npm run dev`             | Serveur de développement Vite avec HMR                            |
| `npm run build`           | Vérifie les types (tsc) puis génère le build de production `dist/` |
| `npm run preview`         | Sert le build de production en local                              |
| `npm run optimize:images` | Régénère les frames WebP depuis `pizza/*.png` (voir ci-dessous)   |

## Images de l'animation

Les 40 frames de la vidéo sont fournies dans `pizza/` (PNG, ~38 Mo). Elles sont
optimisées **une seule fois** en WebP (~2,3 Mo) dans `src/assets/pizza/` par le
script `scripts/optimize-images.mjs`. Ces WebP sont versionnés : **le site ne
dépend pas de `sharp` au runtime**.

Pour remplacer la pizza par de nouvelles frames :

1. Remplacez les PNG dans `pizza/` (nommage trié, ex. `frame-001.png`…).
2. Lancez `npm run optimize:images`.
3. Les `src/assets/pizza/frame-*.webp` sont régénérés automatiquement.

## Personnalisation

- **Identité, coordonnées, horaires** : `src/lib/site.ts`
- **Carte des pizzas** : `src/data/menu.ts`
- **Couleurs, polices, animations** : `tailwind.config.js`

## Déploiement

Le projet est une SPA prête pour **Vercel** et **Netlify** (configs incluses,
avec redirection SPA vers `index.html`).

### Vercel

```bash
npm i -g vercel
vercel            # déploiement de prévisualisation
vercel --prod     # déploiement en production
```

`vercel.json` définit déjà `buildCommand`, `outputDirectory` et les rewrites.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy            # prévisualisation
netlify deploy --prod     # production
```

`netlify.toml` définit la commande de build, le dossier publié et les redirects.

Sur les deux plateformes, un déploiement par **import du dépôt Git** fonctionne
sans configuration supplémentaire (les fichiers de config sont détectés).

## Accessibilité & performance

- Respect de `prefers-reduced-motion` (fallback statique pour l'animation).
- Frames préchargées avec barre de progression.
- Drag tactile sur mobile (`touch-action: none`).
- Images optimisées en WebP.
