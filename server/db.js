import initSqlJs from 'sql.js'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DB_PATH = join(__dirname, '..', 'fluidhr.db')

let db = null

// ── Initialize the SQLite database ──
export async function initDatabase() {
  const SQL = await initSqlJs()

  // Load existing database file or create a new one
  if (existsSync(DB_PATH)) {
    const buffer = readFileSync(DB_PATH)
    db = new SQL.Database(buffer)
  } else {
    db = new SQL.Database()
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      fullName TEXT NOT NULL,
      role TEXT DEFAULT 'Software Engineer',
      dept TEXT DEFAULT 'Engineering',
      phone TEXT DEFAULT '',
      joined TEXT DEFAULT '',
      manager TEXT DEFAULT '',
      location TEXT DEFAULT '',
      avatar TEXT DEFAULT '',
      skills TEXT DEFAULT '[]',
      bio TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS leave_balances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER NOT NULL,
      leave_type TEXT NOT NULL,
      total INTEGER NOT NULL DEFAULT 0,
      used INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
      UNIQUE(employee_id, leave_type)
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS leave_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER NOT NULL,
      leave_type TEXT NOT NULL,
      from_date TEXT NOT NULL,
      to_date TEXT NOT NULL,
      days REAL NOT NULL,
      reason TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
    )
  `)

  // Save to disk
  saveDatabase()

  console.log('Database initialized')
  return db
}

// ── Save the database to disk ──
export function saveDatabase() {
  if (db) {
    const data = db.export()
    const buffer = Buffer.from(data)
    writeFileSync(DB_PATH, buffer)
  }
}

// ── Get the database instance ──
export function getDb() {
  return db
}

// ── Helper: run a query and return all rows as objects ──
export function queryAll(sql, params = []) {
  const stmt = db.prepare(sql)
  stmt.bind(params)
  const results = []
  while (stmt.step()) {
    results.push(stmt.getAsObject())
  }
  stmt.free()
  return results
}

// ── Helper: run a query and return a single row ──
export function queryOne(sql, params = []) {
  const stmt = db.prepare(sql)
  stmt.bind(params)
  let result = null
  if (stmt.step()) {
    result = stmt.getAsObject()
  }
  stmt.free()
  return result
}

// ── Helper: run an insert/update/delete and return info ──
export function run(sql, params = []) {
  db.run(sql, params)
  // Get last insert rowid before saving
  const result = queryOne('SELECT last_insert_rowid() as id')
  saveDatabase()
  return { lastInsertRowid: result ? result.id : null }
}
