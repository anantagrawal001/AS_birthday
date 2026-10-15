# Romantic Birthday Website — Build Prompt for Coding Agent

**Mission:** Build a stunning interactive birthday website using 10 provided couple photos. Deploy to GitHub Pages. Make it publicly shareable via link.

---

## 00 | Executive Summary

**What to build:**
- A single-page, scroll-based romantic website celebrating her 23rd birthday
- No limits on intimacy or romanticization — this is deeply personal
- 8 full-screen sections with smooth scroll animations
- 10 photos strategically placed and animated
- Interactive elements (candle wish, love language reveals)
- Hosted free on GitHub Pages (HTTPS, shareable link)

**Result:** A production-ready static website ready to deploy. User shares the public GitHub Pages link only with her.

---

## 01 | Core Aesthetic & Visual Direction

**Mood:** Cinematic, romantic, intimate. Like a love letter brought to life.

**Color Palette:**
- Primary: Warm ivory (#F5EFE7), deep charcoal (#2B2B2B)
- Accent: Burgundy (#8B4757), dusty blush (#C4A69D), soft gold (#D4AF8E)
- Use warm gradients and subtle overlays on photos

**Typography:**
- Headlines: Elegant serif (Playfair Display or Cormorant Garamond) — large, confident, romantic
- Body: Clean sans-serif (Inter or Graphik) — readable, modern
- Accents: Handwritten/script font (Caveat or Allura) — personal touches only, not excessive

**Imagery:**
- All 10 couple photos are hero-scale backgrounds or gallery feature images
- Photos should feel intimate: walking together, close-ups, candid moments, warm lighting
- Ken Burns zoom effect on hero photos (slow 8–12 second drift)
- Soft dark overlays where text sits (opacity 0.3–0.5) to ensure readability

**Visual Effects:**
- Floating sparkle particles (subtle, fade in/out with sections)
- Parallax scrolling (background moves slower than foreground)
- Smooth fade/slide transitions between sections
- No confetti, no balloons, no clip-art
- Polished, cinematic, restrained

---

## 02 | Website Structure (8 Sections, Full Viewport Height Each)

All sections stack vertically. Scroll through the entire experience from top to bottom.

### Section 1: Loading Screen
- **Purpose:** Elegant preload before the main hero appears
- **Design:** Her initial "A" in elegant serif, animated to draw itself with a thin stroke (2–3 seconds), then fade into the hero section
- **Behavior:** Auto-dismiss once images are loaded; show progress if images take time
- **Duration:** 2–3 seconds; can skip on click

### Section 2: Hero Section
- **Background Image:** Use `couple01.jpg` (or strongest opening photo) full-bleed with dark overlay (opacity 0.35)
- **Ken Burns Effect:** Gentle slow zoom (8–12 second duration) that starts at page load
- **Main Text:** 
  ```
  AANYA
  ```
  - Rendered in 120–160px elegant serif
  - Animates in letter-by-letter (staggered, 100ms between letters)
  - Fade-in as each letter appears
- **Subline (fades in after name completes):**
  ```
  23 years. Still my favourite person.
  ```
  - 28–32px serif, warm gold color, appears 1s after last letter of name
- **Call-to-action:** Soft pulsing "↓ scroll to begin" text at bottom in 18px script font
- **Interaction:** Scroll down or click the arrow to proceed
- **Duration:** User controls; stays until scroll interaction

### Section 3: Opening Message
- **Background:** Warm ivory solid
- **Layout:** Centered text column (max-width 600px), generous top/bottom padding (20vh)
- **Message (reveals line-by-line on scroll):**
  ```
  Hi love.
  I built this just for you.
  Not because you need reminding —
  but because I wanted the world to know,
  even for one day,
  how much you mean to me.
  ```
- **Animation:** Each line fades up and slides up by 20px as she scrolls into view
- **Typography:** 28–32px serif, charcoal text, 1.8 line-height
- **Duration:** Entire section ~1 viewport height to scroll through

### Section 4: Love Language Section
- **Title:** "A few things I don't say enough"
  - 48–56px elegant serif, charcoal
  - Top-aligned, generous spacing below
- **Background:** Warm ivory or very soft blush gradient
- **Content:** 5 love lines, each one a separate animated reveal
  ```
  You are the warmest person I know.
  Your laugh is my favourite sound.
  You make ordinary days feel like something worth keeping.
  I am endlessly proud of you.
  Being loved by you is the best thing that has happened to me.
  ```
- **Animation:** 
  - Each line fades in and slides up as she scrolls into that line's section
  - Add a small heart (❤️) or sparkle icon (✨) before each line, same color animation
  - Slight delay (100ms) between text and icon
- **Typography:** 24–28px serif, charcoal, 1.6 line-height
- **Layout:** Left-aligned, ~400px wide column, centered on screen with ~40vh padding top/bottom

### Section 5: Photo Gallery — "Pieces of Us"
- **Title:** "Pieces of us"
  - 48–56px elegant serif, charcoal, top-aligned
- **Background:** Warm ivory or soft blush
- **Photo Placement:** 8–10 hero-scale photos in one of these layouts:
  - **Option A (Horizontal Scroll):** All photos in a single horizontal scroll-snap row; user swipes or scrolls right to reveal next photo. Full viewport width × 70% height per photo.
  - **Option B (Staggered Masonry):** Photos arranged in a loose, artistic grid with varied sizes and positions (some landscape, some portrait). All visible at once. Each photo has a soft drop shadow and subtle tilt on hover (desktop only).
- **Photo Selection:** Use `couple02.jpg`, `couple04.jpg`, `couple07.jpg`, `couple10.jpg`, `couple13.jpg`, `couple16.jpg`, `couple19.jpg`, `couple22.jpg` (or similar strong couple photos from the provided batch)
- **Captions:** Optional text below/overlay each photo (editable in config). Keep captions short: "A day that felt like this." / "Your laugh." / "Us."
- **Animation:**
  - Each photo fades in and scales up (1.0 → 1.05) as it enters viewport center
  - Hover effect (desktop): photo scales slightly (1.05 → 1.08) and brightens (opacity fade) on mouse-over
  - On mobile: tap to see captions or advance
- **Image Quality:** Optimize photos to ~2–4 MB each for web; maintain aspect ratio, no cropping of faces

### Section 6: Letter Section
- **Background:** Soft parchment texture (subtle, doesn't distract from text)
- **Layout:** Single column, 650–700px wide, centered, with ~15vh padding top/bottom
- **Heading:** "DEAR AANYA," in 32px handwritten-style serif, dusty blush color
- **Letter Content (exact text):**
  ```
  A birthday is a good excuse to say things that
  everyday life leaves unsaid.
  
  One thing I genuinely appreciate about you is
  your good character and the way you value your friends.
  
  For this next year, I wish you
  a year full of good days and people who value you—and enough time
  to enjoy the life you are building, not just rush
  through it.
  
  Aanya, thank you for being such a good friend to the people you care about. 
  Your kind heart, your loyalty, and the way you look after the people around you 
  make you special. I am really glad to be part of your life. 
  Happy 23rd birthday. Here is to a year full of good days and good company.
  
  This website holds a few photographs. What matters more is everything between them:
  the conversations, the laughter, and the moments we never remembered to photograph.
  
  Happy birthday. I am glad you are part of my life.
  
  With love,
  Anant Agrawal
  ```
- **Animation:** Text reveals gradually as she scrolls (fade-in, no line-by-line stagger; treat as one flowing reveal)
- **Typography:** 18px serif, charcoal, 1.8 line-height, justified alignment
- **Signature:** Last two lines in 20px handwritten-style font, warm gold color

### Section 7: Interactive Wish Section
- **Background:** Use a strong couple photo (e.g., `couple25.jpg`) full-bleed with dark overlay (opacity 0.4)
- **Centered Content:**
  ```
  Make a wish.
  The rest of this year is yours to write.
  ```
  - "Make a wish." = 64–72px elegant serif, warm gold
  - "The rest..." = 24px serif, ivory, 200ms delay after title
- **Interactive Element:** Animated candle flame in the center (below text)
  - Simple SVG or animated GIF: a stylized flame that flickers gently (2–3 second loop)
  - Clickable/tappable
  - On click: flame grows slightly, then sparks burst outward in a gentle explosion of glowing particles, sound plays (soft "woosh" + quiet sparkle), page fades to next section over 1s
- **Sound Effect:** Soft "poof" sound (candle blow-out) — must respect browser autoplay restrictions and mute toggle
- **Animation Duration:** Spark burst lasts ~1.5 seconds, then auto-fade to next section
- **Particle Effect:** 20–30 small glowing orbs/sparkles that fade and drift upward; no performance hit on mobile

### Section 8: Closing / Signature Section
- **Background:** Use a beautiful couple photo (e.g., `couple28.jpg`) full-bleed with dark overlay (opacity 0.45)
- **Centered Text (stacked):**
  ```
  Happy Birthday, Aanya.
  ```
  - 80–96px elegant serif, ivory, fade-in as section enters viewport
- **Subtext (appears 800ms after main):**
  ```
  I love you. Today, tomorrow, 
  and every ordinary day after that.
  ```
  - 26–28px serif, warm gold, smooth fade-in
- **Signature (appears 1.6s after main):**
  ```
  — Anant
  ```
  - 22px handwritten font, dusty blush, smooth fade-in
- **Closing Animation:** Small looping heart (❤️) or sparkle beneath signature, pulsing gently (1s cycle, opacity 0.6 → 1.0 → 0.6)
- **Duration:** User can stay as long as they want; no auto-advance
- **Restart Option:** Small "↑ back to top" link at very bottom (18px, subtle, appears on hover/tap)

---

## 03 | Technical Requirements

### Tech Stack
- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript (or TypeScript)
- **Build Tool:** Vite (for fast dev, clean bundles)
- **Animations:** GSAP + ScrollTrigger (for scroll-linked animations)
- **Hosting:** GitHub Pages (static site, no backend needed)
- **Image Optimization:** ImageOptim or similar; serve web-optimized derivatives

### JavaScript Architecture
- **One Central Config Object:** At the very top of `main.js` or `config.js`, create:
  ```javascript
  const CONFIG = {
    siteTitle: "Happy Birthday, Aanya",
    heroName: "AANYA",
    heroSubline: "23 years. Still my favourite person.",
    openingMessage: ["Hi love.", "I built this just for you.", ...],
    loveLanguage: ["You are the warmest...", ...],
    galleryPhotos: ["couple02.jpg", "couple04.jpg", ...],
    galleryCaptions: ["caption 1", "caption 2", ...],
    letterText: "A birthday is a good excuse...",
    candle: { sound: "candle-blow.mp3", duration: 1500 },
    closingText: "Happy Birthday, Aanya.",
    signatureText: "— Anant",
    audioVolume: 0.3,
    enableHaptics: true,
    enableParticles: true,
  };
  ```
- **Rationale:** Allows non-technical users to edit text, photo order and settings without touching code
- **Exports:** Make config easily importable so any section can read it

### Module Structure
```
src/
  ├── main.js (entry point, initializes all)
  ├── config.js (CONFIG object)
  ├── sections/ (one file per section)
  │   ├── hero.js
  │   ├── openingMessage.js
  │   ├── loveLanguage.js
  │   ├── gallery.js
  │   ├── letter.js
  │   ├── wish.js
  │   └── closing.js
  ├── animations/ (GSAP ScrollTrigger setup, reusable animations)
  ├── effects/ (particles, parallax, Ken Burns)
  ├── audio.js (sound management, mute toggle)
  ├── haptics.js (vibration API, graceful fallback)
  ├── styles/
  │   ├── variables.css (color, font variables)
  │   ├── base.css (resets, typography)
  │   ├── layout.css (section layouts, grid)
  │   └── animations.css (CSS keyframes for simple effects)
  └── assets/
      ├── photos/ (10 optimized .jpg files)
      ├── sounds/ (candle-blow.mp3, paper-rustle.mp3 if used)
      └── fonts/ (if self-hosted)
```

### Scroll Animation Setup
- **GSAP ScrollTrigger Config:**
  - `trigger`: each section's top
  - `start`: "top center"
  - `end`: "bottom center" or adjust for desired reveal speed
  - `scrub`: 1 (link animation to scrollbar) or false (snap to discrete states)
  - Use `.to()` and `.fromTo()` for fade, scale, slide animations
- **Example (Love Language lines):**
  ```javascript
  const lines = document.querySelectorAll('.love-line');
  lines.forEach((line, i) => {
    gsap.fromTo(line, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
          trigger: line,
          start: "top 80%",
          end: "top 50%",
          scrub: 0.5
        }
      }
    );
  });
  ```

### Image Handling
- **Web Optimization:**
  - Resize photos to max 1920×1080 or native aspect ratio (no distortion)
  - Compress to 80–90 JPEG quality (~1–3 MB per file)
  - Convert to WebP with JPEG fallback
  - Strip EXIF/GPS metadata
- **Lazy Loading:** Photos below the fold should lazy-load (use `loading="lazy"` attribute or IntersectionObserver)
- **Srcset:** Provide 1x and 2x density variants for responsive devices
- **Preloading:** Preload the next section's hero image before the user scrolls there

### Responsive Design
- **Mobile-First Approach:**
  - Single column layout, full viewport width
  - Hero name: 72px on mobile, 120px on desktop
  - Sections scale proportionally; all text remains readable
- **Breakpoints:**
  - Mobile: < 768px (portrait phone)
  - Tablet: 768px–1024px
  - Desktop: > 1024px
- **Touch Targets:** All clickable elements (button, arrows) ≥ 44px × 44px
- **Orientation:** Handle rotation gracefully; recalculate scroll animations on resize

### Accessibility
- **Semantic HTML:** Use `<section>`, `<article>`, `<h1>–<h6>`, `<button>` appropriately
- **Alt Text:** Every photo has a brief alt (e.g., "Couple photo, warm sunset lighting")
- **Keyboard Navigation:** 
  - Tab through interactive elements
  - Arrow keys scroll section-by-section or advance gallery
  - Enter/Space activates candle wish
- **Focus Indicators:** Visible focus ring on all interactive elements (not removed)
- **Prefers-Reduced-Motion:** Respect user's motion preference; simplify animations (no parallax, no Ken Burns, instant section transitions)
- **Color Contrast:** All text meets WCAG AA standard (4.5:1 ratio for normal text)
- **Screen Reader:** Provide summary text for major sections; describe photos briefly

### Browser Support
- **Target:** Modern evergreen browsers (Chrome, Firefox, Safari, Edge, last 2 versions)
- **Fallbacks:**
  - WebP → JPEG for old Safari
  - GSAP with graceful no-animation fallback if JS fails
  - No WebGL required (pure CSS/JS)
  - Vibration API unsupported → silent (no error)
  - Audio autoplay blocked → muted by default, user unmutes

### Performance Targets
- **First Contentful Paint (FCP):** < 2s
- **Largest Contentful Paint (LCP):** < 3s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Lighthouse Score:** 90+ (mobile and desktop)
- **Bundle Size:** < 500 KB (all CSS/JS combined, minified)
- **Image Total:** < 10 MB (all 10 photos combined)

---

## 04 | Audio & Haptics

### Sound Design
- **Candle Blow-Out Sound:**
  - File: `candle-blow.mp3` (1–2 seconds, soft "poof" or whisper)
  - License: Royalty-free (Freesound.org, Pixabay, or original)
  - Volume: 30% default (user can adjust)
  - Plays on candle click, no overlap if clicked multiple times
- **Background Music (Optional):**
  - Soft piano or ambient track, 30–60 seconds
  - Loop infinitely if user doesn't skip
  - Start muted; user clicks unmute button (🔊/🔇 icon, top-right corner)
  - License: Royalty-free (e.g., YouTube Audio Library, Epidemic Sound, or Creative Commons)
- **Audio Implementation:**
  - Use Web Audio API or simple `<audio>` tags with play/pause controls
  - Respect browser autoplay restrictions: audio only plays after first user gesture
  - Provide global mute/unmute toggle; persist preference in localStorage
  - Graceful silent fallback if browser blocks audio

### Haptics (Vibration)
- **Supported Events:**
  - Candle blow-out: One 30ms pulse, then two shorter 15ms pulses (simulates "pop")
  - Interactive element tap: Single 10ms pulse
- **Implementation:**
  - Feature-detect Vibration API (`navigator.vibrate`)
  - Only vibrate on eligible devices (Android Chrome, some others; not iPhone Safari)
  - Never vibrate on scroll or pointer drag; only on deliberate interactions
  - Provide a toggle in settings; respect `prefers-reduced-motion`
- **Fallback:** If unsupported, ignore silently (no error); all interactions still work

---

## 05 | Hosting on GitHub Pages

### Prerequisites
- **GitHub Account:** User must have a GitHub account and be logged in
- **Git Installed:** Local machine has git CLI
- **Node.js:** v18+ (for Vite)

### Repository Setup
1. **Create Public Repository:**
   - Name: `aanya-birthday` (or user's preference)
   - Description: "Interactive romantic birthday website for Aanya, deployed to GitHub Pages"
   - Visibility: **Public** (required for GitHub Pages free tier)
   - .gitignore: Use Node.js template

2. **Project Structure in Repository:**
   ```
   aanya-birthday/
   ├── index.html
   ├── vite.config.js
   ├── package.json
   ├── package-lock.json
   ├── .github/workflows/deploy.yml
   ├── src/
   │   ├── main.js
   │   ├── config.js
   │   ├── styles/
   │   └── assets/
   ├── dist/ (built output, gitignored)
   ├── README.md
   └── LICENSE
   ```

3. **GitHub Actions Deployment Workflow:**
   - File: `.github/workflows/deploy.yml`
   - Triggers on push to `main` branch
   - Runs: Node setup → npm install → npm run build → Deploy to Pages
   - Deploys contents of `dist/` folder to GitHub Pages
   - **Example Workflow:**
     ```yaml
     name: Deploy to GitHub Pages
     on:
       push:
         branches: [main]
     jobs:
       deploy:
         runs-on: ubuntu-latest
         permissions:
           contents: read
           pages: write
           id-token: write
         steps:
           - uses: actions/checkout@v3
           - uses: actions/setup-node@v3
             with:
               node-version: 18
           - run: npm ci
           - run: npm run build
           - uses: actions/upload-pages-artifact@v2
             with:
               path: dist
           - uses: actions/deploy-pages@v2
     ```

4. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (or let Actions handle it)
   - Confirm deployment completes; copy the public URL

### Vite Configuration for GitHub Pages
```javascript
// vite.config.js
export default {
  base: '/aanya-birthday/', // Adjust to your repo name
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      input: 'index.html'
    }
  },
  server: { port: 3000 }
};
```

### Build & Deployment Commands
```bash
# Install dependencies
npm install

# Local development server
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build
# Creates optimized files in dist/

# Deploy (manual push)
git add .
git commit -m "Deploy birthday website"
git push origin main
# GitHub Actions automatically deploys to Pages

# Verify live site
# Visit: https://username.github.io/aanya-birthday/
```

### Maintenance & Updates
- **Change Photos:** Replace files in `src/assets/photos/`, update `CONFIG.galleryPhotos` array
- **Edit Text:** Update CONFIG object only; redeploy with `git push`
- **Update Captions:** Edit `CONFIG.galleryCaptions`; rebuild and push
- **Redeployment:** Every push to `main` triggers automatic rebuild and redeployment

---

## 06 | Configuration & Customization

### Editable Config (User-Friendly)
All changes should happen in `config.js` without touching HTML/CSS:

```javascript
const CONFIG = {
  // Text
  siteTitle: "Happy Birthday, Aanya",
  heroName: "AANYA",
  heroSubline: "23 years. Still my favourite person.",
  
  openingMessage: [
    "Hi love.",
    "I built this just for you.",
    "Not because you need reminding —",
    "but because I wanted the world to know,",
    "even for one day,",
    "how much you mean to me."
  ],
  
  loveLanguage: [
    "You are the warmest person I know.",
    "Your laugh is my favourite sound.",
    "You make ordinary days feel like something worth keeping.",
    "I am endlessly proud of you.",
    "Being loved by you is the best thing that has happened to me."
  ],
  
  galleryPhotos: [
    "couple02.jpg",
    "couple04.jpg",
    "couple07.jpg",
    "couple10.jpg",
    "couple13.jpg",
    "couple16.jpg",
    "couple19.jpg",
    "couple22.jpg"
  ],
  
  galleryCaptions: [
    "A day that felt like this.",
    "Your laugh.",
    "Good company.",
    "Us.",
    "A memory.",
    "Warmth.",
    "Together.",
    "Always."
  ],
  
  letterText: "A birthday is a good excuse...",
  
  closingText: "Happy Birthday, Aanya.",
  closingSubtext: "I love you. Today, tomorrow, and every ordinary day after that.",
  signatureText: "— Anant",
  
  // Settings
  audioVolume: 0.3,
  enableHaptics: true,
  enableParticles: true,
  enableBackgroundMusic: false
};
```

### Future Edits
- To change text: Edit `config.js`, commit, push
- To change photos: Replace `.jpg` files, update `galleryPhotos` array, rebuild
- To change colors: Edit `src/styles/variables.css` (CSS custom properties)
- To add/remove sections: Requires code changes; keep CONFIG separate

---

## 07 | Deployment Checklist

- [ ] All 10 photos are optimized and in `src/assets/photos/`
- [ ] CONFIG object is complete and user-friendly
- [ ] All sections render correctly locally (`npm run dev`)
- [ ] Scroll animations work smoothly (test on desktop and mobile)
- [ ] Candle wish interaction works and plays sound
- [ ] Mobile layout is responsive and touch-friendly
- [ ] Keyboard navigation works (Tab, Arrow keys)
- [ ] No console errors or 404s
- [ ] Lighthouse score ≥ 90
- [ ] Bundle size < 500 KB (JS+CSS combined)
- [ ] GitHub repository created and public
- [ ] GitHub Pages workflow configured and deployed
- [ ] Public GitHub Pages URL is live and verified
- [ ] All photos and elements load correctly on live URL
- [ ] Audio plays when user unmutes (or auto-mutes initially)
- [ ] Link is shareable and works in private/incognito mode
- [ ] README.md includes deployment & customization instructions

---

## 08 | README Template (for GitHub Repo)

```markdown
# 🎂 Aanya's Birthday Website

A beautiful, interactive romantic birthday website built with HTML, CSS, and JavaScript.
Deployed to GitHub Pages for free hosting.

## Features

- 8 full-screen sections with smooth scroll animations
- 10 integrated couple photos with parallax effects
- Romantic opening message, love language section, photo gallery
- Interactive candle wish element
- Personal letter and closing signature
- Responsive design (mobile, tablet, desktop)
- Soft background music toggle
- Haptic feedback support
- Fully accessible (WCAG AA, keyboard navigation)

## Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Build Tool:** Vite
- **Animations:** GSAP + ScrollTrigger
- **Hosting:** GitHub Pages

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Opens http://localhost:3000

# Build for production
npm run build

# Serve production build locally (testing)
npm run preview
```

### Deployment

Every push to the `main` branch triggers GitHub Actions to build and deploy automatically.
Check "Actions" tab in GitHub to see deployment progress.

Public URL: `https://username.github.io/aanya-birthday/`

## Customization

### Edit Text

Open `src/config.js` and update the `CONFIG` object:
- Change names, dates, messages, captions
- No HTML/CSS changes needed

### Replace Photos

1. Optimize your 10 photos (resize to max 1920×1080, compress to ~2–3 MB each)
2. Replace files in `src/assets/photos/` (keep names as `couple01.jpg`, `couple02.jpg`, etc.)
3. Update `CONFIG.galleryPhotos` and `CONFIG.galleryCaptions` if desired
4. Run `npm run build` and push to deploy

### Adjust Colors

Edit `src/styles/variables.css`:
```css
:root {
  --color-ivory: #F5EFE7;
  --color-charcoal: #2B2B2B;
  --color-burgundy: #8B4757;
  /* ... adjust as needed ... */
}
```

## Keyboard Navigation

- **Tab:** Move between interactive elements
- **Arrow Keys:** Scroll through sections or advance gallery
- **Enter / Space:** Activate candle wish or buttons

## Accessibility

- WCAG AA compliant (color contrast, focus indicators, alt text)
- Respects `prefers-reduced-motion` setting
- Full keyboard navigation
- Screen-reader friendly

## License

[MIT or Custom — specify]

## Author

Built with ❤️ by Anant for Aanya.
```

---

## 09 | Execution Notes for Agent

**Your job:**
1. Review this prompt thoroughly
2. Set up the project structure and Vite config
3. Build all 8 sections according to spec
4. Integrate 10 photos and CONFIG-driven text
5. Implement GSAP scroll animations and effects
6. Test locally for responsiveness, accessibility, performance
7. Create GitHub repository and GitHub Actions workflow
8. Deploy to GitHub Pages and verify the public URL works
9. Return the live URL and GitHub repo link

**Do not:**
- Use templates or frameworks beyond Vite + GSAP
- Invent new features not specified here
- Deploy until all 8 sections are complete and tested
- Claim success before the live GitHub Pages URL is verified working

**If blocked:**
- Missing photos → ask user for the 10 photo files
- GitHub auth issues → ask user to authenticate via `gh auth login`
- Otherwise, diagnose and report the exact error

---

## 10 | Final Delivery

Once deployed, return:

```
✅ LIVE WEBSITE URL: https://github.com/username/aanya-birthday (GitHub repo)
✅ PUBLIC PAGES URL: https://username.github.io/aanya-birthday/ (live site)
✅ FEATURES: 8 sections, 10 photos, candle wish, sound, haptics, scroll animations
✅ TESTED: Mobile (iOS/Android) and desktop; all photos load, candle works, no errors
✅ INSTRUCTIONS: README.md includes how to edit text and photos for future changes
```

**Share the public GitHub Pages URL with Aanya. She'll love it.** 🎉

---

**Built with ❤️ for a birthday that deserves to be unforgettable.**
