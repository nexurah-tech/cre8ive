'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, TrendingUp, Zap } from 'lucide-react'
import BorderGlow from '@/components/border-glow'

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-start lg:items-center overflow-hidden">
      {/* ── Background atmosphere ──────────────────────────────── */}
      {/* Radial bloom from top-right — where the widget lives */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_20%,rgba(234,179,8,0.07)_0%,transparent_65%)] pointer-events-none" />
      {/* Left warm undertone */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_70%_at_5%_60%,rgba(224,75,26,0.04)_0%,transparent_60%)] pointer-events-none" />
      {/* Additional golden depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.03)_0%,transparent_50%)] pointer-events-none" />
      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(242,237,230,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(242,237,230,0.035) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Animated orbs */}
      <div className="absolute top-1/4 right-1/3 w-[480px] h-[480px] bg-acid/[0.07] rounded-full mix-blend-screen filter blur-[130px] animate-blob pointer-events-none" />
      <div className="absolute top-1/2 right-8 w-[280px] h-[280px] bg-rust/[0.06] rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none" />
      {/* Subtle horizontal scan */}
      <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid/10 to-transparent pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-7xl mx-auto w-full relative z-10 px-4 md:px-8 lg:px-16 pt-32 pb-20 lg:pt-10 lg:pb-0">
        <div className="pr-4 lg:pr-12">
          <div className="font-mono text-[10px] md:text-xs tracking-[0.1em] md:tracking-widest uppercase text-acid mb-6 flex items-start gap-2 md:gap-3">
            <span className="inline-block w-5 md:w-8 h-[1.5px] md:h-[2px] bg-acid mt-1.5 md:mt-2 shrink-0"></span>
            <span className="leading-tight">DON&apos;T PAY FOR PROMISES. PAY FOR PERFORMANCE.</span>
          </div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="tracking-tight text-white mb-8 drop-shadow-[0_0_20px_rgba(234,179,8,0.15)]"
          >
            <span className="block font-display font-light text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.2] whitespace-nowrap opacity-60">Stop Guessing.</span>
            <span className="block font-unbounded font-black text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[1.1] whitespace-nowrap text-acid">START SCALING.</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg leading-relaxed text-paper/65 max-w-md font-light border-l-2 border-acid/40 pl-5 mb-10"
          >
            We engineer data-driven acquisition engines that systematically turn strangers into high-LTV customers.
            No vanity metrics.{' '}
            <strong className="text-white font-medium">Just predictable revenue.</strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <button className="group font-mono text-[10px] tracking-wider uppercase bg-acid text-ink px-7 py-3.5 rounded-full font-bold shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] hover:bg-white transition-all duration-300 flex items-center gap-2">
              Request Growth Audit
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
            <a href="#vault" className="group font-mono text-[10px] tracking-widest uppercase text-paper/50 hover:text-white transition-colors duration-200 flex items-center gap-3">
              See the Evidence
              <span className="w-7 h-7 rounded-full border border-paper/15 flex items-center justify-center group-hover:border-paper/40 group-hover:bg-white/5 transition-all text-[10px]">↓</span>
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 border-t border-white/[0.06]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {['/testimonial_1.png', '/testimonial_2.png', '/testimonial_3.png'].map((src, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border border-ink overflow-hidden ring-1 ring-white/10">
                    <img src={src} alt="" className="w-full h-full object-cover grayscale" />
                  </div>
                ))}
              </div>
              <span className="font-mono text-[9px] uppercase text-paper/35 tracking-wider">200+ clients</span>
            </div>
            <div className="w-px h-3 bg-white/10 hidden sm:block" />
            <span className="font-mono text-[9px] uppercase text-paper/35 tracking-wider hidden sm:block">₹1000 Cr+ managed</span>
            <div className="w-px h-3 bg-white/10 hidden sm:block" />
            <span className="font-mono text-[9px] uppercase text-paper/35 tracking-wider hidden sm:block">98% retention</span>
          </motion.div>
        </div>

        {/* ── Right: Widget ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          {/* Floating badge — top left */}
          <div className="absolute -top-3 left-4 lg:-left-6 z-20 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0e0e0e] border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-paper/55">3 Campaigns Live</span>
          </div>

          {/* Floating badge — bottom right */}
          <div className="absolute -bottom-3 right-4 lg:-right-6 z-20 hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-acid shadow-lg shadow-acid/25">
            <TrendingUp size={10} className="text-ink" strokeWidth={2.5} />
            <span className="font-mono text-[8px] uppercase tracking-widest text-ink font-bold">+312% MoM</span>
          </div>

          <BorderGlow
            className="relative w-full max-w-[400px] md:max-w-[460px] rounded-2xl overflow-hidden border border-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(234,179,8,0.15)]"
            backgroundColor="#080808"
            glowColor="45 93 47"
            glowIntensity={1.2}
            colors={['#EAB308', '#FDE047', '#CA8A04']}
          >
            {/* BG image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/digital_marketing_hero.png?v=2"
                alt="Digital Marketing Analytics Dashboard"
                className="w-full h-full object-cover opacity-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-[#080808]/50" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.08)_50%)] bg-[length:100%_3px] pointer-events-none opacity-15" />
            </div>

            <div className="relative z-10 p-6 md:p-7 flex flex-col gap-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[8px] tracking-[0.3em] uppercase text-acid mb-0.5">Acquisition Engine</div>
                  <div className="font-mono text-[7px] tracking-widest text-paper/25 uppercase">v2.4.8 // Active</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-acid/10 border border-acid/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse shadow-[0_0_6px_rgba(234,179,8,1)]" />
                  <span className="font-mono text-[7px] uppercase text-acid tracking-widest font-bold">Live Data</span>
                </div>
              </div>

              {/* Revenue */}
              <div>
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-paper/30 mb-2">Revenue Generated</div>
                <div className="font-display text-[2.2rem] md:text-[2.6rem] tracking-tighter text-white leading-none">
                  <span className="text-xl text-paper/35 font-sans mr-0.5">₹</span>
                  14,29,18,<span className="text-acid animate-pulse">842</span>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="h-[3px] flex-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full w-[78%] bg-gradient-to-r from-acid/60 to-acid rounded-full" />
                  </div>
                  <span className="font-mono text-[7px] text-acid/55 uppercase tracking-wider shrink-0">78% of target</span>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: TrendingUp, label: 'ROAS', value: '6.4x', delta: '+0.8x wk' },
                  { icon: Zap, label: 'Live Leads', value: '124', delta: '+312%' },
                ].map(({ icon: Icon, label, value, delta }) => (
                  <div key={label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex flex-col gap-2 hover:border-acid/25 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[7px] uppercase tracking-widest text-paper/30">{label}</span>
                      <Icon size={10} className="text-acid/40" strokeWidth={1.5} />
                    </div>
                    <div className="font-display text-2xl text-white leading-none">{value}</div>
                    <div className="font-mono text-[6px] uppercase text-acid/50 tracking-wider">{delta}</div>
                  </div>
                ))}
              </div>

              {/* Channel breakdown */}
              <div className="pt-1 border-t border-white/[0.06]">
                <div className="font-mono text-[7px] uppercase tracking-widest text-paper/20 mb-3">Top Channels</div>
                <div className="space-y-2.5">
                  {[
                    { ch: 'Google Search', pct: 42, color: 'bg-acid' },
                    { ch: 'Meta Advantage+', pct: 31, color: 'bg-rust' },
                    { ch: 'SEO Organic', pct: 27, color: 'bg-paper/35' },
                  ].map(({ ch, pct, color }) => (
                    <div key={ch} className="flex items-center gap-3">
                      <span className="font-mono text-[7px] text-paper/30 w-24 shrink-0 truncate">{ch}</span>
                      <div className="flex-1 h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="font-mono text-[7px] text-paper/30 w-5 text-right shrink-0">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-px h-10 bg-gradient-to-b from-paper/20 to-transparent" />
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-paper/25">Scroll</span>
      </div>
    </section>
  )
}
