import { useState } from 'react'

export default function Apply() {
  const [form, setForm] = useState({ name: '', email: '', business: '', challenge: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="apply"
      className="py-24 relative overflow-hidden mb-14 md:mb-4 lg:mb-5"
      style={{ background: 'linear-gradient(160deg, #F8F3EA 0%, #FDFAF5 50%, #F2EBD8 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B8860B 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F36] mb-4 leading-tight">
            The Next Level of Your Business
            <br />
            <span className="italic text-gold-gradient">Requires a Different Version of You</span>
          </h2>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Submit your application to explore the Founder Clarity Intensive. This is a limited
            capacity, high-impact engagement only for those who are ready.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#E8DDD0] rounded-3xl shadow-lg overflow-hidden">
          {/* Card top */}
          <div className="h-2 bg-gradient-to-r from-[#B8860B] via-[#D4A017] to-[#B8860B]" />

          <div className="p-8 sm:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F5EDD8] border-2 border-[#B8860B] flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1F36] mb-3">
                  Application Received
                </h3>
                <p className="text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{form.name}</strong>. Prerona's team will review your application
                  and reach out within 2–3 business days to schedule your pre-qualifying call.
                </p>
                <div className="mt-6 text-[#B8860B] text-xl">✦</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="application-form" className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] mb-2" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] bg-[#FDFAF5] text-[#2D3142] placeholder-[#C0B5A5] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 transition-all text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] bg-[#FDFAF5] text-[#2D3142] placeholder-[#C0B5A5] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Business role */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] mb-2" htmlFor="business">
                    Your Role / Business *
                  </label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    required
                    value={form.business}
                    onChange={handleChange}
                    placeholder="e.g. Founder of a SaaS company, CEO of a manufacturing firm..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] bg-[#FDFAF5] text-[#2D3142] placeholder-[#C0B5A5] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 transition-all text-sm"
                  />
                </div>

                {/* Challenge */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] mb-2" htmlFor="challenge">
                    What is the primary challenge you want to work on? *
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    required
                    rows={4}
                    value={form.challenge}
                    onChange={handleChange}
                    placeholder="Share where you feel stuck or what you're looking to achieve..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDD0] bg-[#FDFAF5] text-[#2D3142] placeholder-[#C0B5A5] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 transition-all text-sm resize-none"
                  />
                </div>

                {/* Privacy note */}
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  Your information is completely confidential and will only be used to evaluate your application.
                  We do not share your data with any third parties.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  id="submit-application"
                  className="w-full py-4 bg-[#B8860B] text-white font-semibold rounded-xl text-base hover:bg-[#9a7009] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 tracking-wide"
                >
                  Submit My Application
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#6B6B6B]">
          {[
            '🔒 100% Confidential',
            '✓ No Commitment Required',
            '⚡ Response Within 2–3 Days',
          ].map((t) => (
            <span key={t} className="font-medium">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
