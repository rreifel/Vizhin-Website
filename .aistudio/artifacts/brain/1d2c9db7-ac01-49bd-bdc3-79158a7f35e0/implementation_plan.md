# Implementation Plan: Clean Inline Brochure Viewer (Button-Only Trigger)

Remove the permanent closed rectangle ("Sublime x Vizhin GTM Assessment Brochure") across the site so pages remain clean and uncluttered. Display only the **View Brochure** button; when clicked, the full interactive embedded PDF viewer expands inline directly below the buttons.

## Proposed Changes

### 1. `src/components/BrochureViewer.tsx`
- **Remove Permanent Trigger Bar**: Eliminate the closed rectangle header.
- **Conditional Inline Rendering**: When `isOpen` is false, render nothing (`null`).
- **Complete Inline Viewer When Open**:
  - Top Toolbar:
    - Status indicator: "Sublime x Vizhin GTM Assessment Brochure (2 Pages)"
    - Quick actions: **Open in New Tab ↗**, **Download PDF ↓**, and **Close Brochure ✕**.
  - High-Fidelity Embedded PDF (`<object>` with `<iframe>` fallback) displaying all pages, typography, diagrams, and images.

### 2. Service Pages & Homepage
- **Homepage (`LandingPage.tsx`)**:
  - The 3 brochure-enabled cards show only the clean **View Brochure** button in the footer.
  - Clicking it toggles the embedded viewer directly below the card.
- **Dedicated Service Pages**:
  - `MarketingAnalysisPage.tsx`
  - `StrategicGtmAnalysisPage.tsx`
  - `MarketingServicesPage.tsx`
  - All three feature only the clean CTA button bar; clicking **View Brochure** expands the embedded viewer directly inline below the CTA section.

## Verification Plan
1. Run `tsc --noEmit` via `lint_applet` to confirm zero TypeScript issues.
2. Run `compile_applet` to verify full compilation and postbuild generation.
3. Test that no long rectangles appear when pages load, and clicking **View Brochure** smoothly reveals the full PDF viewer inline.
