import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Reveal, { SectionLabel } from './Reveal'

// The paths we track on GoatCounter — one card per path
const TRACKED_PATHS = ['/', '/personal', '/professional', '/stats']

const PATH_LABELS = {
  '/': 'Site visits',
  '/personal': 'Personal unlocks',
  '/professional': 'Professional unlocks',
  '/stats': 'Your visits here',
}

// Aggregates daily GoatCounter data into 13 weekly buckets for the sparkline.
// Each bucket = total visits in that 7-day window.
function buildWeeklyBuckets(dailyStats) {
  const NUM_WEEKS = 13
  const WEEK_MS = 6048e5 // 7 days in milliseconds
  const now = Date.now()
  const buckets = new Array(NUM_WEEKS).fill(0)

  ;(dailyStats || []).forEach((entry) => {
    const date = new Date(entry.day + 'T00:00:00Z').getTime()
    if (isNaN(date)) return
    const weekIndex = NUM_WEEKS - 1 - Math.floor((now - date) / WEEK_MS)
    if (weekIndex >= 0 && weekIndex < NUM_WEEKS) {
      buckets[weekIndex] += entry.daily || 0
    }
  })

  return buckets
}

// Builds an SVG path string from weekly bucket data for the sparkline chart.
// Returns { line, area } path strings, or null if not enough data.
function buildSparklinePath(weeklyBuckets) {
  if (!weeklyBuckets || weeklyBuckets.length < 2) return null

  const W = 120
  const H = 34
  const max = Math.max(...weeklyBuckets, 1)
  const n = weeklyBuckets.length

  const x = (i) => (i / (n - 1)) * W
  const y = (v) => H - 2 - (v / max) * (H - 4)

  const linePath = weeklyBuckets
    .map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(' ')

  return {
    line: linePath,
    area: `${linePath} L${W} ${H} L0 ${H} Z`,
  }
}

// ─── Stats page ───────────────────────────────────────────────────────────────
// Secret page — only reachable by triple-clicking the logo.
// Shows live GoatCounter visit counts and weekly sparkline charts.
export default function Stats() {
  const [statsByPath, setStatsByPath] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const token = window.__GC_TOKEN__

    const applyStats = (data) => {
      setStatsByPath(data)
      setLoaded(true)
    }

    if (token) {
      // Authenticated fetch — gets full stats including daily breakdowns for sparklines
      fetch(
        'https://anishmiddela.goatcounter.com/api/v0/stats/hits?limit=100&start=2020-01-01T00:00:00Z',
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => {
          const hits = data?.hits || []
          const result = {}

          TRACKED_PATHS.forEach((path) => {
            const hit = hits.find((h) => (h.path || h.Path) === path)
            const count = hit ? (hit.count ?? hit.Count ?? 0) : 0
            const weekly = buildWeeklyBuckets(hit?.stats || hit?.Stats)
            const delta = weekly.length >= 2 ? weekly[weekly.length - 1] - weekly[weekly.length - 2] : null

            result[path] = {
              n: count.toLocaleString(),
              d: delta,
              sp: buildSparklinePath(weekly),
            }
          })

          applyStats(result)
        })
        .catch(() => {
          // If the API call fails, show dashes
          const fallback = {}
          TRACKED_PATHS.forEach((p) => (fallback[p] = { n: '—', d: null, sp: null }))
          applyStats(fallback)
        })
    } else {
      // No token — fall back to the public per-path counter endpoint
      Promise.all(
        TRACKED_PATHS.map((path) =>
          fetch(`https://anishmiddela.goatcounter.com/counter/${path}.json`, { cache: 'no-store' })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => [path, data ? String(data.count).trim() : '0'])
            .catch(() => [path, '—'])
        )
      ).then((entries) => {
        const result = {}
        entries.forEach(([path, count]) => (result[path] = { n: count, d: null, sp: null }))
        applyStats(result)
      })
    }
  }, [])

  return (
    <div className="page-fade">
      <section className="mx-auto max-w-2xl px-6 pt-44 pb-32 md:pt-52">

        {/* Header */}
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight text-[#16181d] md:text-5xl">Site stats</h1>
          <p className="mt-3 text-lg text-[#b3bac2]">The private corner</p>
        </Reveal>

        {/* Visit count cards */}
        <Reveal delay={120}>
          <div className="mt-12">
            <div className="flex items-baseline justify-between">
              <SectionLabel>Visits by section</SectionLabel>
              {loaded && (
                <a
                  href="https://anishmiddela.goatcounter.com"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-1 text-[11px] font-medium text-[#0070f3] transition-colors hover:text-[#16181d]"
                >
                  full dashboard <ArrowRight size={11} />
                </a>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {TRACKED_PATHS.map((path) => {
                const stat = statsByPath[path]
                const sparkline = stat?.sp

                return (
                  <div
                    key={path}
                    className="rounded-2xl border border-[#ebedf0] p-5 shadow-[0_2px_12px_rgba(22,24,29,0.04)]"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b3bac2]">
                      {PATH_LABELS[path]}
                    </div>

                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-2xl font-bold tracking-tight text-[#16181d]">
                        {loaded ? (stat?.n ?? '—') : '…'}
                      </span>
                      {/* Week-over-week delta arrow */}
                      {stat?.d != null && (
                        <span
                          className={`text-xs font-medium ${
                            stat.d > 0 ? 'text-emerald-600' : stat.d < 0 ? 'text-rose-500' : 'text-[#b3bac2]'
                          }`}
                        >
                          {stat.d > 0 ? `+${stat.d}` : stat.d} this week
                        </span>
                      )}
                    </div>

                    {/* Sparkline — 13-week trend */}
                    {sparkline && (
                      <svg
                        viewBox="0 0 120 34"
                        className="mt-3 w-full"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d={sparkline.area} fill="#0070f3" fillOpacity="0.08" />
                        <path d={sparkline.line} fill="none" stroke="#0070f3" strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Microsoft Clarity deep-dive link */}
        <Reveal delay={200}>
          <div className="mt-12">
            <SectionLabel>Deep dive</SectionLabel>
            <a
              href="https://clarity.microsoft.com/projects/view/x65csj8c4t/dashboard"
              target="_blank"
              rel="noopener"
              className="mt-4 flex items-center justify-between rounded-2xl border border-[#ebedf0] p-5 transition-colors hover:border-[#16181d]"
            >
              <div>
                <div className="font-medium text-[#16181d]">Microsoft Clarity</div>
                <p className="mt-0.5 text-sm text-[#7a838f]">
                  Heatmaps, click tracking, and session recordings. Requires your Microsoft login.
                </p>
              </div>
              <ArrowRight size={16} className="flex-shrink-0 text-[#b3bac2]" />
            </a>
          </div>
        </Reveal>

      </section>
    </div>
  )
}
