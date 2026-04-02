// ──────────────────────────────────────────────
// API utility — all backend calls go through here
// Automatically attaches the JWT token from localStorage
// ──────────────────────────────────────────────

const API_BASE = '/api'

// Helper to get the stored auth token
function getToken() {
  return localStorage.getItem('fluidhr_token')
}

// Generic fetch wrapper that handles JSON + auth headers
async function request(endpoint, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong')
  }

  return data
}

// ── Auth API ──
export const authAPI = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (data) =>
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

// ── Employee API ──
export const employeeAPI = {
  get: () => request('/employee'),

  update: (data) =>
    request('/employee', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
}

// ── Leaves API ──
export const leavesAPI = {
  getBalance: () => request('/leaves/balance'),

  getHistory: () => request('/leaves/history'),

  apply: (data) =>
    request('/leaves/apply', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}
