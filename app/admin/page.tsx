'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import { CustomCursor } from '@/components/custom-cursor'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login based on env var: NEXT_PUBLIC_ADMIN_PASSKEY
    setTimeout(() => {
      const adminPasskey = process.env.NEXT_PUBLIC_ADMIN_PASSKEY || 'dashboard'
      if (password === adminPasskey) {
        toast.success('Access Granted. Redirecting to Command Center...')
        localStorage.setItem('admin_auth', 'true')
        router.push('/admin/dashboard')
      } else {
        toast.error('Invalid Credentials. Access Denied.')
        setIsLoading(false)
      }
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-ink flex items-center justify-center p-6 relative overflow-hidden selection:bg-acid selection:text-ink">
      <CustomCursor />
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-acid/5 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-acid/5 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20 z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-20"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 group hover:border-acid/40 transition-all duration-500">
            <ShieldCheck className="w-8 h-8 text-acid group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h1 className="font-display text-4xl text-white tracking-tighter mb-2">Command Center</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">Authentication Required // Level 01</p>
        </div>

        <div className="glass-panel bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-acid/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase tracking-widest text-paper/40 ml-1">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/20" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-paper/10 focus:outline-none focus:border-acid/40 focus:bg-white/[0.05] transition-all font-sans"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-acid text-ink font-mono text-xs font-bold uppercase tracking-widest py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all duration-500 group/btn shadow-lg shadow-acid/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
              ) : (
                <>
                  Establish Connection
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="font-mono text-[8px] text-paper/20 uppercase tracking-widest">
            Encryption Status: AES-256 Active <br/>
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>
    </main>
  )
}
