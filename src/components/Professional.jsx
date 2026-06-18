import { ArrowRight } from 'lucide-react'
import Reveal, { SectionLabel, Divider } from './Reveal'

// GitHub icon (used on the "View all on GitHub" link)
function GitHubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

// ─── Edit your work experience here ──────────────────────────────────────────
// Each entry: title (your role), org (company), meta (dates), desc (one line about impact)
const experience = [
  {
    title: '[Job Title]',
    org: 'Carvana',
    meta: '[Year] – Present',
    desc: '[What you do here. Keep it one or two sentences — focused on impact.]',
  },
  {
    title: '[Previous Job Title]',
    org: '[Company Name]',
    meta: '[Year] – [Year]',
    desc: '[What you did or built here. Keep it one or two sentences — focused on impact.]',
  },
  {
    title: '[Education / Degree]',
    org: '[University / School Name]',
    meta: '[Year]',
    desc: '[Field of study or anything notable about your academic background.]',
  },
]

// ─── Edit your GitHub projects here ──────────────────────────────────────────
// Each project links to a GitHub repo with a short description.
const projects = [
  {
    name: 'Instacart Recommendation Engines',
    desc: 'Two recommendation systems: a content-based engine using NLP and a collaborative filtering engine built on customer transaction data.',
    lang: 'Jupyter Notebook',
    stars: 5,
    url: 'https://github.com/anishmiddela/Instacart-Recommedation-Engines---Content-Collaborative',
  },
  {
    name: 'Deep Learning (PyTorch)',
    desc: 'Collection of deep learning projects built with PyTorch, covering CNNs and other neural network architectures.',
    lang: 'Python / PyTorch',
    url: 'https://github.com/anishmiddela/Deep-Learning',
  },
  {
    name: 'Heart Failure Prediction',
    desc: 'Predicts heart failure using econometric assumptions applied to machine learning — bridging statistical rigor with modern ML.',
    lang: 'R',
    url: 'https://github.com/anishmiddela/Heart-Failure-Prediction-using-Econometric-concepts',
  },
  {
    name: 'Netflix Genre Prediction',
    desc: 'Used 7 ML algorithms to predict which genres Netflix should budget for to stay competitive against rival streaming platforms.',
    lang: 'R',
    url: 'https://github.com/anishmiddela/NetflixMovies-Prediction-Using-7-Machine-Learning-Algorithms',
  },
  {
    name: '9 ML Projects in R',
    desc: 'A breadth-first tour of ML: sentiment analysis, image classification, customer segmentation, and more — all in R.',
    lang: 'R',
    url: 'https://github.com/anishmiddela/9-Machine-Learning-Projects-in-R-Language',
  },
]

// ─── Professional page ────────────────────────────────────────────────────────
// This tab is locked by a PIN. It shows your work history and GitHub projects.
export default function Professional() {
  return (
    <div className="page-fade">

      {/* ── In Progress banner ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#ff5a36] px-4 py-2.5 text-center text-xs font-semibold text-white tracking-wide">
        This page is a work in progress — come back soon.
      </div>

      {/* ── Hero + intro ── */}
      <section className="mx-auto max-w-2xl px-6 pt-44 pb-20 md:pt-52">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-[#16181d] md:text-5xl">Professional</h1>
          <p className="mt-3 text-lg text-[#b3bac2]">What I do</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-12 leading-relaxed text-[#3c434b]">
            [A brief intro to your professional life — your field, your focus, or what you're currently working on.]
          </p>
        </Reveal>
      </section>

      {/* ── Work experience timeline ── */}
      <section className="mx-auto max-w-2xl px-6 pb-24">
        <Reveal>
          <SectionLabel>Work &amp; experience</SectionLabel>
        </Reveal>

        <div className="mt-4">
          <Divider />
          {experience.map((job, index) => (
            <Reveal key={job.title} delay={70 * index}>
              <div className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium text-[#00345b]">{job.title}</span>
                  <span className="text-xs text-[#b3bac2]">{job.meta}</span>
                </div>
                <div className="mt-0.5 text-sm font-medium text-[#ff5a36]">{job.org}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#7a838f]">{job.desc}</p>
              </div>
              <Divider />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── GitHub projects ── */}
      <section className="mx-auto max-w-2xl px-6 pb-32">
        <Reveal>
          <SectionLabel>Built &amp; shipped</SectionLabel>
          <p className="mt-5 text-sm leading-relaxed text-[#7a838f]">
            A selection of data science and machine learning work — from recommendation systems to deep learning.
          </p>
        </Reveal>

        <div className="mt-8">
          <Divider />
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={60 * index}>
              {/* Each project is a clickable link to the GitHub repo */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener"
                className="group flex items-baseline justify-between gap-4 py-5"
              >
                <div>
                  <span className="font-medium text-[#0070f3] transition-colors group-hover:text-[#16181d]">
                    {project.name}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-[#7a838f]">{project.desc}</p>
                  <p className="mt-1.5 text-xs text-[#b3bac2]">
                    {project.lang}{project.stars ? ` · ★ ${project.stars}` : ''}
                  </p>
                </div>
                <ArrowRight size={16} className="flex-shrink-0 text-[#b3bac2] transition-all group-hover:translate-x-0.5 group-hover:text-[#0070f3]" />
              </a>
              <Divider />
            </Reveal>
          ))}
        </div>

        {/* Link to full GitHub profile */}
        <Reveal delay={150}>
          <a
            href="https://github.com/anishmiddela"
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#0070f3] transition-colors hover:text-[#16181d]"
          >
            <GitHubIcon size={15} /> View all on GitHub →
          </a>
        </Reveal>
      </section>
    </div>
  )
}
