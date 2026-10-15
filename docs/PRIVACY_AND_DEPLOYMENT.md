# Privacy, Deployment & Maintenance Guide

## 1. Critical Privacy Notice Regarding Couple Photographs

This website is designed as a personal, romantic birthday celebration for Aanya Sharma from Anant Agrawal.

**Important Disclosure:**
- When deploying to **GitHub Pages**, all files in the published build (`dist/`) are served statically over HTTPS.
- Even if a GitHub repository is set to **Private**, GitHub Pages sites are publicly accessible to anyone who has or discovers the URL unless you have an enterprise GitHub Organization with Pages access control.
- While search engine robots are not indexed by default and no public directories are linked, anyone with the direct web link can load the website and view the images.
- **Do not publish this repository to a public GitHub repository or deploy to public GitHub Pages without your conscious consent that these couple photos will be hosted on the web.**

---

## 2. GitHub Pages Deployment Steps

### Option A: Using GitHub Actions (Automated CI/CD)
The repository includes an official, secure GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Create a repository on GitHub (e.g. `aanya-birthday-2026`).
2. Push your local workspace:
   ```bash
   git init
   git add .
   git commit -m "feat: complete romantic birthday website and luxury magazine"
   git branch -M main
   git remote add origin https://github.com/<your-username>/aanya-birthday-2026.git
   git push -u origin main
   ```
3. In your GitHub repository settings:
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow will automatically install dependencies, run Vitest unit tests, build the optimized production assets, and deploy to:
   `https://<your-username>.github.io/aanya-birthday-2026/`

### Option B: Connecting a Custom Domain
If you have a domain (e.g. `aanya.anant.com` or `happybirthdayaanya.com`):
1. Add a `CNAME` file at the root of `public/` containing your domain name:
   ```
   aanya.example.com
   ```
2. In your DNS provider (Cloudflare, GoDaddy, Namecheap, etc.), add:
   - For an apex domain (`example.com`): `A` records pointing to GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
   - For a subdomain (`aanya.example.com`): `CNAME` record pointing to `<your-username>.github.io`.
3. In GitHub repository **Settings** → **Pages**, enter your custom domain and enable **Enforce HTTPS**.

---

## 3. How to Update Content Without Touching Code

All names, dates, messages, love letters, and photo associations are centralized in:
`src/content/config.ts`

- **To change a name or nickname:**
  Edit `BIRTHDAY.recipient.displayName` or `BIRTHDAY.recipient.fullName`.
- **To edit the love letter:**
  Edit `BIRTHDAY.story.ch08.letter.paragraphs`.
- **To update love lines:**
  Edit `BIRTHDAY.story.ch03.cards`.
- **To add new photos:**
  Place the photo in `public/assets/photos/`, update `src/content/photoManifest.ts`, and run `npm run build`.

---

## 4. Local Preview

To preview the exact production build locally on your computer at any time:
```bash
npm run preview
```
Visit `http://localhost:4173/` in your browser.
