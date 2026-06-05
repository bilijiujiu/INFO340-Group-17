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
- Firebase Hosting + Realtime Database
- Chart.js + react-chartjs-2

## Local development

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # produce a production build in dist/
npm run preview  # serve the production build locally
```

Create a local `.env` file from the example before testing Firebase features:

```bash
cp .env.example .env
```

Then fill in the Firebase web app config values from Firebase Console. The real
`.env` file is ignored by Git and should not be committed.

## Features

- Search and filter job listings by location, salary, experience, sponsorship,
  keyword, and sort order.
- Add applications to a Kanban board, update their status, and persist changes
  to Firebase Realtime Database.
- Save job-specific notes, status, and follow-up tasks from each job detail page.
- View analytics charts for application status and location patterns.

## Deploying to Firebase

```bash
npm run build
npx firebase deploy --only hosting
```

Requires a one-time `npx firebase login` per machine.

## Image credits

Decorative images in `public/img/` are free to use under the
[Unsplash License](https://unsplash.com/license):

- `hero-job-search.jpg` — landing hero
- `team-collaboration.jpg` — landing about section and job detail pages
- `career-growth.jpg` — job detail pages
- `analytics-preview.jpg` — job detail pages

Attribution also appears on the home page and below images on job detail pages.
