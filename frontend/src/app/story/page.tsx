"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const story = [
  {
    kicker: "Where he comes from",
    heading: "The boy from Kalamadugu",
    body: "Bapu was born in Kalamadugu, a remote village in Jannaram Mandal of Adilabad district, in his childhood mostly forest. His was a lower-middle-class family that lived off the land. His father was uneducated. Not one of his siblings had pursued schooling. He was the first of his entire line to reach for an education, carrying dreams far too big for the place he was born into. Study was never a plan to be weighed. It was a decision made early and held without flinching: I must study, at any cost.",
  },
  {
    kicker: "How he began",
    heading: "A bicycle bought with curry leaves",
    body: "There was no high school in the village. The nearest was twenty kilometres away, and to reach it a boy needed a bicycle. So he became a trader. He carried curry leaves from his village to sell in Jannaram, bought eggs there, and carried those home to sell again, cent by cent, trip by trip, until a second-hand bicycle was finally his. Vegetables and greens funded his college. He tutored younger students to keep himself going. His family barely had enough to eat. He never once leaned on them for his education.",
  },
  {
    kicker: "Why it mattered",
    heading: "The insult that became fuel",
    body: "One memory sharpened everything. A man with money told the boy plainly that, being poor, he would amount to nothing. He would earn no respect, hold no position, and certainly never become a leader. Bapu carried those words for years, not to nurse the wound, but to answer it. He decided he would show that a person with nothing could still rise, could still build a respectable life, and could still hold open the door he had to force open himself, for every child standing behind him.",
  },
  {
    kicker: "What he believed",
    heading: "Education above every other thing",
    body: "For Bapu, education was never one good thing among many. It was the thing. Money comes and goes, he would say; today you have it, tomorrow you do not. But what you learn is yours for life. He believed education was the one force capable of rebuilding a society on better values. And he passed this straight to his children: the truest way any enterprise can serve its people is through education and the work it creates. Teach a child and you do not lift one child alone. A family thrives, a community thrives, the next generation rises.",
  },
  {
    kicker: "What he built",
    heading: "The school that trust built",
    body: "In 1991, he began his own. It started small: a handful of children from nearby villages, housed and fed and taught in a rented bungalow, one man teaching every subject while his own family lived in a single room beside the classrooms. He kept fees minimal and cut them further whenever a farmer's harvest failed. He never marketed a rank. Instead, every summer, he and his teachers drove across districts to sit with parents face to face. Trust was the only capital he ever raised, and it never ran out.",
  },
  {
    kicker: "What he protected",
    heading: "Holding it together, whatever it took",
    body: "When COVID shut budget schools across the state, he refused to let go of the children. He gave concessions, he gave his word, and when the school's books would not balance, he turned to other work simply to keep it alive. Those other ventures were never the point. They were scaffolding to keep the school standing. A budget school is a service, not a business. He lived that line, continuing to teach and shelter children on his own money even when promised scholarships went unpaid.",
  },
];

const timeline = [
  { year: "1948", track: "telangana", title: "A state takes shape", text: "Hyderabad State becomes part of India." },
  { year: "1956", track: "telangana", title: "Identity on hold", text: "Telangana is merged into Andhra Pradesh. A distinct people wait for their own name." },
  { year: "Childhood", track: "bapu", title: "A boy in the forest", text: "Bapu is born in Kalamadugu, Adilabad, the first in his family to reach for a book, trading curry leaves for the bicycle that carries him to school." },
  { year: "1969", track: "telangana", title: "The first call", text: "Telangana rises for the first time, asking to govern its own." },
  { year: "First salary", track: "bapu", title: "One hundred rupees", text: "Bapu's first pay as a government teacher is a hundred rupees, and a conviction worth far more." },
  { year: "1991", track: "bapu", title: "The school that trust built", text: "In a rented bungalow, his family in a single room beside the classrooms, Bapu opens his own school. One man, every subject." },
  { year: "2001", track: "telangana", title: "The movement returns", text: "The demand for a separate Telangana gathers force across the districts." },
  { year: "2 June 2014", track: "telangana", title: "Telangana is born", text: "After decades of waiting, Telangana becomes India's 29th state." },
  { year: "2014 onward", track: "telangana", title: "The state builds", text: "Water reaches fields that never had it. Farmers get direct support. Roads, a metro, a city the country now watches." },
  { year: "2014 onward", track: "bapu", title: "Still holding the line", text: "Through all of it Bapu keeps teaching, keeps fees low, never lets a child leave for want of money." },
  { year: "2020", track: "bapu", title: "He refused to close", text: "When COVID shut budget schools across the state, Bapu funded his from other work and kept every child." },
  { year: "Now", track: "both", title: "The next chapter", text: "Telangana looks ahead. Bapu's belief becomes Infizium, the system he never had, built by the son who grew up inside his school." },
];

export default function StoryPage() {
  return (
    <div className="min-h-full" style={{ background: "#000" }}>

      {/* Quiet nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-white">Infizium</Link>
          <Link href="/" className="text-xs text-white/35 hover:text-white/70 transition-colors">← Back</Link>
        </div>
      </nav>

      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Section label */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16">
            <motion.p variants={fadeUp} className="font-typewriter text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(245,158,11,0.5)" }}>
              విద్యే మార్గం · Education is the way
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Why Infizium exists.<br />His name is Bapu.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 text-lg max-w-2xl leading-relaxed">
              Before there was a platform, there was a man from a forest village in Adilabad who sold curry leaves as a boy, built a school from nothing, and spent thirty years proving that the only thing that outlasts money is what you learn.
            </motion.p>
          </motion.div>

          {/* Portrait + intro */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-20 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-2">
              <div className="aspect-[4/5] rounded-lg flex flex-col items-center justify-center text-center relative overflow-hidden"
                style={{ background: "#0a0a0a", border: "1px solid #2a2a2a" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.06) 0%, transparent 65%)" }} />
                <p className="font-typewriter text-7xl relative" style={{ color: "rgba(245,158,11,0.25)" }}>యశ</p>
                <p className="text-white/20 text-xs mt-3 relative font-mono tracking-widest uppercase">Photograph</p>
              </div>
              <div className="mt-6">
                <p className="font-bold text-white text-lg">Yadagiri Shekhar Rao</p>
                <p className="font-typewriter text-sm mt-1" style={{ color: "rgba(245,158,11,0.6)" }}>
                  Born in Kalamadugu, Jannaram Mandal, Adilabad
                </p>
                <p className="text-white/35 text-sm mt-2 leading-relaxed">
                  First of his family to hold a book, and he spent his life handing books to everyone else.
                </p>
                <p className="text-white/20 text-xs mt-4 font-mono">
                  Principal · Valmiki Vidyalayam · Karimnagar<br />
                  Founder · est. 1991
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-3 space-y-10">
              {story.slice(0, 3).map((s, i) => (
                <motion.div key={s.kicker} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}>
                  <p className="font-typewriter text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(245,158,11,0.45)" }}>{s.kicker}</p>
                  <h2 className="font-typewriter text-xl font-bold text-white mb-3">{s.heading}</h2>
                  <p className="text-white/45 text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pull quote */}
          <motion.blockquote initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
            className="my-16 px-8 py-8 rounded-lg"
            style={{ background: "rgba(245,158,11,0.04)", borderLeft: "3px solid rgba(245,158,11,0.4)" }}>
            <p className="font-typewriter text-white text-xl sm:text-2xl leading-relaxed font-medium">
              Money is a material. Work is a dedication. Service is rising above your own needs, and giving yourself back.
            </p>
            <p className="font-typewriter text-sm mt-4" style={{ color: "rgba(245,158,11,0.5)" }}>
              The three measures Bapu has lived his life by.
            </p>
          </motion.blockquote>

          {/* Remaining story sections */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {story.slice(3).map((s, i) => (
              <motion.div key={s.kicker} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                className="rounded-lg p-5" style={{ background: "#0a0a0a", border: "1px solid #222" }}>
                <p className="font-typewriter text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(245,158,11,0.4)" }}>{s.kicker}</p>
                <h2 className="font-typewriter font-bold text-white text-base mb-2 leading-snug">{s.heading}</h2>
                <p className="text-white/35 text-xs leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>

          {/* What he became */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="rounded-lg p-8 mb-16" style={{ background: "#0a0a0a", border: "1px solid #2a2a2a" }}>
            <p className="font-typewriter text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(245,158,11,0.4)" }}>What he became</p>
            <h2 className="font-typewriter text-2xl font-bold text-white mb-4">A forest, not a bird</h2>
            <p className="text-white/45 text-sm leading-relaxed mb-4">
              Over thirty years, his students became doctors, engineers, teachers, software professionals, soldiers, police, officers, and founders, and still they call him: when they are admitted somewhere, when they leave for abroad, when they start something of their own. <em className="text-white/60">"This is like I am qualified in all those professions,"</em> he says of them. <em className="text-white/60">"I accomplished all of them for my country."</em>
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              When he describes who he is, he never reaches for the language of power. The wealthy come and go like birds passing over a forest. The common people are not birds. They are trees, and together they are a forest larger than anything that flies above it. Bapu never wanted to be the bird. He has spent his whole life being the forest.
            </p>
          </motion.div>

          {/* Two-track timeline */}
          <div className="mb-20">
            <div className="text-center mb-3">
              <p className="font-typewriter text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,158,11,0.45)" }}>How Telangana came, and how he joined the flow</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Two journeys, one soil</h2>
            </div>
            <div className="flex items-center justify-center gap-5 mb-10 text-xs">
              <span className="flex items-center gap-2 text-white/50"><span className="w-2 h-2 rounded-full" style={{ background: "#10b981" }} /> Telangana</span>
              <span className="flex items-center gap-2 text-white/50"><span className="w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} /> Bapu</span>
            </div>

            <div className="relative">
              <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-px sm:-translate-x-1/2" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="space-y-6">
                {timeline.map((t, i) => {
                  const color = t.track === "telangana" ? "#10b981" : t.track === "bapu" ? "#f59e0b" : "#ffffff";
                  const isBapu = t.track === "bapu";
                  const isBoth = t.track === "both";
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.05, duration: 0.5, ease: EASE }}
                      className={`relative pl-12 sm:pl-0 sm:flex ${isBapu ? "sm:justify-end" : ""} ${isBoth ? "sm:justify-center" : ""}`}>
                      <span className="absolute left-4 sm:left-1/2 top-2 w-3 h-3 rounded-full -translate-x-1/2 ring-4 ring-black" style={{ background: color }} />
                      <div className={`rounded-lg p-4 sm:w-[45%] ${isBoth ? "sm:!w-[62%] sm:text-center" : ""}`} style={{ background: "#0a0a0a", border: `1px solid ${color}30` }}>
                        <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color }}>{t.year}</p>
                        <p className="font-bold text-white text-sm mb-1">{t.title}</p>
                        <p className="text-white/40 text-xs leading-relaxed">{t.text}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Closing */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}
            className="text-center border-t pt-14" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="font-typewriter text-white/55 text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto italic">
              "The best way to find yourself is to lose yourself in the service of others."
            </p>
            <p className="font-typewriter text-sm mt-4" style={{ color: "rgba(245,158,11,0.45)" }}>
              The line Bapu has carried, from Mahatma Gandhi.
            </p>
            <div className="mt-10 max-w-xl mx-auto">
              <p className="text-white/35 text-sm leading-relaxed">
                Infizium is built to give schools like Bapu's, the ones built on trust, not marketing, on service, not margin, the tools they have never had. Every feature is built with his school in mind first.
              </p>
            </div>

            <div className="mt-12 max-w-xl mx-auto rounded-lg p-6 text-left" style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <p className="font-typewriter text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(245,158,11,0.5)" }}>From the developer</p>
              <p className="text-white/50 text-sm leading-relaxed mb-3">
                I grew up inside this school. I watched my father carry all of it in his head: every fee, every meal, every repair, every child. He made it work on memory and will alone, for thirty years, and never once let it show.
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                Infizium is the system he never had. I am building it so the next person who starts a school out of nothing does not have to carry it the way he did. This is his story. It is also the reason for every line of code.
              </p>
            </div>
            <p className="font-typewriter text-xs tracking-widest uppercase mt-8" style={{ color: "rgba(245,158,11,0.35)" }}>
              For Bapu · జై హింద్
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
