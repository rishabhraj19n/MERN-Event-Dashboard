# Technical Event Dashboard — MERN Stack

> A responsive, full-stack Event Management Dashboard designed for society administrators to manage technical events, monitor registrations in real-time, and track attendee metrics.

---

## 🔗 Live Demo

👉 **[Click Here to Open Live Dashboard: https://mern-event-dashboard.vercel.app](https://mern-event-dashboard.vercel.app/)**  
*(Works instantly on desktop and mobile — no setup required!)*

---

## ✨ Features

- 📊 **Real-time Metrics Dashboard**: View total events, total attendee count, and the most popular event at a glance.
- 📅 **Dynamic Event Management**: Add new technical events with date, venue, capacity limits, and descriptions.
- 👥 **Attendee Registration & Capacity Tracking**: Register attendees with live capacity checks and instant visual indicators (progress bar turns red when full).
- 🗑️ **Management & Deletion**: Delete events and remove attendee registrations with seamless state updates.
- ⚡ **Dual Data Layer**: Works with Node.js/Express REST APIs and includes an automatic client fallback for instant cloud demo.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Axios, HTML5/CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB / Mongoose |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📂 Project Structure

```
event-dashboard/
├── backend/
│   ├── models/          # Mongoose Schemas (Event, Attendee)
│   ├── routes/          # Express REST API routes
│   ├── server.js        # Server entry point & CORS configuration
│   └── package.json
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.js         # Navigation header
        │   ├── Dashboard.js      # Stats & recent events overview
        │   ├── EventList.js      # Event grid & event creation
        │   ├── EventCard.js      # Event card with visual capacity bar
        │   ├── AddEventForm.js   # Event creation modal/form
        │   ├── EventDetail.js    # Attendee management view
        │   ├── AttendeeTable.js  # Attendee directory table
        │   └── AddAttendeeForm.js# Attendee registration form
        ├── api.js                # API configuration & data services
        ├── App.js                # Main router & layout
        └── App.css               # Clean responsive styling
```

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/rishabhraj19n/MERN-Event-Dashboard.git
cd MERN-Event-Dashboard
```

### 2. Run Backend
```bash
cd backend
npm install
node server.js
```

### 3. Run Frontend (in a new terminal)
```bash
cd frontend
npm install
npm start
```
The app will automatically open at `http://localhost:3000`.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/events` | Fetch all technical events |
| `GET` | `/api/events/:id` | Fetch specific event details |
| `POST` | `/api/events` | Create a new event |
| `DELETE` | `/api/events/:id` | Delete an event and its attendees |
| `GET` | `/api/attendees?eventId=:id` | Fetch all attendees for an event |
| `POST` | `/api/attendees` | Register an attendee |
| `DELETE` | `/api/attendees/:id` | Remove an attendee registration |

---

## 👤 Author
- **Rishabh Raj** - [GitHub Profile](https://github.com/rishabhraj19n)
