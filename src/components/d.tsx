import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, 
  Map, 
  BarChart3, 
  Star, 
  ShieldCheck, 
  Compass, 
  Layers, 
  Download, 
  CheckCircle2, 
  Activity, 
  Radio, 
  Zap, 
  ArrowUpRight
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
      id: "inspector",
      badge: "Deep Network Diagnostics",
      title: "AP Inspector & Signal Stability",
      tagline: "Everything you need to know about every beacon in the air.",
      description:
        "Inspect full technical specifications for every Access Point: IEEE 802.11 standards, WPA3/OWE enterprise security, estimated distance via Free-Space Path Loss (FSPL), and router manufacturer OUI lookup.",
      highlights: [
        "Built-in Vendor / OUI database (Cisco, Apple, Ubiquiti, etc.)",
        "Historical signal stability graphs (Scan count vs dBm)",
        "Fast-roaming flags (802.11k, 802.11v, 802.11r, OKC)",
        "Free-Space Path Loss (FSPL) physical distance estimation"
      ],
      gradient: "from-blue-400 via-indigo-400 to-cyan-400",
      accent: "#3b82f6",
      renderScreen: () => <ScreenInspector />
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
                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer border ${
                  isActive
                    ? "bg-slate-800/90 text-white border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                    : "bg-slate-900/50 text-slate-400 border-slate-800/80 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                {feature.id === "heatmap" && <Map className={`w-4 h-4 ${isActive ? "text-cyan-400" : ""}`} />}
                {feature.id === "spectrum" && <BarChart3 className={`w-4 h-4 ${isActive ? "text-emerald-400" : ""}`} />}
                {feature.id === "rating" && <Star className={`w-4 h-4 ${isActive ? "text-amber-400" : ""}`} />}
                {feature.id === "inspector" && <Activity className={`w-4 h-4 ${isActive ? "text-blue-400" : ""}`} />}
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
// SCREEN 1: INDOOR HEATMAP SURVEY
// ----------------------------------------------------
function ScreenHeatmap() {
  return (
    <div className="h-full w-full bg-[#070b16] text-white flex flex-col text-xs font-sans select-none">
      {/* App Toolbar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-sm tracking-tight text-white">Site Survey</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800/60">Floor 2</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span>84 steps</span>
        </div>
      </div>

      {/* Interactive Map Area */}
      <div className="flex-1 relative overflow-hidden bg-[#0a0f1e] p-2 flex flex-col justify-between">
        {/* SVG Floor Plan Canvas */}
        <div className="relative flex-1 rounded-xl border border-slate-800 bg-[#060a14] overflow-hidden">
          {/* Floor grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Architectural Rooms */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 280">
            {/* Heatmap IDW Color Contours (Simulated with rich SVG radial gradients) */}
            <defs>
              <radialGradient id="ap1-heat" cx="35%" cy="30%" r="55%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="65%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="ap2-heat" cx="75%" cy="65%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Heat overlay shapes */}
            <circle cx="110" cy="85" r="90" fill="url(#ap1-heat)" />
            <circle cx="240" cy="180" r="80" fill="url(#ap2-heat)" />

            {/* Room Walls */}
            <rect x="20" y="20" width="130" height="110" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
            <rect x="170" y="20" width="130" height="110" fill="none" stroke="#334155" strokeWidth="2" />
            <rect x="20" y="150" width="130" height="110" fill="none" stroke="#334155" strokeWidth="2" />
            <rect x="170" y="150" width="130" height="110" fill="none" stroke="#334155" strokeWidth="2" />

            {/* Room Labels */}
            <text x="30" y="40" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">CONF ROOM A</text>
            <text x="180" y="40" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">SERVER ROOM</text>
            <text x="30" y="170" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">OPEN OFFICE</text>
            <text x="180" y="170" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">EXECUTIVE</text>

            {/* AP Markers */}
            <circle cx="110" cy="85" r="7" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
            <circle cx="240" cy="180" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

            {/* PDR Walking Path */}
            <path
              d="M 50 220 L 70 190 L 110 85 L 140 100 L 180 120 L 220 160 L 240 180 L 260 210"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 3"
            />

            {/* Current Surveyor Position */}
            <circle cx="260" cy="210" r="8" fill="#38bdf8" fillOpacity="0.4" className="animate-ping" />
            <circle cx="260" cy="210" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Floating Canvas Badges */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-slate-900/90 rounded-md border border-slate-700/80 text-[10px] font-mono">
            <span className="text-slate-400">Current: </span>
            <span className="text-emerald-400 font-bold">-48 dBm</span>
          </div>

          <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/90 rounded-md border border-slate-700/80 text-[10px] font-mono flex items-center gap-1">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>Heading 142°</span>
          </div>
        </div>

        {/* Signal Strength Legend */}
        <div className="mt-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span className="text-emerald-400">-30 dBm (Best)</span>
            <span className="text-amber-400">-65 dBm</span>
            <span className="text-rose-400">-90 dBm (Poor)</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500" />
        </div>

        {/* Survey Controls */}
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <button className="py-2 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" />
            <span>Anchor</span>
          </button>
          <button className="py-2 rounded-lg bg-slate-800 text-slate-200 font-medium border border-slate-700 flex items-center justify-center gap-1">
            <Layers className="w-3 h-3" />
            <span>Floors</span>
          </button>
          <button className="py-2 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center justify-center gap-1">
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SCREEN 2: TRI-BAND SPECTRUM GRAPH
// ----------------------------------------------------
function ScreenSpectrum() {
  return (
    <div className="h-full w-full bg-[#070b16] text-white flex flex-col text-xs font-sans select-none">
      {/* Band Switcher Toolbar */}
      <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400">2.4 GHz</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">5 GHz</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400">6 GHz</span>
        </div>
        <div className="text-[10px] font-mono text-cyan-400">Scan #48</div>
      </div>

      {/* Graph Area */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="relative flex-1 bg-[#060a14] rounded-xl border border-slate-800 p-2 overflow-hidden flex flex-col">
          {/* Y-Axis dBm scale */}
          <div className="flex justify-between text-[9px] font-mono text-slate-500 border-b border-slate-800/60 pb-1">
            <span>-30 dBm</span>
            <span>-60 dBm</span>
            <span>-90 dBm</span>
          </div>

          {/* Parabolic Channel Curves */}
          <svg className="flex-1 w-full" viewBox="0 0 300 180" preserveAspectRatio="none">
            {/* Horizontal Grid lines */}
            <line x1="0" y1="45" x2="300" y2="45" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="90" x2="300" y2="90" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="135" x2="300" y2="135" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

            {/* AP 1: 80MHz Channel 36-48 (Cyan) */}
            <path
              d="M 10 170 Q 60 20 110 170"
              fill="url(#cyan-curve)"
              stroke="#06b6d4"
              strokeWidth="2.5"
            />
            {/* AP 2: 160MHz Channel 100-128 (Emerald) */}
            <path
              d="M 80 170 Q 170 35 260 170"
              fill="url(#emerald-curve)"
              stroke="#10b981"
              strokeWidth="2.5"
            />
            {/* AP 3: 40MHz Channel 149 (Amber) */}
            <path
              d="M 210 170 Q 250 65 290 170"
              fill="url(#amber-curve)"
              stroke="#f59e0b"
              strokeWidth="2"
            />

            <defs>
              <linearGradient id="cyan-curve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="emerald-curve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="amber-curve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>

          {/* X-Axis Channels */}
          <div className="flex justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-1.5 px-2">
            <span>CH 36</span>
            <span>CH 48</span>
            <span>CH 100</span>
            <span>CH 128</span>
            <span>CH 149</span>
            <span>CH 161</span>
          </div>
        </div>

        {/* Legend Chips */}
        <div className="mt-3 space-y-2">
          <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <div className="flex flex-col">
                <span className="font-bold text-[11px] text-white">Enterprise_5G</span>
                <span className="text-[9px] text-slate-400 font-mono">CH 36 • 80 MHz • 802.11ax</span>
              </div>
            </div>
            <span className="font-mono text-cyan-400 font-bold text-xs">-42 dBm</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div className="flex flex-col">
                <span className="font-bold text-[11px] text-white">Office_Ultra_Mesh</span>
                <span className="text-[9px] text-slate-400 font-mono">CH 100 • 160 MHz • 802.11be</span>
              </div>
            </div>
            <span className="font-mono text-emerald-400 font-bold text-xs">-48 dBm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SCREEN 3: CHANNEL RATING & OPTIMIZATION
// ----------------------------------------------------
function ScreenRating() {
  return (
    <div className="h-full w-full bg-[#070b16] text-white flex flex-col text-xs font-sans select-none">
      {/* Top Banner */}
      <div className="p-3 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-slate-900 border-b border-amber-500/30">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider mb-1">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>Recommended Channels</span>
        </div>
        <div className="text-base font-extrabold text-white">
          CH 36, 149 <span className="text-xs font-normal text-slate-300">(0 Co-Channel APs)</span>
        </div>
      </div>

      {/* Channel Rating List */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm text-emerald-400">CH 36</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">5.0 ★</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">0 APs • Zero Interference</div>
          </div>
          <div className="flex gap-0.5 text-emerald-400">
            {"★★★★★"}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm text-emerald-400">CH 149</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">4.8 ★</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">1 Weak AP (-88 dBm)</div>
          </div>
          <div className="flex gap-0.5 text-emerald-400">
            {"★★★★★"}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between opacity-80">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm text-amber-400">CH 44</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-bold">3.2 ★</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">3 Overlapping APs</div>
          </div>
          <div className="flex gap-0.5 text-amber-400">
            {"★★★☆☆"}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-rose-900/40 flex items-center justify-between opacity-60">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm text-rose-400">CH 157</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 font-bold">1.5 ★</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">6 Co-channel APs • Congested</div>
          </div>
          <div className="flex gap-0.5 text-rose-400">
            {"★☆☆☆☆"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SCREEN 4: ACCESS POINT INSPECTOR & TIME GRAPH
// ----------------------------------------------------
function ScreenInspector() {
  return (
    <div className="h-full w-full bg-[#070b16] text-white flex flex-col text-xs font-sans select-none">
      {/* Top Header */}
      <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <span className="font-bold text-sm text-white">Access Point Details</span>
        <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">Cisco OUI</span>
      </div>

      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {/* Main AP Card */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-black text-sm text-white flex items-center gap-1.5">
                <span>Corp_Secure_WIFI</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="font-mono text-[10px] text-slate-400">BSSID: 00:0C:41:88:EA:12</div>
            </div>
            <div className="text-right">
              <div className="font-mono font-black text-sm text-emerald-400">-46 dBm</div>
              <div className="text-[9px] text-slate-400">~2.8m (FSPL)</div>
            </div>
          </div>

          {/* Chip Grid */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
              <div className="text-[9px] text-slate-400">Vendor</div>
              <div className="font-bold text-[10px] text-cyan-300">Cisco Systems</div>
            </div>
            <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
              <div className="text-[9px] text-slate-400">Protocol</div>
              <div className="font-bold text-[10px] text-emerald-300">802.11ax (Wi-Fi 6)</div>
            </div>
            <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
              <div className="text-[9px] text-slate-400">Security</div>
              <div className="font-bold text-[10px] text-purple-300">WPA3-Enterprise</div>
            </div>
            <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
              <div className="text-[9px] text-slate-400">Width / Channel</div>
              <div className="font-bold text-[10px] text-amber-300">80 MHz / CH 36</div>
            </div>
          </div>
        </div>

        {/* Live Signal Stability Graph (Time-Series) */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-slate-300">Signal Stability (Last 30 Scans)</span>
            <span className="font-mono text-cyan-400">±1.2 dBm variance</span>
          </div>
          <div className="h-16 w-full bg-[#060a14] rounded-lg border border-slate-800 p-1 flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path
                d="M 0 20 Q 15 18 30 22 T 60 19 T 80 21 L 100 18"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
