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

const outcomes = [
  'Clarity on the patterns & beliefs affecting your growth',
  'Better decision-making under uncertainty and pressure',
  'Stronger emotional control as a leader',
  'Reduced internal conflict and mental overload',
  'A clearer leadership identity',
  'A more scalable way of operating your business',
  'Long-term behavioural shifts, not temporary motivation',
  'Greater confidence in high-stakes decisions and difficult conversations',
  'Improved strategic focus by identifying what truly drives growth'
]

export default function Outcomes() {
  const [ref, visible] = useVisible()
  return (
    <section id="outcomes" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F36] mb-4">
            What You Will Walk Away With
          </h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
            Real, lasting shifts not surface-level motivation.
          </p>
        </div>

        {/* Outcomes grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((item, i) => (
            <div
              key={i}
              className={`bg-white border border-[#E8DDD0] hover:border-[#B8860B]/60 rounded-3xl p-7 flex items-start gap-4 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(26,31,54,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(184,134,11,0.18)] hover:-translate-y-1.5 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-2xl bg-gradient-to-br from-[#B8860B] to-[#D4A017] flex items-center justify-center mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#1A1F36] font-sans text-sm sm:text-base leading-relaxed font-semibold">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
