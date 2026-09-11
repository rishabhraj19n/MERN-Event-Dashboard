// In-memory store for attendees (pre-loaded with sample data)
let attendees = [
  {
    _id: 'a1',
    name: 'Risha Sharma',
    email: 'risha@college.edu',
    phone: '9876543210',
    eventId: '1',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'a2',
    name: 'Aman Verma',
    email: 'aman@college.edu',
    phone: '9123456789',
    eventId: '1',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'a3',
    name: 'Priya Singh',
    email: 'priya@college.edu',
    phone: '',
    eventId: '2',
    createdAt: new Date().toISOString(),
  },
];

let idCounter = 200;

const generateId = () => {
  idCounter++;
  return String(idCounter);
};

const express = require('express');
const router = express.Router();

// GET /api/attendees?eventId=<id>
router.get('/', (req, res) => {
  const { eventId } = req.query;
  if (!eventId) {
    return res.status(400).json({ message: 'eventId query param is required' });
  }
  const result = attendees.filter((a) => a.eventId === eventId);
  res.json(result);
});

// POST /api/attendees
router.post('/', (req, res) => {
  const { name, email, phone, eventId } = req.body;
  if (!name || !email || !eventId) {
    return res.status(400).json({ message: 'Name, email, and eventId are required.' });
  }
  const newAttendee = {
    _id: generateId(),
    name,
    email,
    phone: phone || '',
    eventId,
    createdAt: new Date().toISOString(),
  };
  attendees.unshift(newAttendee);
  res.status(201).json(newAttendee);
});

// DELETE /api/attendees/:id
router.delete('/:id', (req, res) => {
  const index = attendees.findIndex((a) => a._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Attendee not found' });
  attendees.splice(index, 1);
  res.json({ message: 'Attendee removed successfully' });
});

module.exports = router;
