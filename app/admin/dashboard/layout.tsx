'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Rocket, 
  Clock, 
  Settings, 
  LogOut, 
  ChevronRight,
  Shield,
  Activity,
  Menu,
  X
} from 'lucide-react'
import { CustomCursor } from '@/components/custom-cursor'
import { toast } from 'sonner'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth !== 'true') {
      toast.error('Session Expired. Please login.')
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
    }
    setIsLoaded(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    toast.info('Disconnected from Command Center.')
    router.push('/admin')
  }

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Launch Control', icon: Rocket, href: '/admin/dashboard/launch' },
    { name: 'Time Config', icon: Clock, href: '/admin/dashboard/time' },
    { name: 'System Settings', icon: Settings, href: '/admin/dashboard/settings' },
  ]

  if (!isLoaded || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-acid/30 border-t-acid rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink text-paper selection:bg-acid selection:text-ink flex overflow-hidden">
      <CustomCursor />
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white/[0.02] border-r border-white/5 backdrop-blur-xl lg:relative"
          >
            <div className="h-full flex flex-col p-6">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-acid flex items-center justify-center">
                    <Shield className="w-6 h-6 text-ink" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-white tracking-tight">CR8IVE</h2>
                    <p className="font-mono text-[8px] uppercase tracking-widest text-acid">Admin v1.0</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden w-8 h-8 flex items-center justify-center text-paper/40 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-acid text-ink font-bold shadow-lg shadow-acid/10' 
                          : 'text-paper/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-ink' : 'text-paper/40 group-hover:text-acid'}`} />
                        <span className="font-sans text-sm">{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </a>
                  )
                })}
              </nav>

              <div className="mt-auto pt-6 border-t border-white/5">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-paper/40 hover:bg-rust/10 hover:text-rust transition-all group"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-sans text-sm">Terminate Session</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-ink/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <Menu className="w-5 h-5 text-paper" />
              </button>
            )}
            <h1 className="font-display text-2xl text-white tracking-tight">
              {navItems.find(i => i.href === pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-white/5">
              <div className="w-2 h-2 bg-acid rounded-full animate-pulse"></div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-paper/40">Core Status: Stable</span>
              <div className="w-px h-3 bg-white/10"></div>
              <Activity className="w-3 h-3 text-acid" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-paper/40">98% Load</span>
            </div>
            
            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-white/5">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           {/* Background Atmosphere */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-acid/5 rounded-full mix-blend-screen filter blur-[120px]"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
