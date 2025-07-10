# 🧭 TicketFlow — Frontend (Next.js 15)

Ce projet contient le frontend de l'application TicketFlow, développé avec Next.js 15 (App Router), TypeScript et TailwindCSS.

## 🚀 Stack
- React 18
- Next.js 15 (App Router)
- TailwindCSS
- TypeScript
- Zustand (state global)
- Axios (requêtes HTTP)

## 📦 Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-utilisateur/ticketflow-frontend.git
cd ticketflow-frontend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Variables d’environnement
Créer un fichier `.env.local` à la racine :
```env
NEXT_PUBLIC_API_URL=https://tickets-app-XXXX.onrender.com/api
```

### 4. Lancer l’application localement
```bash
npm run dev
```

## ✨ Fonctionnalités
- Authentification via JWT
- Gestion du token refresh automatique (Axios interceptor)
- Dashboard responsive avec sidebar
- Affichage dynamique des tickets (tri, recherche, responsive)
- Affichage des messages liés à chaque ticket
- Formulaires gérés avec React Hook Form

## 🛠️ Structure du projet
```
src/
├── app/               # App Router (routing Next.js 15)
│   ├── login/
│   ├── dashboard/
├── components/        # Composants UI réutilisables
├── lib/               # Fonctions d’API Axios
├── store/             # Zustand (auth, global state)
├── types/             # Types TypeScript
└── utils/             # Fonctions utilitaires
```

## 📤 Déploiement (Vercel)
- Déployé via Vercel : https://tickets-app-ui.vercel.app
- Variable d’environnement `NEXT_PUBLIC_API_URL` configurée dans le dashboard

## 🌐 Lien avec backend
- Toutes les requêtes passent par Axios avec `Authorization: Bearer <token>`
- Le backend est hébergé sur Render (voir README backend)

## 🧪 Améliorations potentielles (V2)
- Tests front (Jest ou Playwright)
- Amélioration UI/UX (feedback utilisateur, transitions)
- Thème sombre
- Filtres avancés sur les tickets
- Notifications toast
