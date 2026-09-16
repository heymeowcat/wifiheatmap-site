/**
 * SEO / Core Web Vitals audit for the built site.
 *
 *   npm run build && npm run seo:audit
 *
 * Checks every generated HTML page for:
 *   - exactly one <h1>
 *   - no heading-level skips
 *   - a unique, non-empty <title> and meta description
 *   - a canonical URL matching the site + base path
 *   - indexable robots directives
 *   - Open Graph + Twitter card tags including a real og:image
 *   - valid JSON-LD
 *   - alt text on every <img>
 *   - internal links that resolve to a real file
 *   - images with explicit dimensions (CLS)
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist");
const ORIGIN = "https://heymeowcat.is-a.dev";
const BASE = "/wifiheatmap-site";

/**
 * `--check-links` additionally HEAD-requests every external link.
 * It is opt-in because it makes the audit network-dependent and slow.
 */
const CHECK_EXTERNAL = process.argv.includes("--check-links");

const errors = [];
const warnings = [];
const notes = [];

function fail(file, message) {
	errors.push(`${file}: ${message}`);
}
function warn(file, message) {
	warnings.push(`${file}: ${message}`);
}

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			yield* walk(full);
		} else {
			yield full;
		}
	}
}

async function exists(target) {
	try {
		await stat(target);
		return true;
	} catch {
		return false;
	}
}

function attr(tag, name) {
	const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"));
	return m ? m[1] : null;
}

const htmlFiles = [];
for await (const file of walk(DIST)) {
	if (file.endsWith(".html")) htmlFiles.push(file);
}
htmlFiles.sort();

const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const externalLinks = new Set();

for (const file of htmlFiles) {
	const rel = path.relative(DIST, file).replace(/\\/g, "/");
	const html = await readFile(file, "utf8");

	// Redirect stubs are not real pages — only the canonical matters.
	const isRedirectStub = html.includes('http-equiv="refresh"');
	if (isRedirectStub) {
		const stubCanonical = attr(
			html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? "",
			"href",
		);
		if (!stubCanonical?.startsWith(`${ORIGIN}${BASE}`)) {
			fail(rel, `redirect stub canonical is wrong: ${stubCanonical}`);
		}
		const refresh = attr(
			html.match(/<meta[^>]*http-equiv="refresh"[^>]*>/)?.[0] ?? "",
			"content",
		);
		if (!refresh?.includes(BASE)) {
			fail(rel, `redirect stub refresh URL is missing the base path`);
		}
		continue;
	}

	// 404 pages must not be indexed, but need no other SEO furniture.
	const isNotFound = rel === "404.html";

	// --- 1. Exactly one <h1> -----------------------------------------
	const h1s = html.match(/<h1[\s>]/g) ?? [];
	if (h1s.length === 0) {
		fail(rel, "no <h1> found");
	} else if (h1s.length > 1) {
		fail(rel, `${h1s.length} <h1> tags found (expected exactly 1)`);
	}

	// --- 2. Heading hierarchy ----------------------------------------
	const levels = [
		...html.matchAll(/<h([1-6])[\s>]/g),
	].map((m) => Number(m[1]));
	for (let i = 1; i < levels.length; i += 1) {
		if (levels[i] - levels[i - 1] > 1) {
			warn(
				rel,
				`heading level jumps from h${levels[i - 1]} to h${levels[i]}`,
			);
		}
	}

	// --- 3. Title ----------------------------------------------------
	const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
	if (!title) {
		fail(rel, "missing <title>");
	} else {
		const length = title.length;
		if (length < 25) warn(rel, `title is only ${length} characters`);
		if (length > 65) warn(rel, `title is ${length} characters (over 65)`);
		if (titles.has(title)) {
			fail(rel, `duplicate <title> with ${titles.get(title)}`);
		} else {
			titles.set(title, rel);
		}
	}

	// --- 4. Meta description ----------------------------------------
	const description = attr(
		html.match(/<meta[^>]*name="description"[^>]*>/)?.[0] ?? "",
		"content",
	);
	if (!description) {
		fail(rel, "missing meta description");
	} else {
		const length = description.length;
		if (length < 70) warn(rel, `meta description is only ${length} characters`);
		if (length > 160)
			warn(rel, `meta description is ${length} characters (over 160)`);
		if (descriptions.has(description)) {
			fail(rel, `duplicate meta description with ${descriptions.get(description)}`);
		} else {
			descriptions.set(description, rel);
		}
	}

	// --- 5. Canonical ------------------------------------------------
	const canonical = attr(
		html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? "",
		"href",
	);
	if (!canonical) {
		fail(rel, "missing canonical link");
	} else if (!canonical.startsWith(`${ORIGIN}${BASE}`)) {
		fail(rel, `canonical points outside the site: ${canonical}`);
	} else if (!canonical.endsWith("/")) {
		warn(rel, `canonical does not end with a slash: ${canonical}`);
	}

	// --- 6. Robots ----------------------------------------------------
	const robots = attr(
		html.match(/<meta[^>]*name="robots"[^>]*>/)?.[0] ?? "",
		"content",
	);
	if (isNotFound) {
		if (!robots?.startsWith("noindex")) {
			fail(rel, "404 page must be noindex");
		}
	} else {
		if (!robots) fail(rel, "missing robots meta");
		else if (robots.startsWith("noindex"))
			fail(rel, "page is noindex but should be indexable");
	}

	// --- 7. Open Graph / Twitter -------------------------------------
	for (const property of ["og:title", "og:description", "og:image", "og:url"]) {
		if (!html.includes(`property="${property}"`)) {
			fail(rel, `missing ${property}`);
		}
	}
	for (const name of ["twitter:card", "twitter:title", "twitter:image"]) {
		if (!html.includes(`name="${name}"`)) fail(rel, `missing ${name}`);
	}

	const ogImage = attr(
		html.match(/<meta[^>]*property="og:image"[^>]*>/)?.[0] ?? "",
		"content",
	);
	if (ogImage) {
		if (!ogImage.startsWith("https://")) {
			warn(rel, `og:image is not absolute: ${ogImage}`);
		}
		const ogPath = new URL(ogImage).pathname;
		// The site is served from BASE, so strip it before looking in dist/.
		const ogRelative = ogPath.startsWith(BASE)
			? ogPath.slice(BASE.length) || "/"
			: ogPath;
		if (!(await exists(path.join(DIST, ogRelative.replace(/^\//, ""))))) {
			fail(rel, `og:image file does not exist: ${ogPath}`);
		}
	}

	// --- 8. JSON-LD ---------------------------------------------------
	const jsonLd = [
		...html.matchAll(
			/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
		),
	];
	if (jsonLd.length === 0 && !isNotFound) {
		warn(rel, "no JSON-LD structured data");
	}
	for (const [, raw] of jsonLd) {
		try {
			JSON.parse(raw);
		} catch (error) {
			fail(rel, `invalid JSON-LD: ${error.message}`);
		}
	}

	// --- 9. Image alt text --------------------------------------------
	for (const tag of html.match(/<img[^>]*>/g) ?? []) {
		if (!/\salt\s*=/.test(tag)) {
			fail(rel, `<img> without alt attribute: ${tag.slice(0, 90)}`);
		} else if (attr(tag, "alt") === "") {
			// An empty alt is correct only for decorative images.
			if (!/aria-hidden|role="presentation"|role="none"/.test(tag)) {
				warn(rel, `<img alt="" but not marked decorative`);
			}
		}
		if (!/\bwidth\s*=/.test(tag) || !/\bheight\s*=/.test(tag)) {
			warn(rel, `<img> without explicit width/height (CLS risk)`);
		}
		if (!/\bloading\s*=/.test(tag)) {
			warn(rel, `<img> without a loading attribute`);
		}
	}

	// --- 10. Internal links -------------------------------------------
	for (const tag of html.match(/<a[^>]*href="[^"]*"[^>]*>/g) ?? []) {
		const href = attr(tag, "href");
		if (!href) continue;
		if (href.startsWith("#") || href.startsWith("mailto:")) continue;
		if (/^https?:\/\//.test(href)) {
			if (!href.startsWith(`${ORIGIN}${BASE}`)) {
				notes.push(`${rel}: external link → ${href}`);
				externalLinks.add(href);
			}
			continue;
		}
		if (!href.startsWith(BASE)) {
			fail(rel, `internal link missing the base path: ${href}`);
			continue;
		}
		internalLinks.add(href);
	}
}

// --- 11. Internal link targets resolve --------------------------------
for (const href of internalLinks) {
	const clean = href.split("#")[0].split("?")[0];
	// Strip the deployment base path before looking inside dist/.
	const relative = clean.startsWith(BASE) ? clean.slice(BASE.length) : clean;
	const candidates = [
		path.join(DIST, relative.replace(/^\/+/, ""), "index.html"),
		path.join(DIST, relative.replace(/^\/+/, "")),
	];
	let found = false;
	for (const candidate of candidates) {
		if (await exists(candidate)) {
			found = true;
			break;
		}
	}
	if (!found) fail("link-check", `broken internal link: ${href}`);
}

// --- 12. Required files exist -----------------------------------------
for (const required of ["sitemap.xml", "robots.txt", "og-image.png", "404.html"]) {
	if (!(await exists(path.join(DIST, required)))) {
		fail("dist", `missing required file: ${required}`);
	}
}

// --- 13. robots.txt points at the sitemap -----------------------------
const robotsTxt = await readFile(path.join(DIST, "robots.txt"), "utf8");
if (!robotsTxt.includes(`${ORIGIN}${BASE}/sitemap.xml`)) {
	fail("robots.txt", "does not reference the sitemap with the correct base path");
}
if (!/^User-agent:\s*\*/m.test(robotsTxt)) {
	fail("robots.txt", "missing a wildcard User-agent rule");
}

// --- 14. Sitemap is valid XML and lists every indexable page ----------
const sitemap = await readFile(path.join(DIST, "sitemap.xml"), "utf8");
if (!sitemap.startsWith("<?xml")) fail("sitemap.xml", "missing XML declaration");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length < htmlFiles.length - 4) {
	warn("sitemap.xml", `only ${locs.length} URLs for ${htmlFiles.length} pages`);
}
for (const loc of locs) {
	if (!loc.startsWith(`${ORIGIN}${BASE}`)) {
		fail("sitemap.xml", `URL outside the site base path: ${loc}`);
	}
}
for (const page of ["/", "/features/floorplan-heatmap/", "/features/spectrum-analyzer/", "/features/channel-rating/", "/features/network-tools/", "/guides/wifi-channel-guide/", "/resources/", "/about/", "/changelog/", "/privacy/", "/terms/"]) {
	if (!locs.some((loc) => loc === `${ORIGIN}${BASE}${page}`)) {
		fail("sitemap.xml", `missing page: ${page}`);
	}
}

// --- 14b. External links resolve (opt-in) -----------------------------
if (CHECK_EXTERNAL) {
	const UA =
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
	for (const href of externalLinks) {
		try {
			const response = await fetch(href, {
				method: "GET",
				redirect: "follow",
				headers: { "User-Agent": UA },
				signal: AbortSignal.timeout(20000),
			});
			if (!response.ok) {
				fail("link-check", `broken external link (${response.status}): ${href}`);
			}
		} catch (error) {
			// Network/TLS/sandbox failures are environment-specific, not proof
			// that the link is broken — report them but do not fail the build.
			warn(
				"link-check",
				`could not verify external link: ${href} (${error.message})`,
			);
		}
	}
	console.log(`Checked ${externalLinks.size} external links.\n`);
}

// --- Report ------------------------------------------------------------
console.log(`\nAudited ${htmlFiles.length} HTML pages.\n`);
if (notes.length) {
	console.log(`External links (${notes.length}):`);
	for (const note of notes) console.log(`  · ${note}`);
	console.log("");
}
if (warnings.length) {
	console.log(`Warnings (${warnings.length}):`);
	for (const warning of warnings) console.log(`  ! ${warning}`);
	console.log("");
}
if (errors.length) {
	console.log(`Errors (${errors.length}):`);
	for (const error of errors) console.log(`  ✗ ${error}`);
	console.log("");
	process.exitCode = 1;
} else {
	console.log("✓ No SEO errors.\n");
}
