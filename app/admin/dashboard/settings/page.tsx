'use client'

import { motion } from 'framer-motion'
import { Shield, Database, Bell, Lock, User, Save } from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const saveSettings = () => {
    toast.success('Core systems updated successfully.')
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl text-white tracking-tight mb-1">System Settings</h2>
        <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">Configuring core infrastructure and access protocols</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-5 h-5 text-acid" />
              <h3 className="font-display text-xl text-white">Security Infrastructure</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-paper/40 ml-1">Master Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    readOnly
                    value={process.env.NEXT_PUBLIC_ADMIN_PASSKEY || '••••••••'} 
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-acid/40 transition-all opacity-60 cursor-not-allowed" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[8px] uppercase text-acid/40">ENV Managed</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-paper/40" />
                  <span className="text-sm text-white">Two-Factor Authentication</span>
                </div>
                <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-paper/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Database className="w-5 h-5 text-acid" />
              <h3 className="font-display text-xl text-white">Data Retention</h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-paper/60 mb-4">Select how long performance logs and acquisition data should be stored in the primary cluster.</p>
              <div className="grid grid-cols-3 gap-4">
                {['90 Days', '1 Year', 'Infinite'].map(v => (
                  <button key={v} className={`py-3 rounded-xl border font-mono text-[10px] uppercase tracking-widest transition-all ${v === '1 Year' ? 'bg-acid/10 border-acid/40 text-acid' : 'bg-white/5 border-white/5 text-paper/40 hover:border-white/20'}`}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-acid" />
              <h3 className="font-display text-xl text-white">Alert Profiles</h3>
            </div>
            <div className="space-y-4">
              {['Slack', 'Email', 'Telegram', 'System Push'].map(n => (
                <div key={n} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all">
                  <span className="text-sm text-paper/60">{n}</span>
                  <div className={`w-8 h-4 rounded-full relative cursor-pointer ${n === 'Slack' || n === 'Email' ? 'bg-acid' : 'bg-white/10'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-ink transition-all ${n === 'Slack' || n === 'Email' ? 'right-0.5' : 'left-0.5'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={saveSettings}
            className="w-full bg-acid text-ink font-mono text-xs font-bold uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all duration-500 shadow-xl shadow-acid/10"
          >
            <Save className="w-5 h-5" />
            Commit Changes
          </button>
        </div>
      </div>
    </div>
  )
}
