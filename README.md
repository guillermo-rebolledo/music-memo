## Music Memo — markdown-powered blog

This is a small, markdown-powered blog built with the Next.js App Router. Posts live as `.md` files on disk and are rendered into a dark, editorial-style reading experience.

### Folder layout

- `src/app/layout.tsx` — global layout shell (header, footer, shell container).
- `src/app/page.tsx` — homepage listing all posts as cards.
- `src/app/blog/[slug]/page.tsx` — individual post pages.
- `lib/posts.ts` — helpers for loading/parsing markdown posts.
- `content/posts` — your markdown posts live here.

### Adding a new post

1. Create a new file in `content/posts`, for example:

   ```markdown
   content/posts/2026-03-03-first-post.md
   ```

2. Paste this **complete example post** and edit it:

   ```markdown
   ---
   slug: first-post
   title: First Post — Warming Up
   date: 2026-03-03
   description: Quick notes on what I listened to today.
   tags:
     - listening
     - notes
     - first
   ---

   # What I listened to today

   I wanted a place to jot down small listening notes, without turning it into
   a full review. This is just a stream of impressions.

   ## Albums

   - **Artist One – Record A (2024)**  
     Tight, bright drums and a really wide stereo image. The last track blooms
     in the headphones.

   - **Artist Two – Night Sketches (2021)**  
     Softer, more muted palette. Great for late evening writing.

   ## Standout moments

   1. Opening synth swell in track 2 of *Record A*.
   2. Drum fill before the chorus in track 5 of *Night Sketches*.

   ## A small code note

   ```ts
   // Example of a code block inside a post
   type Mood = "bright" | "muted" | "noisy";

   const currentMood: Mood = "bright";
   ```

   Writing entries like this keeps things informal and easy to come back to.
   ```

3. Save the file. On the next dev rebuild, the post will appear on the homepage and at `/blog/first-post`.

### Running the site locally

1. Install dependencies (if you haven’t already):

   ```bash
   pnpm install
   ```

2. Start the dev server:

   ```bash
   pnpm dev
   ```

3. Open `http://localhost:3000` in your browser.

### Deployment

This is a standard Next.js app. The usual deployment flow is:

- Push this repo to GitHub/GitLab.
- Connect the repo to a host like Vercel.
- Use the default build command:

  ```bash
  pnpm build
  ```

The markdown files in `content/posts` are bundled as part of the build, so deployments automatically include your latest entries.
