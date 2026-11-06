import React from 'react'

const problems = [
  {
    number: '01',
    title: "You're the bottleneck in every decision",
    desc: 'Every strategic initiative, team hire, and operational approval waits for your nod—leaving you trapped in daily firefighting instead of high-level steering.',
    icon: '⚡'
  },
  {
    number: '02',
    title: "Growth has plateaued and you don't know why",
    desc: 'You have invested more money, hired more people, and pushed harder, yet your revenue and profit margins have hit an invisible ceiling that conventional strategies cannot break.',
    icon: '📈'
  },
  {
    number: '03',
    title: 'You feel isolated at the top with no one to talk to',
    desc: 'High-stakes decisions carry immense weight, but you lack an objective, peer-level sounding board who truly understands executive pressure and identity mechanics.',
    icon: '🔒'
  }
]

export default function ProblemSolution() {
  return (
    <section className="py-28 bg-[#0B0F19] text-white border-t border-b border-white/10 relative overflow-hidden">
      {/* Decorative background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, #B8860B 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">The Leadership Bottleneck</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            You've built a successful business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] via-[#F5EDD8] to-[#B8860B] italic">BUT...</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed font-sans font-medium">
            When a founder's internal operating system reaches its capacity, the entire business experiences friction. Here are the three symptoms of the invisible ceiling:
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {problems.map((item, i) => (
            <div 
              key={item.number}
              className="bg-white/[0.03] rounded-3xl border border-white/10 p-8 sm:p-10 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_rgba(184,134,11,0.25)] hover:border-[#B8860B]/60 hover:bg-white/[0.07] transition-all duration-500 flex flex-col justify-between group relative overflow-hidden hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B8860B]/20 via-transparent to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl sm:text-4xl p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner">{item.icon}</span>
                  <span className="font-serif text-2xl font-extrabold text-white/20 group-hover:text-[#D4A017] transition-colors duration-300">
                    {item.number}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4 leading-snug group-hover:text-[#F5EDD8] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-white/60 text-sm sm:text-base leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#D4A017] tracking-[0.15em] uppercase">
                <span>Pattern Blindspot</span>
                <div className="w-6 h-6 rounded-full bg-[#B8860B]/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <svg className="w-3.5 h-3.5 text-[#D4A017]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Solution Banner */}
        <div className="bg-gradient-to-r from-[#141B2D] via-[#1F2942] to-[#141B2D] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#B8860B]/50 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden group">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#B8860B]/20 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="max-w-2xl z-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#D4A017]">
                The Solution
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-3 text-white tracking-tight">
              FCI Fixes the Invisible Ceiling.
            </h3>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed font-sans font-medium">
              The Founder Clarity Intensive restructures how you process decisions, assess risk, and lead—permanently removing you as the organizational bottleneck.
            </p>
          </div>

          <a 
            href="#apply" 
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('apply') || document.getElementById('hero-cta-apply');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="z-10 px-8 py-4 bg-gradient-to-r from-[#B8860B] to-[#D4A017] text-white font-bold rounded-full text-sm hover:from-[#d4a017] hover:to-[#B8860B] transition-all duration-300 shadow-xl hover:shadow-[0_10px_25px_rgba(184,134,11,0.4)] hover:-translate-y-1 tracking-wide whitespace-nowrap shrink-0 border border-white/20"
          >
            Break Your Ceiling Now →
          </a>
        </div>

      </div>
    </section>
  )
}
