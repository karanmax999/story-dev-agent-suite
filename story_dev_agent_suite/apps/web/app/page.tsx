'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, Bot, ArrowRight, Code2, BookOpen, Layers, Zap, Cpu, Sparkles, Rocket, Shield, GitBranch } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import TypingTerminal from '../components/TypingTerminal';
import SpotlightCard from '../components/SpotlightCard';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Mouse tracking for electric effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-[#050508] text-white selection:bg-indigo-500/30 relative overflow-hidden font-sans">

      {/* Electric Cursor Trail */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: `radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)`,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-4000" />

        {/* Grid with electric effect */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Lightning bolts */}
        <svg className="absolute inset-0 w-full h-full opacity-10" style={{ mixBlendMode: 'screen' }}>
          <defs>
            <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 100 50 L 120 100 L 110 100 L 130 150"
            stroke="url(#lightning-gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          <motion.path
            d="M 800 100 L 820 150 L 810 150 L 830 200"
            stroke="url(#lightning-gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, delay: 1 }}
          />
        </svg>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">

        {/* Floating Navbar with electric glow */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-indigo-500/10 px-6 py-3 flex items-center justify-between group hover:shadow-indigo-500/30 transition-shadow duration-300"
        >
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shadow-inner">
              <img src="/favicon.ico" alt="Logo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span>Story<span className="text-indigo-400">Dev</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors relative group/link">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover/link:w-full transition-all duration-300" />
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors relative group/link">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover/link:w-full transition-all duration-300" />
            </a>
            <a href="https://docs.story.foundation" className="hover:text-white transition-colors relative group/link">
              Docs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover/link:w-full transition-all duration-300" />
            </a>
            <a href="https://github.com/karanmax999/story-dev-agent-suite" className="hover:text-white transition-colors relative group/link">
              GitHub
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover/link:w-full transition-all duration-300" />
            </a>
          </div>
          <a href="#quickstart" className="relative bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all border border-white/5 overflow-hidden group/btn">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover/btn:opacity-20 transition-opacity" />
          </a>
        </motion.nav>

        {/* Hero Section */}
        <section className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
          <div className="w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide mb-8 relative overflow-hidden group"
                >
                  <span className="relative flex h-2 w-2 z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span className="relative z-10">AENEID TESTNET LIVE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]"
                >
                  Build IP-Native <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 animate-gradient-x relative">
                    AI Agents.
                    <motion.span
                      className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed"
                >
                  The complete developer toolkit for Story Protocol. Scaffold projects, register IP assets, and build the future of programmable IP.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <a
                    href="#quickstart"
                    className="group relative px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 transition-all shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] border border-indigo-400/20 overflow-hidden"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span className="relative z-10">Start Building</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    {/* Electric ripple effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={isHovering ? { x: '100%' } : { x: '-100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </a>
                  <a
                    href="http://localhost:3001"
                    target="_blank"
                    className="group px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all backdrop-blur-sm relative overflow-hidden"
                  >
                    <span className="relative z-10">Live Demo</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </a>
                </motion.div>

                {/* Stats with electric glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 grid grid-cols-3 gap-8"
                >
                  {[
                    { value: "6+", label: "Commands", color: "indigo" },
                    { value: "4", label: "Templates", color: "purple" },
                    { value: "0", label: "Config Needed", color: "cyan" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="relative group cursor-pointer"
                    >
                      <div className={`text-3xl font-bold text-${stat.color}-400 relative z-10`}>{stat.value}</div>
                      <div className="text-sm text-gray-500 relative z-10">{stat.label}</div>
                      <motion.div
                        className={`absolute inset-0 bg-${stat.color}-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Column - Interactive Demo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Video Card with electric border */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-black/50 backdrop-blur-xl mb-6">
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity relative z-10"
                  >
                    <source src="/logogif.mp4" type="video/mp4" />
                  </video>

                  {/* Corner sparks */}
                  <motion.div
                    className="absolute top-0 right-0 w-2 h-2 bg-indigo-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-2 h-2 bg-purple-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>

                {/* Terminal Overlay with electric effect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="transform hover:scale-[1.02] transition-transform duration-300 relative group"
                  whileHover={{ y: -5 }}
                >
                  <TypingTerminal />
                  {/* Electric glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity pointer-events-none" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto relative">
          {/* Electric connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 0 }}>
            <motion.path
              d="M 200 100 Q 400 50, 600 100"
              stroke="url(#lightning-gradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 relative z-10"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 relative">
                How It Works
                <motion.span
                  className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to start building on Story Protocol
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                step: "01",
                title: "Scaffold",
                description: "Use our CLI to instantly generate a production-ready project with Story Protocol integration.",
                icon: Terminal,
                color: "indigo",
                command: "npx story-dev-agent init my-app"
              },
              {
                step: "02",
                title: "Configure",
                description: "Add your Story Protocol credentials and you're ready to register IP assets.",
                icon: Shield,
                color: "purple",
                command: "story-dev-agent config set PRIVATE_KEY"
              },
              {
                step: "03",
                title: "Build",
                description: "Register IP, create licenses, and build your IP-native application with our SDK.",
                icon: Rocket,
                color: "cyan",
                command: "story-dev-agent register --metadata-uri ipfs://..."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <SpotlightCard className="p-8 h-full group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                  {/* Electric particles */}
                  <motion.div
                    className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full"
                    animate={{
                      y: [0, 100, 0],
                      x: [0, -50, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-${item.color}-500/20 border-2 border-${item.color}-500/50 flex items-center justify-center text-${item.color}-400 shadow-lg shadow-${item.color}-500/20 relative`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-8 h-8" />
                      {/* Pulsing glow */}
                      <motion.div
                        className={`absolute inset-0 bg-${item.color}-500/30 rounded-2xl blur-md`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    <div className="text-5xl font-bold text-white/10">{item.step}</div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 relative z-10">{item.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed relative z-10">{item.description}</p>

                  <div className="bg-black/50 rounded-lg p-4 border border-white/10 font-mono text-sm group-hover:border-white/20 transition-colors relative z-10 overflow-hidden">
                    <div className="text-gray-500 mb-2">$</div>
                    <code className={`text-${item.color}-400`}>{item.command}</code>
                    {/* Typing cursor effect */}
                    <motion.span
                      className={`inline-block w-2 h-4 bg-${item.color}-400 ml-1`}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 relative">
                The Complete Toolkit
                <motion.span
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to build on Story Protocol, from CLI to SDK
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[280px]">
            {/* Large Feature - CLI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2"
              whileHover={{ scale: 1.01 }}
            >
              <SpotlightCard className="p-10 h-full flex flex-col justify-between group transition-transform duration-300 relative overflow-hidden">
                {/* Animated electric particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 shadow-lg shadow-indigo-500/20 relative"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Terminal className="w-8 h-8" />
                    <motion.div
                      className="absolute inset-0 bg-indigo-500/30 rounded-2xl blur-md"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  <h3 className="text-4xl font-bold mb-4">Powerful CLI</h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                    Scaffold projects, register IP, manage licenses—all from your terminal. Built with Commander.js and beautiful terminal UX.
                  </p>
                </div>

                <div className="bg-black/40 rounded-xl p-6 border border-white/5 font-mono text-sm shadow-inner relative z-10 group-hover:border-indigo-500/20 transition-colors">
                  <div className="flex gap-2 mb-4 opacity-50">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-2 text-gray-300">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-purple-400">$</span> story-dev-agent init my-app
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="text-green-400">✓</span> Project created!
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="text-purple-400">$</span> story-dev-agent register --metadata-uri ipfs://...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="text-green-400">✓</span> IP Asset registered!
                    </motion.div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* GenAI Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:row-span-2"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <SpotlightCard className="p-8 h-full flex flex-col items-center justify-center text-center group transition-transform duration-300 bg-gradient-to-b from-purple-900/20 to-transparent relative overflow-hidden">
                {/* Electric aura */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <motion.div
                  className="w-20 h-20 bg-purple-500/20 rounded-3xl flex items-center justify-center mb-6 text-purple-400 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow relative z-10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Bot className="w-10 h-10" />
                  <motion.div
                    className="absolute inset-0 bg-purple-500/30 rounded-3xl blur-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 relative z-10">GenAI Agent</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed relative z-10">
                  Reference implementation: AI generation → automatic IP registration on Story Protocol.
                </p>
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  className="relative px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2 z-10 overflow-hidden group/btn"
                >
                  <span className="relative z-10">Try Demo</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </a>
              </SpotlightCard>
            </motion.div>

            {/* SDK, Templates, Monorepo - with electric hover effects */}
            {[
              { icon: Code2, title: "Story Client SDK", desc: "Simplified TypeScript wrapper around Story Protocol's core SDK.", color: "cyan" },
              { icon: Layers, title: "4 Templates", desc: "Production-ready templates for common use cases and patterns.", color: "orange" },
              { icon: GitBranch, title: "Monorepo Setup", desc: "pnpm workspace with shared packages and optimized builds.", color: "green" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <SpotlightCard className="p-8 h-full group transition-transform duration-300 relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-${item.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <item.icon className={`w-10 h-10 text-${item.color}-400 mb-4 relative z-10`} />
                  <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed relative z-10">{item.desc}</p>

                  {/* Corner spark */}
                  <motion.div
                    className={`absolute top-2 right-2 w-1 h-1 bg-${item.color}-400 rounded-full`}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  />
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section id="quickstart" className="py-32 px-6 max-w-5xl mx-auto relative">
          {/* Electric background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 blur-3xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <motion.div
              className="inline-block p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <motion.div
                className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <h2 className="text-5xl font-bold mb-6">Ready to Ship?</h2>
            <p className="text-xl text-gray-400">Get started in under 60 seconds</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <SpotlightCard className="p-10 relative overflow-hidden group">
              {/* Electric border animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 blur-2xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <div className="bg-[#0f0f12] rounded-2xl p-8 font-mono text-sm shadow-2xl border border-white/5 relative z-10">
                <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-red-500/80"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-yellow-500/80"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-green-500/80"
                    whileHover={{ scale: 1.2 }}
                  />
                </div>

                <div className="space-y-4 text-gray-300">
                  {[
                    "git clone https://github.com/karanmax999/story-dev-agent-suite",
                    "cd story_dev_agent_suite && pnpm install",
                    "pnpm --filter cli build",
                    "node packages/cli/dist/index.js init"
                  ].map((cmd, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 group/line"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-gray-600 w-6">{i + 1}</span>
                      <span className="text-purple-400">$</span>
                      <span className="flex-1">{cmd}</span>
                      <motion.div
                        className="w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover/line:opacity-100"
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                  ))}
                  <motion.div
                    className="mt-4 text-green-400 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    >
                      ✓
                    </motion.span>
                    <span>Ready to build on Story Protocol!</span>
                  </motion.div>
                </div>
              </div>

              <div className="mt-8 flex gap-4 relative z-10">
                <a
                  href="https://docs.story.foundation"
                  target="_blank"
                  className="flex-1 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-center font-medium transition-all relative overflow-hidden group/btn"
                >
                  <span className="relative z-10">Read Docs</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </a>
                <a
                  href="https://github.com/karanmax999/story-dev-agent-suite"
                  target="_blank"
                  className="flex-1 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-center font-semibold transition-all relative overflow-hidden group/btn"
                >
                  <span className="relative z-10">View on GitHub</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#020203] py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-2 font-bold text-2xl mb-4">
                  <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
                  Story<span className="text-indigo-400">Dev</span>
                </div>
                <p className="text-gray-400 leading-relaxed max-w-sm">
                  Open-source toolkit for the Story Protocol ecosystem. Empowering the next generation of IP-programmable applications.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <ul className="space-y-3 text-gray-500">
                  <li><a href="https://docs.story.foundation" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
                  <li><a href="https://aeneid.explorer.story.foundation" className="hover:text-indigo-400 transition-colors">Explorer</a></li>
                  <li><a href="https://github.com/storyprotocol" className="hover:text-indigo-400 transition-colors">Core SDK</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Ecosystem</h4>
                <ul className="space-y-3 text-gray-500">
                  <li><a href="http://localhost:3000" className="hover:text-indigo-400 transition-colors">Landing Page</a></li>
                  <li><a href="http://localhost:3001" className="hover:text-indigo-400 transition-colors">GenAI Agent</a></li>
                  <li><a href="#features" className="hover:text-indigo-400 transition-colors">IP Sandbox</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <p>&copy; 2024 Story Dev Suite. MIT License.</p>
              <p>Built with ❤️ for the Story Protocol Hackathon</p>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}
