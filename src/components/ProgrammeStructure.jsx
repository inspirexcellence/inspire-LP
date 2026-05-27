import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

const details = [
  {
    label: 'Format',
    value: 'Private 1:1 Sessions',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: 'Total Duration',
    value: '25–30 Hours',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Timeline',
    value: '3–6 Months',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Scheduling',
    value: 'Fully Personalised',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
]

export default function ProgrammeStructure() {
  const [ref, visible] = useVisible()
  return (
    <section id="programme" className="py-24" style={{ background: 'linear-gradient(135deg, #1A1F36 0%, #2D3142 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Programme Structure
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            A deeply personal and confidential engagement tailored to your pace, availability,
            and the depth of work required.
          </p>
        </div>

        {/* Stats grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {details.map((d, i) => (
            <div
              key={i}
              className={`bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms`, transition: 'all 0.6s ease' }}
            >
              <div className="w-12 h-12 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 flex items-center justify-center mx-auto mb-4 text-[#D4A017] group-hover:bg-[#B8860B]/30 transition-colors">
                {d.icon}
              </div>
              <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-sans mb-2">{d.label}</p>
              <p className="font-serif text-xl font-bold text-white">{d.value}</p>
            </div>
          ))}
        </div>

        {/* Description card */}
        <div
          className={`bg-white/5 border border-[#B8860B]/30 rounded-3xl p-8 sm:p-10 text-center backdrop-blur-sm transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-[#D4A017] text-3xl mb-4">✦</div>
          <p className="font-serif text-lg sm:text-xl text-white/90 italic leading-relaxed max-w-3xl mx-auto">
            "The pace and scheduling of sessions are personalised based on your availability,
            convenience, and depth of work required. This is not a template — it is built around you."
          </p>
          <div className="mt-6 h-px w-24 bg-[#B8860B]/50 mx-auto" />
          <p className="mt-6 text-white/50 text-sm leading-relaxed max-w-2xl mx-auto">
            Using neuroscience and behavioral science, this programme goes beneath the surface to the
            exact decision patterns, subconscious blocks, and internal wiring that are recreating the
            same ceiling — no matter what external changes you make.
          </p>
        </div>
      </div>
    </section>
  )
}
