import { Ring } from './Ring'
import { Icon, triggerShower } from '../data/seed'
import { useLocalStorage } from '../hooks/useLocalStorage'

// ──────────────────────────────────────────────
// Dashboard — Main landing page after login
// Shows greeting, leave rings, salary chart, mood widget,
// performance review, goals, and upcoming events
// ──────────────────────────────────────────────
export function Dashboard({
  employee,
  balance,
  history,
  payslip,
  performance,
  upcoming,
  onApplyLeave,
  onViewPayslip,
}) {
  // Mood state persists in localStorage
  const [mood, setMood] = useLocalStorage('fluidhr_mood', null)

  // Available mood options
  const moodOptions = [
    { emoji: '😄', label: 'Thriving', msg: 'Amazing! Keep that energy going 🚀' },
    { emoji: '🙂', label: 'Good', msg: "Glad you're doing well today!" },
    { emoji: '😐', label: 'Okay', msg: 'Take it one step at a time 💪' },
    { emoji: '😓', label: 'Tired', msg: 'Rest up — you\'ve got this ❤️' },
  ]

  // Calculate salary figures
  const grossPay = payslip.basic + payslip.hra + payslip.transport + payslip.medical + payslip.special
  const netPay = grossPay - payslip.pf - payslip.tax - payslip.professional_tax
  const maxBarValue = Math.max(...payslip.trend)

  // Total remaining leaves across all types
  const totalLeavesLeft =
    (balance?.casual?.total || 12) + (balance?.sick?.total || 10) + (balance?.earned?.total || 20)
    - (balance?.casual?.used || 0) - (balance?.sick?.used || 0) - (balance?.earned?.used || 0)

  return (
    <div className="page-enter space-y-5">

      {/* ── Hero banner with greeting and action buttons ── */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1B5E4F] via-[#1d6b5a] to-[#2d8a72] p-6 flex justify-between items-center flex-wrap gap-4 relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4"/>
        <div className="absolute right-16 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3"/>

        {/* Greeting and status line */}
        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-black border-2 border-white/30">
            {employee?.avatar || 'HR'}
          </div>
          <div>
            <h1 className="text-white text-2xl font-black">
              Hey {employee?.name ? employee.name.split(' ')[0] : 'There'} 👋
            </h1>
            <p className="text-green-200 text-sm mt-1">
              {totalLeavesLeft} leaves left
              <span className="mx-2 opacity-40">·</span>
              Payday in 3 days
              <span className="mx-2 opacity-40">·</span>
              1 review pending
            </p>
          </div>
        </div>

        {/* Primary actions */}
        <div className="flex gap-3 z-10">
          <button onClick={onApplyLeave}
            className="bg-white text-[#1B5E4F] font-extrabold px-5 py-2.5 rounded-2xl text-sm hover:shadow-lg transition-all">
            Apply Leave
          </button>
          <button onClick={onViewPayslip}
            className="bg-white/15 border border-white/30 text-white font-bold px-5 py-2.5 rounded-2xl text-sm hover:bg-white/25 transition-all">
            View Payslip
          </button>
        </div>
      </div>

      {/* ── Main content grid (2/3 + 1/3 layout) ── */}
      <div className="grid grid-cols-3 gap-5">

        {/* LEFT + MIDDLE columns (wider) */}
        <div className="col-span-2 space-y-5">

          {/* Quick Access — shortcut buttons to other pages */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-extrabold text-gray-700">Quick Access</h3>
              <div className="w-2 h-2 rounded-full bg-[#FF8FA3] pulse"/>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Icon.fingerprint, label: 'Attendance', bg: '#E6F7F2', page: 'attendance' },
                { icon: Icon.receipt, label: 'Tax Claims', bg: '#FBEAF0', page: 'taxclaims' },
                { icon: Icon.user, label: 'Profile', bg: '#E8E4F7', page: 'profile' },
                { icon: Icon.orgchart, label: 'Org Chart', bg: '#FDF9E3', page: 'orgchart' },
              ].map(({ icon, label, bg, page }) => (
                <button key={label}
                  onClick={() => window._setPage(page)}
                  className="rounded-2xl p-4 flex flex-col items-center gap-2 hover-lift cursor-pointer border-0"
                  style={{ background: bg }}>
                  {icon}
                  <span className="text-xs font-bold text-gray-600">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leave Insights — circular progress rings */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-gray-700">Leave Insights</h3>
              <button onClick={() => window._setPage('leaves')}
                className="text-xs text-[#5BBF9F] font-bold hover:underline">
                View All
              </button>
            </div>
            <div className="flex justify-around">
              <Ring
                pct={Math.round((1 - (balance?.casual?.used || 0) / (balance?.casual?.total || 12)) * 100)}
                color="#1D9E75" label="Casual"
                sub={`${(balance?.casual?.total || 12) - (balance?.casual?.used || 0)} Days Left`}/>
              <Ring
                pct={Math.round((1 - (balance?.sick?.used || 0) / (balance?.sick?.total || 10)) * 100)}
                color="#E24B4A" label="Sick"
                sub={`${(balance?.sick?.total || 10) - (balance?.sick?.used || 0)} Days Left`}/>
              <Ring
                pct={Math.round((1 - (balance?.earned?.used || 0) / (balance?.earned?.total || 20)) * 100)}
                color="#534AB7" label="Earned" sub="Unlimited*"/>
            </div>
            <div className="mt-4 bg-[#F0FAF6] rounded-xl px-4 py-2.5 text-xs text-[#1B5E4F] font-semibold">
              💡 You've used {balance?.casual?.used || 0} of {balance?.casual?.total || 12} casual leaves · Sick leave resets in 28 days
            </div>
          </div>

          {/* Last Payout — salary summary with mini bar chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-gray-700">Last Payout</h3>
              <button onClick={onViewPayslip}
                className="flex items-center gap-1 text-xs text-[#5BBF9F] font-bold">
                {Icon.download} Payslip
              </button>
            </div>
            <p className="text-3xl font-black text-[#1a2e25]">
              &#8377; {netPay.toLocaleString()}
              <span className="text-base font-medium text-gray-400">.00</span>
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              {Icon.trend}
              <span className="text-xs text-[#1D9E75] font-bold">4% from last month</span>
            </div>
            {/* Mini bar chart showing 6-month trend */}
            <div className="flex items-end gap-1.5 mt-4 h-14">
              {payslip.trend.map((value, index) => (
                <div key={index}
                  className={`flex-1 rounded-t-md transition-all ${
                    index === payslip.trend.length - 1 ? 'bg-[#1B5E4F]' : 'bg-[#E6F7F2]'
                  }`}
                  style={{ height: `${(value / maxBarValue) * 100}%` }}/>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((month) => (
                <span key={month} className="text-[10px] text-gray-300 flex-1 text-center">{month}</span>
              ))}
            </div>
          </div>

          {/* Mood Widget — daily wellbeing check-in */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-extrabold text-gray-700 mb-1">How are you feeling today?</h3>
            <p className="text-xs text-gray-400 mb-4">Your check-in is private and helps us improve team wellbeing</p>
            <div className="grid grid-cols-4 gap-2">
              {moodOptions.map((option) => (
                <button key={option.emoji}
                  onClick={() => triggerShower(option.emoji, option.msg, setMood)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                    mood?.emoji === option.emoji
                      ? 'border-[#1B5E4F] bg-[#E6F7F2]'
                      : 'border-gray-100 bg-gray-50'
                  }`}>
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-xs font-bold text-gray-500">{option.label}</span>
                </button>
              ))}
            </div>
            {mood && (
              <div className="mt-3 bg-[#E6F7F2] rounded-xl px-4 py-2.5 text-sm text-[#1B5E4F] font-semibold text-center">
                {mood.message}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT column (narrower) */}
        <div className="space-y-5">

          {/* Performance Review — step tracker */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-extrabold text-gray-700 mb-4">Performance Review</h3>
            <div className="space-y-4">
              {performance.steps.map((step, index) => (
                <div key={index} className="flex gap-3 items-start">
                  {/* Step indicator: checkmark, dot, or circle */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-extrabold ${
                    step.status === 'done'
                      ? 'bg-[#1B5E4F] text-white'
                      : step.status === 'active'
                      ? 'bg-white border-2 border-[#1B5E4F] text-[#1B5E4F]'
                      : 'bg-gray-100 text-gray-300 border border-gray-200'
                  }`}>
                    {step.status === 'done' ? '\u2713' : step.status === 'active' ? '\u25CF' : '\u25CB'}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${step.status === 'pending' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {step.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${step.status === 'pending' ? 'text-gray-200' : 'text-gray-400'}`}>
                      {step.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals — progress bars */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-extrabold text-gray-700 mb-3">My Goals</h3>
            <div className="space-y-3">
              {performance.goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <p className="text-xs font-bold text-gray-600 leading-tight">{goal.title}</p>
                    <span className="text-xs font-extrabold text-gray-500 ml-2">{goal.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${goal.progress}%`,
                        background: goal.progress === 100 ? '#1D9E75' : goal.status === 'on-track' ? '#5BBF9F' : '#BA7517',
                      }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming — list of upcoming events */}
          <div className="bg-[#FFFEF5] rounded-2xl p-5 shadow-sm border border-yellow-100">
            <h3 className="font-extrabold text-gray-700 mb-3">Upcoming</h3>
            <div className="space-y-3">
              {upcoming.map((event, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="bg-[#1B5E4F]/10 rounded-xl px-2 py-1 text-center min-w-[40px]">
                    <p className="text-[9px] font-extrabold text-[#1B5E4F] uppercase">{event.month}</p>
                    <p className="text-base font-black text-[#1B5E4F] leading-none">{event.day}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">{event.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
