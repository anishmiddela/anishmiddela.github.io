import { useState, useEffect } from 'react'
import { Lock, Delete } from 'lucide-react'

// ─── PIN dialog ───────────────────────────────────────────────────────────────
// Shows as a full-screen overlay when a visitor tries to open a locked tab.
// They must enter the correct 3-digit PIN to unlock it.
// Correct PIN: 369
//
// Props:
//   tab       — which tab is being unlocked ("personal" or "professional")
//   onSuccess — called when the correct PIN is entered
//   onCancel  — called when the user presses Cancel or Escape
export default function PinDialog({ tab, onSuccess, onCancel }) {
  const [entered, setEntered] = useState('')   // digits entered so far
  const [wrong, setWrong] = useState(false)    // true briefly when wrong PIN is entered

  // Handle a digit being pressed (from the numpad or keyboard)
  const pressDigit = (digit) => {
    setWrong(false)
    setEntered((prev) => {
      if (prev.length >= 3) return prev  // already 3 digits, ignore

      const next = prev + digit

      if (next.length === 3) {
        if (next === '369') {
          // Correct! Short delay so the last dot fills in before dismissing
          setTimeout(onSuccess, 120)
        } else {
          // Wrong PIN — shake red for 800ms then reset
          setWrong(true)
          setTimeout(() => {
            setEntered('')
            setWrong(false)
          }, 800)
        }
      }

      return next
    })
  }

  // Keyboard support — type digits, Backspace to delete, Escape to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key >= '0' && e.key <= '9') pressDigit(e.key)
      else if (e.key === 'Backspace') setEntered((prev) => prev.slice(0, -1))
      else if (e.key === 'Escape') onCancel()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    // Full-screen frosted-glass overlay
    <div className="page-fade fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/90 backdrop-blur-xl">

      {/* PIN entry card */}
      <div className="w-[90%] max-w-sm rounded-2xl border border-[#ebedf0] bg-white p-10 text-center shadow-[0_12px_50px_rgba(22,24,29,0.08)]">
        <Lock className="mx-auto mb-4 text-[#16181d]" size={22} />

        {/* Shows which tab is being unlocked */}
        <div className="text-xl font-bold capitalize tracking-tight text-[#16181d]">{tab}</div>
        <p className="mt-1 mb-8 text-sm text-[#7a838f]">Enter your 3-digit code to continue</p>

        {/* 3 dots showing how many digits have been entered */}
        <div className="mb-6 flex justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-3.5 w-3.5 rounded-full border-2 transition-all duration-150"
              style={{
                borderColor: wrong ? '#e11d48' : i < entered.length ? '#0070f3' : '#d8dde2',
                background:  wrong ? '#e11d48' : i < entered.length ? '#0070f3' : 'transparent',
              }}
            />
          ))}
        </div>

        {/* Numpad: 1–9, then Clear / 0 / Backspace */}
        <div className="grid grid-cols-3 gap-2">
          {['1','2','3','4','5','6','7','8','9'].map((d) => (
            <button
              key={d}
              onClick={() => pressDigit(d)}
              className="rounded-xl border border-[#ebedf0] py-3 text-lg font-medium text-[#16181d] transition-all hover:border-[#16181d] active:scale-95"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => { setEntered(''); setWrong(false) }}
            className="rounded-xl border border-[#ebedf0] py-3 text-sm text-[#7a838f] transition-all hover:border-[#16181d]"
          >
            Clear
          </button>
          <button
            onClick={() => pressDigit('0')}
            className="rounded-xl border border-[#ebedf0] py-3 text-lg font-medium text-[#16181d] transition-all hover:border-[#16181d] active:scale-95"
          >
            0
          </button>
          <button
            onClick={() => setEntered((prev) => prev.slice(0, -1))}
            className="flex items-center justify-center rounded-xl border border-[#ebedf0] py-3 text-[#7a838f] transition-all hover:border-[#16181d]"
          >
            <Delete size={16} />
          </button>
        </div>

        {/* Error message — only visible briefly after wrong PIN */}
        <p className="mt-4 min-h-[1.2rem] text-sm text-rose-600">
          {wrong ? 'Incorrect code. Try again.' : ''}
        </p>
      </div>

      <button
        onClick={onCancel}
        className="text-sm text-[#7a838f] underline transition-colors hover:text-[#16181d]"
      >
        Cancel
      </button>
    </div>
  )
}
