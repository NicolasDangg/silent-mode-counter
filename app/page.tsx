'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ─── fade-up variant ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const [count, setCount] = useState(0);
  const [burst, setBurst] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ─── parallax for hero ─── */
  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 600], [0,  90]);
  const heroY  = useTransform(scrollY, [0, 600], [0,  50]);
  const heroO  = useTransform(scrollY, [0, 400], [1,   0]);

  function handleCount() {
    setCount(c => c + 1);
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  }

  return (
    <main ref={containerRef} className="relative min-h-screen">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">

        {/* atmospheric BG */}
        <motion.div
          className="parallax-bg absolute inset-0 pointer-events-none"
          style={{ y: bgY }}
        >
          {/* deep navy base */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, #12244A 0%, #050B18 70%)',
          }} />
          {/* dawn glow blobs */}
          <div className="absolute" style={{
            top: '10%', left: '15%', width: 420, height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,168,232,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
          <div className="absolute" style={{
            top: '20%', right: '10%', width: 320, height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,165,180,0.14) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          <div className="absolute" style={{
            bottom: '15%', left: '40%', width: 500, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,197,232,0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }} />
          {/* fine grain overlay */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
          />
        </motion.div>

        {/* hero text */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-6"
          style={{ y: heroY, opacity: heroO }}
        >
          <motion.p
            className="uppercase tracking-[0.4em] text-xs mb-6"
            style={{ color: 'rgba(200,160,230,0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            An experiment in longing
          </motion.p>

          <motion.h1
            className="font-serif leading-none tracking-tight select-none"
            style={{
              fontSize: 'clamp(4rem, 14vw, 12rem)',
              background: 'linear-gradient(160deg, #e8e8f8 0%, #c4a8e8 40%, #a8c5e8 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Silent Mode
          </motion.h1>

          <motion.div
            className="mt-6 h-px w-24 mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,160,230,0.6), transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />

          <motion.p
            className="mt-6 text-sm font-serif italic"
            style={{ color: 'rgba(200,200,220,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            some distances cannot be measured
          </motion.p>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(200,160,230,0.4)' }}>scroll</span>
          <motion.div
            className="w-px h-8"
            style={{ background: 'linear-gradient(180deg, rgba(200,160,230,0.5), transparent)' }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ═══════════════ COUNTER ═══════════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6">
        {/* subtle section glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,168,232,0.06) 0%, transparent 70%)',
        }} />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
        >
          <motion.p
            className="uppercase tracking-[0.35em] text-xs"
            style={{ color: 'rgba(200,160,230,0.55)' }}
            variants={fadeUp}
            custom={0}
          >
            counter
          </motion.p>

          {/* count display */}
          <motion.div variants={fadeUp} custom={1} className="relative">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                className="block font-serif leading-none"
                style={{
                  fontSize: 'clamp(5rem, 18vw, 14rem)',
                  background: 'linear-gradient(160deg, #e8e8f8 0%, #c4a8e8 50%, #f5c6a0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* the button */}
          <motion.div variants={fadeUp} custom={2}>
            <motion.button
              onClick={handleCount}
              className="glass relative px-10 py-5 rounded-2xl font-serif italic text-lg overflow-hidden select-none"
              style={{
                color: 'rgba(232,232,248,0.9)',
                background: 'rgba(196,168,232,0.06)',
                border: '1px solid rgba(196,168,232,0.2)',
              }}
              whileHover={{
                scale: 1.04,
                background: 'rgba(196,168,232,0.12)',
                borderColor: 'rgba(196,168,232,0.4)',
                boxShadow: '0 0 30px 8px rgba(196,168,232,0.2)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {/* inner shimmer on click */}
              <AnimatePresence>
                {burst && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ opacity: 0.8, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                      background: 'radial-gradient(circle, rgba(232,165,180,0.4) 0%, rgba(196,168,232,0.2) 40%, transparent 70%)',
                    }}
                  />
                )}
              </AnimatePresence>
              I Miss Her
            </motion.button>
          </motion.div>

          <motion.p
            className="text-xs font-serif italic"
            style={{ color: 'rgba(200,200,220,0.3)' }}
            variants={fadeUp}
            custom={3}
          >
            {count === 0 ? 'press, if you dare' : count === 1 ? 'once.' : count < 10 ? `${count} times, and counting.` : `${count}. you\'re still here.`}
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════ MOMENTS IN COLLISION ═══════════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(168,197,232,0.05) 0%, transparent 70%)',
        }} />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-16 text-center w-full max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} custom={0} className="flex flex-col items-center gap-3">
            <p className="uppercase tracking-[0.35em] text-xs" style={{ color: 'rgba(168,197,232,0.55)' }}>observation</p>
            <h2 className="font-serif text-4xl md:text-5xl" style={{
              background: 'linear-gradient(135deg, #e8e8f8 0%, #a8c5e8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Moments in Collision
            </h2>
            <p className="mt-2 text-sm font-serif italic" style={{ color: 'rgba(200,200,220,0.4)' }}>
              two objects. inevitable contact. everything changes.
            </p>
          </motion.div>

          {/* collision animation */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="glass rounded-3xl p-12 md:p-16 w-full"
            style={{ maxWidth: 480 }}
          >
            <div className="relative flex items-center justify-center" style={{ height: 100 }}>
              {/* left square */}
              <div
                className="absolute rounded-xl animate-collide-left"
                style={{
                  width: 52,
                  height: 52,
                  background: 'linear-gradient(135deg, #c4a8e8, #a8c5e8)',
                  boxShadow: '0 0 24px 4px rgba(196,168,232,0.4)',
                  left: 'calc(50% - 58px)',
                }}
              />
              {/* right square */}
              <div
                className="absolute rounded-xl animate-collide-right"
                style={{
                  width: 52,
                  height: 52,
                  background: 'linear-gradient(135deg, #e8a5b4, #f5c6a0)',
                  boxShadow: '0 0 24px 4px rgba(232,165,180,0.4)',
                  left: 'calc(50% + 6px)',
                }}
              />
            </div>

            <p className="mt-8 text-xs uppercase tracking-widest" style={{ color: 'rgba(200,200,220,0.3)' }}>
              elastic collision &nbsp;·&nbsp; conservation of momentum
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-sm font-serif italic max-w-xs"
            style={{ color: 'rgba(200,200,220,0.4)' }}
          >
            inspired by the study of forces &mdash; how meeting changes trajectory.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════ FOOTER / CTA ═══════════════ */}
      <section className="relative flex flex-col items-center justify-center py-32 px-6 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 80% at 50% 100%, rgba(245,198,160,0.05) 0%, transparent 70%)',
        }} />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
        >
          <motion.div
            className="w-px h-20"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(245,198,160,0.4), transparent)' }}
            variants={fadeUp}
            custom={0}
          />

          <motion.h2
            className="font-serif leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              background: 'linear-gradient(160deg, #e8e8f8 0%, #f5c6a0 50%, #e8a5b4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            variants={fadeUp}
            custom={1}
          >
            Keep Moving Right
          </motion.h2>

          <motion.p
            className="text-sm font-serif italic"
            style={{ color: 'rgba(200,200,220,0.4)' }}
            variants={fadeUp}
            custom={2}
          >
            the only direction worth knowing
          </motion.p>

          <motion.div
            className="mt-4 flex items-center gap-3"
            variants={fadeUp}
            custom={3}
          >
            <div className="h-px w-8" style={{ background: 'rgba(245,198,160,0.3)' }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(245,198,160,0.3)' }}>silent mode</span>
            <div className="h-px w-8" style={{ background: 'rgba(245,198,160,0.3)' }} />
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
