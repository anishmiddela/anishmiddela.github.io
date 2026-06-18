import { useState, useEffect } from 'react'
import { Lock, Delete } from 'lucide-react'

const WORKER_URL = 'https://api.anishmiddela.com'

export default function PinDialog({ tab, onSuccess, onCancel }) {
  const [entered, setEntered] = useState('')
  const [wrong, setWrong] = useState(false)
  const [checking, setChecking] = useState(false)

  const verify = async (pin) => {
    setChecking(true)
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, tab }),
      })
      const { success } = await res.json()
      if (success) {
        setTimeout(onSuccess, 120)
      } else {
        setWrong(true)
        setTimeout(() => { setEntered(''); setWrong(false); setChecking(false) }, 800)
      }
    } catch {
      setWrong(true)
      setTimeout(() => { setEntered(''); setWrong(false); setChecking(false) }, 800)
    }
  }

  const pressDigit = (digit) => {
    if (checking) return
    setWrong(false)
    setEntered((prev) => {
      if (prev.length >= 3) return prev
      const next = prev + digit
      if (next.length === 3) verify(next)
      return next
    })
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (checking) return
      if (e.key >= '0' && e.key <= '9') pressDigit(e.key)
      else if (e.key === 'Backspace') setEntered((prev) => prev.slice(0, -1))
      else if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [checking])

  return (
    <div className="page-fade fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/90 backdrop-blur-xl">

      <div className="w-[90%] max-w-sm rounded-2xl border border-[#ebedf0] bg-white p-10 text-center shadow-[0_12px_50px_rgba(22,24,29,0.08)]">
        <Lock className="mx-auto mb-4 text-[#16181d]" size={22} />

        <div className="text-xl font-bold capitalize tracking-tight text-[#16181d]">{tab}</div>
        <p className="mt-1 text-sm text-[#7a838f]">Enter your 3-digit code to continue</p>
        {(tab === 'personal' || tab === 'professional') && (
          <p className="mt-3 mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#fff3f0] px-3 py-1 text-xs font-semibold text-[#ff5a36]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
            Work in progress
          </p>
        )}
        {tab !== 'personal' && tab !== 'professional' && <div className="mb-8" />}

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

        <div className="grid grid-cols-3 gap-2">
          {['1','2','3','4','5','6','7','8','9'].map((d) => (
            <button
              key={d}
              onClick={() => pressDigit(d)}
              disabled={checking}
              className="rounded-xl border border-[#ebedf0] py-3 text-lg font-medium text-[#16181d] transition-all hover:border-[#16181d] active:scale-95 disabled:opacity-40"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => { if (!checking) { setEntered(''); setWrong(false) } }}
            disabled={checking}
            className="rounded-xl border border-[#ebedf0] py-3 text-sm text-[#7a838f] transition-all hover:border-[#16181d] disabled:opacity-40"
          >
            Clear
          </button>
          <button
            onClick={() => pressDigit('0')}
            disabled={checking}
            className="rounded-xl border border-[#ebedf0] py-3 text-lg font-medium text-[#16181d] transition-all hover:border-[#16181d] active:scale-95 disabled:opacity-40"
          >
            0
          </button>
          <button
            onClick={() => { if (!checking) setEntered((prev) => prev.slice(0, -1)) }}
            disabled={checking}
            className="flex items-center justify-center rounded-xl border border-[#ebedf0] py-3 text-[#7a838f] transition-all hover:border-[#16181d] disabled:opacity-40"
          >
            <Delete size={16} />
          </button>
        </div>

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
