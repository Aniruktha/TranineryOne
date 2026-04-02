import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { initDatabase } from './db.js'
import authRoutes from './routes/auth.js'
import employeeRoutes from './routes/employee.js'
import leaveRoutes from './routes/leaves.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// ── Middleware ──
app.use(cors())
app.use(express.json())

// ── API Routes ──
app.use('/api/auth', authRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/leaves', leaveRoutes)

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── Initialize DB then start server ──
await initDatabase()

app.listen(PORT, () => {
  console.log(`Fluid HR server running on http://localhost:${PORT}`)
})
