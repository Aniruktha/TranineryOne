import { useState } from 'react'
import { Icon } from '../data/seed'

// ──────────────────────────────────────────────
// LeaveModal — Form to apply for a new leave
// Pops up as a modal overlay when user clicks "Apply Leave"
// ──────────────────────────────────────────────
export function LeaveModal({ balance, onClose, onSubmit }) {
  // Form state tracks all the fields the user fills in
  const [form, setForm] = useState({
    type: 'casual',   // casual, sick, or earned
    from: '',         // start date
    to: '',           // end date
    reason: '',       // why they need leave
    half: false,      // is it a half-day?
  })
  const [error, setError] = useState('')

  // Calculate how many days the leave spans
  const calculateDays = () => {
    if (!form.from || !form.to) return 0
    const msPerDay = 86400000
    const rawDays = (new Date(form.to) - new Date(form.from)) / msPerDay + 1
    return form.half ? 0.5 : Math.max(0, rawDays)
  }

  const days = calculateDays()
  const available = balance[form.type]?.total - balance[form.type]?.used

  // Validate and submit the leave request
  const handleSubmit = () => {
    if (!form.from || !form.to || !form.reason.trim()) {
      setError('Please fill all fields.')
      return
    }
    if (new Date(form.to) < new Date(form.from)) {
      setError('End date must be after start date.')
      return
    }
    if (days > available) {
      setError(`Only ${available} ${form.type} leave days remaining.`)
      return
    }
    onSubmit({ ...form, days, status: 'pending', id: Date.now() })
    onClose()
  }

  // Reusable input style
  const inputClass = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none bg-white'

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Header with remaining leave summary */}
        <div className="bg-gradient-to-r from-[#1B5E4F] to-[#2d8a72] rounded-t-3xl px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-white text-lg font-bold">Apply Leave</h2>
            <p className="text-green-200 text-xs mt-0.5">
              Remaining: Casual {balance.casual.total - balance.casual.used}d
              · Sick {balance.sick.total - balance.sick.used}d
              · Earned {balance.earned.total - balance.earned.used}d
            </p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            {Icon.close}
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Leave type selector — casual, sick, or earned */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Leave Type</label>
            <div className="grid grid-cols-3 gap-2">
              {['casual', 'sick', 'earned'].map((type) => (
                <button
                  key={type}
                  onClick={() => setForm((f) => ({ ...f, type }))}
                  className={`py-2 rounded-xl text-sm font-bold border transition-all capitalize ${
                    form.type === type
                      ? 'bg-[#1B5E4F] text-white border-[#1B5E4F]'
                      : 'border-gray-200 text-gray-500 hover:border-[#5BBF9F]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Date range — from and to pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">From</label>
              <input type="date" className={inputClass} value={form.from}
                onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}/>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1.5 block">To</label>
              <input type="date" className={inputClass} value={form.to}
                onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}/>
            </div>
          </div>

          {/* Half day checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="half" checked={form.half}
              onChange={(e) => setForm((f) => ({ ...f, half: e.target.checked }))}
              className="w-4 h-4 accent-[#1B5E4F]"/>
            <label htmlFor="half" className="text-sm text-gray-600">Half day leave</label>
          </div>

          {/* Reason textarea */}
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1.5 block">Reason</label>
            <textarea className={`${inputClass} resize-none`} rows="3"
              placeholder="Briefly describe the reason..."
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}/>
          </div>

          {/* Error message (only shows when validation fails) */}
          {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          {/* Days requested summary */}
          {days > 0 && (
            <div className="bg-[#E6F7F2] rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-[#1B5E4F] font-bold">Days requested</span>
              <span className="text-2xl font-black text-[#1B5E4F]">{days}</span>
            </div>
          )}

          {/* Submit button */}
          <button onClick={handleSubmit}
            className="w-full bg-[#1B5E4F] hover:bg-[#2d8a72] text-white font-bold py-3 rounded-xl text-sm transition-colors">
            Submit Leave Request
          </button>
        </div>
      </div>
    </div>
  )
}
