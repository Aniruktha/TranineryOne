import express from 'express'
import bcrypt from 'bcryptjs'
import { queryOne, run } from '../db.js'
import { generateToken } from '../middleware/auth.js'

const router = express.Router()

// ── POST /api/auth/signup — Register a new employee ──
router.post('/signup', (req, res) => {
  try {
    const { email, password, name, fullName, role, dept } = req.body

    if (!email || !password || !name || !fullName) {
      return res.status(400).json({ error: 'Email, password, name, and full name are required' })
    }

    // Check if email already exists
    const existing = queryOne('SELECT id FROM employees WHERE email = ?', [email])
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    // Hash the password before storing
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Generate avatar initials from name
    const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

    // Insert the new employee
    const result = run(
      'INSERT INTO employees (email, password, name, fullName, role, dept, avatar, joined) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, name, fullName, role || 'Software Engineer', dept || 'Engineering', avatar, new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })]
    )

    const employeeId = result.lastInsertRowid

    // Set up default leave balances
    run('INSERT INTO leave_balances (employee_id, leave_type, total, used) VALUES (?, ?, ?, 0)', [employeeId, 'casual', 12])
    run('INSERT INTO leave_balances (employee_id, leave_type, total, used) VALUES (?, ?, ?, 0)', [employeeId, 'sick', 10])
    run('INSERT INTO leave_balances (employee_id, leave_type, total, used) VALUES (?, ?, ?, 0)', [employeeId, 'earned', 20])

    const token = generateToken(employeeId)

    res.status(201).json({
      token,
      employee: {
        id: employeeId,
        email,
        name,
        fullName,
        role: role || 'Software Engineer',
        dept: dept || 'Engineering',
        avatar,
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ── POST /api/auth/login — Authenticate an existing employee ──
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const employee = queryOne('SELECT * FROM employees WHERE email = ?', [email])
    if (!employee) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const validPassword = bcrypt.compareSync(password, employee.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = generateToken(employee.id)

    res.json({
      token,
      employee: {
        id: employee.id,
        email: employee.email,
        name: employee.name,
        fullName: employee.fullName,
        role: employee.role,
        dept: employee.dept,
        phone: employee.phone,
        manager: employee.manager,
        location: employee.location,
        avatar: employee.avatar,
        skills: JSON.parse(employee.skills || '[]'),
        bio: employee.bio,
        joined: employee.joined,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
