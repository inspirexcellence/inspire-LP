import React from 'react'

export default function StickyCTA({ onApplyClick }) {
  

  return (
    <div
      className="fixed bottom-0 sm:bottom-6 left-0 right-0 z-40 transition-all duration-500 ease-in-out flex justify-center pointer-events-none px-0 sm:px-6"
    >
      <div className="w-full sm:max-w-5xl bg-gradient-to-r from-[#0F0B1A] to-[#26164A] rounded-t-2xl sm:rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.25)] border border-[#3F2B6D]/40 pointer-events-auto">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between p-4 sm:px-8 sm:py-3.5 gap-4">
        
        {/* Left side text */}
        <div className="flex items-center gap-3 text-white w-full sm:w-auto justify-center sm:justify-start">
          <svg className="w-5 h-5 text-white/70 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-sans font-medium text-[13px] sm:text-base tracking-wide text-center sm:text-left">
            Ready To Break The Pattern Holding Your Business Back?
          </span>
        </div>

        {/* Right side button */}
        <a
          href="#apply" onClick={(e) => { e.preventDefault(); onApplyClick(); }}
          className="flex-shrink-0 flex items-center justify-center gap-2 bg-[#ffe600] hover:bg-[#ebd500] text-black font-bold px-6 py-2.5 rounded-3xl transition-colors shadow-[0_10px_40px_rgba(255,230,0,0.35)] group animate-[zpop_2s_ease-in-out_infinite] text-sm w-full sm:w-auto"
        >
          Apply For The Intensive
          <svg
            className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        </div>
      </div>
    </div>
  )
}
