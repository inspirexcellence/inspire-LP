function VideoPlayer() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E8DDD0]"
      style={{ background: '#111' }}>
      {/* 16:9 aspect-ratio wrapper */}
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          src="https://www.youtube.com/embed/JR2pC_6qnl8?si=ZgXDffmw3MnFtYh4"
          title="Prerona Roy — Founder Clarity Intensive"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FDFAF5 0%, #F8F3EA 40%, #F2EBD8 100%)',
        minHeight: '100dvh',
      }}
    >
      {/* Decorative background orbs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B8860B 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      {/* Thin vertical gold lines */}
      <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#B8860B]/20 to-transparent hidden xl:block" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col items-start pt-8 lg:pt-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#B8860B]/30 bg-white/70 backdrop-blur-sm mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]">
                Private 1:1 Transformation Intensive
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[2.4rem] sm:text-5xl lg:text-5xl xl:text-[3.2rem] font-bold text-[#1A1F36] leading-[1.12] mb-4 animate-fade-in-up">
              This is Not Motivation
              <br />for Temporary Highs
            </h1>

            {/* Sub-headline in gold italic */}
            <p className="font-serif text-[1.6rem] sm:text-3xl lg:text-2xl xl:text-[1.7rem] italic font-semibold leading-snug mb-6 animate-fade-in-up delay-100"
              style={{
                background: 'linear-gradient(135deg, #B8860B 0%, #D4A017 50%, #B8860B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              This is Transformation for Founders, Leaders &amp; High Performers Who Want Real Growth
            </p>

            {/* Thin gold divider */}
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#B8860B] to-[#D4A017] rounded-full mb-5 animate-fade-in-up delay-200" />

            {/* Description */}
            <p className="font-sans text-[#6B6B6B] text-sm sm:text-base leading-relaxed max-w-[480px] animate-fade-in-up delay-200">
              A high-impact private intensive designed to help entrepreneurs and business leaders
              identify the hidden patterns affecting sales, growth, leadership, and scalability.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-8 animate-fade-in-up delay-300">
              <a
                href="#apply"
                id="hero-cta-apply"
                className="px-7 py-3.5 bg-[#B8860B] text-white font-semibold rounded-full text-sm hover:bg-[#9a7009] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 tracking-wide"
              >
                Submit Your Application
              </a>
              <a
                href="#programme"
                id="hero-cta-learn"
                className="px-7 py-3.5 bg-white border-2 border-[#B8860B] text-[#B8860B] font-semibold rounded-full text-sm hover:bg-[#F5EDD8] transition-all duration-300 tracking-wide"
              >
                Explore the Programme
              </a>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 flex items-center gap-8 animate-fade-in delay-400">
              {[
                { value: '500+', label: 'Leaders Transformed' },
                { value: '2X', label: 'Avg. Business Growth' },
                { value: '10+', label: 'Years Experience' },
              ].map((s, i) => (
                <div key={s.label} className={`flex flex-col ${i > 0 ? 'pl-8 border-l border-[#E8DDD0]' : ''}`}>
                  <span className="font-serif text-2xl font-bold text-[#B8860B]">{s.value}</span>
                  <span className="text-[10px] font-sans text-[#6B6B6B] tracking-widest uppercase mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Video player ── */}
          <div className="flex flex-col gap-4 animate-fade-in-up delay-300 w-full">
            <VideoPlayer />

            {/* Small caption below video */}
            <p className="text-center text-xs text-[#6B6B6B] font-sans italic">
              Watch Prerona Roy explain the Founder Clarity Intensive
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
