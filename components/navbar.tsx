'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Our Philosophy', href: '#wedge' },
  { label: 'Services', href: '#arsenal' },
  { label: 'Case Studies', href: '#vault' },
  { label: 'Our Process', href: '#process' },
  { label: 'Testimonials', href: '#boardroom' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <header className={`fixed z-50 w-full transition-all duration-500 ${scrolled ? 'top-2' : 'top-4'}`}>
      <nav className="mx-auto w-[92%] max-w-6xl px-6 md:px-8 py-3 md:py-4 flex items-center justify-between bg-ink/80 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500">
        <a href="#" className="font-display text-xl md:text-2xl tracking-widest text-white flex items-center gap-1 group font-bold">
          CRE8IVE<span className="text-acid group-hover:animate-pulse">_</span>
        </a>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 items-center">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="font-mono text-[10px] tracking-widest uppercase text-paper/60 hover:text-acid transition-colors duration-300 relative group">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-acid transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden sm:block font-mono text-[10px] tracking-widest uppercase bg-acid text-ink px-5 py-2.5 rounded-full hover:bg-white hover:text-ink shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300 font-bold">
            Growth Audit
          </a>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[-1] transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-ink/98 backdrop-blur-3xl"></div>
        <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8 pt-32">
          {NAV_LINKS.map(({ label, href }) => (
            <a 
              key={href}
              onClick={() => setIsOpen(false)} 
              href={href}
              className="font-display text-2xl md:text-4xl text-paper hover:text-acid transition-all duration-300 hover:scale-110"
            >
              {label}
            </a>
          ))}
          
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-6 font-mono text-xs tracking-widest uppercase bg-acid text-ink px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            Free Growth Audit
          </a>
        </div>
      </div>
    </header>
  )
}
