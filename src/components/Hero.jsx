import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

function AnimatedCounter({ end, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, end, {
        duration: 1.2, // much faster animation
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = `${Math.floor(latest)}${suffix}`;
          }
        }
      });
    }
  }, [isInView, end, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function VideoPlayer() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E8DDD0] "
      style={{ background: '#111' }}>
      {/* 16:9 aspect-ratio wrapper */}
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          src="https://www.youtube.com/embed/JR2pC_6qnl8?si=ZgXDffmw3MnFtYh4"
          title="Prerona Roy — Founder Clarity Intensive"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; compute-pressure"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default function Hero({ onApplyClick }) {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between min-h-screen overflow-hidden z-60 pt-20 sm:pt-24"
      style={{
        background: 'linear-gradient(160deg, #FDFAF5 0%, #F8F3EA 40%, #F2EBD8 100%)',
      }}
    >
      {/* Decorative background orbs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B8860B 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      {/* Thin vertical gold lines */}
      <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#B8860B]/20 to-transparent hidden xl:block" />

      <div className="relative w-full max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-12 py-4 sm:py-6 my-auto">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center lg:items-start">

          {/* ── LEFT: Text content ── */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.3rem] font-bold text-[#1A1F36] leading-[1.16] mb-4 animate-fade-in-up">
              <span className="text-[#D4A017] underline decoration-[#D4A017] decoration-2 sm:decoration-[3px] underline-offset-[8px] sm:underline-offset-[10px]">One Decision</span>
              <br />Can Change the <span className="text-[#D4A017] underline decoration-[#D4A017] decoration-2 sm:decoration-[3px] underline-offset-[8px] sm:underline-offset-[10px]">Trajectory</span> of Your Business.
            </h1>

            {/* Sub-headline in gold */}
            <p className="font-sans text-lg sm:text-xl xl:text-2xl font-bold leading-snug tracking-tight mb-6 animate-fade-in-up delay-100"
              style={{
                background: 'linear-gradient(135deg, #B8860B 0%, #D4A017 50%, #B8860B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              Transformation for Founders, Leaders &amp; High Performers Who Want Real Growth
            </p>

            {/* Thin gold divider */}
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#B8860B] to-[#D4A017] rounded-full mb-5 animate-fade-in-up delay-200" />

            {/* Description */}
            <p className="font-sans text-[#2D3142] text-sm sm:text-base lg:text-base xl:text-lg leading-relaxed max-w-[540px] animate-fade-in-up delay-200 font-medium">
              The Founder Clarity Intensive helps ambitious founders eliminate hidden leadership blind spots, make high-quality decisions faster, and unlock the next stage of business growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8 animate-fade-in-up delay-300 w-full sm:w-auto">
              <a
                href="#apply" onClick={(e) => { e.preventDefault(); onApplyClick(); }}
                id="hero-cta-apply"
                className="px-8 py-4 bg-[#B8860B] text-white font-semibold rounded-full text-sm hover:bg-[#9a7009] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 tracking-wide text-center"
              >
                Apply For The Intensive
              </a>
              <a
                href="#programme"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('programme')?.scrollIntoView({ behavior: 'smooth' });
                }}
                id="hero-cta-learn"
                className="px-8 py-4 bg-white border-2 border-[#B8860B] text-[#B8860B] font-semibold rounded-full text-sm hover:bg-[#F5EDD8] transition-all duration-300 tracking-wide text-center"
              >
                Explore the Programme
              </a>
            </div>

          </div>

          {/* ── RIGHT: Video player & Aligned Badge ── */}
          <div className="lg:col-span-7 flex flex-col justify-between items-center gap-4 animate-fade-in-up delay-300 w-full max-w-2xl mx-auto lg:max-w-none h-full">
            <div className="w-full flex flex-col items-center gap-3">
              <VideoPlayer />

              {/* Small caption below video */}
              <p className="text-center text-xs text-[#6B6B6B] font-sans italic">
                Watch Prerona Roy explain the Founder Clarity Intensive
              </p>
            </div>

            {/* Badge Strip (Aligned on the right side in the same line as left CTA buttons) */}
            <div className="group relative inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white/50 backdrop-blur-md border-2 border-[#B8860B]/40 shadow-md hover:shadow-lg mt-8 lg:mt-auto w-fit overflow-hidden hover:scale-[1.015] transition-all duration-300">
              
              {/* Glowing shining wave effect */}
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#B8860B]/25 to-transparent animate-shine pointer-events-none" />

              {/* Left Section: Dot + 2-line text */}
              <div className="flex items-center gap-3.5 z-10">
                <div className="relative flex h-3 sm:h-3.5 w-3 sm:w-3.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8860B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-[#B8860B] shadow-[0_0_10px_#B8860B]"></span>
                </div>
                
                <div className="text-xs sm:text-[13px] font-bold uppercase tracking-wider leading-snug text-[#1A1F36]">
                  <div>WE WORK WITH <span className="text-[#B8860B] font-extrabold text-sm sm:text-base ml-0.5">ONLY 15 FOUNDERS</span> PER</div>
                  <div>QUARTER</div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-px h-9 bg-[#1A1F36]/25 z-10 shrink-0" />

              {/* Right Section: 2-line slot text */}
              <div className="flex flex-col justify-center text-xs sm:text-[13px] font-bold uppercase tracking-wider leading-snug z-10">
                <span className="text-[#6B6B6B] text-[10px] sm:text-[11px] tracking-widest mb-0.5">NEXT AVAILABLE SLOT</span>
                <span className="text-[#B8860B] font-extrabold text-xs sm:text-[14px]">JANUARY 2027</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── FULL-WIDTH POWERFUL STATS (DARK HIGHLIGHT BOX) ── */}
      <div className="w-full relative z-10 border-y border-[#D4A017]/30 bg-gradient-to-r from-[#1A1F36] via-[#111424] to-[#1A1F36] shadow-[0_10px_30px_rgba(26,31,54,0.15)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[300px] bg-[#D4A017]/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-10 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D4A017]/20">
            {[
              { end: 500, suffix: '+', label: 'Leaders Transformed' },
              { end: 2, suffix: 'X', label: 'Avg. Business Growth' },
              { end: 20, suffix: '+', label: 'Years Experience' },
            ].map((s) => (
              <div key={s.label} className="flex-1 w-full flex flex-col items-center justify-center pt-6 sm:pt-0 first:pt-0 text-center group">
                <span className="font-serif text-4xl sm:text-5xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5E1] via-[#F5EDD8] to-[#D4A017] drop-shadow-sm mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-500">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </span>
                <span className="text-[10px] sm:text-xs lg:text-[13px] font-sans text-[#E8DDD0] tracking-[0.2em] uppercase font-extrabold">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TWO-LINE, BIGGER HEIGHT, ULTRA-CLEAN MOVABLE STRIP (NO BOX) ── */}
      <div className="w-full border-t border-b border-[#E8DDD0]/80 bg-white py-8 sm:py-10 mt-auto z-10 overflow-hidden relative flex flex-col gap-6 sm:gap-8">
        {/* Left / Right gradient masks for seamless edge fade */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Line 1: Moving Left */}
        <div className="animate-marquee flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14">
          {[0, 1].map((loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10 sm:gap-14 shrink-0">
              {/* TCS */}
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#FDFAF5] border border-[#E8DDD0] shadow-2xs hover:border-[#B8860B]/60 transition-all shrink-0">
                <img 
                  src="https://i.logos-download.com/113971/29583-9fde4947792aa7b5b379c0b1aee0ead2.png/Tata_Consultancy_Services_Logo_2020.png?dl" 
                  alt="TCS" 
                  className="h-6 sm:h-7 object-contain mix-blend-multiply" 
                />
                <span className="text-sm sm:text-base font-bold text-[#1A1F36] uppercase tracking-wider ml-1">TCS</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>

              {/* L&T */}
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#FDFAF5] border border-[#E8DDD0] shadow-2xs hover:border-[#B8860B]/60 transition-all shrink-0">
                <img 
                  src="/brands/L&T.png" 
                  alt="L&T" 
                  className="h-6 sm:h-7 object-contain mix-blend-multiply" 
                />
                <span className="text-sm sm:text-base font-bold text-[#1A1F36] uppercase tracking-wider ml-1">L&amp;T</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>

              {/* Ministry of Defence */}
              <div className="flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-[#FDFAF5] border border-[#E8DDD0] shadow-2xs hover:border-[#B8860B]/60 transition-all shrink-0">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="Ministry of Defence" 
                  className="h-7 sm:h-8 object-contain mix-blend-multiply" 
                />
                <span className="text-sm sm:text-base font-bold text-[#1A1F36] uppercase tracking-wider">Ministry of Defence</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>

              {/* Reliance Retail */}
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#FDFAF5] border border-[#E8DDD0] shadow-2xs hover:border-[#B8860B]/60 transition-all shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-700 text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                  R
                </div>
                <span className="text-sm sm:text-base font-bold text-[#1A1F36] uppercase tracking-wider">Reliance Retail</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>

              {/* John Maxwell Certified Coach */}
              <div className="flex items-center gap-3.5 px-7 py-3.5 rounded-full bg-[#FDFAF5] border border-[#B8860B]/40 shadow-xs hover:border-[#B8860B] transition-all shrink-0">
                <img 
                  src="/brands/Max.png" 
                  alt="John Maxwell Certified Coach" 
                  className="h-7 sm:h-8 object-contain mix-blend-multiply" 
                />
                <span className="text-sm sm:text-base font-extrabold text-[#1A1F36] uppercase tracking-wider">John Maxwell Certified Coach</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>
            </div>
          ))}
        </div>

        {/* Line 2: Moving Right (Reverse) */}
        <div className="animate-marquee-reverse flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14">
          {[0, 1].map((loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-10 sm:gap-14 shrink-0">
              {/* John Maxwell Certified Coach */}
              <div className="flex items-center gap-3.5 px-7 py-3.5 rounded-full bg-[#FDFAF5] border border-[#B8860B]/40 shadow-xs hover:border-[#B8860B] transition-all shrink-0">
                <img 
                  src="/brands/Max.png" 
                  alt="John Maxwell Certified Coach" 
                  className="h-7 sm:h-8 object-contain mix-blend-multiply" 
                />
                <span className="text-sm sm:text-base font-extrabold text-[#1A1F36] uppercase tracking-wider">John Maxwell Certified Coach</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>

              {/* Reliance Retail */}
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#FDFAF5] border border-[#E8DDD0] shadow-2xs hover:border-[#B8860B]/60 transition-all shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-700 text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                  R
                </div>
                <span className="text-sm sm:text-base font-bold text-[#1A1F36] uppercase tracking-wider">Reliance Retail</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>

              {/* Ministry of Defence */}
              <div className="flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-[#FDFAF5] border border-[#E8DDD0] shadow-2xs hover:border-[#B8860B]/60 transition-all shrink-0">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="Ministry of Defence" 
                  className="h-7 sm:h-8 object-contain mix-blend-multiply" 
                />
                <span className="text-sm sm:text-base font-bold text-[#1A1F36] uppercase tracking-wider">Ministry of Defence</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>

              {/* L&T */}
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#FDFAF5] border border-[#E8DDD0] shadow-2xs hover:border-[#B8860B]/60 transition-all shrink-0">
                <img 
                  src="/brands/L&T.png" 
                  alt="L&T" 
                  className="h-6 sm:h-7 object-contain mix-blend-multiply" 
                />
                <span className="text-sm sm:text-base font-bold text-[#1A1F36] uppercase tracking-wider ml-1">L&amp;T</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>

              {/* TCS */}
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#FDFAF5] border border-[#E8DDD0] shadow-2xs hover:border-[#B8860B]/60 transition-all shrink-0">
                <img 
                  src="https://i.logos-download.com/113971/29583-9fde4947792aa7b5b379c0b1aee0ead2.png/Tata_Consultancy_Services_Logo_2020.png?dl" 
                  alt="TCS" 
                  className="h-6 sm:h-7 object-contain mix-blend-multiply" 
                />
                <span className="text-sm sm:text-base font-bold text-[#1A1F36] uppercase tracking-wider ml-1">TCS</span>
              </div>

              <span className="text-[#B8860B] text-base sm:text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  )
}
