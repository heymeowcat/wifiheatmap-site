import type { APIRoute } from "astro";
import { SITE } from "../config";

/**
 * Every indexable URL on the site, in priority order.
 *
 * `lastmod` is only included when it is genuinely known — a wrong
 * `lastmod` is worse than none, because Google ignores the field when it
 * is inconsistent with the crawl.
 */
interface SitemapEntry {
	path: string;
	priority: string;
	changefreq: string;
	lastmod?: string;
}

const entries: SitemapEntry[] = [
	{ path: "/", priority: "1.0", changefreq: "weekly", lastmod: "2026-10-20" },
	{
		path: "/features/floorplan-heatmap/",
		priority: "0.9",
		changefreq: "monthly",
		lastmod: "2026-10-20",
	},
	{
		path: "/features/spectrum-analyzer/",
		priority: "0.9",
		changefreq: "monthly",
		lastmod: "2026-10-20",
	},
	{
		path: "/features/channel-rating/",
		priority: "0.9",
		changefreq: "monthly",
		lastmod: "2026-10-20",
	},
	{
		path: "/features/network-tools/",
		priority: "0.9",
		changefreq: "monthly",
		lastmod: "2026-10-20",
	},
	{
		path: "/guides/wifi-channel-guide/",
		priority: "0.8",
		changefreq: "monthly",
		lastmod: "2026-10-20",
	},
	{
		path: "/resources/",
		priority: "0.7",
		changefreq: "monthly",
		lastmod: "2026-10-20",
	},
	{ path: "/about/", priority: "0.6", changefreq: "yearly" },
	{
		path: "/changelog/",
		priority: "0.6",
		changefreq: "weekly",
		lastmod: "2026-10-20",
	},
	{ path: "/privacy/", priority: "0.3", changefreq: "yearly" },
	{ path: "/terms/", priority: "0.3", changefreq: "yearly" },
];

const escape = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

export const GET: APIRoute = () => {
	const base = `${SITE.origin}${SITE.base}`;

	const urls = entries
		.map((entry) => {
			const loc = `${base}${entry.path}`;
			return [
				"\t<url>",
				`\t\t<loc>${escape(loc)}</loc>`,
				entry.lastmod ? `\t\t<lastmod>${entry.lastmod}</lastmod>` : null,
				`\t\t<changefreq>${entry.changefreq}</changefreq>`,
				`\t\t<priority>${entry.priority}</priority>`,
				"\t</url>",
			]
				.filter(Boolean)
				.join("\n");
		})
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
