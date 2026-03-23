'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <div className="orb w-[700px] h-[700px] bg-purple-700 top-[-150px] left-[-250px]" />
      <div className="orb w-[450px] h-[450px] bg-pink-500 bottom-[-80px] right-[-120px]" />
      <div className="orb w-[320px] h-[320px] bg-indigo-600 top-[35%] left-[55%]" />

      {/* Fine grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC45JyBudW1PY3RhdmVzPSc0JyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsdGVyPSd1cmwoI24pJy8+PC9zdmc+')]" />

      {/* Parallax content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 0.35, letterSpacing: '0.38em' }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="text-xs uppercase text-purple-300 mb-6 font-sans tracking-[0.38em]"
        >
          an experience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(4.5rem,15vw,11rem)] font-serif font-bold leading-[0.9] tracking-tight select-none"
          style={{
            background: 'linear-gradient(140deg, #ffffff 0%, #c4b5fd 45%, #f9a8d4 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Silent
          <br />
          Mode
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.25 }}
          transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mt-8 w-72 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
          className="mt-6 text-xs text-purple-200 font-sans tracking-widest uppercase"
        >
          scroll to feel
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-purple-300/30 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2.5 bg-purple-300 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COUNTER
// ─────────────────────────────────────────────
function CounterSection() {
  const [count, setCount]   = useState(0);
  const [glowing, setGlowing] = useState(false);
  const [ripple, setRipple]   = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
    setGlowing(false);
    setRipple(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setGlowing(true);
        setRipple(true);
      })
    );
    setTimeout(() => { setGlowing(false); setRipple(false); }, 800);
  }, []);

  const subtext =
    count === 0  ? 'press when you feel it' :
    count < 5    ? 'it\'s okay' :
    count < 15   ? 'it adds up' :
    count < 40   ? 'every one counted' :
                   'she was worth it';

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
    >
      <div className="orb w-[550px] h-[550px] bg-indigo-700 top-[15%] left-[5%]" />
      <div className="orb w-[380px] h-[380px] bg-rose-500 bottom-[8%] right-[2%]" />

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-10"
      >
        {/* Counter number */}
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0.75, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.15, opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p
              className="text-[clamp(6rem,20vw,13rem)] font-serif font-bold leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 45%, #f9a8d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {count}
            </p>
            <p className="text-purple-300/50 text-xs tracking-widest uppercase font-sans mt-1">
              {count === 1 ? 'time' : 'times'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Button with ripple */}
        <div className="relative">
          {/* Ripple ring */}
          {ripple && (
            <span
              className="ring-ripple absolute inset-0 rounded-2xl border-2 border-purple-400/60 pointer-events-none"
            />
          )}
          <button
            onClick={handleClick}
            className={[
              'glass-strong rounded-2xl px-14 py-5 text-white font-serif text-xl cursor-pointer',
              'transition-all duration-200 hover:bg-white/10 hover:border-white/20',
              'active:scale-[0.96] select-none relative z-10',
              glowing ? 'glow-pulse' : '',
            ].join(' ')}
            style={{ letterSpacing: '0.06em' }}
          >
            I Miss Her
          </button>
        </div>

        <motion.p
          key={subtext}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-purple-300 text-xs font-sans tracking-widest uppercase"
        >
          {subtext}
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COLLISION
// ─────────────────────────────────────────────
function CollisionSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
    >
      <div className="orb w-[420px] h-[420px] bg-teal-600 top-[12%] right-[8%]" />
      <div className="orb w-[320px] h-[320px] bg-violet-700 bottom-[18%] left-[3%]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-16"
      >
        {/* Header */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-purple-300/45 font-sans mb-4">observation</p>
          <h2
            className="text-[clamp(2rem,6vw,4rem)] font-serif font-bold leading-tight"
            style={{
              background: 'linear-gradient(135deg, #c4b5fd 0%, #f9a8d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Moments in Collision
          </h2>
          <p className="mt-5 text-purple-300/40 text-sm font-sans tracking-wide max-w-sm mx-auto leading-relaxed">
            Two bodies. One axis. The moment before impact is where everything lives.
          </p>
        </div>

        {/* Animation stage */}
        <div className="glass rounded-3xl p-12 w-full flex flex-col items-center gap-10">
          {/* Squares */}
          <div className="relative flex items-center justify-center w-full h-24">
            {/* Shockwave */}
            <div
              className="shockwave absolute h-16 w-32 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)',
              }}
            />
            {/* Left square */}
            <div
              className="square-left absolute w-16 h-16 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #6d5af0, #a78bfa)',
                boxShadow: '0 0 35px rgba(109,90,240,0.45)',
              }}
            />
            {/* Impact flash */}
            <div
              className="impact-flash absolute w-5 h-5 rounded-full bg-white"
              style={{ boxShadow: '0 0 24px 12px rgba(255,255,255,0.7)' }}
            />
            {/* Right square */}
            <div
              className="square-right absolute w-16 h-16 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #f9a8d4, #e879a0)',
                boxShadow: '0 0 35px rgba(232,121,160,0.45)',
              }}
            />
          </div>

          {/* Labels */}
          <div className="flex items-center gap-10 text-center">
            <div>
              <p className="text-purple-300 font-serif text-2xl font-bold">m₁</p>
              <p className="text-purple-300/35 text-xs font-sans tracking-widest uppercase mt-1">momentum</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-pink-300 font-serif text-2xl font-bold">m₂</p>
              <p className="text-pink-300/35 text-xs font-sans tracking-widest uppercase mt-1">memory</p>
            </div>
          </div>

          {/* Equation */}
          <p
            className="text-xs font-sans tracking-[0.25em] text-purple-300/25 uppercase"
          >
            m₁v₁ + m₂v₂ = constant
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function FooterSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="relative min-h-[65vh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
    >
      <div className="orb w-[650px] h-[650px] bg-violet-800 top-[-220px] left-[-120px]" />
      <div className="orb w-[420px] h-[420px] bg-pink-600 bottom-[-120px] right-[-60px]" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.9em' }}
          animate={inView ? { opacity: 0.28, letterSpacing: '0.38em' } : {}}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          className="text-xs uppercase text-purple-300 font-sans mb-8 tracking-[0.38em]"
        >
          always
        </motion.p>

        <h2
          className="text-[clamp(3rem,9vw,7rem)] font-serif font-bold leading-[0.92]"
          style={{
            background: 'linear-gradient(140deg, #ffffff 0%, #c4b5fd 35%, #f9a8d4 75%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Keep Moving
          <br />
          Right
        </h2>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 0.18 } : {}}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mt-12 w-52 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.2 } : {}}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-8 text-xs text-purple-300 font-sans tracking-widest uppercase"
        >
          silent mode &mdash; 2026
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <CounterSection />
      <CollisionSection />
      <FooterSection />
    </main>
  );
}
