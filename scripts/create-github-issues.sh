#!/usr/bin/env bash
# Creates remaining assignment issues on GitHub.
# Run once after: gh auth login

set -euo pipefail

REPO="bilijiujiu/INFO340-Group-17"

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: gh CLI not found. Install from https://cli.github.com/ or run: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged in. Run first: gh auth login"
  exit 1
fi

echo "Creating issues on $REPO ..."

gh issue create --repo "$REPO" \
  --title "[Feature] Add interactive job application form with React state" \
  --body "$(cat <<'EOF'
## Summary
Implement at least one working interactive feature that satisfies the **state + event + rerender** requirement (Assignment Step 3).

## Requirements
- [ ] Add a controlled form on the Applications page (triggered by "+ Add Job" button)
- [ ] Form fields: company, role, status (Saved / Applied / Interview / Offer / Rejected)
- [ ] Store submitted applications in React `useState`
- [ ] On submit, new application appears in the Kanban board without page reload
- [ ] Form validates required fields before submit

## Suggested approach
- Use controlled inputs (`value` + `onChange`)
- Append new application to state array on form submit
- Re-render Kanban columns using updated state

## Acceptance criteria
- User can add a new job application through the UI
- New card appears immediately after submit
- Demonstrates state → event → rerender flow

## Related files
- `src/components/ApplicationsPage.jsx`
EOF
)"

gh issue create --repo "$REPO" \
  --title "[Refactor] Use props and .map() for application cards" \
  --body "$(cat <<'EOF'
## Summary
Do not hard-code every application card. Use a data array + `.map()` + props as required by the assignment (Step 4).

## Requirements
- [ ] Define applications as a data array, e.g.:
  ```js
  const applications = [
    { company: "Google", role: "Intern", status: "Applied" },
    { company: "Amazon", role: "SDE Intern", status: "Interview" }
  ];
  ```
- [ ] Create a reusable component (e.g. `ApplicationCard.jsx`) that receives data via **props**
- [ ] Render cards/tables using `.map()` instead of manually writing each row/card
- [ ] Apply to Applications page Kanban board
- [ ] Apply to Dashboard "Recent Applications" table

## Optional
- [ ] Filter or sort by status, company, or role

## Acceptance criteria
- No manually duplicated card/row JSX for each company
- Components receive data through props
- Lists rendered dynamically with `.map()`

## Related files
- `src/components/ApplicationsPage.jsx`
- `src/components/DashboardPage.jsx`
- `src/components/ApplicationCard.jsx` (new)
EOF
)"

gh issue create --repo "$REPO" \
  --title "[Deploy] Set up Firebase hosting and deploy live site" \
  --body "$(cat <<'EOF'
## Summary
Deploy the React app to Firebase once core features are working (Assignment Step 5).

## Requirements
- [ ] Create Firebase project for JobTrack
- [ ] Run `firebase init` (Hosting, public directory = `dist`)
- [ ] Configure SPA rewrite rules for React Router (all routes → index.html)
- [ ] Run `npm run build` successfully
- [ ] Run `firebase deploy`
- [ ] Update README with GitHub repo link and live Firebase website link

## Commands
```bash
npm run build
firebase deploy
```

## Acceptance criteria
- Live site loads at Firebase URL
- All routes work (`/`, `/dashboard`, `/job-search`, `/applications`, `/analytics`, `/onboarding`)
- README includes both submission links

## Related files
- `firebase.json` (new)
- `.firebaserc` (new)
- `README.md`
EOF
)"

gh issue create --repo "$REPO" \
  --title "[Feature] Convert JobDetailPage and link from Job Search" \
  --body "$(cat <<'EOF'
## Summary
Convert `Job_detail.html` into a React component and wire up navigation from Job Search.

## Requirements
- [ ] Create `src/components/JobDetailPage.jsx` from `Job_detail.html`
- [ ] Add route `/job-detail/:id` (or similar) in `App.jsx`
- [ ] Connect "View Details" buttons on Job Search page to the new route
- [ ] Keep existing Navbar layout consistent with other pages

## Acceptance criteria
- Clicking "View Details" on a job card navigates to the detail page
- Detail page shows job info and workspace (notes, status, tasks)

## Related files
- `Job_detail.html` (reference)
- `src/components/JobSearchPage.jsx`
- `src/App.jsx`
EOF
)"

echo ""
echo "Done! View issues at: https://github.com/$REPO/issues"
