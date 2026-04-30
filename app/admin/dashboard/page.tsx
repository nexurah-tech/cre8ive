'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, DollarSign, ArrowUpRight } from 'lucide-react'

export default function AdminOverview() {
  const stats = [
    { label: 'Total Revenue', value: '₹14.2 Cr', change: '+12.5%', icon: DollarSign, trend: 'up' },
    { label: 'Active Campaigns', value: '124', change: '+8.2%', icon: Zap, trend: 'up' },
    { label: 'Client Retention', value: '98%', change: '+0.5%', icon: Users, trend: 'up' },
    { label: 'Avg ROAS', value: '6.4x', change: '+2.1%', icon: TrendingUp, trend: 'up' },
  ]

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-acid/20 transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-acid/10 transition-colors">
                <stat.icon className="w-5 h-5 text-acid" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-acid/10 border border-acid/10">
                <ArrowUpRight className="w-3 h-3 text-acid" />
                <span className="font-mono text-[10px] text-acid font-bold">{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40 mb-1">{stat.label}</p>
              <h3 className="font-display text-3xl text-white tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display text-xl text-white">Performance Velocity</h3>
            <div className="flex gap-2">
              {['7D', '30D', '90D'].map(t => (
                <button key={t} className={`px-3 py-1 rounded-lg font-mono text-[9px] border ${t === '30D' ? 'bg-acid text-ink border-acid' : 'bg-white/5 text-paper/40 border-white/5 hover:border-white/10'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center border border-white/5 rounded-2xl bg-black/20">
             <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/20">Chart Engine v2.0 // Loading Analytics...</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel bg-white/[0.02] border border-white/5 p-8 rounded-3xl"
        >
          <h3 className="font-display text-xl text-white mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            {[
              { type: 'SUCCESS', msg: 'FinTech Flow scaled to 11x ROAS', time: '2m ago' },
              { type: 'SYSTEM', msg: 'Automatic optimization cluster deployed', time: '14m ago' },
              { type: 'WARNING', msg: 'Budget threshold reached for AlphaSaaS', time: '1h ago' },
              { type: 'INFO', msg: 'New growth audit request received', time: '3h ago' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  alert.type === 'SUCCESS' ? 'bg-acid' : 
                  alert.type === 'SYSTEM' ? 'bg-blue-500' : 
                  alert.type === 'WARNING' ? 'bg-rust' : 'bg-paper/40'
                }`}></div>
                <div>
                  <p className="text-sm text-paper/80 leading-snug">{alert.msg}</p>
                  <span className="font-mono text-[9px] uppercase text-paper/20">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-white/5 border border-white/5 font-mono text-[9px] uppercase tracking-widest text-paper/40 hover:bg-white/10 transition-all">View All Logs</button>
        </motion.div>
      </div>
    </div>
  )
}
