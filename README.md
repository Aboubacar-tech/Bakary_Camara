# Portfolio Ingénieur Cloud AWS & DevOps — Bakary Camara

Portfolio interactif 3D, responsive et multilingue, conçu pour valoriser l'expertise d'**Ingénieur Cloud (AWS) & DevOps** de **Bakary Camara** (certifié AWS Solutions Architect Associate SAA-C03).

Le site est **100% statique** (sans backend obligatoire ni base de données distante), optimisé pour un hébergement haute performance sur **Amazon S3** couplé au CDN **Amazon CloudFront**.

---

## 1. Stack Technique & Bibliothèques

- **Framework Web** : React 19 (Hooks, Architecture composant modulaire)
- **Langage** : TypeScript 5.8+ (Typage strict, interfaces exhaustives)
- **Build Tool** : Vite 6+ (Bundling ESModules ultra-rapide)
- **Styling** : Tailwind CSS v4 (`@import "tailwindcss";`, mode sombre/clair, design zero-pill, contrastes WCAG AA+)
- **3D & Shaders** :
  - **Three.js** : Scène WebGL avec topologie de réseau cloud (nœuds de régions AWS, particules en dérive, sphère géodésique animée).
  - **Shaders GLSL personnalisés** : Déformations d'ondes au scroll, reflets de Fresnel, auras lumineuses dynamiques au survol de la souris (`ShaderDistortionCard`).
- **Animations** : **GSAP 3** + plugin **ScrollTrigger** (fondus et glissements au scroll, interpolation caméra fluide selon la section active).
- **Icônes** : Lucide React (composants SVG vectoriels légers).

---

## 2. Arborescence du Projet

```text
├── index.html                           # Entrée HTML principale (SEO, OpenGraph, polices Syne / Plus Jakarta Sans)
├── package.json                         # Dépendances et scripts de build (React, Three, GSAP, Tailwind)
├── tsconfig.json                        # Configuration TypeScript
├── vite.config.ts                       # Configuration de bundling Vite
├── README.md                            # Documentation complète du projet
├── src/
│   ├── main.tsx                         # Montage React dans le DOM (#root)
│   ├── App.tsx                          # Orchestrateur central, état thème, langue, animations ScrollTrigger
│   ├── index.css                        # Styles globaux, variables CSS de polices, scrollbar personnalisée
│   ├── types/
│   │   └── portfolio.ts                 # Définitions TypeScript (Project, Certification, Skill, Metric, etc.)
│   ├── data/
│   │   ├── portfolioData.ts             # Données de Bakary Camara (projets, certifications, compétences, métriques)
│   │   └── translations.ts              # Dictionnaire multilingue (Français, Anglais, Bamanankan)
│   └── components/
│       ├── common/
│       │   └── ProfileAvatar.tsx        # Avatar officiel avec support upload local (localStorage) et badge dispo
│       ├── layout/
│       │   ├── Navbar.tsx               # Barre de navigation fixe (3 zones, sélecteur de langue, bascule de thème)
│       │   └── Footer.tsx               # Pied de page avec liens professionnels et bouton retour haut
│       ├── hero/
│       │   └── HeroSection.tsx          # Section d'accueil (titre fort, métriques clés, carte topologie cloud)
│       ├── projects/
│       │   ├── ProjectsSection.tsx      # Grille des réalisations avec filtres par catégorie
│       │   ├── ProjectCard.tsx          # Carte projet avec effet de verre (backdrop-blur) et shaders
│       │   └── ProjectDetailModal.tsx   # Modal détaillée de projet (simulateur de panne d'AZ, code IaC)
│       ├── dashboard/
│       │   └── CloudWatchDashboard.tsx  # Simulateur télémétrie temps réel (CPU, ALB, Auto-scaling, cache CDN)
│       ├── skills/
│       │   └── SkillsSection.tsx        # Matrice de compétences filtrable avec moteur de recherche instantané
│       ├── certifications/
│       │   └── CertificationsSection.tsx# Présentation des accréditations officielles AWS et parcours académique
│       ├── testimonials/
│       │   └── EndorsementsSection.tsx  # Recommandations et avis de pairs/mentors vérifiés
│       ├── contact/
│       │   └── ContactSection.tsx       # Coordonnées directes, accès WhatsApp, formulaire avec validation
│       ├── notifications/
│       │   └── NotificationCenter.tsx   # Centre de notifications push locales (alertes système & monitoring)
│       ├── resume/
│       │   └── ResumeModal.tsx          # Visionneuse CV professionnelle imprimable (`window.print()`)
│       └── three/
│           ├── CloudCanvas.tsx          # Toile Three.js 3D plein écran avec chorégraphie caméra au scroll
│           └── ShaderDistortionCard.tsx # Conteneur interactif avec shader de distorsion au survol
```

---

## 3. Fonctionnalités Clés

### 🌐 Multilingue natif (3 langues)
- **Français (`fr`)** : Langue par défaut.
- **Anglais (`en`)** : Idéal pour les recruteurs internationaux et opportunités remote.
- **Bamanankan (`bm`)** : Valorisation de la culture et ancrage local au Mali.
- Sauvegarde instantanée du choix dans le `localStorage` du navigateur.

### 🌗 Mode Sombre & Mode Clair
- **Mode Sombre (par défaut)** : Palette ardoise profonde `#090d16`, accents ambrés AWS (`#f59e0b`) et cyan cloud (`#38bdf8`), contrastes élevés certifiés conformes WCAG AA+.
- **Mode Clair** : Fond ardoise clair doux `#f8fafc` évitant l'éblouissement, typographie sombre contrastée `#0f172a`.
- Basculement instantané via le raccourci clavier `T` ou le bouton soleil/lune dans la barre de navigation.

### 📊 Dashboard CloudWatch en Direct (Simulation Interactive)
- Flux continu de métriques d'infrastructure (CPU cluster EC2, latence ALB, décalage de réplication RDS MySQL).
- **Simulation de pic de charge (Surge Traffic)** : déclenche un pic à 84% de CPU, simule l'activation de l'Auto Scaling (scale-out à 4 instances) et émet une alerte push.
- **Purge de cache CloudFront** : animation de synchronisation globale des points de présence edge AWS.
- Exportation des métriques au format JSON en un clic.

### 👤 Gestion du Portrait / Avatar
- Avatar vectoriel haute fidélité intégré reprenant les traits réels de Bakary (costume bleu marine, cravate, chemise blanche).
- Module de téléversement interactif (`ProfileAvatar`) permettant à Bakary d'importer directement son fichier photo `IMG-20260518-WA0004.jpg` ; la photo est stockée localement dans le navigateur pour une expérience sur-mesure.

### 📄 CV Numérique Imprimable & Exportable
- Modal CV formatée aux normes de recrutement informatique.
- Bouton **Imprimer / Sauvegarder en PDF** configuré avec des règles CSS `@media print` masquant l'interface pour une sortie papier/PDF impeccable.
- Bouton **Copier le texte brut** pour copier l'ensemble du profil dans le presse-papier en 1 seconde.

---

## 4. Déploiement Statique sur Amazon S3 + CloudFront

Ce projet ne nécessite **aucun serveur Node.js en production**. Il se compile en un ensemble de fichiers statiques HTML, CSS et JavaScript dans le dossier `dist/`.

### Étape 1 : Construction du bundle statique

```bash
# Installation des dépendances (si ce n'est pas déjà fait)
npm install

# Compilation pour la production
npm run build
```
Le résultat prêt à déployer se trouve dans le dossier `./dist`.

---

### Étape 2 : Création du Bucket S3

1. Rendez-vous sur la console **AWS S3** (`eu-west-3` Paris ou votre région cible).
2. Créez un bucket (ex: `bakary-camara-portfolio`).
3. Décochez **"Block all public access"** (si hébergement S3 direct) ou conservez-le activé si vous passez par une distribution CloudFront avec OAC (Origin Access Control - recommandé pour la sécurité).
4. Activez l'option **Static website hosting** :
   - Index document : `index.html`
   - Error document : `index.html` (essentiel pour les SPA)

#### Politique de bucket (Bucket Policy) pour accès public direct :
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::bakary-camara-portfolio/*"
    }
  ]
}
```

---

### Étape 3 : Synchronisation des fichiers via AWS CLI

Si vous avez configuré l'AWS CLI sur votre machine :

```bash
# Synchroniser le dossier dist vers votre bucket S3
aws s3 sync dist/ s3://bakary-camara-portfolio --delete
```

---

### Étape 4 : Distribution Amazon CloudFront + Certificat SSL Gratuit (HTTPS)

1. Ouvrez la console **CloudFront** et créez une distribution :
   - **Origin Domain** : Choisissez le endpoint S3 website du bucket (ou le bucket avec OAC).
   - **Viewer Protocol Policy** : `Redirect HTTP to HTTPS`.
   - **Allowed HTTP Methods** : `GET, HEAD, OPTIONS`.
2. **Gestion des routes SPA (Single Page Application)** :
   - Allez dans l'onglet **Error Pages**.
   - Créez une Custom Error Response pour les codes `403` et `404` :
     - Response code : `200`
     - Response page path : `/index.html`
3. **Nom de domaine personnalisé** (ex: `portfolio.bakarycamara.com`) :
   - Demandez un certificat public gratuit via **AWS Certificate Manager (ACM)** dans la région `us-east-1` (requis pour CloudFront).
   - Liez le certificat SSL à la distribution CloudFront.
   - Ajoutez l'enregistrement DNS `CNAME` ou `Alias A` dans Amazon Route 53 ou votre bureau d'enregistrement.
4. **Invalidation du cache après une mise à jour** :
   ```bash
   aws cloudfront create-invalidation --distribution-id VOTRE_DISTRIBUTION_ID --paths "/*"
   ```

---

## 5. Commandes de Développement Local

```bash
# Lancer le serveur de développement local (Port 3000)
npm run dev

# Vérifier la validité des types TypeScript
npm run lint

# Tester la compilation de production
npm run build

# Prévisualiser le build localement
npm run preview
```

---

## 6. Accessibilité & Raccourcis Clavier

- Touche **`T`** : Basculer entre le mode Sombre et le mode Clair.
- Touche **`L`** : Alterner cycliquement entre les langues (Français ➔ Anglais ➔ Bamanankan).
- Touche **`R`** : Ouvrir la visionneuse de CV professionnelle.
- Touche **`Échap`** : Fermer toute fenêtre modale ouverte.
