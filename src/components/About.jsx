import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.1) {
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



export default function About() {
  const [ref, visible] = useVisible()
  return (
    <section id="about" className="py-20 sm:py-24 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F36] mb-4">
            About Prerona Roy
          </h2>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-start w-full min-w-0 max-w-full">
          {/* Left: Image + quick facts */}
          <div className={`transition-all duration-700 w-full min-w-0 max-w-full ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
            {/* Image */}
            <div className="relative mb-10 sm:mb-8 w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-2 sm:-inset-3 rounded-3xl bg-gradient-to-br from-[#B8860B]/20 to-[#F5EDD8] -z-10" />
              <img
                src="/host.png"
                alt="Prerona Roy — Executive Consultant and Behaviour Transformation Expert"
                className="w-full h-auto rounded-3xl object-cover shadow-xl max-h-[460px] sm:max-h-none object-top mx-auto"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#E8DDD0] rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg text-center w-[90%] sm:w-auto max-w-[320px] sm:max-w-none z-20">
                <p className="font-serif text-xs sm:text-sm font-bold text-[#1A1F36]">Prerona Roy</p>
                <p className="text-[10px] sm:text-xs text-[#B8860B] font-medium tracking-wide leading-tight mt-0.5">Entrepreneur · Consultant · Transformation Expert</p>
              </div>
            </div>

            {/* Associations */}
            <div className="mt-14 sm:mt-12 bg-[#FDFAF5] border border-[#E8DDD0] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group w-full min-w-0 max-w-full">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#6B6B6B] font-semibold mb-3 sm:mb-4">Associated With</p>
              
              <div className="relative w-full min-w-0 max-w-full overflow-hidden flex items-center py-1.5">
                <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-[#FDFAF5] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-[#FDFAF5] to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
                  {[0, 1].map((loopIdx) => (
                    <div key={loopIdx} className="flex items-center gap-6 sm:gap-8 shrink-0">
                      <img src="https://i.logos-download.com/113971/29583-9fde4947792aa7b5b379c0b1aee0ead2.png/Tata_Consultancy_Services_Logo_2020.png?dl" alt="TCS" className="h-5 sm:h-7 object-contain opacity-80 hover:opacity-100 mix-blend-multiply" />
                      <img src="/brands/L&T.png" alt="L&T" className="h-5 sm:h-7 object-contain opacity-80 hover:opacity-100 mix-blend-multiply" />
                      <img src="/brands/sbi.png" alt="SBI" className="h-5 sm:h-7 object-contain opacity-80 hover:opacity-100 mix-blend-multiply" />
                      <img src="/brands/Max.png" alt="Maxwell-leadership" className="h-5 sm:h-7 object-contain opacity-80 hover:opacity-100 mix-blend-multiply" />
                      <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Ministry of Defence" className="h-6 sm:h-8 object-contain mix-blend-multiply" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-[#1A1F36] leading-tight uppercase tracking-wider">Ministry of<br/>Defence</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mentored By */}
            <div className="mt-4 bg-[#FDFAF5] border border-[#E8DDD0] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow w-full min-w-0 max-w-full">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#6B6B6B] font-semibold mb-3 sm:mb-4">Mentored By</p>
              <div className="flex flex-wrap gap-4 sm:gap-5">
                {['John Maxwell', 'Paul Martinelli', 'Ivan Misner'].map((m) => (
                  <div key={m} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#2D3142]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div className={`transition-all duration-700 delay-200 w-full min-w-0 max-w-full ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-5">
              <p className="text-[#2D3142] leading-relaxed text-base sm:text-lg">
                Prerona Roy is an{' '}
                <strong className="font-semibold text-[#1A1F36]">
                  Entrepreneur, Executive Consultant, and Behaviour Transformation Expert
                </strong>{' '}
                who has worked with over{' '}
                <span className="text-[#B8860B] font-semibold">500 entrepreneurs</span>,
                generational business owners, and corporate leaders to help them unlock higher levels
                of business growth, leadership effectiveness, and personal performance.
              </p>

              <p className="text-[#6B6B6B] leading-relaxed text-sm sm:text-base">
                Before beginning her entrepreneurial journey in 2017, she spent more than a decade
                working across India and the USA in Strategic Planning, Operations, and Marketing roles,
                gaining extensive experience in business growth and organisational leadership. Over the
                years, she has contributed to scaling businesses to an average growth rate of{' '}
                <strong className="text-[#1A1F36]">2X within a year</strong>.
              </p>

              <p className="text-[#6B6B6B] leading-relaxed text-sm sm:text-base">
                Prerona is also a member of the{' '}
                <strong className="text-[#1A1F36]">John Maxwell Team</strong> and has been mentored
                by globally respected leadership experts including{' '}
                <strong className="text-[#1A1F36]">John Maxwell, Paul Martinelli, Ivan Misner</strong>,
                and others.
              </p>

              <div>
                <p className="text-[#6B6B6B] leading-relaxed text-sm sm:text-base">
                  She has also been featured and recognised by various national-level media platforms for both her professional impact and her personal transformation journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
