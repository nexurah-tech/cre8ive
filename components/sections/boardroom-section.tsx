'use client'

import { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'
import TestimonialCarousel from '@/components/testimonial-carousel'

const TESTIMONIALS = [
  {
    quote: "Cr8ive didn't just run our ads; they became an extension of our executive team. They doubled our inbound leads in 90 days with zero increase in ad spend. Scientific and ruthless.",
    name: "Sarah T.",
    role: "CEO",
    company: "FinTech Flow",
    result: "+212% Pipeline Growth",
    img: "/testimonial_1.png"
  },
  {
    quote: "Finally, an agency that speaks math. We scaled our MRR by 40% in quarter one. Their reporting is the standard for growth intelligence in the SaaS world.",
    name: "Mark R.",
    role: "Founder",
    company: "Alpha SaaS",
    result: "40% MRR Lift",
    img: "/testimonial_2.png"
  },
  {
    quote: "The ROI wasn't a promise, it was an expectation they hit relentlessly. They saved us ₹1.2 Cr in wasted spend within the first month. Their audit alone is worth the retainer.",
    name: "Elena G.",
    role: "CMO",
    company: "Global D2C",
    result: "₹1.2 Cr Saved",
    img: "/testimonial_3.png"
  },
  {
    quote: "From day one, Cr8ive operated like a growth partner, not a vendor. Their data-led funnel strategy took us from 2x to 11x ROAS in under 60 days. I've worked with five agencies — none came close.",
    name: "Rohan S.",
    role: "Director of Growth",
    company: "NexaCommerce",
    result: "11x ROAS in 60 Days",
    img: "/testimonial_1.png"
  },
  {
    quote: "We'd burned through two agencies before Cr8ive. Within 45 days they'd restructured our entire paid strategy, eliminated ₹80L in wasted budget, and delivered a 290% surge in qualified leads. Unmatched.",
    name: "Priya M.",
    role: "VP Marketing",
    company: "ScaleUp India",
    result: "290% Lead Surge",
    img: "/testimonial_2.png"
  },
  {
    quote: "Cr8ive's SEO cluster strategy was the single best investment we made in 2024. Organic traffic went from 12K to 180K monthly visits in 8 months. They don't just promise growth — they engineer it.",
    name: "Arjun K.",
    role: "Co-Founder",
    company: "BrandStack",
    result: "15x Organic Traffic",
    img: "/testimonial_3.png"
  }
]

function DesktopTestimonials({ testimonials }: { testimonials: typeof TESTIMONIALS }) {
  const PAGE_SIZE = 4
  const totalPages = Math.ceil(testimonials.length / PAGE_SIZE)

  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [sidebarPage, setSidebarPage] = useState(0)

  // Keep sidebar page in sync with active review
  useEffect(() => {
    const page = Math.floor(activeIdx / PAGE_SIZE)
    setSidebarPage(page)
  }, [activeIdx])

  const go = (next: number) => setActiveIdx(next)
  const prev = () => go(activeIdx === 0 ? testimonials.length - 1 : activeIdx - 1)
  const next = () => go(activeIdx === testimonials.length - 1 ? 0 : activeIdx + 1)

  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [isHovered, activeIdx])

  const t = testimonials[activeIdx]
  const visibleReviewers = testimonials.slice(sidebarPage * PAGE_SIZE, sidebarPage * PAGE_SIZE + PAGE_SIZE)

  return (
    <div
      className="hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative glass-panel rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="grid grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] min-h-[320px]">

          {/* Main quote area */}
          <div className="p-10 xl:p-14 flex flex-col justify-between relative">
            <div className="absolute top-8 right-8 text-acid/8">
              <Quote size={100} strokeWidth={0.8} />
            </div>

            {/* Reviewer info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-acid/30">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display text-lg text-acid">{t.name}</div>
                <div className="font-mono text-[10px] uppercase text-paper/40 tracking-widest">{t.role}, {t.company}</div>
              </div>
            </div>

            {/* Quote */}
            <p className="text-paper/85 text-lg xl:text-xl leading-relaxed font-light italic flex-1">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Result + nav controls */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
              <div>
                <div className="font-mono text-[9px] uppercase text-paper/30 tracking-widest mb-1">Measured Outcome</div>
                <div className="font-display text-xl text-acid">{t.result}</div>
              </div>

              {/* Arrows + dots */}
              <div className="flex items-center gap-4">
                <button onClick={prev} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-paper/60 hover:bg-acid hover:border-acid hover:text-ink transition-all text-sm">←</button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-acid w-6 h-2' : 'bg-white/20 w-2 h-2 hover:bg-white/50'}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-paper/60 hover:bg-acid hover:border-acid hover:text-ink transition-all text-sm">→</button>
              </div>
            </div>
          </div>

          {/* Sidebar — 4 reviewers per page */}
          <div className="border-l border-white/5 flex flex-col">
            <div className="flex flex-col divide-y divide-white/5 flex-1">
              {visibleReviewers.map((reviewer, i) => {
                const globalIdx = sidebarPage * PAGE_SIZE + i
                const isActive = globalIdx === activeIdx
                return (
                  <button
                    key={globalIdx}
                    onClick={() => go(globalIdx)}
                    className={`flex items-center gap-3 px-6 py-5 text-left transition-all duration-300 flex-1 ${isActive ? 'bg-acid/5' : 'hover:bg-white/[0.03]'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl overflow-hidden border shrink-0 transition-all duration-300 ${isActive ? 'border-acid/40 grayscale-0' : 'border-white/10 grayscale'}`}>
                      <img src={reviewer.img} alt={reviewer.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <div className={`font-display text-sm transition-colors duration-300 truncate ${isActive ? 'text-acid' : 'text-paper/60'}`}>{reviewer.name}</div>
                      <div className="font-mono text-[9px] uppercase text-paper/30 tracking-widest truncate">{reviewer.role}, {reviewer.company}</div>
                    </div>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-acid shrink-0" />}
                  </button>
                )
              })}
            </div>

            {/* Sidebar page controls */}
            {totalPages > 1 && (
              <div className="border-t border-white/5 px-6 py-3 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase text-paper/30 tracking-widest">
                  {sidebarPage + 1} / {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSidebarPage(p => Math.max(0, p - 1))}
                    disabled={sidebarPage === 0}
                    className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-paper/50 hover:bg-acid hover:border-acid hover:text-ink transition-all disabled:opacity-20 disabled:pointer-events-none text-xs"
                  >&lt;</button>
                  <button
                    onClick={() => setSidebarPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={sidebarPage === totalPages - 1}
                    className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-paper/50 hover:bg-acid hover:border-acid hover:text-ink transition-all disabled:opacity-20 disabled:pointer-events-none text-xs"
                  >&gt;</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export const BoardroomSection = () => {
  return (
    <>
      <section id="boardroom" className="pt-10 pb-20 md:pt-14 md:pb-28 px-4 md:px-8 lg:px-16 bg-black text-paper relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rust/5 rounded-full filter blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <div className="font-mono text-xs tracking-[0.4em] uppercase text-acid mb-6">Voice of Authority</div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter text-white">The Boardroom <span className="font-serif italic font-normal text-paper/20">Verdict.</span></h2>
          </div>

          {/* Mobile: Swipeable Carousel */}
          <div className="flex lg:hidden justify-center w-full">
            <TestimonialCarousel
              items={TESTIMONIALS}
              baseWidth={340}
              autoplay
              autoplayDelay={3000}
              pauseOnHover
              loop
            />
          </div>

          {/* Desktop: 3-column grid with auto-highlight cycle */}
          <DesktopTestimonials testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* Testimonial Marquee */}
      <div className="py-12 border-y border-white/5 bg-ink overflow-hidden whitespace-nowrap relative">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink z-10 pointer-events-none"></div>
        <div className="inline-block animate-marquee">
           <span className="flex items-center gap-16 mx-8">
             <span className="font-light text-2xl text-paper/80 flex items-center gap-4">
               <span className="text-rust">"</span>
               Cr8ive didn't just run our ads; they became an extension of our executive team. They doubled our inbound leads in 90 days.
               <span className="font-mono text-xs uppercase text-acid ml-4">— Sarah T., CEO at FinTech Flow</span>
             </span>
             <span className="font-light text-2xl text-paper/80 flex items-center gap-4">
               <span className="text-rust">"</span>
               Finally, an agency that speaks math. We scaled our MRR by 40% in quarter one.
               <span className="font-mono text-xs uppercase text-acid ml-4">— Mark R., Founder</span>
             </span>
             <span className="font-light text-2xl text-paper/80 flex items-center gap-4">
               <span className="text-rust">"</span>
               The ROI wasn't a promise, it was an expectation they hit relentlessly.
               <span className="font-mono text-xs uppercase text-acid ml-4">— Elena G., CMO</span>
             </span>
           </span>
        </div>
      </div>
    </>
  )
}
