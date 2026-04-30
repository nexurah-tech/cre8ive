'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomCursor } from '@/components/custom-cursor'
import { Rocket, Shield, Zap, ArrowRight, Bell } from 'lucide-react'
import { toast } from 'sonner'

export default function LaunchTeaserPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [launchDate, setLaunchDate] = useState("2026-06-01T00:00:00")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      toast.success("Identity captured. You're on the list.")
      setEmail('')
      setIsSubmitting(false)
    }, 1500)
  }

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
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <Rocket className="w-4 h-4 text-acid" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-acid">Sequence Initiated // CR8IVE v2.0</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/30 flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-acid animate-pulse"></span>
              SYS_NOW: {currentTime.toLocaleTimeString()}
            </span>
            <span className="opacity-20">|</span>
            <span>TGT_CFG: {new Date(launchDate).toLocaleString()}</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-5xl md:text-8xl text-white tracking-tighter leading-[0.9] mb-8"
        >
          Something <span className="text-acid italic">Legendary</span> <br/>
          is Preparing for Launch.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-paper/40 text-lg md:text-xl font-light max-w-2xl mb-20 leading-relaxed"
        >
          We&apos;re re-engineering the digital growth landscape. The next generation of acquisition engines is arriving shortly.
        </motion.p>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24 w-full">
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
              <div className="glass-panel bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 transition-all duration-500 group-hover:border-acid/20">
                <div className="font-display text-5xl md:text-7xl text-white mb-2 tracking-tighter group-hover:text-acid transition-colors">
                  {unit.val.toString().padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/20">{unit.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full max-w-md"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-paper/30 mb-6">Gain Early Access to the Arsenal</p>
          <form onSubmit={handleNotify} className="relative group">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your terminal address..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-6 pr-40 text-white placeholder:text-paper/10 focus:outline-none focus:border-acid/40 focus:bg-white/[0.05] transition-all font-sans"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="absolute right-2 top-2 bottom-2 bg-acid text-ink font-mono text-[10px] font-bold uppercase tracking-widest px-8 rounded-xl hover:bg-white transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? "Syncing..." : (
                <>
                  Join Queue <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </form>
        </motion.div>
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
          <div className="font-display text-xl text-white tracking-tighter">CR8IVE</div>
        </div>
      </div>
    </main>
  )
}
