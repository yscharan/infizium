"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ROUTES = [
  { id: "bus", color: "#f59e0b", label: "School Bus", points: [[30, 260], [80, 220], [140, 200], [200, 170], [260, 130], [310, 90]] },
  { id: "car1", color: "#3b82f6", label: "Parent Car", points: [[60, 280], [100, 240], [160, 210], [220, 160], [280, 115], [310, 90]] },
  { id: "auto", color: "#f97316", label: "Auto", points: [[150, 290], [180, 260], [210, 230], [240, 200], [280, 150], [310, 90]] },
  { id: "walk", color: "#10b981", label: "Walk Group", points: [[250, 270], [270, 240], [285, 200], [295, 165], [305, 120], [310, 90]] },
  { id: "solo", color: "#a78bfa", label: "Solo+Tag", points: [[40, 230], [90, 195], [150, 165], [220, 140], [275, 108], [310, 90]] },
];

function pathFromPoints(pts: number[][]) {
  return pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
}

interface Dot { id: string; route: typeof ROUTES[0]; progress: number; }

export function CommuteMap({ compact = false }: { compact?: boolean }) {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const initial = ROUTES.map(r => ({ id: r.id, route: r, progress: Math.random() * 0.6 }));
    setDots(initial);

    const iv = setInterval(() => {
      setDots(prev => prev.map(d => ({
        ...d,
        progress: d.progress >= 1 ? 0.02 : d.progress + 0.004,
      })));
    }, 50);
    return () => clearInterval(iv);
  }, []);

  function interpolate(pts: number[][], t: number) {
    const idx = t * (pts.length - 1);
    const i = Math.min(Math.floor(idx), pts.length - 2);
    const frac = idx - i;
    return [
      pts[i][0] + (pts[i + 1][0] - pts[i][0]) * frac,
      pts[i][1] + (pts[i + 1][1] - pts[i][1]) * frac,
    ];
  }

  const h = compact ? 200 : 310;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: h, background: "#050e1a" }}>
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 360 ${h}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="cg" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0L0 0 0 40" fill="none" stroke="rgba(0,212,255,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="360" height={h} fill="url(#cg)" />

        {/* Route paths */}
        {ROUTES.map(r => {
          const adjustedPoints = r.points.map(p => [p[0], p[1] * (h / 310)]);
          return (
            <path
              key={r.id}
              d={pathFromPoints(adjustedPoints)}
              stroke={r.color}
              strokeWidth="1.5"
              fill="none"
              strokeOpacity="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* School marker */}
        <motion.circle
          cx="310" cy={90 * (h / 310)}
          r="14"
          fill="rgba(16,185,129,0.12)"
          stroke="#10b981"
          strokeWidth="1.5"
          animate={{ r: [12, 16, 12] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="310" y={90 * (h / 310) + 4} textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">🏫</text>

        {/* Moving dots */}
        {dots.map(d => {
          const adjustedPoints = d.route.points.map(p => [p[0], p[1] * (h / 310)]);
          const [cx, cy] = interpolate(adjustedPoints, d.progress);
          const atSchool = d.progress > 0.92;
          return (
            <g key={d.id}>
              <circle cx={cx} cy={cy} r="5" fill={d.route.color} opacity={atSchool ? 0.3 : 0.9} />
              {!atSchool && (
                <motion.circle
                  cx={cx} cy={cy} r="8"
                  fill="none"
                  stroke={d.route.color}
                  strokeWidth="1"
                  opacity="0.35"
                  animate={{ r: [6, 12, 6], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </g>
          );
        })}

        {/* Home markers */}
        {ROUTES.map(r => {
          const first = [r.points[0][0], r.points[0][1] * (h / 310)];
          return (
            <circle key={r.id + "home"} cx={first[0]} cy={first[1]} r="4"
              fill={r.color} opacity="0.4" />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
        {ROUTES.map(r => (
          <span key={r.id} className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${r.color}18`, color: r.color, border: `1px solid ${r.color}30` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.color }} />
            {r.label}
          </span>
        ))}
      </div>

      {/* Live badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] font-mono text-emerald-400">LIVE</span>
      </div>
    </div>
  );
}
