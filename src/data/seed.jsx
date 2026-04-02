// ──────────────────────────────────────────────
// Seed data — all the demo data shown in the dashboard
// Replace this with real API calls when connecting to a backend
// ──────────────────────────────────────────────

export const SEED = {

  // ── Current logged-in employee profile ──
  employee: {
    name: "Rahul S.",
    fullName: "Rahul Sharma",
    role: "Software Engineer",
    dept: "Engineering",
    email: "rahul.sharma@fluidhr.com",
    phone: "+91 98765 43210",
    joined: "Jan 15, 2023",
    manager: "Sarah Jenkins",
    location: "Bangalore, India",
    avatar: "RS",
    skills: ["React", "Node.js", "Python", "System Design"],
    bio: "Full-stack engineer passionate about building scalable products.",
  },

  // ── Leave balances by type ──
  leaveBalance: {
    casual: { total: 12, used: 3 },
    sick: { total: 10, used: 8 },
    earned: { total: 20, used: 10 },
  },

  // ── Past leave applications ──
  leaveHistory: [
    { id: 1, type: "casual", from: "2026-01-10", to: "2026-01-11", days: 2, reason: "Personal work", status: "approved" },
    { id: 2, type: "sick", from: "2026-02-14", to: "2026-02-20", days: 7, reason: "Fever", status: "approved" },
    { id: 3, type: "sick", from: "2026-03-05", to: "2026-03-05", days: 1, reason: "Not feeling well", status: "approved" },
  ],

  // ── Monthly salary breakdown ──
  payslip: {
    month: "March 2026",
    date: "Apr 1, 2026",
    basic: 2800,        // base salary
    hra: 1120,          // house rent allowance
    transport: 300,     // transport allowance
    medical: 200,       // medical allowance
    special: 430,       // special allowance
    pf: 336,            // provident fund deduction
    tax: 420,           // income tax deduction
    professional_tax: 200,
    trend: [3900, 4100, 3950, 4200, 4650, 4850], // last 6 months net pay
  },

  // ── Attendance records for the current month ──
  attendance: {
    month: "April 2026",
    records: {
      "2026-04-01": "present",
      "2026-04-02": "present",
      "2026-04-03": "present",
    },
  },

  // ── Performance review workflow and goals ──
  performance: {
    steps: [
      { label: "Self Assessment", status: "done", date: "Oct 12, 2025", note: "Completed on Oct 12" },
      { label: "Manager Feedback", status: "active", date: "", note: "In progress by Sarah J." },
      { label: "Final Approval", status: "pending", date: "", note: "Pending HR sign-off" },
    ],
    rating: 4.2,
    goals: [
      { title: "Deliver Q1 platform migration", progress: 90, status: "on-track" },
      { title: "Complete AWS certification", progress: 60, status: "in-progress" },
      { title: "Mentor 2 junior engineers", progress: 100, status: "done" },
    ],
  },

  // ── Upcoming events and deadlines ──
  upcoming: [
    { month: "APR", day: "03", title: "Payroll Processing", sub: "Full Day · Automatic" },
    { month: "APR", day: "07", title: "Manager Review Deadline", sub: "Performance cycle" },
    { month: "APR", day: "10", title: "Monthly Townhall", sub: "3:00 PM · All hands" },
    { month: "APR", day: "14", title: "Public Holiday", sub: "No work day" },
  ],

  // ── Employee directory (all colleagues) ──
  directory: [
    { name: "Sarah Jenkins", role: "Design Manager", dept: "Product", initials: "SJ", color: "#E6F1FB", tc: "#185FA5" },
    { name: "Marcus Chen", role: "Backend Engineer", dept: "Engineering", initials: "MC", color: "#E1F5EE", tc: "#0F6E56" },
    { name: "Elena Rossi", role: "Product Designer", dept: "Product", initials: "ER", color: "#FBEAF0", tc: "#993556" },
    { name: "David Park", role: "Data Analyst", dept: "Analytics", initials: "DP", color: "#FDF9E3", tc: "#9c7c00" },
    { name: "Aisha Kim", role: "Frontend Engineer", dept: "Engineering", initials: "AK", color: "#E8E4F7", tc: "#6247aa" },
    { name: "Leo Valdez", role: "DevOps Engineer", dept: "Infrastructure", initials: "LV", color: "#FAECE7", tc: "#993C1D" },
    { name: "Priya Mehta", role: "HR Manager", dept: "HR", initials: "PM", color: "#E6F7F2", tc: "#2a7d66" },
    { name: "James Wu", role: "QA Engineer", dept: "Engineering", initials: "JW", color: "#FDF9E3", tc: "#9c7c00" },
  ],
}

// ──────────────────────────────────────────────
// SVG Icons — small inline icons used across the app
// Kept as JSX so we can render them directly in components
// ──────────────────────────────────────────────
export const Icon = {
  dashboard: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  team: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4"/><circle cx="17" cy="11" r="3"/><path d="M21 21v-1a3 3 0 00-3-3h-2a3 3 0 00-3 3v1"/></svg>,
  tasks: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  benefits: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  directory: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  settings: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>,
  support: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>,
  bell: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
  chat: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  search: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  close: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  download: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
  fingerprint: <svg width="24" height="24" fill="none" stroke="#1B5E4F" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/></svg>,
  receipt: <svg width="24" height="24" fill="none" stroke="#c2185b" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 14H6m3-4H6m9 4h-3m3-4h-3M3 7a2 2 0 012-2h14a2 2 0 012 2v13l-3-2-2 2-2-2-2 2-2-2-3 2V7z"/></svg>,
  user: <svg width="24" height="24" fill="none" stroke="#6247aa" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  orgchart: <svg width="24" height="24" fill="none" stroke="#9c7c00" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="4" rx="1"/><rect x="3" y="17" width="6" height="4" rx="1"/><rect x="9" y="17" width="6" height="4" rx="1"/><rect x="15" y="17" width="6" height="4" rx="1"/><path d="M12 7v4M12 11H6v6M12 11h6v6"/></svg>,
  edit: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  calendar: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  check: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,
  trend: <svg width="14" height="14" fill="none" stroke="#1D9E75" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>,
}

// ──────────────────────────────────────────────
// Emoji shower effect — drops falling emojis across the screen
// Used when the user selects a mood on the dashboard
// ──────────────────────────────────────────────
export function triggerShower(emoji, message, setMood) {
  // Save the selected mood so the dashboard shows the message
  setMood({ emoji, message })

  // Spawn 28 emoji particles that fall down the screen
  const container = document.body
  for (let i = 0; i < 28; i++) {
    const particle = document.createElement('div')
    particle.className = 'emoji-particle'
    particle.textContent = emoji
    particle.style.left = Math.random() * 100 + 'vw'        // random horizontal position
    particle.style.top = '-40px'                              // start above the viewport
    particle.style.animationDelay = Math.random() * 0.8 + 's' // stagger the start
    particle.style.fontSize = 20 + Math.random() * 18 + 'px' // random size for variety
    container.appendChild(particle)

    // Clean up after animation finishes
    setTimeout(() => particle.remove(), 3200)
  }
}
