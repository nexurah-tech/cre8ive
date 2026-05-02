'use client'

export const MarketDiagnosis = () => {
  return (
    <section id="wedge" className="pt-4 pb-4 md:pt-16 md:pb-8 px-4 md:px-8 lg:px-16 bg-ink text-paper relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-acid/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header label */}
        <div className="font-mono text-[10px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-acid mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
          <span className="w-6 h-px bg-acid/50" />
          Market Diagnosis
          <span className="w-6 h-px bg-acid/50" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-8">
          {/* Left — headline */}
          <div className="text-center lg:text-left">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-balance text-white">
              Most agencies are<br />selling you{' '}
              <span className="font-serif italic font-normal text-acid">noise.</span>
            </h2>
          </div>

          {/* Right — body copy */}
          <div className="flex flex-col gap-5 pt-1 text-center lg:text-left">
            <p className="text-base md:text-lg leading-relaxed font-light text-paper/65 text-justify lg:text-left">
              You're paying retainers for{' '}
              <span className="text-paper font-medium">"brand awareness,"</span>{' '}
              <span className="text-paper font-medium">"impressions,"</span> and{' '}
              <span className="text-paper font-medium">"clicks"</span> while your competitors are stealing your market share. Beautiful creative doesn't matter if the{' '}
              <span className="text-paper border-b border-paper/20">math doesn't work</span>.
            </p>
            <p className="text-base md:text-lg leading-relaxed font-light text-paper/65 text-justify lg:text-left">
              At Cr8ive, we treat your marketing budget like an{' '}
              <span className="italic text-paper/90">investment portfolio</span>. If a channel isn't driving a measurable return,{' '}
              <span className="text-acid font-medium">we kill it.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
