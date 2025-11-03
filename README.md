# FlightApp

FlightApp is a small Next.js + React application for exploring flights, tracking selected flights in a watchlist, and signing in (Firebase). It provides a simple UI to search flights, view flight details, and manage a personal watchlist.

## Project overview

- Built with Next.js (App Router), React 18, TypeScript, Tailwind CSS.
- Uses Firebase for authentication and Firestore for storing per-user watchlists.
- Main UI pieces:
  - Flight search and filtering
  - Flight results and details modal
  - Watchlist (per-user)
  - Sign-in / Sign-up / Anonymous sign-in
  - Small local hooks and UI components (toast, cards, inputs, etc.)

## Features implemented

- Flight search (by flight number, origin, destination)
- Paginated grid of flight cards (responsive)
- Flight details modal
- Per-user watchlist backed by Firestore (adds/removes flight IDs)
- Sign in / Sign up using Firebase Authentication
- Anonymous sign-in option
- Basic toast system for in-app notifications
- Reusable UI primitives (buttons, cards, dialogs) and small utilities

## Quick start / Setup

Prerequisites:

- Node.js 18+ (Node 20 recommended)
- npm (or your preferred package manager)

Steps:

1. Clone the repository and change into the project folder:

   ```bash
   cd "C:\Users\ADMIN\Desktop\Flew\FlightApp"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   By default the dev server runs on port 9002 (see `package.json` script: `next dev --turbopack -p 9002`). Open http://localhost:9002

4. Build for production:

   ```bash
   npm run build
   npm start
   ```

## Environment / API (Firebase) setup

This project expects Firebase to be available. The repository includes `src/firebase/config.ts` which contains a `firebaseConfig` object used as a fallback during development. The app uses an initialization helper that first tries to auto-initialize (for App Hosting) and falls back to this config in development.

- If you have your own Firebase project, replace the values in `src/firebase/config.ts` with your project's credentials.
- Required Firebase services used by the app:
  - Authentication (email/password and anonymous)
  - Firestore (a `watchlists` collection where documents are keyed by user UID and contain a `flights: string[]` array)

Firestore document shape for a user's watchlist (example):

```json
{
  "flights": ["flight-id-1", "flight-id-2"]
}
```

If you don't want to use a real Firebase project in development, the included `firebaseConfig` can work for dev if those credentials are valid. Otherwise, stub/mock Firebase or set up a minimal Firebase project.

## Testing / Validation

- Type-check the project:

  ```bash
  npm run typecheck
  ```

- Lint (if configured):

  ```bash
  npm run lint
  ```

- Run the dev server and exercise the app in the browser. Watch browser console for runtime warnings (duplicate keys, infinite renders, permission errors from Firestore, etc.).

Unit/e2e tests: None included by default. If you add tests, include instructions here.

## How sign-in & watchlist work (implementation notes)

- Authentication is managed via Firebase Auth. The UI components that interact with authentication use helper hooks exported from `src/firebase/provider.tsx` and `src/firebase/index.ts`.
- The `WatchlistContext` uses the authenticated user's UID to read/write a Firestore document under the `watchlists` collection. When a user is not signed in, the app currently falls back to an empty watchlist (you can extend this to use localStorage if desired).

## Assumptions and decisions

- The current data model assumes flight objects include a stable `id` string and a `departure.scheduled` timestamp string. Some components were updated to use a composite key (`id + departure.scheduled`) when rendering lists to avoid React duplicate key warnings when data contains multiple items that share the same `id`.
- The README avoids shipping secrets. `src/firebase/config.ts` in this repo contains values used by the author; when deploying or sharing, swap these with your own project or environment variables.
- The app uses Firebase App Hosting auto-initialization where available; during local development the code falls back to `firebaseConfig`.
- For quick local development you can use the provided `firebaseConfig` (if valid) or create a new Firebase project and update `src/firebase/config.ts`.

## Next steps / recommended improvements

- Add tests (unit + integration) and CI.
- Improve auth fallback for purely local development (e.g., a local JSON-based fake auth for offline/demo mode).
- Ensure flight objects have globally unique IDs server-side to eliminate the need for composite keys.
- Add better error handling and user-facing messages for Firestore permission errors (the repo already includes an error emitter and handler utilities).

---

If you want, I can also add a simple local JSON auth fallback for development (store simple username/password pairs and use a small provider to emulate sign-in) — say the word and I will implement it and wire the watchlist to work for that local user as well.
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
