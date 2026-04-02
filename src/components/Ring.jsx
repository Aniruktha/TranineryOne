import { useState, useEffect } from 'react'

// ──────────────────────────────────────────────
// Ring — Animated circular progress indicator
// Shows percentage with a smooth fill animation
// Used for leave balance displays on the dashboard
// ──────────────────────────────────────────────
export function Ring({ pct, color, label, sub, size = 90 }) {
  // Calculate the SVG circle geometry
  const radius = size / 2 - 9                    // radius with padding for stroke width
  const circumference = 2 * Math.PI * radius     // full circle length
  const offset = circumference * (1 - pct / 100) // how much to "hide" for the percentage

  // Delay the animation so it's visible when the component mounts
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track (light grey circle) */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E8F5F0" strokeWidth="8"/>

        {/* Filled progress arc — animates from full to partial on mount */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          className="ring-progress"
        />

        {/* Center text showing the percentage */}
        <text
          x={size / 2} y={size / 2}
          textAnchor="middle" dominantBaseline="middle"
          style={{
            transform: 'rotate(90deg)',
            transformOrigin: `${size / 2}px ${size / 2}px`,
            fill: '#1a2e25',
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: 'Nunito,sans-serif',
          }}
        >
          {pct}%
        </text>
      </svg>

      {/* Label below the ring (e.g. "Casual") */}
      <p className="text-sm font-bold text-gray-700 mt-1">{label}</p>
      {/* Subtitle (e.g. "5 Days Left") */}
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  )
}
