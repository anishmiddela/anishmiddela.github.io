// The circular chakra-wheel logo that appears in the top navigation bar.
// Clicking it goes home; triple-clicking within 1.2s opens the secret Stats page.
export default function Logo({ size = 32 }) {
  const burgundy = '#8b2332'

  // Generate evenly-spaced angles for the dots around the outer ring and the petals
  const outerDotAngles = Array.from({ length: 32 }, (_, i) => (360 * i) / 32)
  const petalAngles = Array.from({ length: 20 }, (_, i) => (360 * i) / 20)
  const toRad = (deg) => (deg * Math.PI) / 180

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {/* Outer circle border */}
      <circle cx="50" cy="50" r="47" fill="#ffffff" stroke={burgundy} strokeWidth="2.5" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="40.5" fill="none" stroke={burgundy} strokeWidth="1.2" />
      {/* 32 tiny dots around the inner ring */}
      {outerDotAngles.map((angle) => (
        <circle
          key={angle}
          cx={50 + 43.8 * Math.cos(toRad(angle))}
          cy={50 + 43.8 * Math.sin(toRad(angle))}
          r="1.5"
          fill={burgundy}
        />
      ))}
      {/* 20 rotating petals forming the wheel */}
      {petalAngles.map((angle) => (
        <ellipse
          key={angle}
          cx="50" cy="27.5"
          rx="3.6" ry="10.5"
          fill={burgundy}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* Centre hub */}
      <circle cx="50" cy="50" r="12" fill="#ffffff" stroke={burgundy} strokeWidth="1.2" />
      <circle cx="50" cy="50" r="7" fill={burgundy} />
      <circle cx="50" cy="50" r="2.2" fill="#ffffff" />
    </svg>
  )
}
