# Backlink & Off-Page SEO Strategy — WifiHeatmap

**Site:** https://heymeowcat.is-a.dev/wifiheatmap-site/
**Product:** WifiHeatmap: Signal & Analyzer (Google Play) — free, offline Android Wi-Fi analyser & indoor site survey app
**Owner:** HEYMEOWCAT (Vidura Dulanjan Fernando, Sri Lanka)
**Updated:** 22 October 2026

---

## 1. Why backlinks matter here (and where they do *not*)

WifiHeatmap competes against a small number of well-known Android Wi-Fi analyser apps.
Those competitors rank because they have (a) a domain with exact-match commercial
intent, (b) hundreds of app-directory and blog citations, and (c) years of review-site
backlinks. We cannot outspend them on domain authority, and we should not try.

What we *can* do is own a niche they mostly ignore:

| Niche | Competition | Our angle |
| --- | --- | --- |
| "Android Wi-Fi analyser" | Heavy, commercial | Long-tail only |
| "Wi-Fi heatmap app" | Very light | **Primary target** |
| "indoor Wi-Fi site survey app" | Almost nobody | **Primary target** |
| "Wi-Fi channel guide" / "best Wi-Fi channel" | Content-heavy, but link-earning | **Secondary target** |
| "offline / private Wi-Fi analyser" | Light | **Differentiator** |

The goal is not "500 backlinks". The goal is **15–25 genuinely relevant, editorial,
do-follow links** pointing at the pages that rank, plus enough top-level domain
variety to look natural. That is achievable for a solo developer with a genuinely
useful free tool.

### The golden rule

> A link to a page that ranks is worth ~20× a link to the homepage.
> Never point every backlink at `/`.

---

## 2. Link targets (the URL map)

| Target URL | Anchor text to aim for | Priority |
| --- | --- | --- |
| `/features/floorplan-heatmap/` | "Wi-Fi heatmap app", "indoor Wi-Fi survey app", "floor plan Wi-Fi heatmap" | ★★★ |
| `/features/spectrum-analyzer/` | "Wi-Fi spectrum analyzer for Android", "6 GHz spectrum app" | ★★ |
| `/features/channel-rating/` | "Wi-Fi channel rating tool", "best channel finder" | ★★ |
| `/features/network-tools/` | "Android network diagnostic tool", "ping and traceroute app" | ★ |
| `/guides/wifi-channel-guide/` | "which Wi-Fi channel should I use", "2.4 GHz channel guide" | ★★★ |
| `/resources/` | "Wi-Fi analysis resources", "802.11 channel reference" | ★ |
| `/about/` | "WifiHeatmap by HEYMEOWCAT", "open-source Wi-Fi analyser" | ★ |
| `/changelog/` | "WifiHeatmap release notes" | — |
| `/` | brand name only | ★ |

**Target mix:** ~60% of links to feature/guide pages, ~25% to the homepage,
~15% to `/about/` or `/changelog/`.

---

## 3. On-site mechanisms already implemented

These are the technical prerequisites. Without them, outreach has nothing to land on.

- [x] **Clean, stable URL slugs** — lowercase, hyphenated, trailing slash, no
      parameters, no session IDs. Legacy `/privacy-policy` and `/terms-of-service`
      301 to `/privacy/` and `/terms/`.
- [x] **Single canonical per page** — every page emits an absolute
      `https://heymeowcat.is-a.dev/wifiheatmap-site/...` canonical.
- [x] **No `noindex` on indexable content** — only the 404 page is `noindex, follow`.
- [x] **sitemap.xml** — single, hand-curated sitemap with per-URL `priority`,
      `changefreq` and honest `lastmod`. Referenced from `robots.txt` and from
      `<link rel="sitemap">`.
- [x] **robots.txt** — generated from the same constants as the sitemap, so they
      cannot drift. `Disallow` on the legacy redirect stubs only.
- [x] **Schema markup** — `Organization` (with `sameAs` → GitHub + Google Play),
      `WebSite`, `MobileApplication` (with `featureList`, `offers`,
      `permissions`, `aggregateRating`), `FAQPage` on every FAQ block,
      `BreadcrumbList` on every page, `Article` on the guide, `CollectionPage`
      on the resources page.
- [x] **Real content depth** — a 1,900-word guide, four feature pages, a
      references page and an about page. Link builders reject thin pages.
- [x] **Author entity + E-E-A-T** — named author with a link to `/about/`,
      organisation details, "no data collected" claim backed by public source code.
- [x] **Open-source repo link** in the header, footer, about page, resources page
      and the guide — every visitor is offered a GitHub link, which is the most
      reliable source of editorial links.
      *(Currently gated behind `APP_REPO_PUBLIC` in `src/config.ts` because the
      repository is private — see §4.1.)*
- [x] **Outbound citations to authoritative sources** (IEEE, ITU-T, Wikipedia,
      Android docs, upstream project wiki) — reciprocal-link opportunities and a
      trust signal.
- [x] **Performance** — no third-party requests, 1 kB of JS, self-hosted fonts,
      `webp` images with explicit dimensions. Link builders check Core Web Vitals
      and bounce on slow sites.
- [x] **HTTPS** — enforced, with HSTS, `X-Content-Type-Options`,
      `Referrer-Policy` and `Permissions-Policy`.

---

## 4. Tier 1 — high-value, high-probability link opportunities

### 4.1 GitHub (highest ROI, fastest)

The app is GPL-3.0 and the source repository exists, but it is **currently
private**. That is the single highest-priority action in this whole document —
every GitHub backlink below depends on it, and the website currently hides the
source-code links so that no visitor hits a 404.

| Action | Effort | Expected links |
| --- | --- | --- |
| **Make `heymeowcat/WifiHeatmap-Android` public**, then set `APP_REPO_PUBLIC = true` in `src/config.ts` and redeploy — this switches on every source-code link and the `sameAs` schema entry | 15 min | Unlocks the rest of this table |
| Add the website URL to the repo "About" sidebar, the README header and the README footer | 15 min | 1 (high-value, do-follow) |
| Add a `homepage:` field to `app/build.gradle` metadata so the Play listing and GitHub both show the site | 5 min | 1 |
| Ensure the Play Store listing's **website** field points at the site | 5 min | 1 (via the Play listing) |
| Create a GitHub **topic** on the repo: `wifi-analyzer`, `wifi`, `android`, `spectrum-analyzer`, `site-survey`, `heatmap`, `wlan` | 10 min | Discovery + topical relevance |
| File/feature-request or comment on the **upstream** project (`VREMSoftwareDevelopment/WiFiAnalyzer` — note the repo was renamed) pointing at the fork and the new features | 20 min | 1–2 |
| Star the repo from the developer's own secondary account and get 3–5 relevant engineers to star it (no mass-star spam) | ongoing | Brand + modest authority |
| Enable **GitHub Sponsors** and a sponsor button in the README | 10 min | Earned-media mentions |
| Publish a GitHub **release** for each version and link the changelog page from it | 30 min/quarter | 1/release |
| Submit the repo to **awesome-android**, **awesome-open-source-apps**, `open-source-android-apps` type lists | 45 min | 2–4 |
| Get the app listed in **F-Droid** metadata (the repo is GPL-3.0 and self-buildable) | 2 h | 1–2 + F-Droid badge |

### 4.2 Alternative Android app stores (each is a do-follow link)

Every store listing gives a link, and each brings its own users.

- [ ] **F-Droid** — https://f-droid.org/packages/com.heymeowcat.wifiheatmap/
- [ ] **IzzyOnDroid** — https://izzyonroid.com/
- [ ] **APKMirror / APKPure** — request inclusion
- [ ] **Aurora Store** listing
- [ ] **Huawei AppGallery / Xiaomi GetApps / Samsung Galaxy Store** — if the app passes review
- [ ] **Obtainium** — for automatic APK installs from GitHub releases

> Keep the **canonical store** as Google Play. Do not `rel=canonical` across stores —
> each listing is a legitimate, distinct page that should rank on its own.

### 4.3 App directories & aggregators

| Target | URL pattern | Note |
| --- | --- | --- |
| APKPure | `/app/com.heymeowcat.wifiheatmap/` | Submission form |
| APKMirror | `/u/.../` | Needs a release APK |
| AppBrain | `/com.heymeowcat.wifiheatmap/` | Strong Google indexing |
| AppAgg | `/android/apps/com.heymeowcat.wifiheatmap/` | |
| APKCombo | `/com.heymeowcat.wifiheatmap/` | |
| AppCrawler | `/com.heymeowcat.wifiheatmap/` | |
| AppBrain alternatives | `androidrank.org`, `appbrain.com`, `chrome-stats.com` | |
| Softpedia / FossHub / Fosses | — | Open-source friendly |
| **WowSuch** / **AlternativeTo** | — | AlternativeTo needs a "alternative to" entry |
| **Slated** | — | Privacy-focused, good fit |
| **Privacy Tools** directories | `priv.au`, `alternativeto.net` | Strong angle: offline + no telemetry |

Each of these is a unique referring domain for a 40-link target.

### 4.4 Reddit & technical communities

Reddit is where people actually ask "which Android Wi-Fi analyser should I use?".
This is the highest-converting traffic source available, and it also produces links.

**Do this — do not spam:**

1. Read the rules of each subreddit first. `r/androidapps`, `r/android`,
   `r/networking`, `r/ITProfessionals`, `r/wireless`, `r/homeautomation`,
   `r/sysadmin`, `r/androidquestions`.
2. Answer questions with genuine technical depth. Link the app **only** when it is
   actually the answer.
3. When you post the app, be transparent: "I made this", disclose the affiliation.
   Reddit users and moderators punish stealth marketing, and Google discounts
   it heavily.
4. Add `rel="nofollow"` to Reddit links even when Reddit allows follow — it
   protects the site from a manual action and costs nothing.
5. Never use the same comment twice. Never use a VPN to evade filters.

**High-signal question formats to answer:**

- "Best free Wi-Fi analyzer for Android?" → link `/`
- "Any app that can map Wi-Fi coverage on a floor plan?" → link
  `/features/floorplan-heatmap/`
- "How do I find the best channel on my router?" → link
  `/guides/wifi-channel-guide/`
- "How do I see what channel my neighbours are on?" → link
  `/features/channel-rating/`

### 4.5 Hacker News & Lobsters

- Do **not** submit the homepage. Submit something with a technical angle:
  "Show HN: I built a Wi-Fi site survey tool that runs entirely on-device
  (Android, GPL-3.0)" — the interesting part is the **PDR + IDW** implementation.
- Include the GitHub repo, not just the marketing site. HN readers link to code.
- Best window: Tuesday–Thursday, 8–10am US Eastern.
- If it does not take off in the first 2 hours, do not resubmit.

### 4.6 Indie Hackers, Product Hunt, BetaList

- **Product Hunt** — launch with the heatmap survey GIF as the hero. Every PH
  launch generates a permanent link and a badge you can embed on the site.
- **Indie Hackers** — write a build-in-public post about the PDR/IDW maths.
- **BetaList** — only if you plan a beta.
- **HackerNoon** — repurpose the channel guide into a technical article. Dev.to
  and Medium syndication each produce a link.

---

## 5. Tier 2 — guest posts & editorial outreach

### 5.1 Publications that actually accept Wi-Fi content

| Publication | Angle | How to pitch |
| --- | --- | --- |
| **Network World** | "How to read a channel graph" | Pitch the editor with the guide outline |
| **Ars Technica** | Android permissions & Wi-Fi scanning | Only if a reviewer asks |
| **How-To Geek / Lifewire / TechRadar** | Consumer channel switching | Requires a free review copy |
| **The Ambient / SmallNetBuilder** | Home network troubleshooting | Very receptive to free tools |
| **IEEE Spectrum** | "Why Wi-Fi stinks" follow-up | Long shot but highest authority |
| **Opensource.com / Linuxiac / It's FOSS** | GPL-3.0 Android app | Very receptive |
| **DebugMode / AddictiveTips / TechRadar** | "Best Wi-Fi apps for Android" roundups | Highest priority — see below |

### 5.2 The roundup play (highest ROI)

Existing roundups already rank for "best Wi-Fi analyzer for Android".
Every roundup that includes us is a link from an established domain.

**Target list to work through:**

1. `techradar.com` — Best Android Wi-Fi apps
2. `howtogeek.com` — Wi-Fi tools
3. `androidpolice.com` — Best Android network tools
4. `pcmag.com` — Wi-Fi analyser picks
5. `tomsguide.com` — Wi-Fi channel advice
6. `makeuseof.com` — Android utilities
7. `theguruinfo.com`, `gadgethints.com`, `digitbin.com` — Android app lists

**How to get in:** these outlets rarely accept unsolicited guest posts, but they
*do* accept new-app coverage and they *do* add apps to existing listicles when
the app is genuinely better for a specific use case. The pitch:

> Subject: Wi-Fi app that maps coverage on your floor plan (offline, GPL)
>
> Hi [name],
>
> Most Wi-Fi analyser apps show you a list of access points. I built one that
> maps coverage on an imported floor plan: it tracks your walk with the phone's
> step detector and magnetometer, then interpolates signal strength between
> your samples with inverse distance weighting.
>
> It runs fully offline, has no ads and no telemetry, and the source is GPL-3.0.
> If it fits your "best Android Wi-Fi apps" roundup as the heatmap/site-survey
> option, I'd be glad to send you the Play link and a couple of screenshots.
>
> — Vidura

Send **one** email, follow up once after seven days, then move on.

### 5.3 Podcast and newsletter outreach

- **Packet Pushers** — network engineering community, very relevant audience.
- **Wireless Wednesday** / **The Wi-Fi Show** podcasts.
- **This Week in Tech** (older format, still accepting guest ideas).
- **TLDR, Ben's Bites, Hacker Newsletter** — developer/tool picks.

**Newsletter swap:** offer a short, genuinely useful piece ("The three rules
that decide your 2.4 GHz channel") in exchange for a link.

---

## 6. Tier 3 — programmatic & long-tail link building

### 6.1 A genuinely useful free tool (the strongest link magnet in this category)

Build one small, embeddable, linkable widget. Every tool page in this niche
(calculators, channel planners, dBm converters) attracts links because people
embed them.

**Recommendation — "Wi-Fi Channel Overlap Checker":**

> Enter your SSIDs and channels (or let the page read them from a screenshot),
> and it draws a 2.4 GHz overlap map showing exactly which channels collide.

- Hosted at `heymeowcat.is-a.dev/wifiheatmap-site/tools/channel-overlap/`
- Client-side only, no tracking, no API
- "Embed this on your site" button that outputs a small `<iframe>` with a link
  back — **this is the link mechanism**
- Add a `SoftwareApplication` + `WebApplication` schema

Each embed is a permanent, do-follow, contextually relevant link.

### 6.2 Data-driven pages

Publish a page that ranks on its own merits and is worth citing:

- "2.4 GHz channel overlap chart" (the table in the guide, as its own page)
- "dBm to signal quality converter" — tiny, linkable, frequently cited
- "Wi-Fi channel list by country" — needs a data source; the app already
  supports a country code setting, so the data exists

Each of these is a candidate for "here's a useful chart, here's the source"
links from forums, blogs and Stack Exchange answers.

### 6.3 Stack Exchange & SuperUser

`superuser.com`, `networkengineering.stackexchange.com` and
`android.stackexchange.com` are full of exactly the questions this app answers.

- Answer thoroughly, with the technical detail the question deserves.
- Link only when the app is the right answer, and link the **specific feature
  page**, not the homepage.
- Reputation unlocks `StackPrinter` and the ability to post a canonical link.
- Do not spam: the community downvotes and mods remove low-quality self-promotion.

### 6.4 Wikipedia & Wikidata

Wikipedia is the highest-authority link on the internet.

- Check `List of Wi-Fi analyzing software` / `Network diagnostic software` /
  `Android applications` for an existing entry that should point at the fork.
- The upstream VREM project is already referenced in academic and Wikipedia
  contexts — the fork's additional features (PDR, IDW, AR view) justify a
  mention in the discussion of RF site survey tooling.
- Be aware of conflict-of-interest rules: a "disclosed relationship" note is
  required.

### 6.5 Broken-link building

1. Use `Ahrefs` / `Semrush` free backlink checkers on competitor domains.
2. Find pages that link to a dead Wi-Fi analyser URL or an outdated guide.
3. Offer the replacement — a link to your guide.
4. Tools: [Dead Link Checker](https://www.deadlinkchecker.com/),
   [Check My Links](https://www.checkmylinks.org/),
   Google `"site:"` + `"404"`.

---

## 7. Anchor text plan

Over-optimisation is the fastest way to get a manual action. Use a natural mix.

| Type | Share | Examples |
| --- | --- | --- |
| Branded | 35% | "WifiHeatmap", "WifiHeatmap app", "WifiHeatmap for Android" |
| Exact-match | 25% | "Android Wi-Fi analyzer", "Wi-Fi heatmap app", "indoor Wi-Fi site survey app" |
| Partial-match | 20% | "Wi-Fi channel selection tool", "offline Wi-Fi analyzer", "spectrum analysis on Android" |
| Natural / URL | 15% | "this app", "the source code", "heymeowcat.is-a.dev" |
| Generic | 5% | "here", "read more", "tool" |

**Never** use commercial anchors like "best wifi analyzer", "top wifi app" or
"wifi analyzer free" — those are the exact phrases that trigger a manual
action, and they are also the phrases a brand anchor already covers.

**Self-linking rule:** when you control the linking domain (your own social
profiles, the GitHub repo, the Play listing), link the **homepage**. When a third
party links, let them link the **feature page** that matches their content.

---

## 8. Execution plan

### Week 1 — Foundations (do these before any outreach)
- [ ] Set the GitHub repo homepage + README links + topics
- [ ] Set the Play Store "website" field
- [ ] Enable GitHub Sponsors
- [ ] Create the social profiles: X/Twitter, LinkedIn, Reddit, Mastodon,
      Bluesky, YouTube, GitHub — all with the site in the bio
- [ ] Claim the brand name on: F-Droid, APKCombo, AppBrain, AlternativeTo,
      Product Hunt, BetaList, Hacker News (Show HN), Indie Hackers
- [ ] Submit to Bing Webmaster Tools and DuckDuckGo
- [ ] Submit to Google Search Console + submit `sitemap.xml`

### Week 2–3 — Content that earns links
- [ ] Publish the `/guides/wifi-channel-guide/` page (already live) and
      republish it as a Dev.to / Medium / HackerNoon article, canonical to the
      site
- [ ] Publish the `/resources/` page (already live) and share it on
      Reddit/HN as "a curated RF reference list"
- [ ] Write 3 short guest posts for the publications in §5.1
- [ ] Record a 60-second screen recording of the heatmap survey and post it as
      a native upload to X, Reddit, LinkedIn and Mastodon

### Week 4–8 — Outreach
- [ ] Work the roundup list (§5.2): 3 pitches/week
- [ ] Answer 5 relevant questions per week on Reddit, Stack Exchange and
      SuperUser, linking only where appropriate
- [ ] Submit to 10 app directories (§4.3)
- [ ] Release the "channel overlap checker" tool (§6.1)

### Ongoing
- [ ] One useful post per week (build log, RF explainer, survey teardown)
- [ ] Respond to every review on Google Play
- [ ] Re-check Search Console every month: pages with impressions but no clicks
      need a better title/description; pages with no impressions need internal
      links
- [ ] Re-run `npm run seo:audit` on every deploy

---

## 9. Measurement

Track monthly in Search Console + a backlink tool (Ahrefs free tier is enough to
start):

| Metric | 3-month target | 12-month target |
| --- | --- | --- |
| Referring domains (relevant) | 12 | 40 |
| Links to feature/guide pages | 20 | 70 |
| Indexed pages | 12 | 20+ (as content grows) |
| Non-brand clicks | 150/mo | 1,500/mo |
| Top 20 keywords for "wifi heatmap app" | 2 | 8 |
| Referring domain diversity | 8 unique | 25 unique |
| Google indexed pages | 12 | 20 |
| Play Store installs (referral-attributed) | 30/mo | 400/mo |

**Quarterly review:** for every page that gained impressions but not clicks,
rewrite the title and meta description. For every page that gained neither,
either add internal links pointing at it or merge it into a stronger page —
a site with 20 pages and no internal links between them will not rank.

---

## 10. What not to do

| Tactic | Why it fails |
| --- | --- |
| Buy links / PBNs | Manual action risk; the domain is a subdomain, so the penalty hits the whole `is-a.dev` namespace |
| Mass guest post blasts with the same anchor | Ignored by Google, penalised by recipients |
| Comment/link dropping on unrelated blogs | Spam signals, zero referral value |
| "Write for us" on major outlets | Rejected without an established byline |
| Exchange links with unrelated sites | Low relevance, no lasting value |
| Posting the same content to Medium/Dev.to without a canonical | Duplicate content; the Medium copy outranks your own site |
| Link-building to the homepage only | Concentrates authority on the page least likely to rank for long-tail terms |
| Buying an expired domain with existing Wi-Fi links | Expired-domain link networks are already discounted |

---

## 11. Quick reference — where to edit things

| What | Where |
| --- | --- |
| Site URL, base path, brand constants | `src/config.ts` |
| Navigation (header + footer) | `src/config.ts` → `NAV_LINKS` |
| Sitemap URL list + priorities | `src/pages/sitemap.xml.ts` |
| robots.txt | `src/pages/robots.txt.ts` |
| Per-page title + description | Frontmatter of each page in `src/pages/` |
| Schema markup | `src/lib/schema.ts` |
| HTTP→HTTPS + security headers | `public/_headers`, `public/_redirects`, `public/.htaccess` |
| Redirect stubs | `astro.config.mjs` → `redirects` |
| SEO regression check | `npm run seo:audit` |
