# Assets Checklist

The site currently renders with clean placeholders wherever a real asset is
missing (dashed-border boxes with an icon and a short label, or a broken-image
fallback that gracefully swaps in). Drop the real files at the **exact paths**
below and they'll appear automatically — no code changes needed.

## Profile photo (Hero section)

| Path | Format | Notes |
|---|---|---|
| `client/public/images/profile-hero.png` | PNG, **transparent background** | Recommended height ~1200px, portrait crop from the waist/chest up. This is the large cutout shown on the right side of the Hero section. |

## Resume

| Path | Format | Notes |
|---|---|---|
| `client/public/resume/Alberto-Enano-Jr-Resume.pdf` | PDF | Linked from the "Download Resume" button in the Hero section. |

## Education illustration

| Path | Format | Notes |
|---|---|---|
| `client/public/illustrations/education.svg` | SVG (or PNG/JPG — update the extension in `client/src/data/education.ts` if so) | Shown beside the Education section. Any clean, on-brand illustration works (undraw.co-style line art fits the monochrome + blue-accent palette well). |

## Floating character (between Skills and Projects)

| Path | Format | Notes |
|---|---|---|
| `client/public/illustrations/floating-character.png` | PNG, **transparent background** | Small (~200–400px) character/mascot illustration. It animates continuously (float + rotate + parallax + mouse tilt), so simple, bold shapes read best. |

## Project screenshots

| Path | Format | Notes |
|---|---|---|
| `client/public/projects/procurement-system.jpg` | JPG/PNG, 16:9 | |
| `client/public/projects/bidding-system.jpg` | JPG/PNG, 16:9 | |
| `client/public/projects/fleet-ledger-system.jpg` | JPG/PNG, 16:9 | |
| `client/public/projects/truck-management-system.jpg` | JPG/PNG, 16:9 | |
| `client/public/projects/company-website.jpg` | JPG/PNG, 16:9 | |
| `client/public/projects/pcl-academy-automation.jpg` | JPG/PNG, 16:9 | |

Also update, per project, in `client/src/data/projects.ts`:
- `description` — currently a reasonable placeholder marked `// TODO`
- `githubUrl` / `liveUrl` — currently `"#"` placeholders

## Certificate scans

| Path | Format | Notes |
|---|---|---|
| `client/public/certificates/tesda-css.jpg` | JPG/PNG, 4:3 | TESDA NC II – Computer Systems Servicing |
| `client/public/certificates/ieee-conference.jpg` | JPG/PNG, 4:3 | IEEE Student Conference Presentation |

Also update, in `client/src/data/certificates.ts`:
- `year` — currently `"TODO"` (exact year wasn't provided)
- `certificateUrl` — currently `"#"` placeholder (link to a hosted copy, if any)

## Gallery photos

| Path | Format | Notes |
|---|---|---|
| `client/public/images/gallery/activity-1.jpg` through `activity-6.jpg` | JPG/PNG, 4:3 | Scrollable carousel of activity photos. Add/remove entries in `client/src/data/gallery.ts` if you have more or fewer than 6. |

## Social links

Not an image asset, but similarly placeholder — update
`client/src/data/socials.ts` with your real GitHub, LinkedIn, and Facebook
profile URLs (currently `"#"`).

## Open Graph / social preview image

| Path | Format | Notes |
|---|---|---|
| `client/public/images/og-image.jpg` | JPG/PNG, 1200×630 | Shown when the site link is shared on social media / messaging apps. |

## Production domain

Once deployed, replace the placeholder domain
(`https://alberto-enano-portfolio.vercel.app`) in:
- `client/src/data/seo.ts` (`siteUrl`)
- `client/public/robots.txt`
- `client/public/sitemap.xml`
