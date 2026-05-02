'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export const CustomSelect = ({ label, options, placeholder }: { label: string, options: string[], placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  
  return (
    <div ref={ref} className="space-y-2 relative">
      <label className="font-mono text-[9px] tracking-widest uppercase text-paper/40">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border-b border-white/10 text-white pb-2 font-sans cursor-pointer text-sm flex items-center justify-between group transition-all hover:border-acid/40"
      >
        <span className={selected ? 'text-white' : 'text-paper/20'}>{selected || placeholder}</span>
        <span className={`text-[8px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-paper/40 group-hover:text-acid`}>▼</span>
      </div>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute left-0 right-0 top-full mt-1 bg-ink border border-white/10 rounded-xl overflow-hidden z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={() => { setSelected(opt); setIsOpen(false); }}
              className={`px-4 py-3 text-sm transition-all font-sans ${selected === opt ? 'bg-acid/10 text-acid' : 'text-paper/60 hover:text-ink hover:bg-acid'}`}
            >
              {opt}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
