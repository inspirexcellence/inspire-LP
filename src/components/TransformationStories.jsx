import React, { useRef, useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const stories = [
  {
    id: 3,
    name: 'Ankoor Gupta',
    role: 'Director, Omni Green Solutions Pvt Ltd',
    revenue: '₹26 Cr Annual Revenue',
    before: 'Despite leading a ₹15 Cr second-generation business, he was trapped in day-to-day execution. Growth lacked strategic direction, the business had no distinct identity beyond trading third-party brands, leadership was inconsistent, and the team operated without a shared vision or high-performance culture.',
    after: 'He evolved into a more strategic leader with greater clarity, conviction, and decision-making capability. He developed a clear roadmap to build long-term enterprise value through his own brand, strengthened leadership and organisational alignment, and transformed the business from ₹15 Cr to ₹26 Cr in just two years while laying the foundation for sustainable, scalable growth.',
    timeline: 'Within 2 Years',
    results: [
      { label: 'Revenue Growth', value: '₹15Cr to ₹26Cr' },
      { label: 'Leadership Focus', value: 'Strategic' },
      { label: 'Team Alignment', value: 'Seamless' }
    ],
    videoUrl: 'https://res.cloudinary.com/bckdihv8/video/upload/Add_a_heading_1_md3nlz.mp4',
    quote: "Being a second-generation leader comes with unique mental traps. Working 1:1 with Prerona gave me the authority and clarity to scale our operations without breaking the family legacy."
  },
  {
    id: 4,
    name: 'Shubhadha Bhave',
    role: 'Founder, Kids Intelligence',
    revenue: 'Preschool & Franchise Model',
    before: 'A founder with multiple business opportunities but no clear strategic priority. She was constantly shifting between ideas, reacting to day-to-day demands, and despite having a successful preschool and franchise model, the business remained heavily founder-dependent, limiting profitability and scalability.',
    after: 'In just two sessions, she gained the strategic clarity to identify the highest-leverage growth opportunities, eliminate unnecessary complexity, and focus on the initiatives with the greatest long-term profitability. She shifted from firefighting to intentional leadership, creating a clearer roadmap for building a more scalable, less founder-dependent business.',
    timeline: 'Within 2 Sessions',
    results: [
      { label: 'Strategic Focus', value: 'High Leverage' },
      { label: 'Founder Ops', value: 'Reduced' },
      { label: 'Scalability', value: 'Unlocked' }
    ],
    videoUrl: 'https://res.cloudinary.com/bckdihv8/video/upload/WhatsApp_Video_2026-07-20_at_13.43.57_inonue.mp4',
    quote: "The intensive process completely redefined my leadership ceiling. I'm now operating at a strategic level I didn't think was possible."
  },
  {
    id: 5,
    name: 'Vanya Surana',
    role: 'Makeup Artist',
    revenue: 'Independent Professional',
    before: 'A successful salon owner and makeup artist whose business had collapsed after being defrauded. Financial loss led to deep emotional distress, shattered confidence, and uncertainty about how to rebuild her career. She had lost not only her business momentum but also her belief in herself.',
    after: 'Within a year, she rebuilt from the inside out. She developed emotional mastery, regained clarity and confidence in her decision-making, and created a strategic roadmap for her next chapter. Today, she has returned to mainstream business with renewed conviction and is mentoring others—transforming one of the most difficult periods of her life into a foundation for purposeful leadership and lasting impact.',
    timeline: 'Within 1 Year',
    results: [
      { label: 'Confidence', value: 'Restored' },
      { label: 'Business Focus', value: 'Rebuilt' },
      { label: 'Impact', value: 'Mentoring' }
    ],
    videoUrl: 'https://res.cloudinary.com/bckdihv8/video/upload/Vanya_Reel_1_1_f3aomv.mp4',
    quote: "Awaiting final quote for this testimonial. This is a dummy quote placeholder for now."
  }
]

export default function TransformationStories() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: 'center', skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <section id="stories" className="py-24 bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F36] mb-4">
            Transformation Stories
          </h2>
          <p className="text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
            Real case studies from ambitious founders who broke through their invisible ceilings and achieved lasting behavioral and financial shifts.
          </p>
        </div>
      </div>

      {/* Finite Scrollable Embla Carousel */}
      <div className="w-full lg:max-w-[1264px] mx-auto relative mt-4">
        
        {/* Carousel Container */}
        <div className="embla overflow-hidden cursor-grab active:cursor-grabbing w-full" ref={emblaRef}>
          <div className="embla__container flex touch-pan-y -ml-6 sm:-ml-8">
            {stories.map((story) => (
              <div 
                key={story.id}
                className="embla__slide flex-[0_0_auto] min-w-0 pl-6 sm:pl-8"
              >
                <div className="bg-white rounded-3xl border border-[#E8DDD0] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group w-[85vw] sm:w-[380px] lg:w-[400px] h-full mx-auto">
                  {/* Video Testimonial Thumbnail (Click to open Reel) */}
                  <div 
                    className="relative h-80 sm:h-96 w-full overflow-hidden bg-gray-900 shrink-0 cursor-pointer group/video"
                    onClick={() => setActiveVideo(story)}
                  >
                    <video
                      src={story.videoUrl}
                      poster={story.videoUrl.replace('.mp4', '.jpg')}
                      muted
                      loop
                      playsInline
                      onMouseOver={e => e.target.play().catch(()=>{})}
                      onMouseOut={e => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="w-12 h-12 rounded-full bg-[#B8860B]/90 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20 group-hover/video:bg-[#B8860B] group-hover/video:scale-110 transition-all duration-300">
                          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                       </div>
                    </div>
                    
                    {/* Founder Badge */}
                    <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none z-10">
                      <h4 className="font-serif font-bold text-lg leading-tight">{story.name}</h4>
                      <p className="text-xs text-gray-300 leading-snug truncate">{story.role}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-[#B8860B] bg-white/90 px-2 py-0.5 rounded">
                        {story.revenue}
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Before -> After */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col gap-4">
                    
                    {/* Before */}
                    <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        Before State
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                        {story.before}
                      </p>
                    </div>

                    {/* After (Stretches to fill available height) */}
                    <div className="flex-1 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        After State
                      </div>
                      <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans font-medium">
                        {story.after}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots (Mobile Only) */}
        <div className="flex md:hidden justify-center gap-3 mt-10">
          {stories.map((_, index) => {
            const isActive = index === (selectedIndex % stories.length);
            return (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#B8860B]' : 'bg-[#E8DDD0] hover:bg-[#D4A017]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          })}
        </div>

      </div>

      {/* Reel Format Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in p-4 sm:p-8">
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="relative w-full max-w-[420px] h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
            <video
              src={activeVideo.videoUrl}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
