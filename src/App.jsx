import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ReactLenis } from 'lenis/react';
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

  useEffect(() => {
    const handleScroll = () => {
      const path = window.location.pathname.replace('/', '') || 'hero';
      const el = document.getElementById(path);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    // Handle direct load and back/forward navigation
    handleScroll();
    window.addEventListener('popstate', handleScroll);
    return () => window.removeEventListener('popstate', handleScroll);
  }, [])

  const startApplication = () => navigate('/form')

  return (
    <div className="min-h-screen overflow-x-hidden">
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
    <ReactLenis root>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/who" element={<LandingPage />} />
          <Route path="/programme" element={<LandingPage />} />
          <Route path="/process" element={<LandingPage />} />
          <Route path="/about" element={<LandingPage />} />
          <Route path="/faq" element={<LandingPage />} />
          <Route path="/form" element={<ApplyForm />} />
        </Routes>
      </Router>
    </ReactLenis>
  )
}
