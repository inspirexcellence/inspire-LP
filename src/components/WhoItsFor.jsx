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

const primaryAudience = [
  { icon: '🚀', label: 'Founders' },
  { icon: '💼', label: 'Entrepreneurs' },
  { icon: '👔', label: 'CEOs' },
  { icon: '🏢', label: 'Senior Business Leaders' },
  { icon: '⚡', label: 'Startup Owners' },
  { icon: '📊', label: 'High-Performing Professionals' },
]

const triggers = [
  'Feel stuck, tired or overloaded',
  'Know they need deeper clarity before scaling further',
  'Pivoting into a new role and feel overwhelmed',
  'Looking for a sounding board while expanding fast',
]

export default function WhoItsFor() {
  const [ref, visible] = useVisible()
  return (
    <section id="who" className="py-24" style={{ background: 'linear-gradient(160deg, #F8F3EA 0%, #FDFAF5 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F36] mb-4">
            Who This Is For
          </h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
            This intensive is designed for leaders who have already achieved success but
            are being held back by patterns they can't see clearly from the inside.
          </p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-10">
          {/* Left: Primary roles */}
          <div className={`transition-all duration-700 h-full ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white rounded-3xl border border-[#E8DDD0] p-8 shadow-sm h-full flex flex-col">
              <h3 className="font-serif text-xl font-bold text-[#1A1F36] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#F5EDD8] flex items-center justify-center text-sm">✦</span>
                This Intensive Is Designed For
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {primaryAudience.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#FDFAF5] border border-[#E8DDD0] hover:border-[#B8860B]/40 hover:bg-[#F5EDD8] transition-all duration-200 group"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-medium text-[#2D3142] group-hover:text-[#B8860B] transition-colors">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex-1 rounded-2xl overflow-hidden min-h-[200px] relative group">
                <img 
                  src="/clarity_growth_pattern.png" 
                  alt="Clarity and Growth" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            </div>
          </div>

          {/* Right: Triggers */}
          <div className={`transition-all duration-700 delay-200 h-full ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white rounded-3xl border border-[#E8DDD0] p-8 shadow-sm h-full flex flex-col">
              <h3 className="font-serif text-xl font-bold text-[#1A1F36] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#F5EDD8] flex items-center justify-center text-sm">✦</span>
                Especially If You…
              </h3>
              <div className="space-y-4">
                {triggers.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#FDFAF5] border border-[#E8DDD0]">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#B8860B] flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#B8860B]" />
                    </div>
                    <p className="text-[#2D3142] text-sm sm:text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              {/* Pull quote */}
              <div className="mt-auto pt-6">
                <div className="p-5 rounded-2xl border-l-4 border-[#B8860B] bg-[#F5EDD8]">
                  <p className="font-serif text-[#1A1F36] italic text-sm sm:text-base leading-relaxed">
                    "The next level of your business requires a different version of you."
                  </p>
                  <p className="text-[#B8860B] text-xs font-semibold mt-2 uppercase tracking-widest">— Prerona Roy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
