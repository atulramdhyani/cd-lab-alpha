# Writer's Room — Changelog

## v9.1 — Feb 27, 2026
### Bug fixes
- **Fixed: Feedback modal losing focus on each keystroke.** `FeedbackBtn` was defined as a component inside the render body, causing React to unmount/remount it on every state change. Replaced with inline JSX variable (`feedbackUI`) that stays stable across re-renders.
- **Fixed: Feedback textarea now auto-focuses** when the modal opens.

---

## v9 — Feb 27, 2026
### Major changes
- **Rebrand from "Wordsmith Lab" to "Writer's Room."** All UI text, exports, alpha code (`writers-room`), page title, and favicon (✏️) updated.
- **228 unique scenario templates** — 12 per screen type (up from 4–5). Combined with 45 companies × 20 niches = 10,000+ meaningful brief combinations.
- **Restructured brief layout.** Replaced scattered sections with:
  - Product header with avatar, name, description, niche + screen chips
  - 3-column cards: User Persona | Tone of Voice | Components to Write
  - 3-section problem statement: 📍 The Scenario → 🎯 What Your Copy Needs to Do → 🖥 What's on Screen
- **Collapsible brief.** Click the company header to collapse/expand. Auto-reopens on new challenge or history load.
- **Feedback button uses `mailto:` link.** User types feedback, clicks Send, email client opens pre-filled. No clipboard workaround.

### QoL improvements (user journey audit)
- Gate: Enter on email field moves focus to alpha code field.
- Gate: Logout now clears both email and alpha code from localStorage.
- Browse: First-time users see "how it works" hint (brief + live mockup + rubric).
- Browse: Progress stats hidden until 2+ completions (no depressing zeros).
- Browse: History shows 5 items + "Show all X challenges" expander (was hard-capped at 8).
- Browse: History items have hover state (accent border).
- Custom mode: Screen type now shows its goal description when selected.
- Challenge: ⌘+Enter keyboard shortcut hint visible next to Mark Complete button.
- Challenge: "Generate another challenge" is now a proper secondary button (was ghost).
- Challenge: Mockup shows "Updates live as you type ↑" hint until user starts writing.
- Challenge: Topbar counter tooltip includes "Resets at midnight."
- Responsive: 3-column brief grid falls back to 2 columns on tablets (769–1024px).

### Exports
- **Screenshot export** opens a styled portfolio card in a new tab (light/dark aware).
- Markdown export updated to match new brief structure (Scenario + Goal + On Screen).

---

## v8 — Feb 27, 2026
### Features
- **Alpha passphrase gate.** Two-field login: email + alpha code. Code: `writers-room` (one constant to rotate). Invalid codes show error. Auto-login via localStorage.
- **Screenshot export (portfolio card).** "📸 Export as portfolio card" opens a styled, print-ready page in a new tab with company header, chips, problem statement, and user's copy.
- **Floating feedback button.** "💬 Feedback" pill on every screen. Modal with textarea, copies structured feedback to clipboard.
- **Progress tracking.** Browse page shows 4-stat bar: challenges completed, screen types / tones / niches explored.
- **Email validation regex.** Requires `user@domain.xx` format (2+ char TLD). Rejects `demo@`, `user@com`, etc.

---

## v7 — Feb 27, 2026
### Features
- **Dark mode.** Full theme system (LIGHT/DARK palettes). Toggle button on every screen. Persists to localStorage. 240+ style references read from dynamic theme object.
- **Mobile responsive layout.** CSS breakpoint at 768px. Form/mockup grid stacks to single column. Mockup toggle button: "👁 Show preview / ✏️ Back to writing."
- **Unsaved work warning.** `confirm()` dialog when navigating away mid-challenge with content in fields.
- **Clear all fields.** "Clear all" link next to "Required copy" header with confirmation.
- **Loading transition.** 400ms spinner ("Building your brief…") between browse and challenge.
- **Counter tooltip.** "3/5 today" tag shows "3 of 5 challenges used today. Resets at midnight." on hover.
- **Custom mode descriptions.** Selected tone/persona shows description below button grid.
- **Loading mockup fix.** All 3 sequential loading messages shown with staggered opacity + progress bars.

---

## v6 — Feb 25, 2026
### Features
- Removed example responses (generic examples don't match specific briefs).
- Restructured brief: goal as hero card + 2×2 grid (persona / tone / audience / niche).
- Field progress indicator with minimum length validation (30% of max char limit).
- Keyboard shortcut: ⌘+Enter to mark complete.
- "New Challenge" button demoted to post-completion area.
- History entries show preview of first written component.

---

## v5 — Feb 25, 2026
### Features
- Mockup scaffolding for all 19 screen types with contextual backgrounds (app chrome, dimmed backgrounds, phone/desktop frames).
- Writing objective clarity: dedicated `goal` field per screen type.
- Live mockup preview updates as user types.

---

## v4 — Feb 24, 2026
### Features
- Case study export (Markdown to clipboard).
- Self-review rubric per screen type (3–4 yes/no checklist questions).
- 5/day challenge limit with email-based tracking.
- Quick Start hero button for random challenge generation.
- Custom mode: pick niche, tone, screen type, persona individually.

---

## v3 — Feb 24, 2026
### Features
- Alpha email gate (simple email input, 5/day limit).
- History: completed challenges saved to localStorage (up to 50).
- Added extra components system: toast, banner, helper text, link, inline error/success.

---

## v2 — Feb 23, 2026
### Features
- 60+ fictional company profiles with rich vocab (replacing generic niche labels).
- Context template system: each screen type has templates that consume company vocab to produce specific scenarios.
- Company-aware mockups.

---

## v1 — Feb 23, 2026
### Features
- Initial prototype: mix-and-match generator with 20 niches, 16 tones, 19 screen types, 16 personas.
- Basic form with character-limited text fields per screen component.
- Placeholder mockup preview.
