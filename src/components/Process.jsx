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

const steps = [
  {
    number: '01',
    title: 'Pre-Qualifying Call',
    description:
      'The process begins with a pre-qualifying call to understand your current business situation, leadership challenges, and the outcomes you are looking to achieve while evaluating whether this high-impact programme aligns with your goals and stage of growth.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Founder Clarity Call with Prerona Roy',
    description:
      'This initial conversation is designed to help you openly discuss the challenges, patterns, pressures, or bottlenecks you are currently experiencing in your business, leadership, or decision-making process. The purpose is to understand where you feel stuck, identify deeper patterns affecting growth, and explore whether this intensive is the right fit.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Enrolment in The Intensive',
    description:
      'If both sides feel aligned after the clarity call, you may then choose to enroll in The Founder Clarity Intensive. This is a highly personalised and confidential engagement designed for meaningful internal and leadership transformation not surface-level motivation.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

export default function Process() {
  const [ref, visible] = useVisible()
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F36] mb-4">
            Programme Details
          </h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
            A structured, thoughtful process to ensure this is the right fit for you.
          </p>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-[#B8860B]/30 via-[#B8860B]/50 to-[#B8860B]/30 hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex gap-6 md:gap-10 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Step number circle */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#F5EDD8] border-2 border-[#B8860B] flex items-center justify-center z-10 relative shadow-sm">
                    <div className="text-[#B8860B]">{step.icon}</div>
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-[#FDFAF5] border border-[#E8DDD0] rounded-2xl p-6 sm:p-8 card-hover mb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-[#B8860B] uppercase tracking-[0.2em] font-sans">
                      Step {step.number}
                    </span>
                    <div className="h-px flex-1 bg-[#E8DDD0]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1F36] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
