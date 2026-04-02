import { useState, useCallback } from 'react'

// ──────────────────────────────────────────────
// Custom hook: useLocalStorage
// Works just like useState, but persists the value in localStorage
// so the data survives page refreshes.
//
// Usage:
//   const [value, setValue] = useLocalStorage('my-key', defaultValue)
// ──────────────────────────────────────────────
export function useLocalStorage(key, seed) {
  // On first render, try to load saved data from localStorage
  // If nothing is saved (or parsing fails), use the seed/default value
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : seed
    } catch {
      return seed
    }
  })

  // Setter that updates both React state AND localStorage
  // Supports both direct values and updater functions (like setState)
  const set = useCallback(
    (v) => {
      const next = typeof v === 'function' ? v(val) : v
      setVal(next)
      localStorage.setItem(key, JSON.stringify(next))
    },
    [key, val]
  )

  return [val, set]
}
