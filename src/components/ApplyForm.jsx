import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    id: 'stage',
    title: '1. What stage best describes your current business or leadership position?',
    type: 'single',
    options: [
      'Startup Founder (0–2 years)',
      'Scaling Founder (2–10 Cr Revenue)',
      'Established Business Owner',
      'CEO / CXO / Senior Leader',
      'Consultant / Coach with an existing client base',
      'Investor / Business Partner',
      'Other'
    ]
  },
  {
    id: 'revenue',
    title: '2. What is your current annual business revenue or professional income?',
    type: 'single',
    options: [
      'Below ₹10 Lakhs',
      '₹10–25 Lakhs',
      '₹25–50 Lakhs',
      '₹50 Lakhs–₹1 Crore',
      '₹1–5 Crores',
      '₹5 Crores+',
      'Prefer not to disclose'
    ]
  },
  {
    id: 'challenge',
    title: '3. What is the biggest challenge currently affecting your growth or leadership?',
    subtitle: '(Choose up to 2)',
    type: 'multi',
    max: 2,
    options: [
      'Business growth has plateaued',
      'I feel mentally overloaded despite success',
      'Difficulty making clear strategic decisions',
      'Team / leadership challenges',
      'Lack of clarity about next direction',
      'Emotional burnout or pressure',
      'Scaling problems & operational chaos',
      'Fear of making the wrong move',
      'Struggling with consistency or focus',
      'I know I need a deeper internal shift to grow further'
    ]
  },
  {
    id: 'why_exploring',
    title: '4. Why are you exploring this programme at this stage of your life/business?',
    type: 'text'
  },
  {
    id: 'mindset',
    title: '5. Which statement best describes your mindset toward personal and business transformation?',
    type: 'single',
    options: [
      'I am casually exploring options',
      'I know something needs to change, but I’m unsure',
      'I am actively investing in my growth',
      'I am fully committed to transforming how I lead and operate',
      'I am looking for high-level strategic and behavioural breakthroughs'
    ]
  },
  {
    id: 'previous_investment',
    title: '6. Have you previously invested in coaching, consulting, therapy, leadership development, or personal growth work?',
    type: 'single',
    options: [
      'No',
      'Yes, under ₹50,000',
      'Yes, ₹50,000 – ₹2 Lakhs',
      'Yes, ₹2 Lakhs+',
      'I regularly invest in high-level mentorship and growth'
    ]
  },
  {
    id: 'prepared',
    title: '7. If selected after the clarity call, are you financially and mentally prepared to invest in premium transformational work?',
    type: 'single',
    options: [
      'Yes',
      'Possibly, depending on alignment',
      'No'
    ]
  },
  {
    id: 'support_needed',
    title: '8. What kind of support are you truly looking for right now?',
    type: 'single',
    options: [
      'Strategic business clarity',
      'Leadership & decision-making',
      'Emotional resilience under pressure',
      'Behavioural transformation',
      'Scaling support',
      'Personal reinvention',
      'High-level sounding board & guidance'
    ]
  },
  {
    id: 'success_definition',
    title: '9. What would make this programme a success for you over the next 6–12 months?',
    type: 'text'
  }
]

export default function ApplyForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  // Auto-redirect to home after 7 seconds on success
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, navigate])

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSingleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    // Auto advance after short delay
    setTimeout(() => {
      handleNext()
    }, 250)
  }

  const handleMultiSelect = (questionId, value, max) => {
    const current = answers[questionId] || []
    if (current.includes(value)) {
      setAnswers(prev => ({ ...prev, [questionId]: current.filter(item => item !== value) }))
    } else if (current.length < max) {
      setAnswers(prev => ({ ...prev, [questionId]: [...current, value] }))
    }
  }

  const handleTextChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const onSubmitFinal = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target)
    
    // Append all the questionnaire answers
    Object.keys(answers).forEach(key => {
      const question = questions.find(q => q.id === key)
      const questionTitle = question ? question.title : key
      const val = Array.isArray(answers[key]) ? answers[key].join(', ') : answers[key]
      formData.append(questionTitle, val)
    })
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        setIsSuccess(true)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (err) {
      alert("Error submitting form. Please check your connection.")
    }
    
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1F36] mb-4 text-center">Application Received</h2>
        <p className="text-[#6B6B6B] max-w-md text-center leading-relaxed mb-2">
          Thank you for applying. We will review your application carefully and reach out to you shortly regarding the next steps for the Founder Clarity Call.
        </p>
        <p className="text-sm text-gray-400 mb-8 animate-pulse">
          Redirecting to homepage automatically...
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-[#1A1F36] text-white rounded-full font-semibold hover:bg-black transition-colors"
        >
          Return to Home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col animate-fadeIn">
      {/* Header */}
      <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center border-b border-gray-100">
        <div className="font-serif text-xl font-bold tracking-tight text-[#1A1F36]">
          <img src="/black-logo.png" alt="Inspire Excellence" className="h-8 sm:h-10 md:h-11 lg:h-12" />
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-400">
            {currentStep < questions.length ? `Question ${currentStep + 1} of ${questions.length}` : 'Final Step'}
          </span>
          <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            Cancel
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 py-12">
        <div className="w-full max-w-2xl w-full">
          
          {currentStep < questions.length ? (
            <div className="animate-slideInUp">
              <h1 className="font-serif text-xl md:text-2xl lg:text-3xl text-[#1A1F36] font-bold text-center mb-2 leading-tight">
                {questions[currentStep].title}
              </h1>
              {questions[currentStep].subtitle && (
                <p className="text-center text-sm text-gray-500 mb-4">{questions[currentStep].subtitle}</p>
              )}
              
              <div className="mt-6 space-y-2">
                {questions[currentStep].type === 'single' && questions[currentStep].options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSingleSelect(questions[currentStep].id, opt)}
                    className={`w-full text-left px-5 py-3 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                      answers[questions[currentStep].id] === opt 
                        ? 'border-[#B8860B] bg-[#F5EDD8] shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <span className={`text-sm md:text-base ${answers[questions[currentStep].id] === opt ? 'text-[#B8860B] font-semibold' : 'text-gray-700'}`}>
                      {opt}
                    </span>
                  </button>
                ))}

                {questions[currentStep].type === 'multi' && questions[currentStep].options.map(opt => {
                  const isSelected = (answers[questions[currentStep].id] || []).includes(opt)
                  const isMaxReached = (answers[questions[currentStep].id] || []).length >= questions[currentStep].max
                  const isDisabled = !isSelected && isMaxReached

                  return (
                    <button
                      key={opt}
                      onClick={() => handleMultiSelect(questions[currentStep].id, opt, questions[currentStep].max)}
                      disabled={isDisabled}
                      className={`w-full text-left px-5 py-3 rounded-xl border-2 transition-all duration-200 ${
                        isSelected 
                          ? 'border-[#B8860B] bg-[#F5EDD8] shadow-sm' 
                          : isDisabled 
                            ? 'border-gray-100 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5'
                      }`}
                    >
                      <span className={`text-sm md:text-base ${isSelected ? 'text-[#B8860B] font-semibold' : 'text-gray-700'}`}>
                        {opt}
                      </span>
                    </button>
                  )
                })}

                {questions[currentStep].type === 'text' && (
                  <textarea
                    rows="3"
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#B8860B] focus:ring-0 outline-none transition-colors text-base"
                    placeholder="Type your answer here..."
                    value={answers[questions[currentStep].id] || ''}
                    onChange={(e) => handleTextChange(questions[currentStep].id, e.target.value)}
                  ></textarea>
                )}
              </div>

              {/* Navigation for manual advance (multi/text or going back) */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  Previous
                </button>
                
                {(questions[currentStep].type === 'multi' || questions[currentStep].type === 'text') && (
                  <button
                    onClick={handleNext}
                    disabled={
                      (questions[currentStep].type === 'text' && !(answers[questions[currentStep].id] || '').trim()) ||
                      (questions[currentStep].type === 'multi' && (answers[questions[currentStep].id] || []).length === 0)
                    }
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-[#1A1F36] text-white text-sm font-semibold rounded-full hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Final Step: Contact Info */
            <div className="animate-slideInUp">
              <h1 className="font-serif text-3xl md:text-4xl text-[#1A1F36] font-bold text-center mb-8">
                Just a few final details
              </h1>
              
              <form onSubmit={onSubmitFinal} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
                <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="New Founder Clarity Intensive Application" />
                <input type="hidden" name="from_name" value="Intensive Enquiry" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input required type="text" name="Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <input required type="text" name="Company" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                    <input required type="text" name="Designation" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input required type="email" name="Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input required type="tel" name="Phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn / Website *</label>
                    <input required type="text" name="LinkedIn_Website" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] outline-none transition-all" />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-8">
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    <strong className="text-gray-900">Final Note:</strong> This programme is designed for founders, business leaders, and high performers who are serious about growth, leadership evolution, and long-term transformation. Applications are reviewed carefully to ensure alignment, readiness, and mutual fit before moving forward to a private Founder Clarity Call with Prerona Roy.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-gray-500 hover:text-gray-800 font-medium"
                  >
                    Back to questions
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#B8860B] text-white rounded-full font-bold hover:bg-[#9a7009] transition-colors disabled:opacity-70 shadow-lg flex items-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
