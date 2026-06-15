import { useState, useRef } from 'react'
import { Lock, LockOpen, Mail } from 'lucide-react'
import Logo from './components/Logo'
import Overview from './components/Overview'
import Personal from './components/Personal'
import Professional from './components/Professional'
import Stats from './components/Stats'
import PinDialog from './components/PinDialog'

// Tells GoatCounter to record a visit to a given tab.
// This is how the Stats page counts how many times each section was viewed.
function trackTabView(tabName) {
  window.goatcounter?.count?.({ path: '/' + tabName, title: tabName })
}

// ─── Main App ─────────────────────────────────────────────────────────────────
// Controls which tab is showing, which tabs are unlocked, and navigation.
export default function App() {
  // Which tab is currently visible: "overview", "personal", "professional", or "stats"
  const [activeTab, setActiveTab] = useState('overview')

  // Which locked tabs have been unlocked this session (resets on page refresh)
  const [unlocked, setUnlocked] = useState({ personal: false, professional: false, stats: false })

  // If set, the PIN dialog is shown for this tab name
  const [pendingTab, setPendingTab] = useState(null)

  // Stores the timestamps of recent logo clicks — used for the easter egg
  const logoClicks = useRef([])

  // Navigate to a tab. If it's locked and not yet unlocked, show the PIN dialog instead.
  const goTo = (tab) => {
    if (tab === 'overview' || unlocked[tab]) {
      setActiveTab(tab)
      if (tab !== 'overview') trackTabView(tab)
      window.scrollTo({ top: 0 })
    } else {
      setPendingTab(tab)  // triggers PIN dialog
    }
  }

  // Handle logo click — normal click goes home, triple-click within 1.2s opens Stats
  const handleLogoClick = () => {
    const now = Date.now()
    // Keep only clicks from the last 1200ms
    logoClicks.current = [...logoClicks.current.filter((t) => now - t < 1200), now]

    if (logoClicks.current.length >= 3) {
      logoClicks.current = []
      goTo('stats')  // Easter egg: triple-click → secret Stats page
    } else {
      goTo('overview')
    }
  }

  // Called when the correct PIN is entered in the dialog
  const handleUnlock = () => {
    setUnlocked((prev) => ({ ...prev, [pendingTab]: true }))
    setActiveTab(pendingTab)
    trackTabView(pendingTab)
    setPendingTab(null)
    window.scrollTo({ top: 0 })
  }

  // Nav tabs — "stats" is intentionally not listed (it's the secret tab)
  const navTabs = [
    { id: 'overview', label: 'Home', lockable: false },
    { id: 'personal', label: 'Personal', lockable: true },
    { id: 'professional', label: 'Professional', lockable: true },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ── Fixed pill navigation bar ── */}
      <nav className="fixed inset-x-0 top-5 z-40 flex justify-center px-4">
        <div className="flex w-full max-w-2xl items-center justify-between rounded-full border border-[#ebedf0] bg-white/85 py-2 pl-2.5 pr-3 shadow-[0_2px_16px_rgba(22,24,29,0.05)] backdrop-blur-xl">

          {/* Logo — click to go home, triple-click for easter egg */}
          <button onClick={handleLogoClick} aria-label="Home" className="flex items-center">
            <span className="inline-flex transition-transform hover:scale-105">
              <Logo size={32} />
            </span>
          </button>

          {/* Tab buttons */}
          <div className="flex items-center gap-1">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id
              const isUnlocked = tab.lockable && unlocked[tab.id]

              return (
                <button
                  key={tab.id}
                  onClick={() => goTo(tab.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'font-semibold text-[#16181d]'
                      : 'font-medium text-[#7a838f] hover:text-[#16181d]'
                  }`}
                >
                  {/* Lock/unlock icon shown on lockable tabs */}
                  {tab.lockable && (
                    isUnlocked
                      ? <LockOpen size={11} className="opacity-70" />
                      : <Lock size={11} className="opacity-50" />
                  )}
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Email icon link */}
          <a
            href="mailto:anish.middela@gmail.com"
            aria-label="Email"
            className="p-1.5 text-[#7a838f] transition-colors hover:text-[#16181d]"
          >
            <Mail size={16} />
          </a>
        </div>
      </nav>

      {/* ── Page content — only the active tab is rendered ── */}
      {activeTab === 'overview'      && <Overview goTo={goTo} />}
      {activeTab === 'personal'      && <Personal />}
      {activeTab === 'professional'  && <Professional />}
      {activeTab === 'stats'         && <Stats />}

      {/* Footer */}
      <footer className="px-6 py-14 text-center text-xs text-[#b3bac2]">
        © 2026 Anish Reddy Middela
      </footer>

      {/* PIN dialog — shown as overlay when a locked tab is tapped */}
      {pendingTab && (
        <PinDialog
          tab={pendingTab}
          onSuccess={handleUnlock}
          onCancel={() => setPendingTab(null)}
        />
      )}
    </div>
  )
}
