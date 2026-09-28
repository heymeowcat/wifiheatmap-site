// @ts-check
import { defineConfig } from "astro/config";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";

/**
 * Canonical origin. Kept in one place so that Layout.astro, the sitemap
 * endpoint and robots.txt can never drift apart.
 */
export const SITE = "https://heymeowcat.is-a.dev";

/**
 * Sub-path the site is served from on GitHub Pages.
 * Change this AND the `base` below if the project ever moves to a root
 * domain or a custom domain.
 */
export const BASE = "/wifiheatmap-site";

/**
 * Astro emits static redirect stubs for the legacy slugs, but it builds the
 * `refresh` URL and the canonical tag from `site` only — so they end up
 * missing the `/wifiheatmap-site` base path and point at a URL that does
 * not exist. This hook rewrites them after the build.
 */
function fixRedirectStubs() {
	return {
		name: "wifiheatmap:fix-redirect-stubs",
		hooks: {
			"astro:build:done": async ({ dir, logger }) => {
				/** @param {string} dirPath */
				async function* walk(dirPath) {
					for (const entry of await readdir(dirPath, { withFileTypes: true })) {
						const full = path.join(dirPath, entry.name);
						if (entry.isDirectory()) {
							yield* walk(full);
						} else if (entry.name.endsWith(".html")) {
							yield full;
						}
					}
				}

				let fixed = 0;
				for await (const file of walk(dir.pathname.replace(/\/$/, ""))) {
					const html = await readFile(file, "utf8");
					if (!html.includes('http-equiv="refresh"')) continue;

					// CI may override --site (e.g. with http:// when HTTPS is
					// not enforced yet), so match the host on either protocol
					// and rebuild every URL the same way from SITE and BASE.
					const prefixBase = (target) => {
						if (!target.startsWith("/")) return target;
						if (target === BASE || target.startsWith(`${BASE}/`)) {
							return target;
						}
						return `${BASE}${target}`;
					};

					const updated = html
						.replace(
							/(<meta http-equiv="refresh" content="0;url=)([^"]+)(")/g,
							(_m, before, target, after) =>
								`${before}${prefixBase(target)}${after}`,
						)
						.replace(
							/(<link rel="canonical" href=")(https?:\/\/heymeowcat\.is-a\.dev)?(\/[^"]*)(")/g,
							(_m, before, _host, target, after) =>
								`${before}${SITE}${prefixBase(target)}${after}`,
						)
						.replace(
							/(<body>\s*<a href=")([^"]+)(")/g,
							(_m, before, target, after) =>
								`${before}${prefixBase(target)}${after}`,
						);

					if (updated !== html) {
						await writeFile(file, updated, "utf8");
						fixed += 1;
					}
				}
				logger.info(`Fixed ${fixed} redirect stub canonical(s).`);
			},
		},
	};
}

export default defineConfig({
	site: SITE,
	base: BASE,

	// Every URL ends with a slash. This keeps canonical tags, the sitemap and
	// internal links byte-identical, which stops Google seeing duplicate
	// /privacy and /privacy/ variants of the same page.
	trailingSlash: "always",
	build: {
		format: "directory",
		inlineStylesheets: "auto",
	},

	// Legacy slugs -> clean slugs. Astro emits static redirect stubs; the
	// matching 301s live in public/_redirects and public/.htaccess.
	redirects: {
		"/privacy-policy": "/privacy",
		"/terms-of-service": "/terms",
		"/features": "/features/floorplan-heatmap/",
	},

	// Prefetch on hover/viewport so internal navigation feels instant
	// without shipping a heavy router.
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [fixRedirectStubs()],
});
