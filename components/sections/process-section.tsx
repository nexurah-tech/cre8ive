'use client'

import { motion } from 'motion/react'

export const ProcessSection = () => {
  return (
    <section id="process" className="py-12 md:py-20 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto relative overflow-hidden">
      <div className="text-center mb-10 md:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.4em] uppercase text-acid mb-3"
        >
          The Protocol
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter text-white"
        >
          How We <span className="font-serif italic font-normal text-paper/20">Engineer</span> Growth.
        </motion.h2>
      </div>

      <div className="relative space-y-12 md:space-y-24">
        {/* Progress Line */}
        <div className="absolute left-0 md:left-[3.75rem] top-0 bottom-0 w-px bg-white/5 hidden md:block">
          <motion.div 
            className="w-full bg-acid origin-top h-full"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        {[
          { step: '01', title: 'Deep-Dive Audit', desc: 'We tear down your existing funnel, unearth wasted spend, and locate immediate revenue opportunities mapping directly to KPIs.' },
          { step: '02', title: 'The Blueprint', desc: 'You receive a mathematical, channel-specific strategy with projected outcomes, testing arrays, and budget allocation.' },
          { step: '03', title: 'Rapid Execution', desc: 'We deploy tracking, launch initial creative grids, and rapidly iterate ad variants based on live, hard data.' },
          { step: '04', title: 'Scale & Dominate', desc: 'Once we isolate the winning combination of audience and creative, we inject budget and aggressively scale your acquisition.' },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="flex flex-col md:flex-row gap-6 md:gap-16 group relative"
          >
            <div className="font-display text-5xl md:text-8xl text-white/5 group-hover:text-acid transition-colors duration-500 w-auto md:w-32 leading-none shrink-0 z-10">
              {item.step}
            </div>
            <div className="md:pt-4">
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: (i * 0.15) + 0.3 }}
                className="font-display text-2xl md:text-3xl text-white mb-4 group-hover:text-acid transition-colors"
              >
                {item.title}
              </motion.h3>
              <p className="text-paper/60 text-base md:text-lg font-light max-w-2xl">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
