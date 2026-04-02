import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

// ──────────────────────────────────────────────
// SignupPage — Registers new employees
// Matches the Fluid HR green theme with Nunito font
// ──────────────────────────────────────────────
export function SignupPage({ onSwitchToLogin }) {
  const { signup } = useAuth()
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    fullName: '',
    role: '',
    dept: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password.trim() || !form.name.trim() || !form.fullName.trim()) {
      setError('Email, password, name, and full name are required.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      await signup({
        email: form.email,
        password: form.password,
        name: form.name,
        fullName: form.fullName,
        role: form.role || 'Software Engineer',
        dept: form.dept || 'Engineering',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FAF6] px-4 py-12" style={{ fontFamily: "'Nunito',sans-serif" }}>
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1B5E4F] rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">
            F
          </div>
          <h1 className="text-2xl font-black text-[#1a2e25]">Create your account</h1>
          <p className="text-sm text-gray-400 mt-1">Join Fluid HR and manage your work life</p>
        </div>

        {/* Signup card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields in a row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Short Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  placeholder="Rahul S."
                  value={form.name}
                  onChange={handleChange('name')}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  placeholder="Rahul Sharma"
                  value={form.fullName}
                  onChange={handleChange('fullName')}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange('email')}
              />
            </div>

            {/* Role and department */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Role
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  placeholder="Software Engineer"
                  value={form.role}
                  onChange={handleChange('role')}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Department
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  placeholder="Engineering"
                  value={form.dept}
                  onChange={handleChange('dept')}
                />
              </div>
            </div>

            {/* Password fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={handleChange('password')}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B5E4F] hover:bg-[#2d8a72] text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-[#1B5E4F] font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
