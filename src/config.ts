/**
 * Single source of truth for brand + metadata used across the site.
 */

export const SITE = {
	/** Canonical origin (no trailing slash). */
	origin: "https://heymeowcat.is-a.dev",
	/** Sub-path the site is served from. */
	base: "/wifiheatmap-site",
	name: "WifiHeatmap",
	/** Matches the live Google Play listing. */
	appName: "WifiHeatmap: Signal & Analyzer",
	tagline: "Wi-Fi Analyzer & Indoor Site Survey",
	description:
		"WifiHeatmap turns your Android phone into an offline Wi-Fi analyzer and indoor site survey tool: floorplan signal heatmaps, 2.4/5/6 GHz spectrum graphs and star-rated channel recommendations.",
	locale: "en_US",
	language: "en",
	themeColor: "#eef4fd",
	author: "Vidura Dulanjan Fernando",
	authorHandle: "HEYMEOWCAT",
	email: "heyvidura@gmail.com",
	country: "Sri Lanka",
} as const;

export const PLAY_STORE_URL =
	"https://play.google.com/store/apps/details?id=com.heymeowcat.wifiheatmap";

/**
 * The Android app's source repository.
 *
 * The repository is currently **private**, so the site does not link to it —
 * a dead link damages both trust and SEO. Set `APP_REPO_PUBLIC` to `true`
 * once the repository is public and every "source code" link, plus the
 * `sameAs` entry in the Organization schema, switches on automatically.
 */
export const APP_REPO_PUBLIC = false;

export const GITHUB_REPO_URL = "https://github.com/heymeowcat/WifiHeatmap-Android";

/** Upstream project the app is forked from (repo was renamed to WiFiAnalyzer). */
export const UPSTREAM_REPO_URL =
	"https://github.com/VREMSoftwareDevelopment/WiFiAnalyzer";

export const UPSTREAM_WIKI = {
	throttling: `${UPSTREAM_REPO_URL}/wiki/Android-Wi%E2%80%90Fi-scanning-throttling`,
	permissions: `${UPSTREAM_REPO_URL}/wiki/Location-Service-Permission-Requirements`,
} as const;

export const PACKAGE_NAME = "com.heymeowcat.wifiheatmap";

export const APP = {
	minimumAndroid: "Android 7.0 (API 24)",
	targetAndroid: "Android 16 (API 36)",
	version: "1.0.2",
	license: "GPL-3.0",
	price: "0",
	priceCurrency: "USD",
} as const;

/** Builds an absolute, canonical URL for a site-relative path. */
export function absoluteUrl(path: string, origin: string = SITE.origin): string {
	const clean = path.replace(/^\/+/, "");
	const base = `${origin}${SITE.base}`;
	if (!clean) return `${base}/`;
	return `${base}/${clean}`;
}

/**
 * Prefixes a site-relative path with the deployment base path.
 *
 * Always use this instead of string concatenation: `BASE_URL` already ends
 * with a slash, so `${BASE_URL}/about/` silently produces a double slash
 * and every such link counts as a broken internal link.
 */
export function withBase(path: string): string {
	const base = SITE.base.replace(/\/+$/, "");
	const clean = path.replace(/^\/+/, "");
	return clean ? `${base}/${clean}` : `${base}/`;
}

/** Navigation shown in the header, footer and mobile drawer. */
export const NAV_LINKS = [
	{ label: "Features", href: "/features/floorplan-heatmap/", match: "/features" },
	{ label: "Guides", href: "/guides/wifi-channel-guide/", match: "/guides" },
	{ label: "Resources", href: "/resources/", match: "/resources" },
	{ label: "About", href: "/about/", match: "/about" },
	{ label: "Changelog", href: "/changelog/", match: "/changelog" },
] as const;

export const LEGAL_LINKS = [
	{ label: "Privacy Policy", href: "/privacy/" },
	{ label: "Terms of Service", href: "/terms/" },
] as const;
