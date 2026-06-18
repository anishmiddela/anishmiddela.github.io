import Reveal, { SectionLabel, Divider } from './Reveal'

// ─── Edit your interests here ─────────────────────────────────────────────────
// Replace [Interest 1] etc. with real things you enjoy.
const interests = [
  { icon: '📚', name: '[Interest 1]' },
  { icon: '🎵', name: '[Interest 2]' },
  { icon: '🏃', name: '[Interest 3]' },
  { icon: '🌍', name: '[Interest 4]' },
  { icon: '🍳', name: '[Interest 5]' },
  { icon: '✍️', name: '[Interest 6]' },
]

// ─── Edit your values here ────────────────────────────────────────────────────
// Each value has a title and a short description (1–2 sentences).
const values = [
  {
    title: '[Value 1 — e.g. Curiosity]',
    desc: '[One or two sentences about what this value means to you and how it shows up in your life.]',
  },
  {
    title: '[Value 2 — e.g. Honesty]',
    desc: '[One or two sentences about what this value means to you and how it shows up in your life.]',
  },
  {
    title: '[Value 3 — e.g. Growth]',
    desc: '[One or two sentences about what this value means to you and how it shows up in your life.]',
  },
  {
    title: '[Value 4 — e.g. Community]',
    desc: '[One or two sentences about what this value means to you and how it shows up in your life.]',
  },
]

// ─── Personal page ────────────────────────────────────────────────────────────
// This tab is locked by a PIN. It shows who you are outside of work.
export default function Personal() {
  return (
    <div className="page-fade">

      {/* ── In Progress banner ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#ff5a36] px-4 py-2.5 text-center text-xs font-semibold text-white tracking-wide">
        This page is a work in progress — come back soon.
      </div>

      {/* ── Hero + intro text ── */}
      <section className="mx-auto max-w-2xl px-6 pt-44 pb-20 md:pt-52">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-[#16181d] md:text-5xl">Personal</h1>
          <p className="mt-3 text-lg text-[#b3bac2]">The human behind the work</p>
        </Reveal>

        {/* Replace the placeholder text below with your real story */}
        <Reveal delay={120}>
          <div className="mt-12 space-y-5 leading-relaxed text-[#3c434b]">
            <p>[Write a personal intro here — your story, where you're from, what shaped you. Be human, not polished.]</p>
            <p>[Add a second paragraph. Maybe talk about your passions, your family, something people wouldn't expect about you.]</p>
          </div>
        </Reveal>
      </section>

      {/* ── Interests grid ── */}
      <section className="mx-auto max-w-2xl px-6 pb-24">
        <Reveal>
          <SectionLabel>Things I love</SectionLabel>
          <p className="mt-5 text-sm leading-relaxed text-[#7a838f]">
            [A line or two about what you enjoy outside of work — what fills your time and energy.]
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-x-8 sm:grid-cols-3">
          {interests.map((item, index) => (
            <Reveal key={item.name} delay={60 * index}>
              <div className="flex items-center gap-3 border-t border-[#ebedf0] py-4">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-[#00345b]">{item.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Values list ── */}
      <section className="mx-auto max-w-2xl px-6 pb-32">
        <Reveal>
          <SectionLabel>Values &amp; principles</SectionLabel>
        </Reveal>

        <div className="mt-4">
          <Divider />
          {values.map((value, index) => (
            <Reveal key={value.title} delay={70 * index}>
              <div className="flex gap-5 py-5">
                {/* Numbered badge */}
                <span className="text-sm font-semibold text-[#ff5a36]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="font-medium text-[#00345b]">{value.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-[#7a838f]">{value.desc}</p>
                </div>
              </div>
              <Divider />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
