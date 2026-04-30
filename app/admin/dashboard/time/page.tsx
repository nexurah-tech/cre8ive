'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Globe, Calendar, Save, RefreshCw, AlertCircle, Zap, Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function TimeConfigPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [launchDate, setLaunchDate] = useState('2026-06-01T00:00')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    // Load persisted config
    const savedDate = localStorage.getItem('launch_date')
    const savedTz = localStorage.getItem('timezone')
    if (savedDate) setLaunchDate(savedDate)
    if (savedTz) setTimezone(savedTz)
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

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      localStorage.setItem('launch_date', launchDate)
      localStorage.setItem('timezone', timezone)
      setIsSaving(false)
      toast.success('Temporal Configuration Synchronized')
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="font-display text-3xl text-white tracking-tight mb-1">Temporal Configuration</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">Managing system clocks and global scheduling</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-acid text-ink font-mono text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl flex items-center gap-3 hover:bg-white transition-all shadow-lg shadow-acid/10 disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Sync Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Main Clock Card */}
          <div className="glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-acid/10 group-hover:text-acid/20 transition-colors">
              <Clock size={120} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10">
              <div className="font-mono text-[10px] uppercase tracking-widest text-acid mb-6">System Time Source</div>
              <div className="font-display text-6xl text-white tracking-tighter mb-2">
                {new Date().toLocaleTimeString('en-IN', { hour12: false, timeZone: timezone })}
              </div>
              <p className="font-mono text-xs text-paper/40 uppercase tracking-widest">{timezone} // Current Time</p>
              
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-paper/30 mb-1">Sync Drift</p>
                  <p className="text-white font-sans font-medium">0.0004ms</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-paper/30 mb-1">Server Latency</p>
                  <p className="text-white font-sans font-medium">12ms</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timezone Settings */}
          <div className="glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-5 h-5 text-acid" />
              <h3 className="font-display text-xl text-white">Regional Parameters</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-paper/40 ml-1">Primary Timezone</label>
                <select 
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-acid/40 transition-all appearance-none font-sans"
                >
                  <option value="Asia/Kolkata">India (IST) - UTC+5:30</option>
                  <option value="America/New_York">New York (EST) - UTC-5:00</option>
                  <option value="Europe/London">London (GMT) - UTC+0:00</option>
                  <option value="Asia/Dubai">Dubai (GST) - UTC+4:00</option>
                  <option value="Asia/Singapore">Singapore (SGT) - UTC+8:00</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-acid/5 border border-acid/10">
                <AlertCircle className="w-4 h-4 text-acid shrink-0" />
                <p className="text-[11px] text-paper/60 leading-relaxed italic">
                  Changing the primary timezone will affect all scheduled "Go Live" sequences and reporting intervals globally.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Launch Countdown Card */}
          <div className="glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-acid/5 via-transparent to-transparent"></div>
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="font-display text-xl text-white">Global Launch Window</h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40 mt-1">Next Major System Deployment</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-acid/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-acid" />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-10">
                  {[
                    { label: 'Days', val: timeLeft.days.toString().padStart(2, '0') },
                    { label: 'Hours', val: timeLeft.hours.toString().padStart(2, '0') },
                    { label: 'Mins', val: timeLeft.minutes.toString().padStart(2, '0') },
                    { label: 'Secs', val: timeLeft.seconds.toString().padStart(2, '0') },
                  ].map(unit => (
                    <div key={unit.label} className="text-center p-3 rounded-2xl bg-white/5 border border-white/5">
                      <div className="font-display text-2xl text-white">{unit.val}</div>
                      <div className="font-mono text-[8px] uppercase tracking-widest text-paper/30 mt-1">{unit.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-paper/40 ml-1">Target Launch Date & Time</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/20" />
                      <input 
                        type="datetime-local" 
                        value={launchDate}
                        onChange={(e) => setLaunchDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-acid/40 transition-all font-sans"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-sans text-sm text-white">Auto-Deployment</p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-paper/30">Trigger system on zero</p>
                    </div>
                    <div className="w-10 h-5 bg-acid rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-ink rounded-full"></div>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Maintenance Windows */}
          <div className="glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
            <h3 className="font-display text-xl text-white mb-6">Execution Windows</h3>
            <div className="space-y-3">
              {[
                { day: 'Mon - Fri', time: '02:00 AM - 04:00 AM', status: 'Optimal' },
                { day: 'Saturday', time: '12:00 AM - 06:00 AM', status: 'Safe' },
                { day: 'Sunday', time: 'Restricted Access', status: 'Critical' },
              ].map((window, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div>
                    <p className="font-sans text-sm text-white">{window.day}</p>
                    <p className="font-mono text-[10px] text-paper/30">{window.time}</p>
                  </div>
                  <span className={`font-mono text-[8px] uppercase font-bold tracking-widest px-2 py-1 rounded-md ${
                    window.status === 'Optimal' ? 'text-acid bg-acid/10' :
                    window.status === 'Safe' ? 'text-blue-500 bg-blue-500/10' : 'text-rust bg-rust/10'
                  }`}>{window.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 rounded-xl border border-dashed border-white/10 text-paper/30 font-mono text-[9px] uppercase tracking-widest hover:border-white/20 hover:text-paper/50 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3 h-3" />
              Add Exclusion Window
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
