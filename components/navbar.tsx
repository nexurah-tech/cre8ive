'use client'

import { useState, useEffect } from 'react'
import { StaggeredMenu } from './staggered-menu'

const NAV_LINKS = [
  { label: 'Our Philosophy', href: '#wedge' },
  { label: 'Services', href: '#arsenal' },
  { label: 'Case Studies', href: '#vault' },
  { label: 'Our Process', href: '#process' },
  { label: 'Testimonials', href: '#boardroom' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL_ITEMS = [
  { label: 'Instagram', link: 'https://www.instagram.com/cr8ive.in?igsh=MXVobGd0OHBsNDZldA==' },
  { label: 'LinkedIn', link: 'https://linkedin.com/company/cr8ive' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = NAV_LINKS.map(link => ({
    label: link.label,
    ariaLabel: `Go to ${link.label}`,
    link: link.href
  }))

  return (
    <>
      {/* Mobile Staggered Menu */}
      <div className="lg:hidden">
        <StaggeredMenu 
          items={menuItems}
          socialItems={SOCIAL_ITEMS}
          accentColor="#EAB308"
          colors={['#1e1e22', '#35353c']}
          logoUrl="/assets/brand/logo1-removebg-preview.png"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#000000"
          isFixed={true}
          displayItemNumbering={true}
        />
      </div>

      {/* Desktop Navbar */}
      <header className={`fixed z-50 w-full transition-all duration-500 hidden lg:block ${scrolled ? 'top-1' : 'top-2'}`}>
        <nav className="mx-auto w-[92%] max-w-6xl px-8 py-0 flex items-center justify-between bg-ink/80 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500">
          <a href="#" className="relative flex items-center gap-2 group">
            <img 
              src="/assets/brand/logo1-removebg-preview.png" 
              alt="CR8IVE" 
              className="h-12 md:h-16 w-auto brightness-0 invert transition-all duration-500 group-hover:scale-110" 
            />
          </a>
          
          <div className="flex gap-8 items-center">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className="font-mono text-[10px] tracking-widest uppercase text-paper/60 hover:text-acid transition-colors duration-300 relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-acid transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <a href="#contact" className="font-mono text-[10px] tracking-widest uppercase bg-acid text-ink px-5 py-2.5 rounded-full hover:bg-white hover:text-ink shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300 font-bold">
            Growth Audit
          </a>
        </nav>
      </header>
    </>
  )
}
