import express from 'express'
import { queryAll, queryOne, run } from '../db.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// ── GET /api/leaves/balance — Get leave balances for current employee ──
router.get('/balance', authenticate, (req, res) => {
  try {
    const rows = queryAll(
      'SELECT leave_type, total, used FROM leave_balances WHERE employee_id = ?',
      [req.userId]
    )

    const balance = {
      casual: { total: 12, used: 0 },
      sick: { total: 10, used: 0 },
      earned: { total: 20, used: 0 }
    }
    for (const row of rows) {
      if (balance[row.leave_type]) {
        balance[row.leave_type] = { total: row.total, used: row.used }
      }
    }

    res.json(balance)
  } catch (err) {
    console.error('Get balance error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ── GET /api/leaves/history — Get leave applications for current employee ──
router.get('/history', authenticate, (req, res) => {
  try {
    const history = queryAll(
      'SELECT id, leave_type as type, from_date as "from", to_date as "to", days, reason, status FROM leave_history WHERE employee_id = ? ORDER BY created_at DESC',
      [req.userId]
    )

    res.json(history)
  } catch (err) {
    console.error('Get history error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ── POST /api/leaves/apply — Submit a new leave application ──
router.post('/apply', authenticate, (req, res) => {
  try {
    const { type, from, to, days, reason, half } = req.body

    if (!type || !from || !to || !reason) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check remaining balance
    const balance = queryOne(
      'SELECT total, used FROM leave_balances WHERE employee_id = ? AND leave_type = ?',
      [req.userId, type]
    )

    if (!balance) {
      return res.status(400).json({ error: 'Invalid leave type' })
    }

    const remaining = balance.total - balance.used
    if (days > remaining) {
      return res.status(400).json({ error: `Only ${remaining} ${type} leave days remaining` })
    }

    // Insert the leave application
    const result = run(
      'INSERT INTO leave_history (employee_id, leave_type, from_date, to_date, days, reason, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.userId, type, from, to, days, reason, 'pending']
    )

    // Update the leave balance
    run(
      'UPDATE leave_balances SET used = used + ? WHERE employee_id = ? AND leave_type = ?',
      [days, req.userId, type]
    )

    // Return the new leave record
    const newLeave = queryOne(
      'SELECT id, leave_type as type, from_date as "from", to_date as "to", days, reason, status FROM leave_history WHERE id = ?',
      [result.lastInsertRowid]
    )

    res.status(201).json(newLeave)
  } catch (err) {
    console.error('Apply leave error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
