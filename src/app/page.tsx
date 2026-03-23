'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-purple-600 top-[-100px] left-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-pink-400 bottom-[-50px] right-[-100px]" />
      <div className="orb w-[300px] h-[300px] bg-blue-500 top-[40%] left-[60%]" />

      {/* Parallax content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 0.4, letterSpacing: '0.35em' }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="text-xs uppercase tracking-[0.35em] text-purple-300 mb-6 font-sans"
        >
          an experience
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(4rem,14vw,11rem)] font-serif font-bold leading-none tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #f9a8d4 100%)',
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
          animate={{ scaleX: 1, opacity: 0.3 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mt-8 w-64 mx-auto"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
          className="mt-6 text-sm text-purple-200 font-sans tracking-widest uppercase"
        >
          scroll to feel
        </motion.p>
      </motion.div>

      {/* Scroll chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-purple-300/40 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 bg-purple-300 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CounterSection() {
  const [count, setCount] = useState(0);
  const [glowing, setGlowing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
    setGlowing(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setGlowing(true));
    });
    setTimeout(() => setGlowing(false), 750);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32"
    >
      <div className="orb w-[500px] h-[500px] bg-indigo-600 top-[20%] left-[10%]" />
      <div className="orb w-[350px] h-[350px] bg-rose-400 bottom-[10%] right-[5%]" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-10"
      >
        {/* Counter display */}
        <motion.div
          key={count}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[clamp(5rem,18vw,12rem)] font-serif font-bold leading-none"
            style={{
              background: 'linear-gradient(135deg, #e9d5ff 0%, #a78bfa 50%, #f9a8d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {count}
          </p>
          <p className="text-purple-300/60 text-xs tracking-widest uppercase font-sans mt-2">
            {count === 0 ? 'times' : count === 1 ? 'time' : 'times'}
          </p>
        </motion.div>

        {/* Glass button */}
        <button
          onClick={handleClick}
          className={`glass rounded-2xl px-12 py-5 text-white font-serif text-xl cursor-pointer transition-all duration-300 hover:bg-white/10 active:scale-95 select-none ${glowing ? 'glow-pulse' : ''}`}
          style={{ letterSpacing: '0.05em' }}
        >
          I Miss Her
        </button>

        <p className="text-purple-300/30 text-xs font-sans tracking-widest uppercase">
          {count === 0 ? 'press when you feel it' : count < 5 ? 'keep going' : count < 20 ? 'it adds up' : 'every moment counted'}
        </p>
      </motion.div>
    </section>
  );
}

function CollisionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
    >
      <div className="orb w-[400px] h-[400px] bg-teal-500 top-[15%] right-[10%]" />
      <div className="orb w-[300px] h-[300px] bg-violet-600 bottom-[20%] left-[5%]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-16"
      >
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-300/50 font-sans mb-4">observation</p>
          <h2
            className="text-[clamp(2rem,6vw,4rem)] font-serif font-bold"
            style={{
              background: 'linear-gradient(135deg, #c4b5fd 0%, #f9a8d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Moments in Collision
          </h2>
          <p className="mt-4 text-purple-300/40 text-sm font-sans tracking-wide max-w-md mx-auto leading-relaxed">
            Two bodies. One axis. The moment before impact is where everything lives.
          </p>
        </div>

        {/* Animation stage */}
        <div className="glass rounded-3xl p-12 w-full flex flex-col items-center gap-8">
          <div className="relative flex items-center justify-center w-full h-24">
            {/* Left square */}
            <div
              className="square-left absolute w-16 h-16 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #7c6af7, #a78bfa)', boxShadow: '0 0 30px rgba(124,106,247,0.4)' }}
            />
            {/* Impact flash */}
            <div
              className="impact-flash absolute w-6 h-6 rounded-full bg-white"
              style={{ boxShadow: '0 0 20px 10px rgba(255,255,255,0.6)' }}
            />
            {/* Right square */}
            <div
              className="square-right absolute w-16 h-16 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #f9a8d4, #ec4899)', boxShadow: '0 0 30px rgba(249,168,212,0.4)' }}
            />
          </div>

          <div className="flex gap-8 text-center">
            <div>
              <p className="text-purple-300 font-serif text-2xl font-bold">m₁</p>
              <p className="text-purple-300/40 text-xs font-sans tracking-widest mt-1">momentum</p>
            </div>
            <div className="w-px bg-purple-300/20" />
            <div>
              <p className="text-pink-300 font-serif text-2xl font-bold">m₂</p>
              <p className="text-pink-300/40 text-xs font-sans tracking-widest mt-1">memory</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
    >
      <div className="orb w-[600px] h-[600px] bg-purple-700 top-[-200px] left-[-100px]" />
      <div className="orb w-[400px] h-[400px] bg-pink-500 bottom-[-100px] right-[-50px]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={inView ? { opacity: 0.3, letterSpacing: '0.35em' } : {}}
          transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
          className="text-xs uppercase text-purple-300 font-sans mb-8 tracking-[0.35em]"
        >
          always
        </motion.p>

        <h2
          className="text-[clamp(2.5rem,8vw,6rem)] font-serif font-bold leading-tight"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #f9a8d4 80%, #ffffff 100%)',
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
          animate={inView ? { scaleX: 1, opacity: 0.2 } : {}}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mt-10 w-48 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.25 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-xs text-purple-300 font-sans tracking-widest uppercase"
        >
          silent mode &mdash; {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </section>
  );
}

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
