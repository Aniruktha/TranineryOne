import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import { employeeAPI, leavesAPI } from './api.js'
import { SEED, Icon } from './data/seed'

// Auth pages
import { LoginPage } from './components/LoginPage'
import { SignupPage } from './components/SignupPage'

// Page components
import { Dashboard } from './components/Dashboard'
import { AttendancePage } from './components/AttendancePage'
import { ProfilePage } from './components/ProfilePage'
import { OrgChartPage } from './components/OrgChartPage'
import { BenefitsPage } from './components/BenefitsPage'
import { UnderDevelopment } from './components/UnderDevelopment'

// Modal components
import { LeaveModal } from './components/LeaveModal'
import { PayslipModal } from './components/PayslipModal'

// ──────────────────────────────────────────────
// App — Root component
// Shows Login/Signup if not authenticated,
// otherwise shows the full dashboard
// ──────────────────────────────────────────────
export default function App() {
  const { isAuthenticated, user, setUser, logout, loading } = useAuth()

  // Auth screen toggle (login vs signup)
  const [authScreen, setAuthScreen] = useState('login')

  // Which page is currently active
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Employee data fetched from API
  const [employee, setEmployee] = useState(null)
  const [leaveBalance, setLeaveBalance] = useState(null)
  const [leaveHistory, setLeaveHistory] = useState([])

  // Loading state for initial data fetch
  const [dataLoading, setDataLoading] = useState(true)

  // Modal visibility toggles
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [showPayslipModal, setShowPayslipModal] = useState(false)

  // ── Fetch all employee data from the API ──
  const fetchAllData = async () => {
    try {
      const [empData, balanceData, historyData] = await Promise.all([
        employeeAPI.get(),
        leavesAPI.getBalance(),
        leavesAPI.getHistory(),
      ])
      setEmployee(empData)
      setUser(empData)
      setLeaveBalance(balanceData)
      setLeaveHistory(historyData)
    } catch (err) {
      console.error('Failed to fetch data:', err)
      // If any API call fails, log the user out so they see the login screen
      // instead of a blank screen (stale token, deleted account, etc.)
      logout()
    } finally {
      setDataLoading(false)
    }
  }

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData()
    }
  }, [isAuthenticated])

  // Expose setCurrentPage globally for Dashboard quick-access buttons
  useEffect(() => {
    window._setPage = setCurrentPage
  }, [])

  // ── Handle new leave application ──
  const handleLeaveSubmit = async (leave) => {
    try {
      const newLeave = await leavesAPI.apply({
        type: leave.type,
        from: leave.from,
        to: leave.to,
        days: leave.days,
        reason: leave.reason,
        half: leave.half,
      })
      // Add to history and refresh balance
      setLeaveHistory((prev) => [newLeave, ...prev])
      const updatedBalance = await leavesAPI.getBalance()
      setLeaveBalance(updatedBalance)
    } catch (err) {
      console.error('Failed to submit leave:', err)
      alert(err.message)
    }
  }

  // ── Handle profile save ──
  const handleProfileSave = async (updated) => {
    try {
      const saved = await employeeAPI.update(updated)
      setEmployee(saved)
      setUser(saved)
    } catch (err) {
      console.error('Failed to update profile:', err)
      alert(err.message)
    }
  }

  // ── Handle logout ──
  const handleLogout = () => {
    logout()
    setEmployee(null)
    setLeaveBalance(null)
    setLeaveHistory([])
    setCurrentPage('dashboard')
  }

  // ── Show loading spinner while checking auth / fetching data ──
  if (loading || (isAuthenticated && dataLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0FAF6]" style={{ fontFamily: "'Nunito',sans-serif" }}>
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-[#1B5E4F] rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto">
            F
          </div>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // ── Not authenticated: show login or signup ──
  if (!isAuthenticated) {
    if (authScreen === 'signup') {
      return <SignupPage onSwitchToLogin={() => setAuthScreen('login')} />
    }
    return <LoginPage onSwitchToSignup={() => setAuthScreen('signup')} />
  }

  // ── Authenticated: show the dashboard ──
  if (!employee || !leaveBalance) return null

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icon.dashboard },
    { id: 'leaves', label: 'Team Feed', icon: Icon.team },
    { id: 'tasks', label: 'Tasks', icon: Icon.tasks },
    { id: 'benefits', label: 'Benefits', icon: Icon.benefits },
    { id: 'directory', label: 'Directory', icon: Icon.directory },
  ]

  // Render the correct page based on currentPage state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            employee={employee}
            balance={leaveBalance}
            history={leaveHistory}
            payslip={SEED.payslip}
            performance={SEED.performance}
            upcoming={SEED.upcoming}
            onApplyLeave={() => setShowLeaveModal(true)}
            onViewPayslip={() => setShowPayslipModal(true)}
          />
        )
      case 'attendance':
        return <AttendancePage attendance={SEED.attendance}/>
      case 'taxclaims':
        return <BenefitsPage/>
      case 'profile':
        return <ProfilePage employee={employee} onSave={handleProfileSave}/>
      case 'orgchart':
        return <OrgChartPage/>
      case 'leaves':
      case 'tasks':
      case 'benefits':
      case 'directory':
        return <UnderDevelopment pageName={currentPage}/>
      default:
        return <UnderDevelopment pageName={currentPage}/>
    }
  }

  return (
    <div className="flex h-screen bg-[#F0FAF6] overflow-hidden" style={{ fontFamily: "'Nunito',sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside className="w-48 bg-white flex flex-col shadow-sm flex-shrink-0">
        {/* Logo and workspace name */}
        <div className="px-4 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1B5E4F] rounded-lg flex items-center justify-center text-white text-xs font-black">
              F
            </div>
            <div>
              <p className="text-sm font-black text-[#1B5E4F]">Fluid</p>
              <p className="text-[10px] text-gray-400 -mt-0.5">ACTIVE WORKSPACE</p>
            </div>
          </div>
        </div>

        {/* Main navigation links */}
        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {navItems.map((item) => (
            <button key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                currentPage === item.id ? 'nav-active' : 'nav-inactive'
              }`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom section: settings, support, logout */}
        <div className="px-3 py-3 space-y-1 border-t border-gray-100">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold nav-inactive">
            {Icon.settings} Settings
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold nav-inactive">
            {Icon.support} Support
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-500 font-bold py-2.5 rounded-xl text-sm transition-colors mt-2"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top header bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-6">
            {/* Search bar */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">{Icon.search}</span>
              <input className="bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm w-52 focus:outline-none focus:border-[#5BBF9F]"
                placeholder="Search resources..."/>
            </div>
            {/* Tab buttons */}
            <div className="flex gap-4">
              {['Announcements', 'Calendar'].map((tab) => (
                <button key={tab}
                  className={`text-sm font-bold pb-0.5 ${
                    tab === 'Announcements'
                      ? 'text-[#1B5E4F] border-b-2 border-[#1B5E4F]'
                      : 'text-gray-400'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Right side: notifications, chat, user avatar */}
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#1B5E4F] hover:bg-[#E6F7F2] rounded-xl transition-colors">
              {Icon.bell}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF8FA3] rounded-full pulse"/>
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#1B5E4F] hover:bg-[#E6F7F2] rounded-xl transition-colors">
              {Icon.chat}
            </button>
            <button onClick={() => setCurrentPage('profile')}
              className="flex items-center gap-2 hover:bg-[#E6F7F2] px-2 py-1 rounded-xl transition-colors">
              <div className="w-8 h-8 bg-[#1B5E4F] rounded-full flex items-center justify-center text-white text-xs font-black">
                {employee.avatar}
              </div>
              <span className="text-sm font-bold text-gray-600">{employee.name}</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderCurrentPage()}
        </main>
      </div>

      {/* ── Modal overlays ── */}
      {showLeaveModal && (
        <LeaveModal
          balance={leaveBalance}
          onClose={() => setShowLeaveModal(false)}
          onSubmit={handleLeaveSubmit}
        />
      )}
      {showPayslipModal && (
        <PayslipModal
          data={SEED.payslip}
          employee={employee}
          onClose={() => setShowPayslipModal(false)}
        />
      )}
    </div>
  )
}
