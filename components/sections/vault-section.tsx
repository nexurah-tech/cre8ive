'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const FLAGSHIP_CASES = [
  {
    title: "Dr. RRB — Medical Excellence & Patient Acquisition",
    desc: "Built India's leading pain management digital identity for Dr. RRB, combining technical SEO dominance with a high-converting liquid-glass patient funnel.",
    country: "India",
    industry: "Healthcare",
    category: "Digital Transformation",
    img: "/assets/projects/drrrb/Screenshot 2026-04-29 093512.png",
    accent: "#EAB308",
    link: "https://drrrbpaincare.com/"
  },
  {
    title: "Evergreen Farms — Premium Managed Farmland Real Estate",
    desc: "Developed a high-end digital presence for Evergreen Farms, featuring immersive property showcases and an automated lead capture system for premium farmland investments.",
    country: "India",
    industry: "Real Estate",
    category: "Digital Growth",
    img: "/assets/projects/farm-land/Screenshot 2026-05-02 183526.png",
    accent: "#10b981",
    link: "https://farm-landing-ebon.vercel.app/"
  }
]

export const VaultSection = () => {
  return (
    <section id="vault" className="py-12 md:py-20 bg-black text-paper relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-acid/10 rounded-full filter blur-[150px] pointer-events-none opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mb-10 md:mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-acid mb-3">Execution Logs</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tighter text-white">Hard Data.<br/><span className="text-paper/20">No Fluff.</span></h2>
          </div>
          <p className="text-paper/40 font-light max-w-xs text-sm leading-relaxed mb-2">
            We translate marketing spend into mathematical outcomes. Every percentage point represents a captured market share.
          </p>
        </div>
      </div>

      {/* Static Grid of Case Studies */}
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        {FLAGSHIP_CASES.map((project, i) => (
          <div key={i} className="group bg-[#151515] border border-white/5 rounded-[20px] overflow-hidden flex flex-col shadow-2xl transition-all hover:border-white/10">
            {/* Image Area */}
            <div className="aspect-[21/9] overflow-hidden relative">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-lg md:text-xl text-white leading-snug group-hover:text-acid transition-colors">
                  {project.title}
                </h3>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-paper/40 hover:text-ink hover:bg-acid hover:border-acid transition-all duration-300"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
              <p className="text-paper/40 text-[13px] font-light leading-relaxed mb-6 flex-1 line-clamp-2">
                {project.desc}
              </p>

              {/* Footer Metadata */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-4 border-t border-white/5 font-mono text-[9px] uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#f97316]">Country :</span> <span className="text-paper/60">{project.country}</span>
                </div>
                <div className="w-px h-3 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#3b82f6]">Industry :</span> <span className="text-paper/60">{project.industry}</span>
                </div>
                <div className="w-px h-3 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#3b82f6]">Category :</span> <span className="text-paper/60">{project.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Grid (The Arsenal of Results) */}
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mb-12 text-center pt-20 relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="font-mono text-[10px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-acid mb-6 flex flex-wrap items-center justify-center gap-3"
         >
           <span className="w-8 h-px bg-white/10"></span>
           Direct Outcomes
           <span className="w-8 h-px bg-white/10"></span>
         </motion.div>
         <motion.h4 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="font-display text-4xl md:text-6xl text-white mb-8 tracking-tighter"
         >
           The Growth <span className="font-serif italic font-normal text-paper/20">Ledger.</span>
         </motion.h4>
      </div>

      {/* Case Study Grid */}
      <div className="px-4 md:px-8 lg:px-16 max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10 relative z-10">
        {[
          { metric: '+315%', sub: 'MRR Growth', client: 'Bangalore Fintech', desc: 'Restructured Google Ads strategy to reduce CPA by ₹8,500 while tripling volume.', img: '/performance_metrics_visualization_1776790374020.png' },
          { metric: '9.2x', sub: 'Blended ROAS', client: 'Mumbai E-Comm', desc: 'Rebuilt Meta funnel with dynamic creative testing generating ₹18 Cr in Q4.', img: '/case_2.png' },
          { metric: 'Rank #1', sub: 'Keyword Dominion', client: 'NCR Enterprise', desc: 'Technical SEO overhaul driving a new pipeline of inbound enterprise leads.', img: '/case_3.png' },
        ].map((item, i) => (
          <div key={i} className="group relative aspect-[3/4] lg:aspect-auto min-h-[350px] md:min-h-[450px] lg:min-h-[500px] overflow-hidden border-b lg:border-b-0 lg:border-r last:border-r-0 border-white/10 flex flex-col justify-end p-6 md:p-10 hover:bg-ink/50 transition-all duration-700">
             {/* Background Image with Hover Reveal */}
             <div className="absolute inset-0 z-0">
              <img 
                src={item.img} 
                alt={item.client} 
                className="w-full h-full object-cover grayscale opacity-30 lg:opacity-20 group-hover:opacity-40 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full">
              <div className="mb-6 py-2 overflow-hidden">
                 <div className="font-mono text-[10px] tracking-widest uppercase text-acid transform translate-y-0 lg:translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500">Verified Outcome</div>
                 <div className="w-12 h-px bg-white/20 group-hover:w-full transition-all duration-1000 mt-2"></div>
              </div>
              
              <h3 className="font-mono text-xs uppercase text-paper/40 mb-4">{item.client}</h3>
              <div className="font-display text-4xl md:text-6xl leading-none text-white tracking-tighter mb-4 group-hover:text-acid transition-colors">
                {item.metric}
              </div>
              <div className="font-mono text-sm uppercase text-paper tracking-widest mb-8">
                {item.sub}
              </div>
              <p className="text-paper/40 group-hover:text-paper/80 transition-colors duration-500 font-light text-sm max-w-sm line-clamp-3">
                {item.desc}
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/10 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                 <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40 group-hover:text-acid transition-colors">
                   Case Study Ref.0{i + 1}
                 </div>
              </div>
            </div>
            
            {/* Corner Scan Effect */}
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
              <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-acid/20 rotate-45 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
