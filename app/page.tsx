'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CustomCursor } from '@/components/custom-cursor'
import { Rocket, Shield, Zap } from 'lucide-react'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [launchDate, setLaunchDate] = useState("2026-06-01T00:00:00")


  useEffect(() => {
    // Sync with admin configuration
    const savedDate = localStorage.getItem('launch_date')
    if (savedDate) setLaunchDate(savedDate)
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(launchDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [launchDate])


  return (
    <main className="min-h-screen bg-ink text-paper relative overflow-hidden flex flex-col items-center justify-center px-6 selection:bg-acid selection:text-ink">
      <CustomCursor />
      
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-acid/5 rounded-full blur-[150px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-acid/5 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Logo/Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-center gap-4"
        >
          <img 
            src="/cre8ive-removebg-preview.png" 
            alt="CR8IVE" 
            className="h-20 md:h-28 w-auto invert brightness-0 invert-[1] grayscale" 
          />
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <Rocket className="w-4 h-4 text-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-acid">Sequence Initiated // CR8IVE v2.0</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl text-white tracking-tighter leading-[0.95] mb-6"
        >
          Something <span className="text-acid italic">Legendary</span> <br/>
          is Preparing for Launch.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-paper/40 text-sm md:text-base font-light max-w-xl mb-12 leading-relaxed"
        >
          We&apos;re re-engineering the digital growth landscape. The next generation of acquisition engines is arriving shortly.
        </motion.p>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12 w-full max-w-2xl mx-auto">
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Minutes', val: timeLeft.minutes },
            { label: 'Seconds', val: timeLeft.seconds },
          ].map((unit, i) => (
            <motion.div 
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="relative group"
            >
              <div className="glass-panel bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:p-6 transition-all duration-500 group-hover:border-acid/20">
                <div className="font-display text-3xl md:text-5xl text-white mb-1 tracking-tighter group-hover:text-acid transition-colors">
                  {unit.val.toString().padStart(2, '0')}
                </div>
                <div className="font-mono text-[8px] uppercase tracking-[0.4em] text-paper/20">{unit.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-paper/20" />
          </div>
          <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-paper/20 text-left">
            Security Protocol: Alpha <br/>
            Cluster: AP-SOUTH-01
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Zap className="w-5 h-5 text-acid animate-pulse" />
          <img 
            src="/cre8ive-removebg-preview.png" 
            alt="CR8IVE" 
            className="h-10 w-auto invert brightness-0 invert-[1] grayscale" 
          />
        </div>
      </div>
    </main>
  )
}
