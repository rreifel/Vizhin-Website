# Fix VizhinORG Integration & External Destination Routing

Eliminate the double `/ORG/ORG` path bug and connect "Sign In to VizhinORG" directly to the active Remix VizhinORG project deployment across both local AI Studio development and production environments.

### User Review & Critical Decisions

> [!IMPORTANT]
> The active deployment endpoints from your second project revealed two distinct issues:
> 1. **Double Path Bug (`/ORG/ORG`)**: If the base URL was set to `https://vizhin.co/ORG`, appending `/ORG` created `https://vizhin.co/ORG/ORG`. URL generation must strictly prevent duplicate `/ORG` segments.
> 2. **`ais-pre-` vs `ais-dev-` Status**: The URL `https://ais-pre-w5xozbr56c6ysf2jdmwe3f-615362750641.us-west2.run.app` currently returns a 404 because the project has not been shared/deployed as a public preview yet. Meanwhile, the live development URL `https://ais-dev-w5xozbr56c6ysf2jdmwe3f-615362750641.us-west2.run.app` is fully active and serving requests.

- **Confirmed Decision 1**: Use the active real-time development URL (`https://ais-dev-w5xozbr56c6ysf2jdmwe3f-615362750641.us-west2.run.app/ORG`) for AI Studio testing, with fallback support for `ais-pre-` and production `https://vizhin.co/ORG`.
- **Confirmed Decision 2**: Strict path deduplication in `getVizhinOrgUrl` so that `/ORG` is never appended twice under any base URL.
- **Confirmed Decision 3**: Preserve 1-click rollback via `src/config/orgRouting.ts` (`USE_STANDALONE_VIZHIN_ORG`).

---

### 1. Overview & Core Concept

- **What It Does**: Ensures that clicking **Sign In -> Sign In to VizhinORG** takes the user cleanly and directly to their separate Remix VizhinORG application in a new browser tab (`target="_blank" rel="noopener noreferrer"`), without internal redirection loops or malformed nested routes (`/ORG/ORG`).
- **Target Audience**: Vizhin administrators, enterprise partners, and prospective customers transitioning between the Portal/CRM and workforce org intelligence.
- **Key Value**: Immediate, reliable hand-off between the two independent applications with zero routing conflicts.

---

### 2. User Experience & Visual Design

- **User Flow**:
  1. User hovers or taps **Sign In** in the top navigation bar.
  2. The dropdown presents two distinct options:
     - **VizhinCRM** (Partner & Customer Portal): Navigates to `/login` within the current portal.
     - **Sign In to VizhinORG** (Workforce & Org Architecture): Opens the separate Remix VizhinORG app in a new tab.
  3. The link opens the true sign-in screen of the Remix VizhinORG app without any 404 or `/ORG/ORG` routing errors.
  4. Header logo in both applications continues to link back to `https://vizhin.co`.

- **Visual Fidelity**:
  - Retains dark emerald and cyan palette accents with clean typography.
  - Distinctive cyan badge and icon for VizhinORG to maintain branding continuity.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Intelligent Environment & Route Normalization**:
  - *Chosen Approach*: The routing helper dynamically detects whether the app is running in production (`vizhin.co`) or AI Studio preview (`*.run.app`). In production, it targets `https://vizhin.co/ORG`. In AI Studio preview, it targets the active live deployment `https://ais-dev-w5xozbr56c6ysf2jdmwe3f-615362750641.us-west2.run.app/ORG`.
  - *Why*: Eliminates manual configuration changes between development testing and production deployment to Hostinger.
  - *Alternatives Considered*: Hardcoding a single URL would fail in either AI Studio or production.

- **Decision 2: Strict Subpath Deduplication**:
  - *Chosen Approach*: Sanitize URL construction using `url.replace(/\/ORG\/?$/i, '')` before adding any subpaths.
  - *Why*: Guarantees that neither `https://vizhin.co/ORG` nor any base URL will ever produce `/ORG/ORG`.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       VIZHIN PORTAL                         │
│                  (https://vizhin.co)                        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                User clicks "Sign In to VizhinORG"
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
 [Hostinger / Production]              [AI Studio Preview]
  https://vizhin.co/ORG                 https://ais-dev-w5xozbr56.../ORG
            │                                     │
            └──────────────────┬──────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    REMIX VIZHINORG APP                      │
│                  (Dedicated Org Project)                    │
└─────────────────────────────────────────────────────────────┘
```

- **File Modifications Required**:
  - `src/config/orgRouting.ts`: Implement environment detection, URL deduplication, and active endpoint configuration.
  - `src/components/SiteHeader.tsx`: Connect desktop dropdown and mobile menu to the sanitized destination URL.
  - `src/components/LoginScreen.tsx`: Update the "Need VizhinORG? Switch" link to use the unified URL.
  - `.env.example`: Document both development and production endpoint configuration.

- **Verification**:
  - Validate syntax and types via `lint_applet`.
  - Validate production build via `compile_applet`.
  - Verify generated links in browser DOM.
