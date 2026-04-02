import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../api.js'

const AuthContext = createContext(null)

// ──────────────────────────────────────────────
// AuthProvider — wraps the app and provides auth state
// Checks for existing token on mount, provides login/signup/logout
// ──────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('fluidhr_token'))
  const [loading, setLoading] = useState(true)

  // On mount, if we have a token, try to load the user
  // (We do a simple check — if the token exists, the app will fetch
  // the employee profile via API on the dashboard)
  useEffect(() => {
    if (token) {
      // Token exists, user will be loaded by App.jsx from the API
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    const data = await authAPI.login(email, password)
    localStorage.setItem('fluidhr_token', data.token)
    setToken(data.token)
    setUser(data.employee)
    return data.employee
  }

  const signup = async (signupData) => {
    const data = await authAPI.signup(signupData)
    localStorage.setItem('fluidhr_token', data.token)
    setToken(data.token)
    setUser(data.employee)
    return data.employee
  }

  const logout = () => {
    localStorage.removeItem('fluidhr_token')
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    setUser,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
