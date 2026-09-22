# Code4Cause website

A refreshed version of the original static HTML, CSS, and JavaScript site. There is no framework, runtime dependency, external font, tracker, or icon CDN. Generated HTML is checked in so a static host can serve the repository directly, and all content and navigation work without JavaScript.

## Edit content

**Edit `content.json`, then run `npm run build`.** This is the source of truth for all visible copy, statistics, navigation labels, founder information, contact details, and SEO text. Do not edit generated HTML directly. The build generates seven HTML pages, optimized images, the social preview, favicons, sitemap, and robots.txt.

The original photos and logo remain untouched. `assets/` contains optimized, metadata-stripped versions used on the live pages. Non-founder photos and the old flyer are retained in the repository, but not shown because no current facts were supplied for them. Original speculative project descriptions and stale status claims have been replaced with the supplied program outcomes.

## Local development

Use Node.js 22.12+ or 24.3+ (required by the image build tool).

```sh
npm ci
npm run build
npm start
```

Open http://127.0.0.1:4173. Editing styles.css or script.js needs only a browser refresh; content and template changes need a rebuild. Templates live in scripts/build.mjs.

```sh
npm test
# With the preview server running and Google Chrome installed:
npm run test:browser
```

The browser suite checks every main and legacy page at 360, 390, 768, and 1440 pixels, axe WCAG A/AA checks, mobile menu opening/closing/Escape focus, loaded images, horizontal overflow, JavaScript errors, and navigation with JavaScript disabled. Screenshots are written to test-results/.

## Domain and publishing

The production domain is `https://code4cause.com/`, served by GitHub Pages from `risharaom/website` on `master`. The checked-in CNAME file binds the custom domain. Namecheap BasicDNS has four apex A records (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a www CNAME to risharaom.github.io. Keep CNAME when publishing. A repository administrator can enable Enforce HTTPS in Settings → Pages once GitHub issues the certificate.

1. Set `site.url` to your final HTTPS domain, including any subdirectory and a trailing slash.
2. Run `npm run build` and `npm test`.
3. Publish the generated HTML, styles.css, script.js, assets/, sitemap.xml, and robots.txt to your static host. No Node server is needed in production.
4. Configure your hosting provider’s custom domain and DNS. If using GitHub Pages, set the custom domain in repository Settings → Pages and preserve the resulting CNAME file. If the site is hosted at the domain root, robots.txt will be discoverable there. For project-subdirectory hosting, submit the sitemap directly in your search console.

Legacy `meetings.html` and the formerly broken `team.html` render the About page and canonicalize to about.html, with noindex to avoid duplicate search results. `mission.html` remains a real, updated mission page. The 404 page uses absolute asset and navigation URLs so it also works from nested invalid paths; these use the configured production domain.

## Content boundaries

The Afghanistan reach statement explicitly belongs to the larger collaborative effort; it is not presented as Code4Cause’s individual impact. Collaborators appear as text treatments, not fabricated official logos. There are no donation, signup, chapter-directory, or paper-download claims without real destinations.

Useful additions when available: a public GreenSight paper, a verified chapter directory, consented program photos, permission to use collaborator logos, and a clear chapter-interest/application process.
