export default function Footer() {
  return (
    <footer className="bg-[#1A1F36] text-white/70 py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-serif text-white font-bold text-lg">Inspire Excellence</p>
            <p className="text-xs text-white/40 mt-1 tracking-wide">with Prerona Roy</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {[
              { label: 'About', href: '#about' },
              { label: 'Programme', href: '#programme' },
              { label: 'Who It\'s For', href: '#who' },
              { label: 'Apply', href: '#apply' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm hover:text-[#D4A017] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Copy */}
          <p className="text-xs text-white/30 text-center">
            © {new Date().getFullYear()} Inspire Excellence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
