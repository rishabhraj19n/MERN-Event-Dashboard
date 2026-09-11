// In-memory store for events
let events = [
  {
    _id: '1',
    name: 'Hackathon 2025',
    description: 'Annual 24-hour coding competition',
    date: '2025-09-15',
    venue: 'Seminar Hall A',
    capacity: 60,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Tech Talk: AI & ML',
    description: 'Guest lecture on modern AI trends',
    date: '2025-09-22',
    venue: 'Auditorium',
    capacity: 150,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: 'Web Dev Workshop',
    description: 'Hands-on MERN stack workshop',
    date: '2025-10-05',
    venue: 'Lab 3',
    capacity: 40,
    createdAt: new Date().toISOString(),
  },
];

let idCounter = 100;

const generateId = () => {
  idCounter++;
  return String(idCounter);
};

const express = require('express');
const router = express.Router();

// GET /api/events
router.get('/', (req, res) => {
  res.json(events);
});

// GET /api/events/:id
router.get('/:id', (req, res) => {
  const event = events.find((e) => e._id === req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});

// POST /api/events
router.post('/', (req, res) => {
  const { name, description, date, venue, capacity } = req.body;
  if (!name || !date || !venue || !capacity) {
    return res.status(400).json({ message: 'Name, date, venue, and capacity are required.' });
  }
  const newEvent = {
    _id: generateId(),
    name,
    description: description || '',
    date,
    venue,
    capacity: Number(capacity),
    createdAt: new Date().toISOString(),
  };
  events.unshift(newEvent);
  res.status(201).json(newEvent);
});

// DELETE /api/events/:id
router.delete('/:id', (req, res) => {
  const index = events.findIndex((e) => e._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Event not found' });
  events.splice(index, 1);
  res.json({ message: 'Event deleted successfully' });
});

module.exports = router;
