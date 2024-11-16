# Projet Next.js avec Authentication

Ce projet utilise Next.js 14, NextAuth.js v5, Prisma, et PostgreSQL pour l'authentification.

## Prérequis

- Node.js 18.17 ou plus récent
- PostgreSQL installé et en cours d'exécution
- npm ou pnpm

## Installation

1. Cloner le repository
bash
git clone [URL_DU_REPO]
cd [NOM_DU_PROJET]

2. Installer les dépendances

```bash
npm install
ou
pnpm install
```

3. Configurer les variables d'environnement
Créer un fichier `.env` à la racine du projet :

env
Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre_secret_très_long_et_aléatoire"
Providers
GITHUB_ID="votre_github_id"
GITHUB_SECRET="votre_github_secret"
GOOGLE_CLIENT_ID="votre_google_client_id"
GOOGLE_CLIENT_SECRET="votre_google_client_secret"


4. Initialiser et configurer la base de données

```bash
Installer Prisma CLI globalement si nécessaire
npm install -g prisma
Initialiser Prisma avec PostgreSQL
npx prisma generate
Appliquer les migrations
npx prisma migrate dev
Vérifier la base de données (optionnel)
npx prisma studio
```

5. Lancer le serveur de développement

```bash
npm run dev
ou
pnpm dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## Configuration des Providers OAuth

### GitHub
1. Aller sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Créer une nouvelle OAuth App
3. Homepage URL: http://localhost:3000
4. Callback URL: http://localhost:3000/api/auth/callback/github

### Google
1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet
3. Activer OAuth 2.0
4. Configurer l'écran de consentement
5. Ajouter les URIs de redirection: http://localhost:3000/api/auth/callback/google

## Structure du Projet
src/
├── app/
│ ├── api/
│ │ ├── auth/
│ │ └── user/
│ └── auth/
├── components/
├── lib/
└── utils/


## Fonctionnalités

- Authentification avec email/mot de passe
- Authentification OAuth (GitHub, Google)
- Validation des formulaires avec Zod
- Interface utilisateur avec Tailwind CSS
- Base de données PostgreSQL avec Prisma

## Scripts Disponibles

```bash
npm run dev # Démarre le serveur de développement
npm run build # Construit l'application pour la production
npm run start # Démarre le serveur de production
npm run lint # Vérifie le code avec ESLint
```


## Déploiement

Pour déployer sur Vercel :

1. Créer un compte sur [Vercel](https://vercel.com)
2. Connecter votre repository GitHub
3. Configurer les variables d'environnement
4. Déployer

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

Emmanuel Makafui Agbogan, Novembre 2024