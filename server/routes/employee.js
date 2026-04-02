import express from 'express'
import { queryOne, run } from '../db.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// ── GET /api/employee — Get current employee's profile ──
router.get('/', authenticate, (req, res) => {
  try {
    const employee = queryOne(
      'SELECT id, email, name, fullName, role, dept, phone, joined, manager, location, avatar, skills, bio FROM employees WHERE id = ?',
      [req.userId]
    )

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    res.json({
      ...employee,
      skills: JSON.parse(employee.skills || '[]'),
    })
  } catch (err) {
    console.error('Get employee error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ── PUT /api/employee — Update current employee's profile ──
router.put('/', authenticate, (req, res) => {
  try {
    const { fullName, phone, manager, location, skills, bio } = req.body

    run(
      'UPDATE employees SET fullName = ?, phone = ?, manager = ?, location = ?, skills = ?, bio = ? WHERE id = ?',
      [fullName, phone || '', manager || '', location || '', JSON.stringify(skills || []), bio || '', req.userId]
    )

    const updated = queryOne(
      'SELECT id, email, name, fullName, role, dept, phone, joined, manager, location, avatar, skills, bio FROM employees WHERE id = ?',
      [req.userId]
    )

    res.json({
      ...updated,
      skills: JSON.parse(updated.skills || '[]'),
    })
  } catch (err) {
    console.error('Update employee error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
