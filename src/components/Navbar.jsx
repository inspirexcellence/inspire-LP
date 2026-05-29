import { useState, useEffect } from 'react'
import { scrollToSection } from '../utils/scroll'

export default function Navbar({ onApplyClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Who It\'s For', id: 'who', href: '/who' },
    { label: 'Programme', id: 'programme', href: '/programme' },
    { label: 'Process', id: 'process', href: '/process' },
    { label: 'About', id: 'about', href: '/about' },
    { label: 'FAQ', id: 'faq', href: '/faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8DDD0]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="inline-block group shrink-0"
        >
          <img
            src="/black-logo.png"
            alt="Inspire Excellence"
            className="h-10 md:h-11 lg:h-12 w-auto max-w-[200px] sm:max-w-[250px] object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              className="text-[#6B6B6B] hover:text-[#B8860B] font-medium text-sm tracking-wide transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={(e) => { e.preventDefault(); onApplyClick(); }}
            className="ml-2 px-5 py-2.5 bg-[#B8860B] text-white text-sm font-semibold rounded-full hover:bg-[#9a7009] transition-all duration-200 shadow-sm hover:shadow-md tracking-wide"
          >
            Apply Now
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#2D3142] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#2D3142] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#2D3142] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-white border-b border-[#E8DDD0] ${
          menuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col items-center gap-5 px-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollToSection(l.id);
              }}
              className="text-sm font-medium text-[#2D3142] hover:text-[#B8860B] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={(e) => { e.preventDefault(); setMenuOpen(false); onApplyClick(); }}
            className="w-full text-center px-5 py-3 bg-[#B8860B] text-white text-sm font-semibold rounded-full hover:bg-[#9a7009] transition-all duration-200 shadow-sm mt-2"
          >
            Apply Now
          </a>
        </div>
      </div>
    </header>
  )
}
