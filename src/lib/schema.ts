import {
	SITE,
	PLAY_STORE_URL,
	GITHUB_REPO_URL,
	APP_REPO_PUBLIC,
	PACKAGE_NAME,
	APP,
	absoluteUrl,
} from "../config";

/** Organisation / publisher graph, reused across every page. */
export function organizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": `${absoluteUrl("/")}#organization`,
		name: SITE.authorHandle,
		legalName: SITE.author,
		url: absoluteUrl("/"),
		logo: {
			"@type": "ImageObject",
			url: absoluteUrl("/icon.png"),
			width: 512,
			height: 512,
		},
		image: absoluteUrl("/og-image.png"),
		description:
			"WifiHeatmap is an offline Android Wi-Fi analyzer and indoor site survey app by HEYMEOWCAT.",
		// Only reference the source repository once it is publicly reachable —
		// a `sameAs` pointing at a 404 is worse than no entry at all.
		sameAs: [
			PLAY_STORE_URL,
			...(APP_REPO_PUBLIC ? [GITHUB_REPO_URL] : []),
		],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer support",
			email: SITE.email,
			availableLanguage: ["en", "si"],
		},
	};
}

/** WebSite graph with the search action for the site. */
export function websiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${absoluteUrl("/")}#website`,
		url: absoluteUrl("/"),
		name: SITE.name,
		description: SITE.description,
		inLanguage: SITE.language,
		publisher: { "@id": `${absoluteUrl("/")}#organization` },
	};
}

/** The app itself, described as a mobile application. */
export function appSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "MobileApplication",
		"@id": `${absoluteUrl("/")}#app`,
		name: SITE.appName,
		alternateName: SITE.name,
		description: SITE.description,
		url: absoluteUrl("/"),
		downloadUrl: PLAY_STORE_URL,
		installUrl: PLAY_STORE_URL,
		applicationCategory: "UtilitiesApplication",
		applicationSubCategory: "Network Tools",
		operatingSystem: `${APP.minimumAndroid} and up`,
		softwareVersion: APP.version,
		permissions: [
			"android.permission.ACCESS_FINE_LOCATION",
			"android.permission.ACTIVITY_RECOGNITION",
			"android.permission.ACCESS_WIFI_STATE",
			"android.permission.CHANGE_WIFI_STATE",
		],
		featureList: [
			"Indoor floorplan Wi-Fi signal heatmap surveys",
			"Pedestrian Dead Reckoning (PDR) walk tracking",
			"Inverse Distance Weighting (IDW) signal interpolation",
			"2.4 GHz, 5 GHz and 6 GHz spectrum channel graphs",
			"20 / 40 / 80 / 160 / 320 MHz channel width detection",
			"Automated channel star rating and recommendations",
			"Vendor / OUI lookup for access point manufacturers",
			"Free-Space Path Loss distance estimation",
			"Speed test, ping, traceroute and DNS lookup tools",
			"BSSID roaming handoff logger",
		],
		offers: {
			"@type": "Offer",
			price: APP.price,
			priceCurrency: APP.priceCurrency,
			availability: "https://schema.org/InStock",
			priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
		},
		softwareRequirements: `${APP.minimumAndroid}; ${PACKAGE_NAME}`,
		permissionsRequired:
			"Android requires location permission to return Wi-Fi scan results.",
		author: { "@id": `${absoluteUrl("/")}#organization` },
		publisher: { "@id": `${absoluteUrl("/")}#organization` },
		image: absoluteUrl("/og-image.png"),
		logo: absoluteUrl("/icon.png"),
		// NOTE: `aggregateRating` is deliberately omitted. The app has no public
		// reviews yet, and Google's review-snippet policy requires the rating to
		// reflect genuine on-page ratings. Add it here only once real ratings
		// exist on the Play Store, with the real average and review count.
	};
}

/** Breadcrumb trail for a page. */
export function breadcrumbSchema(
	trail: { label: string; href?: string }[],
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: trail.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.label,
			item: item.href ? absoluteUrl(item.href) : undefined,
		})),
	};
}

/** Wraps a set of graphs into a single @graph document. */
export function graph(...nodes: object[]) {
	return {
		"@context": "https://schema.org",
		"@graph": nodes,
	};
}
