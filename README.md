# JobTrack

A React app that helps college students manage saved jobs, applications, notes,
deadlines, and follow-up tasks in one place — built for INFO 340 at the
University of Washington.

## Links

- **Live site**: https://job-tracking-15d99.web.app
- **Repo**: https://github.com/bilijiujiu/INFO340-Group-17

## Team

INFO 340 Group 17 — Peitong Qi, Siyuan (Shea) Li.

## Stack

- React 19 + React Router
- Vite (build + dev server)
- Firebase Hosting

## Local development

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # produce a production build in dist/
npm run preview  # serve the production build locally
```

## Deploying to Firebase

```bash
npm run build
npx firebase deploy --only hosting
```

Requires a one-time `npx firebase login` per machine.
