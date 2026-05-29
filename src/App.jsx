import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Outcomes from './components/Outcomes'
import WhoItsFor from './components/WhoItsFor'
import Process from './components/Process'
import ProgrammeStructure from './components/ProgrammeStructure'
import About from './components/About'
import FAQ from './components/FAQ'
import StickyCTA from './components/StickyCTA'
import ApplyForm from './components/ApplyForm'

function LandingPage() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  const startApplication = () => navigate('/form')

  return (
    <div className="min-h-screen">
      <Navbar onApplyClick={startApplication} />
      <main>
        <Hero onApplyClick={startApplication} />
        <Outcomes />
        <WhoItsFor />
        <ProgrammeStructure />
        <Process />
        <About />
        <FAQ onApplyClick={startApplication} />
      </main>
      <StickyCTA onApplyClick={startApplication} />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<ApplyForm />} />
      </Routes>
    </Router>
  )
}
