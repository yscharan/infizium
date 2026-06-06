"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const MESSAGES = [
  {
    from: "sponsor",
    name: "Anonymous Donor",
    text: "Your attendance has been perfect this month. Really proud of you.",
    time: "2:14 PM",
  },
  {
    from: "student",
    name: "Arjun · Student #A001",
    text: "Thank you! Your support keeps me going. I scored 89 in Maths this week!",
    time: "2:16 PM",
  },
  {
    from: "sponsor",
    name: "Anonymous Donor",
    text: "89 is brilliant. Sending ₹500 for your JEE practice test papers.",
    time: "2:17 PM",
  },
  {
    from: "student",
    name: "Arjun · Student #A001",
    text: "This means everything. I will make you proud. Thank you.",
    time: "2:18 PM",
  },
];

export function SponsorChat() {
  const [visible, setVisible] = useState(0);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    let i = 0;
    const show = () => {
      i++;
      setVisible(i);
      if (i < MESSAGES.length) {
        setTimeout(show, 1800);
      } else {
        setTimeout(() => {
          setCycling(true);
          setVisible(0);
          i = 0;
          setTimeout(() => { setCycling(false); show(); }, 400);
        }, 3000);
      }
    };
    const to = setTimeout(show, 600);
    return () => clearTimeout(to);
  }, []);

  return (
    <div
      className="rounded-2xl p-5 space-y-3"
      style={{ background: "rgba(2,8,24,0.92)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/6">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-mono text-emerald-400 tracking-widest">LIVE</span>
        <span className="text-xs text-white/20">·</span>
        <span className="text-xs text-white/20">Sponsor ↔ Student</span>
        <span className="ml-auto text-[10px] text-white/15 font-mono">E2E encrypted</span>
      </div>

      <AnimatePresence mode="popLayout">
        {!cycling && MESSAGES.slice(0, visible).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className={`flex gap-3 ${m.from === "sponsor" ? "flex-row-reverse" : ""}`}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
              style={{
                background: m.from === "sponsor" ? "rgba(251,191,36,0.15)" : "rgba(99,102,241,0.15)",
              }}
            >
              {m.from === "sponsor" ? "💎" : "🧑‍🎓"}
            </div>
            <div className={`flex flex-col gap-1 max-w-[75%] ${m.from === "sponsor" ? "items-end" : ""}`}>
              <span className="text-[10px] text-white/25">{m.name}</span>
              <div
                className="px-3 py-2 rounded-xl text-sm leading-relaxed"
                style={{
                  background: m.from === "sponsor" ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.8)",
                  borderRadius: m.from === "sponsor" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
                }}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-white/15">{m.time}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Typing indicator */}
      {visible > 0 && visible < MESSAGES.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex gap-3 ${MESSAGES[visible]?.from === "sponsor" ? "flex-row-reverse" : ""}`}
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: "rgba(255,255,255,0.05)" }}>
            {MESSAGES[visible]?.from === "sponsor" ? "💎" : "🧑‍🎓"}
          </div>
          <div className="flex items-center gap-1 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                className="w-1.5 h-1.5 rounded-full bg-white/30"
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
