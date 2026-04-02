import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

// ──────────────────────────────────────────────
// LoginPage — Authenticates existing employees
// Matches the Fluid HR green theme with Nunito font
// ──────────────────────────────────────────────
export function LoginPage({ onSwitchToSignup }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      // App.jsx will detect the token and show the dashboard
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FAF6] px-4" style={{ fontFamily: "'Nunito',sans-serif" }}>
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1B5E4F] rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">
            F
          </div>
          <h1 className="text-2xl font-black text-[#1a2e25]">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to your Fluid HR account</p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none bg-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-[#1B5E4F] font-bold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
