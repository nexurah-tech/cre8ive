'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'
import BorderGlow from '@/components/border-glow'
import TestimonialCarousel from '@/components/testimonial-carousel'
import { 
  Search, Zap, Share2, FileText, Mail, Target, Laptop, BarChart3, 
  Users, Link2, Shield, Palette, Play, Cpu, MousePointer2, 
  ShoppingBag, Smartphone, MapPin, Layers, MessageSquare,
  TrendingUp, ChevronDown, ChevronUp, Quote, ArrowUpRight, ExternalLink
} from 'lucide-react'

const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
      }
    }, { threshold: 0.1 })
    
    if (currentRef) observer.observe(currentRef)
    
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    let startTime: number
    const duration = 2500

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      setCount(value * easeProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [value, hasAnimated])

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-IN')

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>
}

const SERVICES = [
  { title: "Search Engine Optimization (SEO)", icon: Search, desc: "Dominating search real-estate through intent-led content clusters.", cat: "Organic" },
  { title: "Pay-Per-Click Advertising (PPC)", icon: Zap, desc: "Scientific scaling on Google, Meta, and LinkedIn for instant ROI.", cat: "Paid" },
  { title: "Social Media Marketing (SMM)", icon: Share2, desc: "Building community-led brands that social algorithms love.", cat: "Social" },
  { title: "Content Marketing", icon: FileText, desc: "High-velocity storytelling that nurtures and converts.", cat: "Content" },
  { title: "Email Marketing", icon: Mail, desc: "Retention-first flows that maximize every customer's LTV.", cat: "Retention" },
  { title: "Conversion Rate Optimization (CRO)", icon: Target, desc: "Math-driven multivariate testing to shatter conversion barriers.", cat: "Performance" },
  { title: "Website Design & Development", icon: Laptop, desc: "High-converting, liquid-glass digital identities built for scale.", cat: "Tech" },
  { title: "Analytics & Reporting", icon: BarChart3, desc: "Real-time growth intelligence dashboards for executive teams.", cat: "Data" },
  { title: "Influencer Marketing", icon: Users, desc: "Strategic partnerships that borrow trust to drive massive sales.", cat: "Scale" },
  { title: "Affiliate Marketing", icon: Link2, desc: "Performance-only network scaling for low-risk growth.", cat: "Paid" },
  { title: "Online Reputation Mgmt (ORM)", icon: Shield, desc: "Proactive narrative control to protect your brand equity.", cat: "Trust" },
  { title: "Branding & Creative Design", icon: Palette, desc: "Forging premium visual identities that command higher margins.", cat: "Identity" },
  { title: "Video Marketing", icon: Play, desc: "Thumb-stopping cinematic storytelling for the TikTok era.", cat: "Creative" },
  { title: "Marketing Automation", icon: Cpu, desc: "Removing human bottlenecks through intelligent workflows.", cat: "Systems" },
  { title: "Lead Generation", icon: TrendingUp, desc: "Inbound pipelines that deliver high-intent, qualified prospects.", cat: "Growth" },
  { title: "E-commerce Marketing", icon: ShoppingBag, desc: "Total lifecycle scaling for Shopify and enterprise stores.", cat: "Direct" },
  { title: "App Store Optimization (ASO)", icon: Smartphone, desc: "Ranking #1 in the iOS and Play Store for absolute volume.", cat: "Mobile" },
  { title: "Local SEO & GMB", icon: MapPin, desc: "Hyper-local dominance for physical and multi-location hubs.", cat: "Organic" },
  { title: "Funnel Building & Strategy", icon: Layers, desc: "Architecting the full customer journey from visit to sale.", cat: "Architecture" },
  { title: "Chatbot & CRM Integration", icon: MessageSquare, desc: "Instant response engines that capture leads 24/7/365.", cat: "Tech" },
]

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

const CustomSelect = ({ label, options, placeholder }: { label: string, options: string[], placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  
  return (
    <div ref={ref} className="space-y-2 relative">
      <label className="font-mono text-[9px] tracking-widest uppercase text-paper/40">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border-b border-white/10 text-white pb-2 font-sans cursor-pointer text-sm flex items-center justify-between group transition-all hover:border-acid/40"
      >
        <span className={selected ? 'text-white' : 'text-paper/20'}>{selected || placeholder}</span>
        <span className={`text-[8px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-paper/40 group-hover:text-acid`}>▼</span>
      </div>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute left-0 right-0 top-full mt-1 bg-ink border border-white/10 rounded-xl overflow-hidden z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={() => { setSelected(opt); setIsOpen(false); }}
              className={`px-4 py-3 text-sm transition-all font-sans ${selected === opt ? 'bg-acid/10 text-acid' : 'text-paper/60 hover:text-ink hover:bg-acid'}`}
            >
              {opt}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default function Cr8iveHome() {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const FLAGSHIP_CASES = [
    {
      title: "Evergreen Farms — Premium Managed Farmland Real Estate",
      desc: "Developed a high-end digital presence for Evergreen Farms, featuring immersive property showcases and an automated lead capture system for premium farmland investments.",
      country: "India",
      industry: "Real Estate",
      category: "Digital Growth",
      img: "/assets/projects/farm-land/Screenshot 2026-05-02 183526.png",
      accent: "#10b981",
      link: "https://farm-landing-ebon.vercel.app/"
    },
    {
      title: "Dr. RRB — Medical Excellence & Patient Acquisition",
      desc: "Built India's leading pain management digital identity for Dr. RRB, combining technical SEO dominance with a high-converting liquid-glass patient funnel.",
      country: "India",
      industry: "Healthcare",
      category: "Digital Transformation",
      img: "/assets/projects/drrrb/Screenshot 2026-04-29 093512.png",
      accent: "#EAB308",
      link: "https://drrrbpaincare.com/"
    }
  ]


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const visibleServices = (isMobile && !expanded) ? SERVICES.slice(0, 6) : SERVICES

  return (
    <main className="overflow-x-hidden bg-ink text-paper relative min-h-screen selection:bg-acid selection:text-ink">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-50 opacity-10"></div>

      <CustomCursor />

      {/* Global Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-acid/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-acid/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-acid/5 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-acid/[0.03] rounded-full blur-[150px]" />
      </div>

      <Navbar />

      {/* Hero Section */}
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
              className="font-unbounded text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] tracking-tight text-white mb-8 drop-shadow-[0_0_20px_rgba(234,179,8,0.15)]"
            >
              Stop{' '}
              <span className="font-serif italic font-normal text-paper/35">Guessing.</span>
              <br />
              Start{' '}
              <span className="text-acid">Scaling.</span>
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
              className="relative w-full max-w-[400px] md:max-w-[460px] rounded-2xl overflow-hidden border border-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(234,179,8,0.1)]"
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

      <section id="wedge" className="pt-4 pb-4 md:pt-16 md:pb-8 px-4 md:px-8 lg:px-16 bg-ink text-paper relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-acid/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header label */}
          <div className="font-mono text-[10px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-acid mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <span className="w-6 h-px bg-acid/50" />
            Market Diagnosis
            <span className="w-6 h-px bg-acid/50" />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-8">
            {/* Left — headline */}
            <div className="text-center lg:text-left">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-balance text-white">
                Most agencies are<br />selling you{' '}
                <span className="font-serif italic font-normal text-acid">noise.</span>
              </h2>
            </div>

            {/* Right — body copy */}
            <div className="flex flex-col gap-5 pt-1 text-center lg:text-left">
              <p className="text-base md:text-lg leading-relaxed font-light text-paper/65 text-justify lg:text-left">
                You're paying retainers for{' '}
                <span className="text-paper font-medium">"brand awareness,"</span>{' '}
                <span className="text-paper font-medium">"impressions,"</span> and{' '}
                <span className="text-paper font-medium">"clicks"</span> while your competitors are stealing your market share. Beautiful creative doesn't matter if the{' '}
                <span className="text-paper border-b border-paper/20">math doesn't work</span>.
              </p>
              <p className="text-base md:text-lg leading-relaxed font-light text-paper/65 text-justify lg:text-left">
                At Cr8ive, we treat your marketing budget like an{' '}
                <span className="italic text-paper/90">investment portfolio</span>. If a channel isn't driving a measurable return,{' '}
                <span className="text-acid font-medium">we kill it.</span>
              </p>
            </div>
          </div>

          {/* Proof Point Bar */}

        </div>
      </section>

      {/* The Arsenal (Services / Bento Grid) */}
      <section id="arsenal" className="pt-16 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20">
          <div className="font-mono text-[10px] tracking-[0.2em] md:tracking-widest uppercase text-acid mb-4 flex flex-wrap items-center gap-3">
            <span className="w-6 h-px bg-acid"></span> 
            The Arsenal
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-none tracking-tighter">Growth <span className="font-serif italic font-normal text-paper/30">Infrastructure</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {visibleServices.map((service, i) => (
            <BorderGlow
              key={i}
              className={`glass-panel p-6 ${isMobile ? 'rounded-xl bg-black/60' : 'rounded-2xl bg-ink/40'} border border-white/5 group hover:border-acid/30 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${i * 50}ms` }}
              backgroundColor={isMobile ? "#050505" : "#0a0a0a"}
              glowColor="45 93 47"
              colors={['#EAB308', '#FDE047', '#CA8A04']}
              borderRadius={isMobile ? 12 : 16}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-acid/10 transition-colors">
                    <service.icon className="w-5 h-5 text-acid" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-paper/30">{service.cat}</span>
                </div>
                <h3 className="font-display text-xl mb-3 text-white group-hover:text-acid transition-colors leading-tight">{service.title}</h3>
                <p className="text-paper/50 text-sm font-light leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* Mobile Show More Button */}
        {isMobile && (
          <div className="mt-10 flex justify-center sm:hidden">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.3em] uppercase text-acid py-4 px-6 sm:px-8 border border-acid/20 rounded-full hover:bg-acid/10 transition-all min-w-[240px]"
            >
              {expanded ? (
                <>Collapse Arsenal <ChevronUp size={14} /></>
              ) : (
                <>Explore Full Arsenal ({SERVICES.length}) <ChevronDown size={14} /></>
              )}
            </button>
          </div>
        )}
      </section>

      {/* The Vault (Case Studies) */}
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


      {/* The Operating System (Process) */}
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

      {/* The Boardroom (Testimonials) */}
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


      {/* Lead Capture & Contact (The Checkpoint) */}
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

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 lg:px-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto text-center md:text-left">
        <div className="flex items-center gap-2">
          <img 
            src="/assets/brand/logo1-removebg-preview.png" 
            alt="CR8IVE" 
            className="h-12 w-auto brightness-0 invert" 
          />
        </div>
        <div className="font-mono text-[10px] tracking-widest text-paper/40 uppercase max-w-[200px] md:max-w-none">© 2026 Cr8ive. Data-Driven Scaling.</div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {['LinkedIn', 'Intelligence', 'Case Studies', 'Terms'].map((link) => (
             <a key={link} href="#" className="font-mono text-[10px] tracking-widest uppercase text-paper/60 hover:text-acid transition-colors relative group">
               {link}
               <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-acid transition-all group-hover:w-full"></span>
             </a>
          ))}
        </div>
      </footer>
    </main>
  )
}
