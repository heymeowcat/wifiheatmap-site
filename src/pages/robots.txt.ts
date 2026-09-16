import type { APIRoute } from "astro";
import { SITE } from "../config";

/**
 * robots.txt is generated from the same constants as the sitemap and the
 * canonical tags, so the three can never disagree.
 */
export const GET: APIRoute = () => {
	const origin = SITE.origin;
	const base = SITE.base;

	const body = `# ${SITE.appName} — ${SITE.tagline}
# Everything on this site is public and indexable.

User-agent: *
Allow: /

# Legacy slugs that were renamed — keep crawlers off the redirect stubs.
Disallow: /privacy-policy
Disallow: /terms-of-service
Disallow: /features

# Helpful for crawlers that respect it.
Host: ${origin.replace(/^https?:\/\//, "")}

Sitemap: ${origin}${base}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
