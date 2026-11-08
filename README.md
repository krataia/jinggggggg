# Portfolio

A single-page portfolio in a terminal-inspired style: JetBrains Mono for
readable copy, Departure Mono for the ASCII artwork, and a cicada mark drawn in
text. Built with Astro and Tailwind CSS v4 — no client framework, no images.

## Editing content

All copy lives in `src/data/portfolio.ts`:

- `site` — handle, name, nav, contact links, PGP fingerprint, footer year
- `hero` — the opening lines
- `about` — the paragraph and the three role lines
- `projects` — one entry per project; set `open: true` on the project that
  should start expanded
- `site.key` — the answer to the access-key field. Only its SHA-256 hash is
  shipped to the browser

Anything in square brackets is a placeholder waiting to be replaced. Contact
links default to `#`; point them at real URLs.

The cicada artwork lives in `src/components/Hero.astro`; the other ASCII frames
are in `Showreel.astro`, `Project.astro`, `KeySection.astro`, and
`Footer.astro`.

## Commands

| Command       | Action                             |
| :------------ | :--------------------------------- |
| `bun install` | Install dependencies               |
| `bun dev`     | Dev server at `localhost:4321`     |
| `bun build`   | Build the static site to `./dist/` |
| `bun preview` | Preview the build locally          |

## Notes

- Styling is Tailwind utilities in the components. `src/styles/global.css` only
  holds the font faces, theme tokens, and a small base layer.
- The access-key check runs in the browser with `crypto.subtle`, so it needs
  HTTPS (or localhost). It is an Easter egg, not access control.
- Fonts are self-hosted under the SIL Open Font License. Licenses are in
  `public/fonts/`.
