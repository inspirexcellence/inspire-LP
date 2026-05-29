import { useState, useRef, useEffect } from 'react'

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

const faqs = [
  {
    category: 'About the Programme',
    questions: [
      {
        q: 'What exactly is the Founder Clarity Intensive?',
        a: 'The Founder Clarity Intensive is a private 1:1 engagement with Prerona Roy built specifically for founders, business leaders, and entrepreneurs who have already achieved a level of success but are being held back by patterns, beliefs, or strategies they can\'t see clearly from the inside. It combines neuroscience, behavioural science, and strategic collaboration to create real internal shifts not temporary motivation.',
      },
      {
        q: 'How is this different from regular coaching or consulting?',
        a: 'Unlike regular coaching or consulting that mainly focuses on external strategies, advice, or accountability, this intensive works on both the internal and external dimensions of growth. Internally, it helps founders identify the subconscious patterns, mindset limitations, emotional pressures, and decision-making behaviours that silently create recurring bottlenecks, stress, or stagnation. Externally, it helps translate those internal shifts into stronger leadership, clearer decisions, better strategic thinking, improved team dynamics, and more scalable business growth. This is not surface-level motivation or generic consulting. It is a deep identity and behavioural transformation process combined with practical business and leadership application designed to create meaningful, long-term results.',
      },
      {
        q: 'What results can I realistically expect?',
        a: 'The results vary based on your current stage, openness to the process, and level of implementation. However, most founders experience greater clarity, stronger decision-making, reduced mental overload, improved emotional resilience, and a more scalable way of leading and operating their business. Many also notice shifts in leadership confidence, team dynamics, strategic thinking, business growth, and the ability to handle pressure and uncertainty more effectively. The goal is not temporary motivation, but sustainable internal and external transformation that supports long-term growth.',
      },
      {
        q: 'Is this programme only about mindset, or does it include business strategy?',
        a: 'No, the programme is not only about mindset.\n\nWhile a significant part of the work focuses on internal patterns, leadership psychology, emotional resilience, and decision-making behaviour, the programme also includes strategic business thinking and practical leadership application.\n\nThe goal is to help founders create internal clarity and behavioural shifts that directly improve external business outcomes including leadership effectiveness, strategic decisions, scalability, communication, growth direction, and overall business performance.\n\nThis is where the programme differs from purely motivational or mindset-based coaching. The work is designed to bridge both:\n• Internal transformation\n• External business and leadership results',
      },
    ],
  },
  {
    category: 'Structure & Commitment',
    questions: [
      {
        q: 'How long is the programme and how many sessions are there?',
        a: 'The programme is typically completed over 3 to 6 months, with a total engagement of approximately 25–30 hours. All sessions are private 1:1 with Prerona Roy. The pace and scheduling are fully personalised based on your availability, convenience, and the depth of work required there is no rigid template.',
      },
      {
        q: 'How much time do I need to commit each week?',
        a: 'The programme is designed to fit around the demands of running a business. Sessions are scheduled at your convenience, and the depth of between-session work is calibrated to your pace. Most participants find that the clarity gained significantly reduces the mental load they carry week to week.',
      },
      {
        q: 'Is this an online programme or in-person?',
        a: 'The Founder Clarity Intensive is conducted through private 1:1 sessions, which can be held online or in-person depending on your location and preference. The process is equally effective in both formats, and most sessions are conducted virtually for maximum flexibility.',
      },
    ],
  },
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is the pre-qualifying call and what should I expect?',
        a: 'The pre-qualifying call is a brief conversation to understand your current business situation, leadership challenges, and the outcomes you are looking to achieve. It also helps Prerona evaluate whether this high-impact programme genuinely aligns with your goals and stage of growth. There is no pressure or sales pitch, it is simply a mutual assessment.',
      },
      {
        q: 'What is the Founder Clarity Call and how does it differ from the pre-qualifying call?',
        a: 'After the pre-qualifying call, the next step is a deeper Founder Clarity Call with Prerona Roy. This is an open, in-depth conversation where you can discuss the challenges, patterns, pressures, or bottlenecks you are currently experiencing. The purpose is to understand where you feel stuck, identify the deeper patterns at play, and explore whether this intensive is the right fit for your specific stage and needs.',
      },
      {
        q: 'Am I guaranteed a spot after submitting my application?',
        a: 'No. This is a highly selective, limited-capacity programme. Submitting an application begins the conversation, and both parties need to feel aligned after the clarity call before enrolment happens.\n\nTo maintain the depth and quality of the experience, we intentionally select only 5 founders each month. If you are not selected for the current intake, your application may be carried forward and reconsidered for the following month.',
      },
      {
        q: 'How do I know if I am the right fit?',
        a: 'You are likely a strong fit if you are a founder, entrepreneur, CEO, or senior leader who has already achieved meaningful success but feels stuck at a ceiling you can\'t break through on your own. If you feel overloaded, need deeper clarity before scaling, are pivoting into a new role, or simply need a trusted sounding board, this programme is worth exploring.',
      },
    ],
  },
  {
    category: 'Confidentiality & Trust',
    questions: [
      {
        q: 'Is everything I share in this programme kept confidential?',
        a: 'Absolutely. This is a highly personalised and confidential engagement. Everything discussed in sessions with Prerona Roy is held in complete confidence. The integrity of this private relationship is foundational to the depth of work that becomes possible.',
      },
      {
        q: 'Who has Prerona Roy worked with before?',
        a: 'Prerona has worked with over 500 entrepreneurs, generational business owners, and corporate leaders. Her work has extended across organisations such as TCS, L&T, Ministry of Defence, and SBI Institute of Leadership. She is a member of the John Maxwell Team and has been mentored by globally respected leaders including John Maxwell, Paul Martinelli, and Ivan Misner.',
      },
    ],
  },
]

function AccordionItem({ question, answer, index, isOpen, onToggle, visible }) {
  const contentRef = useRef(null)

  return (
    <div
      className={`border border-[#E8DDD0] rounded-2xl overflow-hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${isOpen ? 'shadow-md' : 'shadow-sm hover:shadow-md'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-start justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ${
          isOpen ? 'bg-[#F5EDD8]' : 'bg-white hover:bg-[#FDFAF5]'
        }`}
        aria-expanded={isOpen}
      >
        <span className={`font-sans font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
          isOpen ? 'text-[#B8860B]' : 'text-[#1A1F36]'
        }`}>
          {question}
        </span>

        {/* Animated icon */}
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300 ${
          isOpen
            ? 'bg-[#B8860B] border-[#B8860B] rotate-180'
            : 'bg-white border-[#E8DDD0]'
        }`}>
          <svg
            className={`w-3.5 h-3.5 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#B8860B]'}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Animated answer panel */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? (contentRef.current?.scrollHeight + 'px' || '500px') : '0px',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <div className="px-6 py-5 bg-white border-t border-[#E8DDD0]">
          <p className="text-[#6B6B6B] text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ({ onApplyClick }) {
  const [openId, setOpenId] = useState('0-0') // default open first item
  const [ref, visible] = useVisible()

  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F36] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
            Everything you need to know before taking the next step.
          </p>
        </div>

        {/* FAQ categories */}
        <div ref={ref} className="space-y-10">
          {faqs.map((category, catIdx) => (
            <div key={catIdx}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8860B] font-sans">
                  {category.category}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#B8860B]/30 to-transparent" />
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {category.questions.map((item, qIdx) => {
                  const id = `${catIdx}-${qIdx}`
                  return (
                    <AccordionItem
                      key={id}
                      question={item.q}
                      answer={item.a}
                      index={qIdx}
                      isOpen={openId === id}
                      onToggle={() => toggle(id)}
                      visible={visible}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center p-8 rounded-3xl border border-[#E8DDD0] bg-[#FDFAF5]">
          <p className="font-serif text-xl font-bold text-[#1A1F36] mb-2">
            Still have questions?
          </p>
          <p className="text-[#6B6B6B] text-sm mb-5">
            The best way to find out if this is right for you is through a conversation.
          </p>
          <a
            href="#apply" onClick={(e) => { e.preventDefault(); onApplyClick(); }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#B8860B] text-white font-semibold rounded-full text-sm hover:bg-[#9a7009] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 tracking-wide"
          >
            Submit Your Application
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
