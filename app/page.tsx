'use client'

import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { MarketDiagnosis } from '@/components/sections/market-diagnosis'
import { ArsenalSection } from '@/components/sections/arsenal-section'
import { VaultSection } from '@/components/sections/vault-section'
import { ProcessSection } from '@/components/sections/process-section'
import { BoardroomSection } from '@/components/sections/boardroom-section'
import { ContactSection } from '@/components/sections/contact-section'
import { Footer } from '@/components/footer'

export default function Cr8iveHome() {
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

      <HeroSection />
      <MarketDiagnosis />
      <ArsenalSection />
      <VaultSection />
      <ProcessSection />
      <BoardroomSection />
      <ContactSection />
      
      <Footer />
    </main>
  )
}
