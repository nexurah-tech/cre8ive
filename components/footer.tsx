'use client'

export const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-8 lg:px-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto text-center md:text-left">
      <div className="flex items-center gap-2">
        <img 
          src="/assets/brand/logo1-removebg-preview.png" 
          alt="CR8IVE" 
          className="h-12 w-auto brightness-0 invert" 
        />
      </div>
      <div className="font-mono text-[10px] tracking-widest text-paper/40 uppercase max-w-[200px] md:max-w-none">© 2026 Cr8ive. Data-Driven Scaling.</div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {['LinkedIn', 'Intelligence', 'Case Studies', 'Terms'].map((link) => (
           <a key={link} href="#" className="font-mono text-[10px] tracking-widest uppercase text-paper/60 hover:text-acid transition-colors relative group">
             {link}
             <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-acid transition-all group-hover:w-full"></span>
           </a>
        ))}
      </div>
    </footer>
  )
}
