'use client'

import { useState, useEffect } from 'react'
import { 
  Search, Zap, Share2, FileText, Mail, Target, Laptop, BarChart3, 
  Users, Link2, Shield, Palette, Play, Cpu, TrendingUp, ShoppingBag, 
  Smartphone, MapPin, Layers, MessageSquare, ChevronDown, ChevronUp 
} from 'lucide-react'
import BorderGlow from '@/components/border-glow'

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

export const ArsenalSection = () => {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const visibleServices = (isMobile && !expanded) ? SERVICES.slice(0, 6) : SERVICES

  return (
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
  )
}
