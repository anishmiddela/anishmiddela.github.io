import { ArrowRight, Mail } from 'lucide-react'
import Reveal, { SectionLabel } from './Reveal'

// ─── Social links shown at the bottom of the Overview page ───────────────────

// GitHub icon (custom SVG — not in Lucide)
function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

// LinkedIn icon (custom SVG — not in Lucide)
function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// Social links row — GitHub, LinkedIn, Email
const socialLinks = [
  { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/anishmiddela' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anishmiddela/' },
  { icon: <Mail size={18} />, label: 'Email', href: 'mailto:anish.middela@gmail.com' },
]

// ─── Fun-fact cards shown in the Personal column ──────────────────────────────
// Each has a name (bold) and an optional sub-line beneath it.
// To edit these, just change the text below.
const personalFacts = [
  { name: 'Health optimizer', sub: 'same healthy breakfast, three years straight' },
  { name: 'Eudaimonia', sub: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन — Gita 2.47' },
  { name: 'Professional Athlete', sub: 'double digit titles and counting' },
  { name: 'Backcountry trekker', sub: 'Trekked Grand Canyon Rim-to-Rim' },
]

// Professional highlights shown in the Professional column
const professionalFacts = [
  { name: 'Senior Analyst @ Carvana', sub: 'prev @ Tesla, Tata, Volvo' },
  { name: 'Efficiency engine', sub: '$3M+ in costs saved and counting' },
  { name: 'End-to-end owner', sub: 'collaborating wide, driving hard' },
  { name: 'Analytics & forecasting at scale', sub: 'drove business strategy · built production-grade models & pipelines' },
]

// ─── Overview page ────────────────────────────────────────────────────────────
// This is the first thing visitors see. It shows your name, a quote,
// two clickable columns (Personal / Professional), and your contact info.
export default function Overview({ goTo }) {
  return (
    <div className="page-fade">

      {/* ── Hero section: name + quote ── */}
      <section className="mx-auto max-w-2xl px-6 pt-44 pb-28 md:pt-52">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-[#16181d] md:text-5xl">
            Anish Reddy <span className="text-[#00345b]">Middela</span>
          </h1>
          {/* Devanagari version of the name — links to a Google search explaining its meaning */}
          <p className="mt-2 text-xl">
            <a
              href="https://www.google.com/search?q=%E0%A4%85%E0%A4%A8%E0%A5%80%E0%A4%B6%E0%A4%83+name+meaning"
              target="_blank"
              rel="noopener"
              title="What does अनीशः mean?"
              className="text-[#87211C] transition-colors hover:text-[#b03a33]"
            >
              अनीशः
            </a>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-12 text-xl italic leading-relaxed text-[#3c434b]">
            "Curious by nature, disciplined by choice, grounded by faith."
          </p>
          <p className="mt-3 text-sm italic text-[#00345b]">— Claude Fable</p>
        </Reveal>
      </section>

      {/* ── Two-column section: Personal & Professional previews ── */}
      <section className="mx-auto max-w-2xl px-6 pb-28">
        <Reveal>
          <SectionLabel>Two worlds, one mind</SectionLabel>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-x-10">

          {/* Personal column — clicking navigates to the Personal tab */}
          <Reveal delay={60}>
            <button onClick={() => goTo('personal')} className="group w-full text-left">
              <div className="flex items-center justify-between border-b border-[#ebedf0] pb-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ff5a36]">
                  Personal
                </span>
                <ArrowRight size={14} className="text-[#b3bac2] transition-all group-hover:translate-x-0.5 group-hover:text-[#0070f3]" />
              </div>
              <ul className="mt-3 space-y-3">
                {personalFacts.map((fact) => (
                  <li key={fact.name}>
                    <span className="text-sm font-medium text-[#00345b] transition-colors group-hover:text-[#0070f3]">
                      {fact.name}
                    </span>
                    {fact.sub && (
                      <p className="mt-0.5 text-xs leading-relaxed text-[#7a838f]">{fact.sub}</p>
                    )}
                  </li>
                ))}
              </ul>
            </button>
          </Reveal>

          {/* Professional column — clicking navigates to the Professional tab */}
          <Reveal delay={140}>
            <button onClick={() => goTo('professional')} className="group w-full text-left">
              <div className="flex items-center justify-between border-b border-[#ebedf0] pb-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0070f3]">
                  Professional
                </span>
                <ArrowRight size={14} className="text-[#b3bac2] transition-all group-hover:translate-x-0.5 group-hover:text-[#0070f3]" />
              </div>
              <ul className="mt-3 space-y-3">
                {professionalFacts.map((fact) => (
                  <li key={fact.name}>
                    <span className="text-sm font-medium text-[#00345b] transition-colors group-hover:text-[#0070f3]">
                      {fact.name}
                    </span>
                    {fact.sub && (
                      <p className="mt-0.5 text-xs leading-relaxed text-[#7a838f]">{fact.sub}</p>
                    )}
                  </li>
                ))}
              </ul>
            </button>
          </Reveal>
        </div>

        {/* Converging-lines graphic + trait chips */}
        <Reveal delay={220}>
          <div className="mt-2">
            <svg viewBox="0 0 600 70" className="block h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 150 4 C 150 40, 300 30, 300 66" fill="none" stroke="#ff5a36" strokeWidth="1.3" />
              <path d="M 450 4 C 450 40, 300 30, 300 66" fill="none" stroke="#0070f3" strokeWidth="1.3" />
              <circle cx="300" cy="66" r="3" fill="#87211C" />
            </svg>
            <p className="mt-3 text-center text-base font-semibold">
              <span className="text-[#ff5a36]">Visionary</span>
              <span className="mx-2 text-[#b3bac2]">·</span>
              <span className="text-[#87211C]">Learns fast, adapts faster</span>
              <span className="mx-2 text-[#b3bac2]">·</span>
              <span className="text-[#0070f3]">AI-first mindset</span>
            </p>
            <p className="mt-2 text-center text-xs text-[#7a838f]">
              from building my own complete personal health app to promptly driving business decisions
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Contact section ── */}
      <section className="mx-auto max-w-2xl px-6 pb-32">
        <Reveal>
          <SectionLabel>Reach me at</SectionLabel>
          <a
            href="mailto:anish.middela@gmail.com"
            className="mt-5 inline-block font-medium text-[#0070f3] transition-colors hover:text-[#16181d]"
          >
            anish.middela@gmail.com
          </a>
          {/* Social icons row */}
          <div className="mt-8 flex items-center gap-7">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener"
                aria-label={link.label}
                title={link.label}
                className="text-[#7a838f] transition-all hover:-translate-y-0.5 hover:text-[#16181d]"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
