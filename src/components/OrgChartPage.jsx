// ──────────────────────────────────────────────
// OrgChartPage — Shows the company hierarchy as a tree
// Each node is a colored card with initials and role
// The tree is recursively rendered using the OrgNode component
// ──────────────────────────────────────────────

// Recursive tree node — renders one person and their children
function OrgNode({ person, depth = 0 }) {
  return (
    <div className="flex flex-col items-center">
      {/* Person card with colored background */}
      <div
        className={`relative rounded-2xl p-3 text-center w-28 ${person.me ? 'ring-2 ring-[#1B5E4F]' : ''}`}
        style={{ background: person.color }}
      >
        {/* Avatar circle */}
        <div
          className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm font-extrabold mb-1.5"
          style={{ background: person.color, color: person.tc, border: `1.5px solid ${person.tc}33` }}
        >
          {person.initials}
        </div>
        <p className="text-xs font-extrabold" style={{ color: person.tc }}>{person.name}</p>
        <p className="text-[10px] opacity-70 mt-0.5" style={{ color: person.tc }}>{person.role}</p>

        {/* "You" badge for the current user */}
        {person.me && (
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#1B5E4F] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
            You
          </span>
        )}
      </div>

      {/* Connector lines and child nodes */}
      {person.children?.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-5 bg-gray-200"/>
          <div className="flex gap-6 items-start">
            {person.children.map((child, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-0.5 h-5 bg-gray-200"/>
                <OrgNode person={child} depth={depth + 1}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function OrgChartPage() {
  // Hardcoded org tree — in production this would come from an API
  const orgTree = {
    name: 'Vikram Anand',
    role: 'VP Engineering',
    initials: 'VA',
    color: '#E8E4F7',
    tc: '#6247aa',
    children: [
      {
        name: 'Sarah Jenkins',
        role: 'Design Manager',
        initials: 'SJ',
        color: '#E6F1FB',
        tc: '#185FA5',
        children: [
          { name: 'Rahul S.', role: 'Software Engineer', initials: 'RS', color: '#E1F5EE', tc: '#0F6E56', me: true, children: [] },
          { name: 'Aisha Kim', role: 'Frontend Engineer', initials: 'AK', color: '#FBEAF0', tc: '#993556', children: [] },
        ],
      },
      {
        name: 'Priya Mehta',
        role: 'HR Manager',
        initials: 'PM',
        color: '#FDF9E3',
        tc: '#9c7c00',
        children: [],
      },
    ],
  }

  return (
    <div className="page-enter space-y-5">
      <h2 className="text-xl font-extrabold text-[#1a2e25]">Org Chart</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm overflow-auto">
        <div className="flex justify-center">
          <OrgNode person={orgTree}/>
        </div>
      </div>
    </div>
  )
}
