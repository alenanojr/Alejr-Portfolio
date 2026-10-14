# Alberto L. Enano Jr. — Portfolio

A premium, recruiter-facing portfolio site.

- `client/` — Vite + React 19 + TypeScript, Tailwind CSS v4, shadcn-style UI
  primitives, Framer Motion + GSAP + Lenis for motion, React Router, React
  Helmet for SEO.
- `client/public/api/contact.php` — a same-origin PHP endpoint (PHPMailer +
  Gmail SMTP) that powers the contact form. It ships inside the client build
  output, so the whole site deploys as a single static bundle on any
  PHP-capable shared host.

See [ASSETS.md](./ASSETS.md) for the exact list of placeholder images/PDFs to
drop in.

## Getting started

```bash
cd client
npm install
npm run dev   # http://localhost:5173
```

The dev server can't execute PHP, so the contact form won't send mail while
running `npm run dev`. To test it locally:

```bash
cd client
npm run build
cp public/api/config.example.php dist/api/config.php   # then fill in real values
php -S localhost:8000 -t dist
```

Open `http://localhost:8000` and submit the form. To actually send mail,
generate a [Gmail App Password](https://myaccount.google.com/apppasswords)
(requires 2-Step Verification on the Gmail account) and set `GMAIL_USER` /
`GMAIL_APP_PASSWORD` / `CONTACT_TO_EMAIL` in `dist/api/config.php`. Without
it, the endpoint still validates and responds correctly — it just returns a
clear "email not configured" error instead of sending.

## Scripts

| Command (run inside `client/`) | Does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier — write |
| `npm run format:check` | Prettier — check only |

## Deployment (shared PHP hosting)

1. `cd client && npm run build` — produces `client/dist/`, a complete,
   self-contained site (static assets + `api/contact.php` + `.htaccess`).
2. Upload the **contents** of `client/dist/` to the hosting account's web
   root (e.g. `public_html/`) via the host's file manager or FTP.
3. Create `api/config.php` directly on the host (copy `api/config.example.php`
   and fill in real values) — it's gitignored and never travels through git,
   the same way `.env` files are normally kept out of version control.
4. Confirm `mod_rewrite` is enabled (standard on most shared hosts) so the
   included `.htaccess` can route client-side (React Router) paths to
   `index.html`.

No Node.js runtime is required on the host — only PHP, which the plan
already supports.

## Project structure

```
alberto-portfolio/
  client/               Vite + React + TypeScript SPA
    public/api/         contact.php + PHPMailer + config (PHP, ships as-is)
  ASSETS.md              placeholder-asset checklist
```

See `client/src/data/*.ts` for the single source of truth for all resume
content shown on the site — editing content almost never requires touching a
component.
