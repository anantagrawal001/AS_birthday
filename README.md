# Aanya's 23rd Birthday Celebration & Keepsake Magazine

A cinematic, responsive romantic birthday website and luxury digital keepsake magazine crafted by **Anant Agrawal** for **Aanya Sharma** for her 23rd birthday (17 October 2026).

---

## The Experience

1. **Chapter 00 • The Invitation:** Soft dark warm opener with an elegant monogram, gold glimmer, and explicit user-gestured audio activation.
2. **Chapter 01 • First Frame:** Atmospheric night walk hero with dark vignette, letter-by-letter reveal, and romantic opener.
3. **Chapter 02 • A Letter Begins:** Ivory paper with letterpress aesthetic and tender portrait.
4. **Chapter 03 • Love Lines:** Affectionate reveal cards with individual tap interactions, expand-all affordance, and anchored photo memories.
5. **Chapter 04 • Fairy Lights Memory Wall (Signature Installation):** Sagging cables of warm amber glowing bulbs holding 10 clipped physical photo prints that gently sway. Tapping any photograph opens an accessible lightbox view with soft sound cues.
6. **Chapter 05 • Our Little Photobooth:** 8-cell physical photo strip in exact sequence displaying genuine photobooth candid moments.
7. **Chapter 06 • Ordinary Days:** Editorial photo compositions celebrating in-between moments and quiet closeness.
8. **Chapter 07 • Birthday Ritual:** Tangible tabletop tiered birthday cake with flickering taper candles. Can be extinguished universally via tap/click or via optional microphone breath detection. Features soft extinguishing sound, rising smoke curls, and relight capability.
9. **Chapter 08 • Full Love Letter:** Keepsake parchment letter with wax seal, genuine declarations of love from Anant, and portraits.
10. **Chapter 09 • Secret Gift (Magazine Invitation):** Bound book cover mockup with "Open your magazine" CTA and optional skip button.
11. **Chapter 10 • Finale:** Elegant formal portrait, heartfelt birthday promises, optional illustrated art end-card, and replay controls.
12. **The Luxury Keepsake Magazine:** A 12-page bound digital editorial publication with physical cover opening, curved page deformation, dynamic shadows, realistic paper audio, mobile single-page and desktop dual-page spread layouts, and instant restoration to the birthday story upon closing.

---

## Technical Architecture

- **Framework:** Vite + React + TypeScript
- **Styling:** CSS Design Tokens (`--ivory`, `--ink`, `--burgundy`, `--blush`, `--gold`, `--night`, `--light`), fluid `clamp()` responsive scaling, and reduced-motion support.
- **Audio:** Web Audio API with synthesized warm piano chord progressions, tactile SFX (fairy light tap, envelope unfold, candle blow/puff, page turn/settle), and document visibility pauses.
- **Bundle Optimization:** The luxury magazine engine and 3D dependencies are code-split into a separate lazy-loaded chunk (`~23 kB` gzipped), leaving the main story initial payload ultra-lean (`~78 kB` gzipped).
- **Security & Privacy:** All EXIF/GPS geolocation data stripped from public photo derivatives.

---

## Verification & Documentation

- [Photo Placement Manifest](docs/PHOTO_PLACEMENT.md): Full audit of all 35 source photographs.
- [QA Evidence Report](docs/QA_EVIDENCE.md): Automated unit test results (18/18 passed), Playwright E2E browser test results across Mobile Pixel 7 and Desktop Chrome, and 34 verified screenshots.
- [Privacy & Deployment Guide](docs/PRIVACY_AND_DEPLOYMENT.md): Deployment instructions, custom domain setup, and privacy disclosures.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development
```bash
npm run dev
```

### 3. Run Unit Tests
```bash
npm test
```

### 4. Build and Preview Production
```bash
npm run build
npm run preview
```
