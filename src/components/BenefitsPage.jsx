// ──────────────────────────────────────────────
// BenefitsPage — Shows all employee benefits as cards
// Each card has an emoji icon, title, description, and status badge
// ──────────────────────────────────────────────
export function BenefitsPage() {
  const benefits = [
    { title: 'Health Insurance', sub: 'Family floater · ₹5,00,000 cover', icon: '🏥', color: '#E6F7F2', textColor: '#0F6E56', status: 'Active' },
    { title: 'Provident Fund', sub: '₹ 336/month contribution', icon: '💰', color: '#E8E4F7', textColor: '#6247aa', status: 'Active' },
    { title: 'Gratuity', sub: 'Eligible after 5 years of service', icon: '🎯', color: '#FDF9E3', textColor: '#9c7c00', status: 'Eligible in 2 yrs' },
    { title: 'Life Insurance', sub: 'Coverage: ₹25,00,000', icon: '🛡️', color: '#FBEAF0', textColor: '#993556', status: 'Active' },
    { title: 'Meal Allowance', sub: '₹ 2,200/month · Auto-credited', icon: '🍱', color: '#E6F1FB', textColor: '#185FA5', status: 'Active' },
    { title: 'Learning Budget', sub: '₹ 25,000/year · 40% used', icon: '📚', color: '#FAECE7', textColor: '#993C1D', status: '₹15,000 left' },
  ]

  return (
    <div className="page-enter space-y-4">
      <h2 className="text-xl font-extrabold text-[#1a2e25]">Benefits</h2>

      {/* Benefit cards in a 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-sm hover-lift">
            <div className="flex items-start gap-3">
              {/* Colored icon square */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: benefit.color }}
              >
                {benefit.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-gray-700">{benefit.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{benefit.sub}</p>
                {/* Status badge */}
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold mt-1.5 inline-block"
                  style={{ background: benefit.color, color: benefit.textColor }}
                >
                  {benefit.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
