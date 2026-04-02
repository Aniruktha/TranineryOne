# Fluid — Employee Dashboard

This project is my implementation of the **Employee Persona** from the HRIS Dashboard.

## Design Approach & Retrospective
My idea was simple — don’t overwhelm the user. When an employee logs in, they shouldn’t have to “figure things out.” So I focused on showing only what actually matters: leave balance, payslips, and quick actions.

That thinking directly shaped how I built the frontend. Instead of one heavy layout, I broke things into small, predictable components like `Ring.jsx` and `LeaveModal.jsx` to keep everything clear and maintainable.

“Apply Leave” is the most common action, so I made it a one-click CTA right in the hero section — no digging around.

If I had more time, I’d move from SQLite to PostgreSQL, add stronger state management for complex flows, and include proper end-to-end testing.

## Overview
The dashboard is meant to feel like a starting point, not a control panel.

As soon as the employee logs in, they can:
- See their leave balance instantly
- Apply for leave in one click
- Check recent payslips and trends
- Navigate quickly to key actions
- Do a quick mood check-in (small fun element)

## Tech Stack & Why
- **React + Vite**  
  Fast rendering and clean component structure. Vite keeps development quick.

- **TailwindCSS**  
  Helped me translate Figma designs into UI quickly without overcomplicating styling.

- **Node.js & Express**  
  Minimal backend to show proper API structure.

- **SQLite**  
  Simple and easy to run without setup overhead.

- **JWT + bcryptjs**  
  Real authentication instead of mocked flows.

## Features Implemented
- Real authentication (signup, login, password hashing)
- Dynamic leave balance updates from backend
- Small UI interactions (hover states, mood widget, etc.)

## Assumptions Made
- Payroll and performance data are treated as pre-filled/read-only
- Leave requests go into "Pending" without manager approval flow (scope-focused)
