'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// ── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Atmospheric background orbs ───────────────────────────────────────────────
function AtmosphericBg() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* deep pink orb */}
      <div
        className="orb w-96 h-96 top-10 left-[-10%]"
        style={{ background: 'rgba(247,168,184,0.12)' }}
      />
      {/* peach orb */}
      <div
        className="orb w-[28rem] h-[28rem] top-[-8%] right-[-8%]"
        style={{ background: 'rgba(255,203,164,0.09)' }}
      />
      {/* lilac orb mid */}
      <div
        className="orb w-80 h-80 top-[45%] left-[55%]"
        style={{ background: 'rgba(201,184,247,0.10)' }}
      />
      {/* blue orb bottom */}
      <div
        className="orb w-72 h-72 bottom-[10%] left-[20%]"
        style={{ background: 'rgba(168,200,247,0.08)' }}
      />
      {/* subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* blurred backdrop image via gradient */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,184,247,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 30% 70%, rgba(247,168,184,0.12) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center gap-6">
        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 0.4, letterSpacing: '0.6em' }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
          className="text-xs font-light tracking-[0.6em] uppercase text-white/40"
        >
          A Moment in Stillness
        </motion.p>

        {/* main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
          className="text-[clamp(4rem,12vw,11rem)] font-bold leading-none"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(201,184,247,0.9) 40%, rgba(247,168,184,0.8) 80%, rgba(255,203,164,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
          }}
        >
          Silent Mode
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="text-sm font-light tracking-widest text-white/50 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          for everything left unsaid
        </motion.p>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">scroll</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Counter ───────────────────────────────────────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0);
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setCount((c) => c + 1);
    setRipple(true);
    setTimeout(() => setRipple(false), 700);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 gap-10">
      <Reveal>
        <p className="text-xs tracking-[0.5em] uppercase text-white/30 text-center">carry the weight</p>
      </Reveal>

      {/* count display */}
      <Reveal delay={0.1}>
        <div className="text-center">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="block text-[clamp(5rem,18vw,14rem)] font-bold leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(201,184,247,0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {count}
          </motion.span>
          <p className="text-xs tracking-widest text-white/20 mt-2 uppercase">
            {count === 0 ? 'times' : count === 1 ? 'time' : 'times'}
          </p>
        </div>
      </Reveal>

      {/* glass button */}
      <Reveal delay={0.2}>
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden glass rounded-2xl px-12 py-5 text-sm font-light tracking-[0.3em] uppercase text-white/80 cursor-pointer select-none"
          style={{
            boxShadow: ripple
              ? '0 0 0 2px rgba(201,184,247,0.5), 0 0 60px rgba(201,184,247,0.35), 0 0 120px rgba(247,168,184,0.2)'
              : '0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* inner shine */}
          <span
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
            }}
          />
          {/* ripple burst */}
          {ripple && (
            <motion.span
              key={count}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'rgba(201,184,247,0.25)' }}
            />
          )}
          <span className="relative z-10">I Miss Her</span>
        </motion.button>
      </Reveal>

      <Reveal delay={0.35}>
        <p className="text-[11px] text-white/20 tracking-widest italic text-center"
           style={{ fontFamily: "'Playfair Display', serif" }}>
          {count === 0
            ? 'press when it\'s quiet'
            : count < 5
            ? 'you\'re allowed to'
            : count < 20
            ? 'it\'s okay'
            : count < 50
            ? 'still here'
            : 'breathe'}
        </p>
      </Reveal>
    </section>
  );
}

// ── Collision ─────────────────────────────────────────────────────────────────
function Collision() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 gap-16">
      <Reveal>
        <div className="text-center space-y-3">
          <p className="text-xs tracking-[0.5em] uppercase text-white/25">physics of the heart</p>
          <h2
            className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #fff 0%, rgba(201,184,247,0.85) 60%, rgba(247,168,184,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Moments in Collision
          </h2>
          <p className="text-xs text-white/25 font-light tracking-wider max-w-xs mx-auto">
            two objects — equal mass, opposite velocity — meet exactly once
          </p>
        </div>
      </Reveal>

      {/* animation stage */}
      <Reveal delay={0.2}>
        <div className="relative w-80 h-40 flex items-center justify-center">
          {/* shockwave */}
          <div className="sq-shock" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

          {/* left square — warm rose */}
          <div
            className="collision-square sq-left absolute"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4, #fb7185)',
              boxShadow: '0 0 24px rgba(249,168,212,0.5)',
              left: '50%',
              top: '50%',
              transform: 'translateY(-50%) translateX(-180px)',
            }}
          />

          {/* right square — cool violet */}
          <div
            className="collision-square sq-right absolute"
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
              boxShadow: '0 0 24px rgba(167,139,250,0.5)',
              left: '50%',
              top: '50%',
              transform: 'translateY(-50%) translateX(116px)',
            }}
          />
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="glass rounded-xl px-8 py-5 max-w-sm text-center">
          <p className="text-xs text-white/40 leading-relaxed tracking-wide">
            In elastic collision, momentum is conserved — yet after impact,
            nothing moves the same way it did before.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-32 gap-8">
      <Reveal>
        <div className="text-center space-y-6">
          <p className="text-xs tracking-[0.6em] uppercase text-white/20">a reminder</p>
          <h2
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(201,184,247,0.5) 50%, rgba(168,200,247,0.4) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Keep Moving Right
          </h2>
          <p
            className="text-xs text-white/20 font-light tracking-widest italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            the x-axis is your friend
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-8" />
      </Reveal>

      <Reveal delay={0.3}>
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/15">
          silent-mode-counter &nbsp;&mdash;&nbsp; {new Date().getFullYear()}
        </p>
      </Reveal>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="relative bg-[#03071e] min-h-screen">
      <AtmosphericBg />
      <Hero />
      <Counter />
      <Collision />
      <Footer />
    </main>
  );
}
