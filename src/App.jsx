import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Outcomes from './components/Outcomes'
import WhoItsFor from './components/WhoItsFor'
import Process from './components/Process'
import ProgrammeStructure from './components/ProgrammeStructure'
import About from './components/About'
import FAQ from './components/FAQ'
import Apply from './components/Apply'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Outcomes />
        <WhoItsFor />
        <ProgrammeStructure />
        <Process />
        <About />
        <FAQ />
        <Apply />
      </main>
      <Footer />
    </div>
  )
}
