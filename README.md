# Event Dashboard — MERN Stack

A full-stack MERN application for society administrators to manage technical events and track registrations.

---

## Tech Stack

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (cloud)
- **Styling**: Plain CSS

---

## Project Structure

```
event-dashboard/
├── backend/
│   ├── models/        → Mongoose schemas (Event, Attendee)
│   ├── routes/        → Express API routes
│   ├── server.js      → App entry point
│   └── .env           → MongoDB URI (you must fill this in)
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   ├── Dashboard.js
        │   ├── EventList.js
        │   ├── EventCard.js
        │   ├── AddEventForm.js
        │   ├── EventDetail.js
        │   ├── AttendeeTable.js
        │   └── AddAttendeeForm.js
        └── App.js
```

---

## Setup Instructions

### Step 1 — Get MongoDB Atlas URI

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and sign in / create a free account
2. Create a **free M0 cluster** (takes ~2 minutes)
3. Under **Database Access**, create a user with a password
4. Under **Network Access**, add IP `0.0.0.0/0` (allow all) for development
5. Click **Connect → Drivers → Node.js** and copy the connection string

### Step 2 — Configure Backend

Open `backend/.env` and replace the placeholder:

```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/eventdashboard?retryWrites=true&w=majority
PORT=5000
```

### Step 3 — Run the Backend

```bash
cd backend
npm start
```

You should see:
```
Connected to MongoDB Atlas
Server running on http://localhost:5000
```

### Step 4 — Run the Frontend

Open a **new terminal**:

```bash
cd frontend
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| GET    | /api/events                     | Get all events                 |
| GET    | /api/events/:id                 | Get a single event             |
| POST   | /api/events                     | Create a new event             |
| DELETE | /api/events/:id                 | Delete event + its attendees   |
| GET    | /api/attendees?eventId=:id      | Get attendees for an event     |
| POST   | /api/attendees                  | Register a new attendee        |
| DELETE | /api/attendees/:id              | Remove an attendee             |

---

## Features

- **Dashboard** — Total events, total registrations, most popular event, recent events table
- **Events page** — Grid of event cards with capacity progress bar, add/delete events
- **Event Detail** — Full attendee list with registration dates, add/remove attendees, capacity enforcement
