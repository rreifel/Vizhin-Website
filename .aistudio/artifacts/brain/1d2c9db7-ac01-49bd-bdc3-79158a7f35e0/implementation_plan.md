# Homepage SEO Title Optimization

Upgrade the homepage title tag from the generic single-word brand to the user-selected high-intent search title: **"Go-to-Market Consulting & Fractional VP of Sales | Vizhin"**.

## User Review & Critical Decisions

> [!IMPORTANT]
> The target title has been selected by the user via interactive clarification.

- **Confirmed Decision**: Update the homepage `<title>` and OpenGraph `<meta property="og:title">` to:  
  `Go-to-Market Consulting & Fractional VP of Sales | Vizhin`
- **Scope Discipline**: No visible layout, text, or styling elements on the page will be changed; only `<head>` metadata, OpenGraph tags, and runtime document title synchronization will be updated.

---

## 1. Overview & Core Concept

- **What It Does**: Replaces the single-word `<title>Vizhin</title>` with a descriptive, keyword-rich title tag tailored for B2B search engine indexing and social snippet rendering.
- **Target Audience**: Growth-stage founders, CEOs, and revenue leaders searching for GTM advisory, fractional sales leadership, and pipeline architecture.
- **Key Value**: Improves search engine ranking visibility and CTR in Google search results by pairing target keywords (*"Go-to-Market Consulting"*, *"Fractional VP of Sales"*, *"Vizhin"*) with the recently deployed meta description.

---

## 2. User Experience & Visual Design

- **Search Snippet Presentation**:
  - **Title in SERP**: `Go-to-Market Consulting & Fractional VP of Sales | Vizhin` (54 characters — optimal for desktop and mobile without truncation).
  - **Description in SERP**: `Vizhin helps growth-stage companies align sales and marketing, fix CRM and pipeline friction, and build accountable teams that predictably grow revenue.`
- **Browser Tab Experience**: Displays the branded, descriptive title in the browser tab and bookmarks bar.
- **Social Sharing**: Slack, LinkedIn, X/Twitter, and iMessage preview cards will present the new title alongside the brand logo and snippet summary.

---

## 3. Key Decisions & Trade-Offs

- **Character Count Balance**:
  - *Chosen Title*: `Go-to-Market Consulting & Fractional VP of Sales | Vizhin` (54 characters).
  - *Why*: Google typically displays up to 60 characters in search results. This fits naturally without ellipses or truncation while targeting the two core high-value search queries.
- **HTML + Client-Side Dynamic Synchronization**:
  - *Chosen Approach*: Update `index.html`, `metadata.json`, and the client-side `document.title` handler so both static crawl bots (search spiders) and in-browser SPA transitions reflect the exact title.
  - *Alternatives Considered*: Updating only `index.html` would work for direct hits, but adding the client-side hook ensures back/forward navigation within the SPA always retains the optimized title.

---

## 4. Technical Architecture & Metadata Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                      HTML Document Head                     │
│  <title>Go-to-Market Consulting & ... | Vizhin</title>      │
│  <meta property="og:title" content="...">                   │
│  <meta name="description" content="...">                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Vite Build Process                      │
│             index.html ──► dist/index.html                  │
│             postbuild.js ──► dist/*/index.html fallbacks    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Runtime Client (React SPA / DOM)              │
│       document.title & meta tag dynamic consistency         │
└─────────────────────────────────────────────────────────────┘
```

- **Static Entry Point**:
  - Update `<title>` and `<meta property="og:title">` in `/index.html`.
  - Update `name` or `description` alignment in `/metadata.json`.
- **Production Build & Route Fallbacks**:
  - Compile the applet to update `dist/index.html` and static route copies (`dist/meddpicc/index.html`, `dist/Company/About/index.html`, etc.).
