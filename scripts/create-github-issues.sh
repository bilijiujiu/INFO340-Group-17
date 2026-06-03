#!/usr/bin/env bash
# Creates final-project rubric gap issues on GitHub.
# Run once after: gh auth login -h github.com

set -euo pipefail

REPO="bilijiujiu/INFO340-Group-17"

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: gh CLI not found. Install from https://cli.github.com/ or run: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged in. Run first: gh auth login -h github.com"
  exit 1
fi

echo "Creating final-project issues on $REPO ..."

gh issue create --repo "$REPO" \
  --title "[Final Rubric] Add Firebase Realtime Database persistence" \
  --body "$(cat <<'EOF'
## Why
The final project requires Firebase Realtime Database integration. Hosting config exists, but the app does not currently read from or write to Firebase data.

## Tasks
- [ ] Install the firebase client SDK.
- [ ] Add a Firebase config module, such as src/firebase.js.
- [ ] Use Realtime Database, not Firestore.
- [ ] Read meaningful app data with useEffect and a database listener.
- [ ] Write user-created or user-edited data to the database.
- [ ] Show in-page loading feedback during async database reads/writes.
- [ ] Catch Firebase errors and render user-visible error messages.
- [ ] Handle the empty database state gracefully.

## Acceptance Criteria
- package.json includes firebase.
- The app reads at least one meaningful dataset from Realtime Database.
- The app writes at least one meaningful user interaction to Realtime Database.
- No Firebase errors are silently swallowed or shown with alert().
- npm run lint and npm run build pass.
EOF
)"

gh issue create --repo "$REPO" \
  --title "[Final Rubric] Make Applications page a complete interactive Kanban feature" \
  --body "$(cat <<'EOF'
## Why
The Applications page currently displays static columns, and the + Add Job / Add card buttons do not change app state. The final rubric requires complete, purposeful, state-based interactive features.

## Tasks
- [ ] Store applications in React state loaded from Firebase.
- [ ] Add a controlled form for creating an application.
- [ ] Include fields such as company, role, location, deadline, and status.
- [ ] Validate required fields in-page.
- [ ] Render new applications immediately after submit.
- [ ] Persist added applications to Firebase.
- [ ] Allow users to update an application's status between Saved, Applied, Interview, Offer, and Rejected.
- [ ] Make column counts derive from current application data instead of hard-coded numbers.

## Acceptance Criteria
- + Add Job opens or reveals a working form.
- Submitting the form updates the Kanban board without a page reload.
- Status changes update the displayed board and persist to Firebase.
- Empty states and errors render in the page.
- npm run lint and npm run build pass.
EOF
)"

gh issue create --repo "$REPO" \
  --title "[Final Rubric] Make Job Detail workspace stateful and persistent" \
  --body "$(cat <<'EOF'
## Why
The Job Detail page has status buttons, notes, and tasks, but they are mostly static. This is a strong opportunity for a second complete interactive feature tied to the Applications data.

## Tasks
- [ ] Store the selected status in React state.
- [ ] Make status pills update the current job/application status.
- [ ] Save notes as controlled form input.
- [ ] Persist notes to Firebase by job/application id.
- [ ] Store tasks in React state instead of using defaultChecked.
- [ ] Allow task completion toggles to update state and persist.
- [ ] Add a controlled form for creating a new task.
- [ ] Render save/loading/error feedback in-page.

## Acceptance Criteria
- Clicking a status pill visibly updates the active status.
- Saving a note persists it after refresh.
- Checking a task updates state and persists it after refresh.
- Adding a task changes the visible task list without reload.
- The route parameter is used to load the correct workspace data.
EOF
)"

gh issue create --repo "$REPO" \
  --title "[Final Rubric] Add a third-party React chart library to Analytics" \
  --body "$(cat <<'EOF'
## Why
The final rubric requires at least one third-party renderable React component/library beyond React Router and Firebase UI. Analytics is the most natural place to use one.

## Suggested Library
Use Recharts for status distribution, application volume, or location charts.

## Tasks
- [ ] Install recharts.
- [ ] Import chart components from recharts.
- [ ] Replace the CSS-only donut or bar visuals with real React chart components.
- [ ] Base chart data on current application/Firebase data when possible.
- [ ] Keep chart text, labels, and colors accessible.
- [ ] Add a useful empty state if there is no application data.

## Acceptance Criteria
- package.json includes a third-party React component library such as recharts.
- Analytics page renders imported library components in the DOM.
- Charts support the app's job tracking functionality, not just decoration.
- npm run lint and npm run build pass.
EOF
)"

gh issue create --repo "$REPO" \
  --title "[Final Rubric] Move external CSS and libraries into the Vite import flow" \
  --body "$(cat <<'EOF'
## Why
The final rubric says CSS files and libraries should be loaded through Vite/JavaScript imports. The current index.html links Google Fonts and Bootstrap directly.

## Tasks
- [ ] Remove Bootstrap CDN link from index.html.
- [ ] Install Bootstrap with npm if Bootstrap classes are still needed.
- [ ] Import Bootstrap CSS from src/main.jsx or src/index.css.
- [ ] Move Google Font loading into CSS with @import, or use system fonts consistently.
- [ ] Confirm index.html only contains required meta, favicon, title, root div, and Vite script.
- [ ] Review src/index.css imports and simplify stylesheet organization if needed.

## Acceptance Criteria
- No Bootstrap CDN stylesheet is linked in index.html.
- App styles still render correctly.
- Vite build includes the required CSS.
- npm run lint and npm run build pass.
EOF
)"

gh issue create --repo "$REPO" \
  --title "[Final Rubric] Clean repo structure and run final QA checklist" \
  --body "$(cat <<'EOF'
## Why
The rubric expects a cleaned-up Vite React project with no extraneous generated or draft files. The repo currently contains several old static HTML/CSS files from earlier drafts.

## Tasks
- [ ] Decide whether old static files should be deleted or moved into an archive/proposal folder.
- [ ] Remove root-level draft HTML files that are no longer used by the React app.
- [ ] Remove duplicate CSS files if they are no longer needed.
- [ ] Keep only one production HTML entry point: index.html.
- [ ] Update README with project description, features, repo link, and Firebase Hosting link.
- [ ] Verify all buttons and links do something meaningful.
- [ ] Test incorrect URLs and confirm the app does not break.
- [ ] Run browser QA on desktop and mobile widths.
- [ ] Run npm run lint.
- [ ] Run npm run build.
- [ ] Deploy to Firebase Hosting.
- [ ] Tag final commit with final and push tags.

## Acceptance Criteria
- Repo looks like a clean Vite React project.
- No dead buttons remain.
- README has final submission links.
- Firebase-hosted app works across routes.
- The final tag points at the submitted commit on main.
EOF
)"

echo ""
echo "Done! View issues at: https://github.com/$REPO/issues"
