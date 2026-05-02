'use client'

import { CustomSelect } from '@/components/custom-select'

export const ContactSection = () => {
  return (
    <section id="contact" className="py-12 md:py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="glass-panel bg-white text-ink rounded-3xl lg:rounded-[3rem] p-6 md:p-8 lg:p-12 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] md:tracking-widest uppercase text-acid mb-6 flex flex-wrap items-center gap-3">
              <span className="w-8 h-[2px] bg-acid"></span> 
              The Checkpoint
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tighter mb-6 text-balance">
              Outgrow your <span className="font-serif italic font-normal text-acid">competition.</span>
            </h2>
            <p className="text-sm md:text-base text-ink/85 font-normal mb-8 max-w-md">
              Ready to stop guessing? Claim your complimentary Growth Audit. We&apos;ll show you exactly where you&apos;re losing money and the exact strategy we&apos;d use to fix it.
            </p>
            
            <div className="space-y-3 mb-10">
              <a href="mailto:hello@cr8ive.in" className="font-display text-lg md:text-2xl tracking-wide text-ink hover:text-acid transition-colors block underline decoration-acid/30 underline-offset-8">
                hello@cr8ive.in
              </a>
              <p className="font-mono text-[10px] md:text-xs text-ink/80 uppercase tracking-[0.2em] font-medium">+91 91234 56789 — Bangalore, IN</p>
            </div>
            
            <div className="mt-auto">
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink/60 mb-5 font-bold">Strategic Partners</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                 <span className="font-display text-[10px] md:text-xs tracking-wider text-ink border-b-2 border-acid/20 pb-0.5">GOOGLE ADS</span>
                 <span className="font-display text-[10px] md:text-xs tracking-wider text-ink border-b-2 border-acid/20 pb-0.5">META BUSINESS</span>
                 <span className="font-display text-[10px] md:text-xs tracking-wider text-ink border-b-2 border-acid/20 pb-0.5">SHOPIFY PLUS</span>
              </div>
            </div>
          </div>

          <div className="bg-ink text-paper rounded-3xl p-6 lg:p-8 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 100% 0%, #EAB308 0%, transparent 60%)'}}></div>
             <form className="relative z-10 space-y-5">
              <CustomSelect 
                label="Budget" 
                placeholder="Select Budget Range..."
                options={["Under ₹10 Lakhs", "₹10 Lakhs - ₹50 Lakhs", "₹50 Lakhs - ₹1 Crore", "₹1 Crore +"]}
              />
              
              <CustomSelect 
                label="Objective" 
                placeholder="Select Goal..."
                options={["Reduce CPA / CPL", "Scale Lead Volume", "Improve Quality", "SEO Dominance"]}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest uppercase text-paper/40">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 focus:border-acid text-white pb-2 font-sans outline-none transition-all placeholder:text-paper/10 text-sm" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest uppercase text-paper/40">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/10 focus:border-acid text-white pb-2 font-sans outline-none transition-all placeholder:text-paper/10 text-sm" placeholder="jane@company.com" />
                </div>
              </div>

              <button type="submit" className="w-full font-mono text-[10px] md:text-xs tracking-widest uppercase bg-acid hover:bg-white text-ink py-4 md:py-5 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] font-bold shadow-lg shadow-acid/10 mt-4 md:mt-12">
                Claim Growth Audit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
