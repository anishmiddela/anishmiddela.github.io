import { useRef, useState, useEffect } from 'react'

// Reveal wraps any content and fades it in when it scrolls into view.
// Pass a `delay` (in ms) to stagger multiple items — e.g. delay={60}, delay={120}
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Watch for the element to enter the viewport (at least 12% visible)
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true)
        observer.disconnect() // Only animate once
      }
    }, { threshold: 0.12 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? 'reveal-in' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

// Small section label — all-caps, muted, used as a heading above each section
export function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b3bac2]">
      {children}
    </p>
  )
}

// Thin horizontal rule used as a divider between list items
export function Divider() {
  return <div className="border-t border-[#ebedf0]" />
}
