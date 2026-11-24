import React from 'react'
import { trackMetaContact } from '../utils/metaPixel'

export default function StickyCTA({ onApplyClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out flex justify-center pointer-events-none">
      <div className="w-full bg-gradient-to-r from-[#0F0B1A] via-[#1A1F36] to-[#26164A] rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.3)] border-t border-[#B8860B]/40 pointer-events-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between p-3.5 sm:px-8 sm:py-4 gap-3">
        
          {/* Left side text + Urgency badge (Row 8) */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-white w-full sm:w-auto text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-[10px] sm:text-xs font-bold text-red-300 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Only 5 Slots Left (January)
            </div>
            <span className="font-serif font-semibold text-xs sm:text-base text-white/90 leading-snug">
              Ready To Break The Invisible Ceiling Holding Your Business Back?
            </span>
          </div>

          {/* Right side buttons: Click-to-call on mobile (Row 9) + Apply Button */}
          <div className="flex items-stretch sm:items-center justify-center gap-2.5 w-full sm:w-auto">
            {/* WhatsApp CTA (All screens) */}
            <a
              href="https://wa.me/918100211066?text=Hi%20Prerona%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20Founder%20Clarity%20Intensive%20and%20break%20through%20my%20invisible%20ceiling."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaContact({ method: 'whatsapp' })}
              title="Message on WhatsApp"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-4 sm:px-5 py-2.5 rounded-3xl text-xs transition-all shadow-[0_4px_15px_rgba(37,211,102,0.35)] hover:shadow-[0_4px_20px_rgba(37,211,102,0.5)]"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Main CTA */}
            <a
              href="#apply" onClick={(e) => { e.preventDefault(); onApplyClick(); }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-[#ffe600] to-[#ebd500] hover:from-[#ebd500] hover:to-[#ffe600] text-black font-extrabold px-6 py-2.5 rounded-3xl transition-all shadow-[0_4px_20px_rgba(255,230,0,0.35)] group animate-[zpop_2s_ease-in-out_infinite] text-xs sm:text-sm tracking-wide uppercase"
            >
              <span>Apply For The Intensive</span>
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
    </div>
  )
}
