import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Map,
  BarChart3,
  Star,
  Layers,
  CheckCircle2,
  Radio,
  ArrowUpRight,
  Pause,
  MoreVertical,
  TrendingUp,
  Wrench,
  VolumeX,
  ImagePlus,
  ListFilter,
  Share2,
  Footprints,
  Hand,
  LocateFixed,
  ThumbsUp,
  Square,
  MapPin,
  RefreshCw,
  Gauge,
  Route as RouteIcon,
  Server,
  Router as RouterIcon,
  ArrowRightLeft,
  ChevronRight
} from "lucide-react";

interface Feature {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  gradient: string;
  accent: string;
  renderScreen: () => React.ReactNode;
}

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<string>("heatmap");

  const features: Feature[] = [
    {
      id: "heatmap",
      badge: "PDR Indoor Survey",
      title: "Real-Time Floorplan Heatmap",
      tagline: "Walk freely while your device maps RF coverage step-by-step.",
      description:
        "Import any building floor plan and walk naturally. WifiHeatmap fuses biomechanical step detection (adaptive Weinberg formula) and orientation sensors to chart your continuous path and interpolate signal contours using Inverse Distance Weighting (IDW).",
      highlights: [
        "Biomechanical step detection & heading sensor fusion",
        "Inverse Distance Weighting (IDW) gradient contours",
        "Multi-floor barometric altitude detection",
        "Export high-resolution survey maps & raw data"
      ],
      gradient: "from-cyan-500 via-teal-400 to-emerald-400",
      accent: "#06b6d4",
      renderScreen: () => <ScreenHeatmap />
    },
    {
      id: "spectrum",
      badge: "Spectrum Analyzer",
      title: "Tri-Band Spectrum Graphs",
      tagline: "Visualize frequency overlap across 2.4 GHz, 5 GHz, and 6 GHz.",
      description:
        "Inspect complex RF environments in real-time. View overlapping parabolic channels, detect bandwidth widths up to 320 MHz (Wi-Fi 7), and isolate interference from legacy 802.11b/g up to modern 802.11be.",
      highlights: [
        "Full support for 2.4 GHz, 5 GHz & 6 GHz Wi-Fi 6E/7",
        "Channel width detection: 20, 40, 80, 160 & 320 MHz",
        "Live RF scan counts with zero throttling bypass option",
        "Filter by SSID, signal threshold, or security type"
      ],
      gradient: "from-teal-400 via-emerald-400 to-cyan-300",
      accent: "#10b981",
      renderScreen: () => <ScreenSpectrum />
    },
    {
      id: "rating",
      badge: "Intelligent Scoring",
      title: "Channel Rating & Optimization",
      tagline: "Identify zero-interference channels in crowded spectrums.",
      description:
        "Stop guessing which channel to configure on your wireless access points. WifiHeatmap evaluates co-channel and adjacent-channel congestion to award transparent 1-to-5 star ratings for every available channel.",
      highlights: [
        "Instant best-channel recommendations for 2.4 & 5 GHz",
        "Co-channel vs adjacent-channel interference breakdown",
        "Active AP count distribution per channel",
        "One-tap frequency band switching"
      ],
      gradient: "from-amber-400 via-orange-400 to-yellow-300",
      accent: "#f59e0b",
      renderScreen: () => <ScreenRating />
    },
    {
      id: "tools",
      badge: "Diagnostics & Performance",
      title: "Built-In Network Toolkit",
      tagline: "A full diagnostics bench for any wireless network, in your pocket.",
      description:
        "Jump straight to your router's admin page, then run real download/upload speed tests, ICMP ping & jitter checks, hop-by-hop traceroutes, and A/AAAA/PTR DNS lookups. Track seamless BSSID roaming handoffs between access points as you move.",
      highlights: [
        "One-tap Router Admin access via detected gateway IP",
        "Speed & throughput testing with live latency",
        "Ping, traceroute, and DNS lookup utilities",
        "BSSID roaming logger for seamless AP handoffs"
      ],
      gradient: "from-blue-400 via-indigo-400 to-cyan-400",
      accent: "#3b82f6",
      renderScreen: () => <ScreenTools />
    }
  ];

  const currentFeature = features.find((f) => f.id === activeTab) || features[0];

  return (
    <div id="showcase" className="py-24 bg-[#050814] relative overflow-hidden border-t border-cyan-950/60">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Feature Suite</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Engineered for Precision RF Analysis
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
            Everything you need to survey, diagnose, and optimize wireless infrastructure on Android.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {features.map((feature) => {
            const isActive = feature.id === activeTab;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer border ${isActive
                    ? "bg-slate-800/90 text-white border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                    : "bg-slate-900/50 text-slate-400 border-slate-800/80 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
              >
                {feature.id === "heatmap" && <Map className={`w-4 h-4 ${isActive ? "text-cyan-400" : ""}`} />}
                {feature.id === "spectrum" && <BarChart3 className={`w-4 h-4 ${isActive ? "text-emerald-400" : ""}`} />}
                {feature.id === "rating" && <Star className={`w-4 h-4 ${isActive ? "text-amber-400" : ""}`} />}
                {feature.id === "tools" && <Wrench className={`w-4 h-4 ${isActive ? "text-blue-400" : ""}`} />}
                <span>{feature.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Feature Details */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="inline-block text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-bold">
                  {currentFeature.badge}
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {currentFeature.title}
                </h3>

                <p className="text-cyan-300/90 text-lg font-medium">
                  {currentFeature.tagline}
                </p>

                <p className="text-slate-400 leading-relaxed">
                  {currentFeature.description}
                </p>

                <div className="space-y-3 pt-2">
                  {currentFeature.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.heymeowcat.wifiheatmap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <span>Get on Google Play</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: High-Fidelity Simulated Phone Screen */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[390px] rounded-[42px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.15)] border border-slate-700/60">
              {/* Phone Speaker & Dynamic Island Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-10 h-1 rounded-full bg-slate-800" />
              </div>

              {/* Phone Screen Container */}
              <div className="relative w-full aspect-[9/18.5] bg-[#090d18] rounded-[34px] overflow-hidden flex flex-col border border-slate-800/80 shadow-inner">
                {/* Mobile Status Bar */}
                <div className="h-10 px-6 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none z-20">
                  <span>09:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-bold text-emerald-400">5G</span>
                    <div className="w-4 h-2 rounded-xs border border-slate-400 flex items-center p-0.5">
                      <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Animated Interactive Screen Content */}
                <div className="flex-1 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentFeature.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="h-full w-full"
                    >
                      {currentFeature.renderScreen()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Android Home Pill */}
                <div className="h-5 w-full flex items-center justify-center select-none">
                  <div className="w-28 h-1 bg-slate-700/60 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SHARED APP CHROME: header + bottom nav (matches real app)
// ----------------------------------------------------
type NavId = "heatmap" | "networks" | "spectrum" | "tools";

function AppChrome({
  title,
  active,
  children
}: {
  title: string;
  active: NavId;
  children: React.ReactNode;
}) {
  const navItems: { id: NavId; label: string; icon: typeof Map }[] = [
    { id: "heatmap", label: "Heatmap", icon: Map },
    { id: "networks", label: "Networks", icon: Wifi },
    { id: "spectrum", label: "Spectrum", icon: TrendingUp },
    { id: "tools", label: "Tools", icon: Wrench }
  ];

  return (
    <div className="h-full w-full bg-[#070b16] text-white flex flex-col text-xs font-sans select-none">
      {/* App Toolbar */}
      <div className="px-4 py-2.5 flex items-center justify-center relative border-b border-slate-800/70">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-bold text-sm text-white">{title}</span>
        </div>
        <div className="absolute right-3 flex items-center gap-3 text-slate-400">
          <Pause className="w-3.5 h-3.5" />
          <MoreVertical className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Screen Content */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">{children}</div>

      {/* Bottom Nav */}
      <div className="border-t border-slate-800/70 bg-[#05070f] px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.id === active;
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-colors ${isActive ? "bg-indigo-600" : ""
                }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
              <span className={`text-[8px] font-medium ${isActive ? "text-white" : "text-slate-500"}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SCREEN 1: INDOOR HEATMAP SURVEY (PDR Walk)
// ----------------------------------------------------
function ScreenHeatmap() {
  return (
    <AppChrome title="Heatmap" active="heatmap">
      <div className="flex-1 overflow-hidden flex flex-col p-2.5 gap-2">
        {/* Live Signal Card */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <Wifi className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="font-bold text-[12px] text-white leading-tight">curio</div>
                <div className="text-[9px] text-emerald-400 font-mono leading-tight">
                  Walk: 1 steps • 0m • 198°
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <VolumeX className="w-3.5 h-3.5" />
              <ImagePlus className="w-3.5 h-3.5" />
              <ListFilter className="w-3.5 h-3.5" />
              <Layers className="w-3.5 h-3.5" />
              <Share2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px]">
            <span className="text-emerald-400 font-bold">Live Signal: -54 dBm</span>
            <span className="text-slate-400">All Access Points</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-400 to-emerald-400" />
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>-54 dBm</span>
            <span>-54 dBm</span>
            <span>-54 dBm</span>
          </div>
        </div>

        {/* Map / Walk Trace Area */}
        <div className="relative flex-1 rounded-xl border border-slate-800 bg-[#0a0f1e] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="w-40 h-40 rounded-full bg-emerald-400/25 blur-2xl absolute" />
          <div className="relative flex flex-col items-center">
            <span className="text-[9px] font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded mb-1">
              #2 -54dBm
            </span>
            <div className="w-4 h-4 rounded-full bg-sky-400/40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-400 border-2 border-white" />
            </div>
          </div>
        </div>

        {/* Walk Mode Selector */}
        <div className="bg-slate-900/90 rounded-full border border-slate-800 p-1 flex items-center justify-between text-[9px]">
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-sky-400 text-slate-950 font-bold">
            <Footprints className="w-3 h-3" />
            <span>PDR Walk</span>
          </div>
          <div className="flex items-center gap-1 px-2 text-slate-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>A→B Walk</span>
          </div>
          <div className="flex items-center gap-1 px-2 text-slate-400">
            <Hand className="w-3 h-3" />
            <span>Tap Pin</span>
          </div>
          <div className="flex items-center gap-1 px-2 text-slate-400">
            <LocateFixed className="w-3 h-3" />
            <span>GPS</span>
          </div>
        </div>

        {/* Helper Text */}
        <div className="bg-slate-900/70 rounded-xl px-2.5 py-2 text-[9px] text-slate-400 font-mono leading-snug">
          Walk forward naturally with your phone. Points record automatically with
          step & compass tracking.
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center gap-1.5">
          <button className="flex-1 py-2 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-1.5">
            <Pause className="w-3 h-3 fill-slate-950" />
            <span>Pause</span>
          </button>
          <button className="flex-1 py-2 rounded-full bg-rose-300/90 text-slate-950 font-bold flex items-center justify-center gap-1.5">
            <Square className="w-3 h-3 fill-slate-950" />
            <span>Stop</span>
          </button>
          <button className="w-8 h-8 shrink-0 rounded-full bg-slate-800 flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
          </button>
          <button className="w-8 h-8 shrink-0 rounded-full bg-slate-800 flex items-center justify-center">
            <Wifi className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button className="w-8 h-8 shrink-0 rounded-full bg-slate-800 flex items-center justify-center">
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </AppChrome>
  );
}

// ----------------------------------------------------
// SHARED: Spectrum sub-tabs (Channels / Timeline / Rating)
// ----------------------------------------------------
function SpectrumSubTabs({ active }: { active: "channels" | "timeline" | "rating" }) {
  const tabs = [
    { id: "channels", label: "Channels" },
    { id: "timeline", label: "Timeline" },
    { id: "rating", label: "Rating" }
  ] as const;
  return (
    <div className="flex border-b border-slate-800/70">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex-1 text-center py-2 text-[11px] font-bold text-cyan-400 border-b-2 ${active === tab.id ? "border-cyan-400" : "border-transparent opacity-60"
            }`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

function SpectrumBandFilter({ active }: { active: "all" | "2.4" | "5" | "6" }) {
  const bands = [
    { id: "all", label: "All" },
    { id: "2.4", label: "2.4 GHz" },
    { id: "5", label: "5 GHz" },
    { id: "6", label: "6 GHz" }
  ] as const;
  return (
    <div className="flex gap-1.5 px-3 py-2">
      {bands.map((band) => (
        <span
          key={band.id}
          className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${active === band.id
              ? "bg-indigo-600 text-white border-indigo-500"
              : "text-slate-400 border-slate-700"
            }`}
        >
          {band.label}
        </span>
      ))}
    </div>
  );
}

// ----------------------------------------------------
// SCREEN 2: TRI-BAND SPECTRUM GRAPH (Channels tab)
// ----------------------------------------------------
function ScreenSpectrum() {
  return (
    <AppChrome title="Spectrum" active="spectrum">
      <SpectrumSubTabs active="channels" />
      <SpectrumBandFilter active="2.4" />

      {/* Graph Area */}
      <div className="flex-1 px-3 pb-3 flex flex-col min-h-0">
        <div className="relative flex-1 bg-[#0d1120] rounded-xl border border-slate-800 p-2 overflow-hidden flex flex-col">
          <svg className="flex-1 w-full" viewBox="0 0 300 210" preserveAspectRatio="none">
            {/* Horizontal Grid lines + Y labels */}
            <line x1="0" y1="30" x2="300" y2="30" stroke="#1e293b" strokeWidth="1" />
            <line x1="0" y1="90" x2="300" y2="90" stroke="#1e293b" strokeWidth="1" />
            <line x1="0" y1="150" x2="300" y2="150" stroke="#1e293b" strokeWidth="1" />
            <line x1="0" y1="195" x2="300" y2="195" stroke="#1e293b" strokeWidth="1" />
            <text x="4" y="27" fill="#64748b" fontSize="9" fontFamily="monospace">-30</text>
            <text x="4" y="87" fill="#64748b" fontSize="9" fontFamily="monospace">-50</text>
            <text x="4" y="147" fill="#64748b" fontSize="9" fontFamily="monospace">-70</text>
            <text x="4" y="192" fill="#64748b" fontSize="9" fontFamily="monospace">-90</text>

            {/* Single AP curve, labeled */}
            <text x="100" y="55" fill="#22d3ee" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
              CURIO
            </text>
            <path
              d="M 95 195 Q 130 65 165 195"
              fill="url(#single-curve)"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <defs>
              <linearGradient id="single-curve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>

          {/* X-Axis Channels */}
          <div className="flex justify-between text-[9px] font-mono text-slate-400 border-t border-slate-800 pt-1.5 px-1">
            <span>CH 1</span>
            <span>CH 3</span>
            <span>CH 6</span>
            <span>CH 9</span>
            <span>CH 11</span>
            <span>CH 13</span>
            <span>CH 14</span>
          </div>
        </div>
      </div>
    </AppChrome>
  );
}

// ----------------------------------------------------
// SCREEN 3: CHANNEL RATING & OPTIMIZATION (Rating tab)
// ----------------------------------------------------
function StarRow({ filled }: { filled: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < filled ? "text-amber-400 fill-amber-400" : "text-slate-700 fill-slate-700"}`}
        />
      ))}
    </div>
  );
}

function ScreenRating() {
  const channels = [
    { label: "Channel -1", aps: 0, stars: 5 },
    { label: "Channel 0", aps: 0, stars: 5 },
    { label: "Channel 1", aps: 0, stars: 5 },
    { label: "Channel 2", aps: 0, stars: 5 },
    { label: "Channel 3", aps: 1, stars: 2 }
  ];

  return (
    <AppChrome title="Spectrum" active="spectrum">
      <SpectrumSubTabs active="rating" />
      <SpectrumBandFilter active="2.4" />

      <div className="flex-1 px-3 pb-3 space-y-2 overflow-y-auto min-h-0">
        {/* Recommended Channels Banner */}
        <div className="p-3 rounded-xl bg-indigo-700/90 flex items-start gap-2.5">
          <ThumbsUp className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-[12px] text-white">Recommended Channels</div>
            <div className="text-[10px] text-indigo-100 leading-snug mt-0.5">
              CH -1, CH 0, CH 1, CH 2, CH 8, CH 9, CH 10, CH 11, CH 12, CH 13, CH 14, CH 15
            </div>
          </div>
        </div>

        {/* Channel List */}
        {channels.map((ch) => (
          <div
            key={ch.label}
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-[12px] text-white">{ch.label}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">{ch.aps} Access Points in range</div>
            </div>
            <StarRow filled={ch.stars} />
          </div>
        ))}
      </div>
    </AppChrome>
  );
}

// ----------------------------------------------------
// SCREEN 4: DIAGNOSTICS & PERFORMANCE TOOLKIT
// ----------------------------------------------------
function ToolRow({
  icon: Icon,
  title,
  badge,
  description
}: {
  icon: typeof Gauge;
  title: string;
  badge: string;
  description: string;
}) {
  return (
    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
      <div className="w-8 h-8 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-indigo-300" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[11px] text-white">{title}</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800/50 whitespace-nowrap">
            {badge}
          </span>
        </div>
        <div className="text-[9px] text-slate-400 mt-0.5 leading-snug">{description}</div>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
    </div>
  );
}

function ScreenTools() {
  return (
    <AppChrome title="Tools" active="tools">
      <div className="flex-1 px-3 pt-3 pb-3 space-y-3 overflow-y-auto min-h-0">
        {/* Router Admin Setup */}
        <div className="p-3 rounded-xl bg-teal-800/40 border border-teal-700/40 flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 rounded-full bg-teal-500/20 flex items-center justify-center">
            <RouterIcon className="w-4 h-4 text-teal-300" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-[12px] text-white">Router Admin Setup</div>
            <div className="text-[9px] text-teal-200/80 font-mono">Gateway: 192.168.1.1</div>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-cyan-300 text-slate-950 text-[10px] font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>Admin Page</span>
          </button>
        </div>

        <div className="text-cyan-400 font-bold text-[11px]">Diagnostics & Performance</div>

        <div className="space-y-2">
          <ToolRow
            icon={Gauge}
            title="Speed & Throughput Test"
            badge="Speed Test"
            description="Measure real download, upload speeds, and latency"
          />
          <ToolRow
            icon={Wifi}
            title="Ping & Latency"
            badge="Ping"
            description="Measure ICMP/socket delay, jitter, and packet loss"
          />
          <ToolRow
            icon={ArrowRightLeft}
            title="BSSID Roaming Logger"
            badge="Roaming"
            description="Track seamless Wi-Fi roaming handoffs between APs"
          />
          <ToolRow
            icon={RouteIcon}
            title="Traceroute"
            badge="Trace"
            description="Trace network packet path hop-by-hop to any server"
          />
          <ToolRow
            icon={Server}
            title="DNS Lookup & Reverse DNS"
            badge="DNS"
            description="Query A, AAAA, and PTR reverse DNS"
          />
        </div>
      </div>
    </AppChrome>
  );
}
