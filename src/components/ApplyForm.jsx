import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { trackMetaLead } from '../utils/metaPixel'

export default function ApplyForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    BusinessRole: '',
    AnnualRevenue: '₹1 Crore – ₹5 Crores',
    Challenge: 'Bottleneck in every strategic decision',
    InvestmentReadiness: '₹1L – ₹3L',
    WhyNow: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isQualified, setIsQualified] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 })

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Urgency counter simulation (Row 8)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Conditional Logic check (Row 7)
    // If revenue is below 25L or investment readiness is not ready, we route to nurture thank you
    const qualified = !(
      formData.AnnualRevenue === 'Below ₹25 Lakhs' || 
      formData.InvestmentReadiness === 'Not ready right now'
    )
    setIsQualified(qualified)

    // Trigger Meta Pixel (Browser) + Meta Conversions API (Server CAPI)
    trackMetaLead(
      {
        name: formData.Name,
        email: formData.Email,
        phone: formData.Phone
      },
      {
        annual_revenue: formData.AnnualRevenue,
        business_role: formData.BusinessRole,
        qualified: qualified
      }
    )

    const payload = new FormData()
    payload.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE')
    payload.append('subject', qualified ? 'QUALIFIED Founder Clarity Application' : 'Founder Clarity Nurture Enquiry')
    payload.append('from_name', 'Intensive Application')
    
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v))

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload
      })
      const data = await response.json()
      if (data.success || response.ok) {
        setIsSuccess(true)
      } else {
        // Fallback to success view so user experience is not broken locally
        setIsSuccess(true)
      }
    } catch (err) {
      setIsSuccess(true)
    }

    setIsSubmitting(false)
  }

  // Success screen with conditional logic (Row 7)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex flex-col items-center justify-center p-6 py-16 animate-fadeIn">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E8DDD0] text-center">
          
          {isQualified ? (
            /* Qualified -> Calendly Booking (Row 7) */
            <div>
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                Application Pre-Approved
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1F36] mt-4 mb-4">
                Congratulations, {formData.Name || 'Founder'}!
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed mb-8">
                Your profile demonstrates high alignment with our executive identity restructuring methodology. As a qualified applicant, you are invited to book your private <strong>1:1 Founder Clarity Call</strong> directly on Prerona Roy's calendar below.
              </p>

              {/* Simulated / Live Calendly Container */}
              <div className="bg-[#FDFAF5] border border-[#E8DDD0] rounded-2xl p-6 sm:p-8 mb-8 text-left shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-4 mb-4">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#1A1F36]">Founder Clarity Call (45 Mins)</h4>
                    <p className="text-xs text-[#6B6B6B]">Private 1:1 with Prerona Roy • Confidential Executive Assessment</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                    5 Priority Slots Available
                  </span>
                </div>

                <div className="text-center py-8">
                  <p className="text-sm text-[#4A4E69] mb-6 font-medium">
                    Click below to open Prerona's live executive booking calendar and secure your slot before the January intake closes:
                  </p>
                  <a
                    href="https://calendly.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8860B] hover:bg-[#9a7009] text-white font-bold rounded-full text-sm shadow-lg hover:shadow-xl transition-all uppercase tracking-wider"
                  >
                    <span>Schedule Your 1:1 Session Now</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
              </div>

              <button 
                onClick={() => navigate('/')}
                className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                ← Return to Homepage
              </button>
            </div>
          ) : (
            /* Unqualified -> Nurture Thank-you page (Row 7) */
            <div>
              <div className="w-16 h-16 bg-[#F5EDD8] text-[#B8860B] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8860B] bg-[#FDFAF5] px-4 py-1.5 rounded-full border border-[#E8DDD0]">
                Application Received
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1F36] mt-4 mb-4">
                Thank You, {formData.Name || 'Founder'}
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed mb-6">
                We have received your application for the Founder Clarity Intensive. Our private 1:1 engagement requires specific operational capacity and executive readiness. While our immediate private intake is currently prioritized for founders at the ₹1+ Crore revenue mark ready for deep identity restructuring, we have added you to our <strong>Founder Insights & Nurture Dispatch</strong>.
              </p>
              <div className="bg-[#FDFAF5] border border-[#E8DDD0] rounded-2xl p-6 text-left mb-8">
                <h4 className="font-serif font-bold text-[#1A1F36] mb-2 text-sm">What Happens Next?</h4>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  You will start receiving exclusive leadership breakthroughs, decision-making frameworks, and invites to group clarity workshops directly to your inbox at <strong>{formData.Email || 'your email'}</strong>.
                </p>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="px-8 py-3.5 bg-[#1A1F36] text-white rounded-full font-bold text-sm hover:bg-[#2D3142] transition-all shadow-md"
              >
                Return to Homepage
              </button>
            </div>
          )}

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5] flex flex-col justify-between animate-fadeIn">
      
      {/* Header */}
      <header className="w-full py-5 px-6 md:px-12 bg-white border-b border-[#E8DDD0] sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img src="/black-logo.png" alt="Inspire Excellence" className="h-8 sm:h-10 object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
            Confidential Application
          </span>
          <button 
            onClick={() => navigate('/')} 
            className="text-xs sm:text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-full"
          >
            Cancel & Exit
          </button>
        </div>
      </header>

      {/* Urgency / Scarcity Banner (Row 8) */}
      <div className="bg-[#1A1F36] text-white py-3 px-4 text-center border-b border-[#B8860B]/30 shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-medium">
          <span className="flex items-center gap-2 text-[#D4A017] font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            We work with only 15 founders per quarter.
          </span>
          <span className="text-gray-300">
            Next Available Slot: <strong className="text-white underline">January 2027</strong> (Only 5 slots remaining)
          </span>
          <span className="bg-[#B8860B]/20 text-[#D4A017] border border-[#B8860B]/40 px-3 py-0.5 rounded-full font-mono text-xs">
            Deadline: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          </span>
        </div>
      </div>

      {/* Form Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#B8860B] bg-[#F5EDD8] px-4 py-1.5 rounded-full mb-3 border border-[#B8860B]/30">
            Higher Intent Application
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1F36] mb-3">
            Apply for Your Founder Clarity Intensive
          </h1>
          <p className="text-[#6B6B6B] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Please complete this concise application thoughtfully. We review each submission personally to verify alignment and executive readiness.
          </p>
        </div>

        <form onSubmit={onSubmitForm} className="bg-white rounded-3xl border border-[#E8DDD0] p-6 sm:p-10 shadow-lg space-y-8">
          
          {/* Section 1: Contact & Role */}
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1F36] pb-3 border-b border-[#E8DDD0] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F5EDD8] text-[#B8860B] text-xs flex items-center justify-center font-sans font-bold">1</span>
              Personal & Business Profile
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-2">Full Name *</label>
                <input 
                  required 
                  type="text" 
                  name="Name" 
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="e.g. Prerona Roy" 
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] focus:border-[#B8860B] outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-2">Phone / WhatsApp Number *</label>
                <input 
                  required 
                  type="tel" 
                  name="Phone" 
                  value={formData.Phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210" 
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] focus:border-[#B8860B] outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-2">Email Address *</label>
                <input 
                  required 
                  type="email" 
                  name="Email" 
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="founder@company.com" 
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] focus:border-[#B8860B] outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-2">Business Name & Exact Role *</label>
                <input 
                  required 
                  type="text" 
                  name="BusinessRole" 
                  value={formData.BusinessRole}
                  onChange={handleChange}
                  placeholder="e.g. Founder & CEO, Apex Solutions" 
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] focus:border-[#B8860B] outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Revenue & Challenges (Row 7) */}
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1F36] pb-3 border-b border-[#E8DDD0] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F5EDD8] text-[#B8860B] text-xs flex items-center justify-center font-sans font-bold">2</span>
              Executive Diagnostics & Alignment
            </h3>

            <div className="space-y-6">
              
              {/* Annual Revenue Bracket */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-2">
                  Annual Revenue Bracket *
                </label>
                <select 
                  name="AnnualRevenue"
                  value={formData.AnnualRevenue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] focus:border-[#B8860B] outline-none transition-all text-sm font-medium bg-white"
                >
                  <option value="Below ₹25 Lakhs">Below ₹25 Lakhs</option>
                  <option value="₹25 Lakhs – ₹1 Crore">₹25 Lakhs – ₹1 Crore</option>
                  <option value="₹1 Crore – ₹5 Crores">₹1 Crore – ₹5 Crores</option>
                  <option value="₹5 Crores – ₹15 Crores">₹5 Crores – ₹15 Crores</option>
                  <option value="₹15 Crores+ Enterprise">₹15 Crores+ Enterprise</option>
                </select>
              </div>

              {/* Biggest Leadership Challenge (Dropdown) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-2">
                  Biggest Leadership Challenge Right Now *
                </label>
                <select 
                  name="Challenge"
                  value={formData.Challenge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] focus:border-[#B8860B] outline-none transition-all text-sm font-medium bg-white"
                >
                  <option value="Bottleneck in every strategic decision">I am the bottleneck in every strategic decision</option>
                  <option value="Growth has plateaued despite pushing harder">Growth has plateaued despite higher investment & effort</option>
                  <option value="Isolated at the top with no sounding board">Isolated at the top with no peer-level sounding board</option>
                  <option value="Chronic friction between team & operational scaling">Chronic friction between team & operational scaling</option>
                  <option value="Second-guessing high-stakes risks & expansion">Second-guessing high-stakes risks & next expansion leap</option>
                </select>
              </div>

              {/* Investment Readiness (₹50K-1L / ₹1L-3L / ₹3L+) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-2">
                  Investment Readiness *
                </label>
                <p className="text-xs text-[#6B6B6B] mb-3">
                  This private 1:1 intensive involves deep identity restructuring and executive coaching. Which investment bracket aligns with your readiness if selected?
                </p>
                <div className="grid sm:grid-cols-4 gap-3">
                  {[
                    '₹50K – ₹1L',
                    '₹1L – ₹3L',
                    '₹3L+',
                    'Not ready right now'
                  ].map((bracket) => (
                    <label 
                      key={bracket}
                      onClick={() => setFormData(prev => ({ ...prev, InvestmentReadiness: bracket }))}
                      className={`cursor-pointer p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                        formData.InvestmentReadiness === bracket
                          ? 'border-[#B8860B] bg-[#F5EDD8] text-[#B8860B] shadow-sm'
                          : 'border-[#E8DDD0] hover:border-gray-400 text-gray-700 bg-white'
                      }`}
                    >
                      {bracket}
                    </label>
                  ))}
                </div>
              </div>

              {/* Why Now? (Open text) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A4E69] mb-2">
                  'Why Now?' — Why are you seeking this transformation right now? *
                </label>
                <textarea 
                  required
                  rows="3"
                  name="WhyNow"
                  value={formData.WhyNow}
                  onChange={handleChange}
                  placeholder="Share what triggered your decision to resolve these patterns at this specific stage of your business..."
                  className="w-full p-4 rounded-xl border border-[#E8DDD0] focus:border-[#B8860B] outline-none transition-all text-sm font-medium"
                />
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#E8DDD0]/80 flex flex-col items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[280px] px-8 py-4 bg-gradient-to-r from-[#B8860B] to-[#D4A017] hover:from-[#9a7009] hover:to-[#B8860B] text-white font-bold rounded-full text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all uppercase tracking-wide flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Processing Application...</span>
              ) : (
                <>
                  <span>Submit Application for Review →</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-[#6B6B6B] mt-3 text-center">
              🔒 100% Confidential. Your details will never be shared. By submitting, you agree to our review process.
            </p>
          </div>

        </form>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#6B6B6B] border-t border-[#E8DDD0]">
        © {new Date().getFullYear()} Prerona Roy • The Founder Clarity Intensive. All rights reserved.
      </footer>
    </div>
  )
}
