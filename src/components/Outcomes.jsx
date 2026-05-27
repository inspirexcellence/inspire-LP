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
            Real, lasting shifts — not surface-level motivation.
          </p>
        </div>

        {/* Outcomes grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {outcomes.map((item, i) => (
            <div
              key={i}
              className={`card-hover bg-[#FDFAF5] border border-[#E8DDD0] rounded-2xl p-6 flex items-start gap-4 transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5EDD8] flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#2D3142] font-sans text-sm sm:text-base leading-relaxed font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
