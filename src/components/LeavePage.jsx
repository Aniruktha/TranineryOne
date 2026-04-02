// ──────────────────────────────────────────────
// LeavePage — Shows leave balances and full leave history
// Balances are color-coded by type (casual/sick/earned)
// ──────────────────────────────────────────────
export function LeavePage({ history, balance }) {
  // Color mapping for leave request status badges
  const statusColors = {
    approved: 'bg-green-100 text-green-600',
    pending: 'bg-amber-100 text-amber-600',
    rejected: 'bg-red-100 text-red-500',
  }

  // Leave type configs: [label, background, text color, balance data]
  const leaveTypes = [
    ['Casual', '#E6F7F2', '#1B5E4F', balance.casual],
    ['Sick', '#FBEAF0', '#993556', balance.sick],
    ['Earned', '#E8E4F7', '#6247aa', balance.earned],
  ]

  return (
    <div className="page-enter space-y-5">
      <h2 className="text-xl font-extrabold text-[#1a2e25]">My Leaves</h2>

      {/* Balance cards — one per leave type */}
      <div className="grid grid-cols-3 gap-3">
        {leaveTypes.map(([label, bg, textColor, bal]) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: bg }}>
            <p className="text-xs font-bold opacity-60" style={{ color: textColor }}>{label}</p>
            <p className="text-2xl font-black mt-1" style={{ color: textColor }}>
              {bal.total - bal.used}
            </p>
            <p className="text-xs opacity-50 mt-0.5" style={{ color: textColor }}>
              {bal.used} used of {bal.total}
            </p>
          </div>
        ))}
      </div>

      {/* Leave history table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-extrabold text-gray-700">Leave History</h3>
        </div>

        {history.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">No leave records yet.</p>
        )}

        {history.map((leave, index) => (
          <div key={index}
            className="px-5 py-4 border-b border-gray-50 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700 capitalize">{leave.type} Leave</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold capitalize ${statusColors[leave.status]}`}>
                  {leave.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {leave.from} → {leave.to} · {leave.days} day{leave.days > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-gray-400">{leave.reason}</p>
            </div>
            <span className="text-sm font-extrabold text-gray-600">{leave.days}d</span>
          </div>
        ))}
      </div>
    </div>
  )
}
