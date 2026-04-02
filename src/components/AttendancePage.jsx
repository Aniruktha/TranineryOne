// ──────────────────────────────────────────────
// AttendancePage — Calendar view showing present/absent/leave days
// Displays the current month as a grid with color-coded days
// ──────────────────────────────────────────────
export function AttendancePage({ attendance }) {
  // Weekday headers
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  // Build an array of all 30 days in April with their status
  const daysInApril = Array.from({ length: 30 }, (_, index) => {
    const dateStr = `2026-04-${String(index + 1).padStart(2, '0')}`
    // If we have a record, use it; otherwise mark as "upcoming" or "absent"
    const status = attendance.records[dateStr] || (index >= new Date().getDate() ? 'upcoming' : 'absent')
    return { day: index + 1, date: dateStr, status }
  })

  // Count how many days are present, absent, or leave
  const presentCount = daysInApril.filter((d) => d.status === 'present').length
  const absentCount = daysInApril.filter((d) => d.status === 'absent').length
  const leaveCount = daysInApril.filter((d) => d.status === 'leave').length

  // Color mapping for each status type
  const statusColors = {
    present: 'bg-[#1B5E4F] text-white',
    absent: 'bg-red-100 text-red-400',
    leave: 'bg-amber-100 text-amber-600',
    upcoming: 'bg-gray-100 text-gray-300',
  }

  return (
    <div className="page-enter space-y-5">
      <h2 className="text-xl font-extrabold text-[#1a2e25]">Attendance</h2>

      {/* Summary cards — present, absent, leave counts */}
      <div className="grid grid-cols-3 gap-4">
        {[
          ['Present', 'bg-[#E6F7F2] text-[#1B5E4F]', presentCount],
          ['Absent', 'bg-red-50 text-red-500', absentCount],
          ['Leave Days', 'bg-amber-50 text-amber-600', leaveCount],
        ].map(([label, cardClass, count]) => (
          <div key={label} className={`rounded-2xl p-4 ${cardClass}`}>
            <p className="text-xs font-bold opacity-70">{label}</p>
            <p className="text-3xl font-black mt-1">{count}</p>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-extrabold text-[#1a2e25] mb-4">April 2026</h3>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-xs text-gray-400 font-bold">{day}</div>
          ))}
        </div>

        {/* Day cells — 1 empty cell for offset (April 2026 starts on Wednesday) */}
        <div className="grid grid-cols-7 gap-1.5">
          {/* Offset so the 1st lands on Wednesday */}
          {[null].map((_, i) => <div key={i}/>)}
          {daysInApril.map(({ day, status }) => (
            <div key={day}
              className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold ${
                statusColors[status] || 'bg-gray-100 text-gray-400'
              }`}>
              {day}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 flex-wrap">
          {[
            ['bg-[#1B5E4F]', 'Present'],
            ['bg-red-200', 'Absent'],
            ['bg-amber-200', 'Leave'],
            ['bg-gray-200', 'Upcoming'],
          ].map(([bg, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${bg}`}/>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
