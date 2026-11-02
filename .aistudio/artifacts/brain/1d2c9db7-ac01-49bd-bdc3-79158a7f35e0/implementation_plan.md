# Implementation Plan: Embedded PDF Brochure Viewer for Marketing Analysis

Replace the simplified HTML text summary cards in the interactive document viewer on the Marketing Analysis page (`/marketing-analysis`) with a full embedded PDF document viewer that displays the entire brochure with all images, graphics, and pages.

## Proposed Changes

### `src/components/MarketingAnalysisPage.tsx`
- **Replace Mocked Text Cards**: Remove the partial text-only mockups (`Page 1` and `Page 2` HTML cards).
- **Embed Full PDF Document**:
  - Implement a responsive `<object>` container backed by an `<iframe>` embedding `/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf#view=FitH&toolbar=1`.
  - Set container dimensions (`min-h-[650px] md:h-[850px] lg:h-[950px]`) with smooth scrolling and high-fidelity rendering of every vector, image, and page.
- **Top Document Bar**:
  - Keep interactive status indicator and title: "Sublime x Vizhin GTM Assessment Brochure (Complete 2-Page Document)".
  - Add quick action buttons:
    - **Open in New Tab ↗**: Opens the PDF in a clean browser window for maximum readability.
    - **Download PDF ↓**: Direct download action.
- **Graceful Fallback**: Include a mobile-friendly preview fallback message with a direct "Open Fullscreen PDF" button in case browser restrictions block inline iframe PDF rendering.

## Verification Plan
1. Run `tsc --noEmit` via `lint_applet` to ensure type safety.
2. Run `npm run build` via `compile_applet` to ensure build and postbuild scripts succeed.
3. Verify the embedded viewer loads `/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf` seamlessly when expanded.
