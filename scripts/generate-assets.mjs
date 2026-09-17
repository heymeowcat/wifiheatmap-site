/**
 * Generates the static image assets the site needs:
 *   - public/og-image.png        1200x630 social share card
 *   - public/icon.png            compressed 512x512 app icon
 *   - public/icon-192.png        PWA / favicon raster
 *   - public/apple-touch-icon.png 180x180
 *   - public/site.webmanifest    PWA manifest
 *
 * Run with: node scripts/generate-assets.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve("public");

/* ------------------------------------------------------------------ */
/* Open Graph card                                                    */
/* ------------------------------------------------------------------ */

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f2f8ff"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eaf3ff"/>
    </linearGradient>
    <radialGradient id="h1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.85"/>
      <stop offset="45%" stop-color="#4ade80" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#4ade80" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="h2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fde047" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#fb923c" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#fb923c" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="h3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="h4" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="heatbar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="20%" stop-color="#0ea5e9"/>
      <stop offset="40%" stop-color="#22d3ee"/>
      <stop offset="60%" stop-color="#4ade80"/>
      <stop offset="78%" stop-color="#fde047"/>
      <stop offset="90%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
    <linearGradient id="wordmark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="45%" stop-color="#22c55e"/>
      <stop offset="75%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
    <filter id="blur" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="55"/>
    </filter>
    <clipPath id="tile"><rect x="0" y="0" width="512" height="512" rx="116"/></clipPath>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Rainbow heat field -->
  <g filter="url(#blur)">
    <ellipse cx="180" cy="130" rx="330" ry="290" fill="url(#h1)"/>
    <ellipse cx="1030" cy="540" rx="320" ry="280" fill="url(#h2)"/>
    <ellipse cx="880" cy="140" rx="250" ry="220" fill="url(#h3)"/>
    <ellipse cx="420" cy="600" rx="300" ry="240" fill="url(#h4)"/>
  </g>

  <!-- Engineering grid -->
  <g stroke="#1d4ed8" stroke-opacity="0.06" stroke-width="1">
    ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="630"/>`).join("")}
    ${Array.from({ length: 13 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="1200" y2="${i * 50}"/>`).join("")}
  </g>

  <!-- App icon tile -->
  <g transform="translate(72,168) scale(0.54)">
    <g clip-path="url(#tile)">
      <rect width="512" height="512" fill="#cde74f"/>
      <ellipse cx="72" cy="58" rx="290" ry="270" fill="#8ceef0" opacity="0.9"/>
      <ellipse cx="446" cy="452" rx="270" ry="250" fill="#7fe8ee" opacity="0.9"/>
      <ellipse cx="420" cy="92" rx="260" ry="230" fill="#f0dc52" opacity="0.9"/>
      <ellipse cx="238" cy="268" rx="300" ry="290" fill="#e2604f" opacity="0.9"/>
      <ellipse cx="118" cy="410" rx="270" ry="250" fill="#f2855a" opacity="0.9"/>
      <ellipse cx="300" cy="140" rx="230" ry="210" fill="#c9e554" opacity="0.9"/>
      <g fill="none" stroke="#101418" stroke-linecap="round">
        <path d="M92 246 A 176 176 0 0 1 420 246" stroke-width="58"/>
        <path d="M170 330 A 104 104 0 0 1 342 330" stroke-width="58"/>
      </g>
      <circle cx="256" cy="418" r="42" fill="#101418"/>
    </g>
  </g>

  <!-- Content -->
  <g font-family="Outfit, Segoe UI, Helvetica, Arial, sans-serif">
    <rect x="392" y="132" width="330" height="46" rx="23" fill="#ffffff" fill-opacity="0.8" stroke="#0ea5e9" stroke-opacity="0.35"/>
    <circle cx="420" cy="155" r="6" fill="#22c55e"/>
    <text x="438" y="162" font-size="19" font-weight="700" fill="#0369a1" letter-spacing="1.5">100% OFFLINE · ZERO TELEMETRY</text>

    <text x="392" y="268" font-size="76" font-weight="900" fill="#0f172a" letter-spacing="-2">WifiHeatmap</text>
    <text x="392" y="338" font-size="38" font-weight="700" fill="url(#wordmark)">Wi-Fi Analyzer &amp; Indoor Site Survey</text>

    <text x="392" y="396" font-size="26" font-weight="500" fill="#475569">Floorplan heatmaps · Tri-band spectrum · Channel rating</text>

    <rect x="392" y="440" width="480" height="14" rx="7" fill="url(#heatbar)"/>
    <text x="392" y="482" font-size="19" font-family="monospace" fill="#64748b">-90 dBm</text>
    <text x="838" y="482" font-size="19" font-family="monospace" fill="#64748b">-31 dBm</text>

    ${[
      ["2.4 / 5 / 6 GHz", 392],
      ["320 MHz Wi-Fi 7", 578],
      ["PDR + IDW", 792],
      ["Android", 922],
    ]
      .map(
        ([label, x]) =>
          `<rect x="${x}" y="518" width="${label.length * 11 + 40}" height="46" rx="23" fill="#ffffff" fill-opacity="0.85" stroke="#0f172a" stroke-opacity="0.08"/><text x="${x + 20}" y="548" font-size="20" font-weight="600" fill="#334155">${label}</text>`,
      )
      .join("")}
  </g>
</svg>`;

/* ------------------------------------------------------------------ */

async function main() {
	// --- OG image -----------------------------------------------------
	const og = await sharp(Buffer.from(ogSvg))
		.resize(1200, 630, { fit: "cover" })
		.png({ palette: true, quality: 86, compressionLevel: 9, effort: 10 })
		.toBuffer();
	await writeFile(path.join(PUBLIC_DIR, "og-image.png"), og);
	console.log(`✓ og-image.png (${(og.length / 1024).toFixed(1)} kB)`);

	// --- Icons --------------------------------------------------------
	const source = await readFile(path.join(PUBLIC_DIR, "icon.png"));
	const meta = await sharp(source).metadata();
	console.log(
		`  source icon: ${meta.width}x${meta.height} ${meta.format}, ${(source.length / 1024).toFixed(1)} kB`,
	);

	// Compress the main icon to 512x512 (keeps the alpha channel).
	const icon = await sharp(source)
		.resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.png({ quality: 88, compressionLevel: 9 })
		.toBuffer();
	await writeFile(path.join(PUBLIC_DIR, "icon.png"), icon);
	console.log(`✓ icon.png (${(icon.length / 1024).toFixed(1)} kB)`);

	const icon192 = await sharp(source)
		.resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.png({ quality: 88, compressionLevel: 9 })
		.toBuffer();
	await writeFile(path.join(PUBLIC_DIR, "icon-192.png"), icon192);
	console.log(`✓ icon-192.png (${(icon192.length / 1024).toFixed(1)} kB)`);

	const appleTouch = await sharp(source)
		.resize(180, 180, { fit: "contain", background: { r: 3, g: 6, b: 14, alpha: 1 } })
		.png({ quality: 88, compressionLevel: 9 })
		.toBuffer();
	await writeFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"), appleTouch);
	console.log(`✓ apple-touch-icon.png (${(appleTouch.length / 1024).toFixed(1)} kB)`);

	// --- Web manifest --------------------------------------------------
	const manifest = {
		name: "WifiHeatmap: Signal & Analyzer",
		short_name: "WifiHeatmap",
		description:
			"Offline Android Wi-Fi analyzer and indoor site survey tool with floorplan heatmaps, tri-band spectrum graphs and channel rating.",
		start_url: "/wifiheatmap-site/",
		scope: "/wifiheatmap-site/",
		display: "standalone",
		background_color: "#03060e",
		theme_color: "#03060e",
		orientation: "portrait",
		icons: [
			{
				src: "/wifiheatmap-site/icon-192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/wifiheatmap-site/icon.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
		],
	};
	await writeFile(
		path.join(PUBLIC_DIR, "site.webmanifest"),
		`${JSON.stringify(manifest, null, 2)}\n`,
		"utf8",
	);
	console.log("✓ site.webmanifest");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
