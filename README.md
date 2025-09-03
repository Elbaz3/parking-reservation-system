# 🚗 Parking Reservation System

A web application for managing parking gates, checkpoints, and administration.  
Built with **React (TypeScript)**, **Redux**, and **Axios**, styled using **CSS Modules**.

---

## ✨ Features

### 🔹 Gate Page
- Header with gate name and real-time clock.
- Page navigator and selector to switch between views.
- Visitor / Subscriber toggle.
- Zone cards with details.
- Visitor check-in.
- Subscriber check-in (requires ID).
- Ticket modal with details + print option.

### 🔹 Checkpoint Page
- Employee login form.
- Ticket ID input after login.
- Options:
  - **Show** → display ticket details in a menu.
  - **Checkout** → display checkout details in a table.

### 🔹 Admin Page
- Admin login form.
- Dashboard includes:
  - **Subscribers table** with details.
  - **Zones table** (open/close zones).
  - Control panel for:
    - Adding vacations.
    - Managing rush hours.
    - Changing category rates.

### ✅ Additional
- Loading and error handling.
- Protected routes.
- Logout option.

---

## 🛠️ Tech Stack
- **Frontend:** React + TypeScript
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Styling:** CSS Modules

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
- git clone https://github.com/Elbaz3/parking-reservation-system/

- install dependencies: npm install

- cd parking-reservation-system

- npm run dev

- visit: http://localhost:5173/
