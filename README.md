# Fluid HR - Employee Dashboard

This project is a high-fidelity frontend and lightweight backend implementation for the **Employee Persona** of the HRIS Dashboard (Problem 2). 

### Design Approach & Retrospective
*The frontend was structured to directly reflect my UX decisions: prioritizing the immediate needs of an employee (Leave balances, Payslip access, Action shortcuts) without burying them in nested tables. The layout translates these into modular React components (like the `Ring.jsx` or `LeaveModal.jsx`) keeping the codebase predictable. "Apply Leave", being the most executed action, is a one-click CTA on the primary Hero banner.*

*If I had more time, I would swap out the file-based SQLite setup for a fully typed PostgreSQL database to scale to production standards. Cultivating a robust state manager to manage more complex employee application workflows, and building out End-to-End browser tests would be my next immediate iterations.*

## Overview
The goal of this screen is to empower employees to manage their work profile effortlessly. As soon as an employee logs in, the dashboard acts as a guiding compass immediately displaying what matters most:
- Remaining leave balances (prioritized front-and-center).
- A one-click call-to-action to "Apply Leave".
- Recent payslip figures and trend indicators.
- Quick navigation shortcuts to core self-service features.
- A quick emotional check-in (Mood Widget) to monitor team wellbeing.

## Tech Stack & Why
- **Frontend**: React + Vite
  - *Why*: Allows for extremely fast, snappy rendering with component reusability. Vite drastically cuts down development server spin-up times.
- **Styling**: TailwindCSS
  - *Why*: Facilitates rapid, high-fidelity UI recreation from the Figma designs without the overhead of juggling separate CSS files.
- **Backend API**: Node.js & Express
  - *Why*: A minimal server to validate the architectural structure of an API separated from the client.
- **Database**: SQLite (via `sql.js`)
  - *Why*: A zero-dependency, highly portable database that can be initialized on-the-fly. Perfect for a reviewable assignment without requiring the reviewer to spin up a Docker container or configure PostgreSQL.
- **Authentication**: JWT & `bcryptjs`
  - *Why*: Implements real, secure stateless session creation rather than mocking auth purely on the frontend.

## Features Implemented
- **Full Authentication Flow**: Real account creation, password hashing, and user sessions.
- **Dynamic Leave Management**: Leave balances are genuinely deducted and accurately calculated into frontend rings from the SQLite backend.
- **Micro-Interactions**: Hover states, gradient overlays, and dynamic widget interactions (Mood Selector) mapped directly from the UX decisions.

## Assumptions Made
- Data components relevant to other personas (like HR uploading performance reviews or payroll creating the payslip) are currently seeded or treated as read-only for this Employee persona view. 
- Leave management approvals are assumed "Pending" upon creation, bypassing the Manager persona's approval screen in the interest of scope limit.

---


