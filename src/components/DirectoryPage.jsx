import { useState } from 'react'
import { Icon } from '../data/seed'

// ──────────────────────────────────────────────
// DirectoryPage — Searchable list of all employees
// Shows each person as a card with avatar, name, role, and department
// ──────────────────────────────────────────────
export function DirectoryPage({ dir }) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter people by name or department
  const filteredPeople = dir.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.dept.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="page-enter space-y-4">
      <h2 className="text-xl font-extrabold text-[#1a2e25]">Employee Directory</h2>

      {/* Search bar with icon */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search}</span>
        <input
          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none bg-white"
          placeholder="Search by name or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Person cards in a 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredPeople.map((person, index) => (
          <div key={index}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover-lift cursor-pointer">
            {/* Colored avatar circle */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
              style={{ background: person.color, color: person.tc }}
            >
              {person.initials}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{person.name}</p>
              <p className="text-xs text-gray-400">{person.role}</p>
              {/* Department pill */}
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 inline-block"
                style={{ background: person.color, color: person.tc }}
              >
                {person.dept}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
