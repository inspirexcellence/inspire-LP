import { useEffect, useRef, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

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
  'Need deeper clarity before scaling further',
  'Are pivoting into a new role and feel overwhelmed',
  'Are looking for a sounding board while expanding fast',
]

const sliderImages = [
  { src: '/WhoIts/IMG_4370.jpg', alt: 'Leadership intensive workshop' },
  { src: '/WhoIts/IMG_4386.jpg', alt: 'Founder clarity transformation session' },
  { src: '/WhoIts/train1.jpg', alt: 'Corporate leadership program' },
  { src: '/WhoIts/train2.jpg', alt: 'Founder group mentorship' },
]

function ImageSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 25 },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback((e) => {
    e.preventDefault()
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback((e) => {
    e.preventDefault()
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((idx) => {
    if (emblaApi) emblaApi.scrollTo(idx)
  }, [emblaApi])

  return (
    <div className="relative group/slider rounded-2xl overflow-hidden border border-[#E8DDD0] shadow-sm select-none">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {sliderImages.map((img, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-60 sm:h-64 md:h-72 bg-[#1A1F36]/5">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/slider:scale-105"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Chevrons */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm border border-[#E8DDD0] flex items-center justify-center text-[#1A1F36] opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-md z-10 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm border border-[#E8DDD0] flex items-center justify-center text-[#1A1F36] opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-md z-10 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollTo(idx)}
            aria-label={`Go to photo ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              selectedIndex === idx ? 'w-5 bg-[#D4A017]' : 'w-1.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

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
              <div className="pt-5">
                <ImageSlider />
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
              <div className="mt-8">
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
