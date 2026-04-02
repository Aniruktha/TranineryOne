import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fluid-hr-secret-key-change-in-production'

// ── Auth middleware — verifies JWT token from Authorization header ──
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// ── Helper to generate a JWT token for a user ──
export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}
