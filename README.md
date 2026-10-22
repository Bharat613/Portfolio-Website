# Bharat — Portfolio

A dark, animated portfolio built with React, Vite, Tailwind CSS, Three.js
(via react-three-fiber) and Framer Motion. Includes a 3D animated
background, a loading-screen intro animation, scroll-reveal animations
on every section, and a contact form that emails you directly.

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview   # preview the production build locally
```

## 2. Where to edit each section

Every section pulls its content from a small file in `src/data/`.
You never need to touch component code just to change text — edit
the data file, save, and the page updates.

| Section            | Edit this file              |
|---------------------|------------------------------|
| Name, bio, contact, socials, resume/photo paths | `src/data/profile.js` |
| Skills              | `src/data/skills.js`        |
| Experience          | `src/data/experience.js`    |
| Projects            | `src/data/projects.js`      |
| Certificates        | `src/data/certificates.js`  |
| Coding Platforms    | `src/data/platforms.js`     |
| YouTube channel     | `.env` (`VITE_YOUTUBE_*`)   |

**To add an extra card**, open the relevant file and copy the
"COPY-PASTE TEMPLATE" object commented at the bottom of the array,
paste it above the template, fill in your details, and give it a
unique `id`. No component code needs to change.

## 3. Add your photo and resume

- Photo → save it as `public/images/profile.jpg` (square, 500px+).
- Resume → save it as `public/resume/resume.pdf`.

Both are already wired up in `src/data/profile.js` (`photoUrl` /
`resumeUrl`), so they'll appear automatically — no other changes needed.

## 4. Contact form (sends email directly to you)

The form uses [EmailJS](https://www.emailjs.com) so it can send email
straight from the browser without you needing to run a backend server.
Free tier covers 200 emails/month, which is plenty for a portfolio.

1. Create a free account at emailjs.com.
2. Add an **Email Service** (e.g. connect your Gmail) → note the
   **Service ID**.
3. Create an **Email Template** with these variables in the body:
   `{{from_name}}`, `{{from_email}}`, `{{message}}` → note the
   **Template ID**. Set the "To email" on the template to
   `bharatsiva54@gmail.com`.
4. Go to Account → General → note your **Public Key**.
5. Copy `.env.example` to `.env` and fill in the three values:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```
6. Restart `npm run dev`. Messages submitted on the site now land
   straight in your inbox.

Until this is set up, the form shows a friendly fallback message
pointing visitors to your email/phone (both already shown directly
on the Contact section), so nothing is broken in the meantime.

## 5. YouTube channel section

The YouTube section uses the YouTube Data API v3 to show your channel
views and subscriber count as metric cards. Watch hours are not exposed
by the public Data API. The watch-hours card uses the YouTube Analytics
API `estimatedMinutesWatched` metric and converts minutes to hours. Add
these values to `.env` and restart the dev server:

```
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_YOUTUBE_CHANNEL_ID=your_youtube_channel_id
VITE_YOUTUBE_ANALYTICS_ACCESS_TOKEN=your_oauth_access_token
VITE_YOUTUBE_ANALYTICS_START_DATE=2020-01-01
VITE_YOUTUBE_ANALYTICS_END_DATE=2026-09-13
```

Enable the YouTube Data API v3 and YouTube Analytics API in Google Cloud
Console. The Analytics token must be obtained with OAuth and have
YouTube Analytics read access. Do not expose a long-lived refresh token
in the frontend; use a serverless endpoint for production. The section
shows views and subscribers even when Analytics is not connected.

## 5. Colors, fonts and motion

- Color tokens live in `tailwind.config.js` under `theme.colors`
  (`void`, `abyss`, `navyDeep`, `signal`, `cyanPulse`, `violetEdge`, etc.)
  — change the hex values there to retheme the whole site at once.
- Fonts are loaded in `index.html` (Space Grotesk for headings, Inter
  for body text, IBM Plex Mono for labels) and mapped in
  `tailwind.config.js` under `theme.fontFamily`.
- The animated background is `src/components/Background3D.jsx` — it
  reacts to scroll position and mouse movement. Adjust `PARTICLE_COUNT`
  or the `DriftingShape` props to change density/speed.
- The loading-screen animation is `src/components/Loader.jsx`.
- Scroll-reveal behavior for every section lives in
  `src/components/Section.jsx` and `src/components/Card.jsx` — change
  it once there and it applies everywhere.

## 6. Deploying

This is a static site after `npm run build` (output in `dist/`), so
any static host works. Easiest options:

- **Vercel**: `npx vercel` (auto-detects Vite).
- **Netlify**: drag-and-drop the `dist/` folder after building, or
  connect the repo (build command `npm run build`, publish dir `dist`).
- **GitHub Pages**: build, then push the `dist/` folder to a `gh-pages`
  branch (or use the `gh-pages` npm package).

Remember to add your `.env` values (the EmailJS keys) as environment
variables in whichever host you use, since `.env` itself isn't
committed to git.

## Project structure

```
src/
  components/     UI components (one file per section, plus shared
                   Section/Card/Navbar/Background3D/Loader)
  data/           Editable content — this is what you'll touch most
  index.css       Global styles + Tailwind
  App.jsx         Page assembly
public/
  images/         Your photo (and optional project screenshots)
  resume/         Your resume PDF
```
