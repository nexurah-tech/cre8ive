'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Plus, Search, Filter, MoreHorizontal, ExternalLink, Trash2, CheckCircle2, Clock } from 'lucide-react'
import { toast } from 'sonner'

type Launch = {
  id: string
  client: string
  project: string
  status: 'SCHEDULED' | 'LIVE' | 'DRAFT'
  date: string
  health: number
}

const INITIAL_LAUNCHES: Launch[] = [
  { id: '1', client: 'FinTech Flow', project: 'Acquisition Engine v2', status: 'LIVE', date: '2026-04-28', health: 98 },
  { id: '2', client: 'Alpha SaaS', project: 'Global Expansion Funnel', status: 'SCHEDULED', date: '2026-05-15', health: 0 },
  { id: '3', client: 'NexaCommerce', project: 'Retention Optimization', status: 'LIVE', date: '2026-04-10', health: 92 },
  { id: '4', client: 'BrandStack', project: 'Technical SEO Dominance', status: 'DRAFT', date: 'TBD', health: 0 },
]

export default function LaunchControlPage() {
  const [launches, setLaunches] = useState<Launch[]>(INITIAL_LAUNCHES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newLaunch, setNewLaunch] = useState({ client: '', project: '', status: 'DRAFT' as const })

  const handleAddLaunch = (e: React.FormEvent) => {
    e.preventDefault()
    const launch: Launch = {
      id: Math.random().toString(36).substr(2, 9),
      client: newLaunch.client,
      project: newLaunch.project,
      status: newLaunch.status,
      date: newLaunch.status === 'SCHEDULED' ? '2026-06-01' : 'TBD',
      health: 0
    }
    setLaunches([launch, ...launches])
    setIsModalOpen(false)
    setNewLaunch({ client: '', project: '', status: 'DRAFT' })
    toast.success('New Launch Profile Created')
  }

  const deleteLaunch = (id: string) => {
    setLaunches(launches.filter(l => l.id !== id))
    toast.info('Launch sequence aborted.')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="font-display text-3xl text-white tracking-tight mb-1">Launch Control</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">Managing active and upcoming go-lives</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-acid text-ink font-mono text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl flex items-center gap-3 hover:bg-white transition-all shadow-lg shadow-acid/10"
        >
          <Plus className="w-4 h-4" />
          Initiate New Launch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-panel bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-acid/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-acid" />
              </div>
              <h4 className="font-display text-white">System Active</h4>
            </div>
            <div className="font-display text-4xl text-white mb-1">14</div>
            <p className="font-mono text-[9px] uppercase text-paper/40 tracking-widest">Active Go-Lives</p>
         </div>
         <div className="glass-panel bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <h4 className="font-display text-white">In Queue</h4>
            </div>
            <div className="font-display text-4xl text-white mb-1">08</div>
            <p className="font-mono text-[9px] uppercase text-paper/40 tracking-widest">Scheduled Sequences</p>
         </div>
         <div className="glass-panel bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-rust/10 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-rust" />
              </div>
              <h4 className="font-display text-white">Velocity</h4>
            </div>
            <div className="font-display text-4xl text-white mb-1">94%</div>
            <p className="font-mono text-[9px] uppercase text-paper/40 tracking-widest">Efficiency Baseline</p>
         </div>
      </div>

      <div className="glass-panel bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.01]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/20" />
            <input 
              type="text" 
              placeholder="Search launches..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-acid/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-paper/40 hover:text-white transition-all">
              <Filter className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-white/10"></div>
            <p className="font-mono text-[10px] uppercase text-paper/20 tracking-widest">Results: {launches.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 font-mono text-[10px] uppercase tracking-widest text-paper/30">Profile</th>
                <th className="px-8 py-5 font-mono text-[10px] uppercase tracking-widest text-paper/30">Status</th>
                <th className="px-8 py-5 font-mono text-[10px] uppercase tracking-widest text-paper/30">Go Live Date</th>
                <th className="px-8 py-5 font-mono text-[10px] uppercase tracking-widest text-paper/30">Health</th>
                <th className="px-8 py-5 font-mono text-[10px] uppercase tracking-widest text-paper/30 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {launches.map((launch) => (
                <tr key={launch.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-white font-sans font-medium mb-0.5">{launch.client}</p>
                      <p className="text-[11px] text-paper/30 font-mono uppercase tracking-tight">{launch.project}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      launch.status === 'LIVE' ? 'bg-acid/10 text-acid' : 
                      launch.status === 'SCHEDULED' ? 'bg-blue-500/10 text-blue-500' : 'bg-white/10 text-paper/40'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        launch.status === 'LIVE' ? 'bg-acid animate-pulse' : 
                        launch.status === 'SCHEDULED' ? 'bg-blue-500' : 'bg-white/30'
                      }`}></div>
                      {launch.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-mono text-xs text-paper/60">{launch.date}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-acid" 
                          style={{ width: `${launch.health}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[10px] text-white">{launch.health}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg bg-white/5 border border-white/5 text-paper/40 hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteLaunch(launch.id)}
                        className="p-2 rounded-lg bg-white/5 border border-white/5 text-paper/40 hover:text-rust transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 border border-white/5 text-paper/40 hover:text-white transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Initiation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-ink border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl overflow-hidden"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-acid"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-display text-2xl text-white">Initiate Launch Sequence</h3>
                  <p className="font-mono text-[10px] uppercase text-paper/40 tracking-widest mt-1">Establishing new client parameters</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-paper/40 hover:text-white"
                >
                  <Plus className="w-5 h-5 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleAddLaunch} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-paper/40 ml-1">Client Identity</label>
                  <input 
                    type="text" 
                    required
                    value={newLaunch.client}
                    onChange={(e) => setNewLaunch({...newLaunch, client: e.target.value})}
                    placeholder="e.g. MetaScale India"
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-acid/40 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-paper/40 ml-1">Project Specification</label>
                  <input 
                    type="text" 
                    required
                    value={newLaunch.project}
                    onChange={(e) => setNewLaunch({...newLaunch, project: e.target.value})}
                    placeholder="e.g. Q3 Growth Engine"
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-acid/40 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-paper/40 ml-1">Initial Status</label>
                    <select 
                      value={newLaunch.status}
                      onChange={(e) => setNewLaunch({...newLaunch, status: e.target.value as any})}
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-acid/40 transition-all appearance-none"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="SCHEDULED">SCHEDULED</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-paper/40 ml-1">Priority Level</label>
                    <select 
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-acid/40 transition-all appearance-none"
                    >
                      <option value="ALPHA">ALPHA (High)</option>
                      <option value="BETA">BETA (Med)</option>
                      <option value="GAMMA">GAMMA (Low)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-acid text-ink font-mono text-xs font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-white transition-all duration-500 shadow-lg shadow-acid/10"
                  >
                    Confirm & Initialize Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
