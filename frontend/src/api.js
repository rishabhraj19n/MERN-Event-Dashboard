import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Initial default data
const defaultEvents = [
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

const defaultAttendees = [
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

// Helper functions for LocalStorage fallback
const getLocalEvents = () => {
  const saved = localStorage.getItem('ed_events');
  if (!saved) {
    localStorage.setItem('ed_events', JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return defaultEvents;
  }
};

const setLocalEvents = (events) => {
  localStorage.setItem('ed_events', JSON.stringify(events));
};

const getLocalAttendees = () => {
  const saved = localStorage.getItem('ed_attendees');
  if (!saved) {
    localStorage.setItem('ed_attendees', JSON.stringify(defaultAttendees));
    return defaultAttendees;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return defaultAttendees;
  }
};

const setLocalAttendees = (attendees) => {
  localStorage.setItem('ed_attendees', JSON.stringify(attendees));
};

// Unified Data Service with Auto-Fallback
export const eventService = {
  getEvents: async () => {
    try {
      const res = await axios.get(`${API_BASE}/events`, { timeout: 3000 });
      return res.data;
    } catch (err) {
      console.warn('Backend not reached, using local data store', err.message);
      return getLocalEvents();
    }
  },

  createEvent: async (eventData) => {
    try {
      const res = await axios.post(`${API_BASE}/events`, eventData, { timeout: 3000 });
      return res.data;
    } catch (err) {
      const events = getLocalEvents();
      const newEvent = {
        _id: String(Date.now()),
        ...eventData,
        capacity: Number(eventData.capacity),
        createdAt: new Date().toISOString(),
      };
      const updated = [newEvent, ...events];
      setLocalEvents(updated);
      return newEvent;
    }
  },

  deleteEvent: async (id) => {
    try {
      await axios.delete(`${API_BASE}/events/${id}`, { timeout: 3000 });
    } catch (err) {
      const events = getLocalEvents().filter((e) => e._id !== id);
      setLocalEvents(events);
      const attendees = getLocalAttendees().filter((a) => a.eventId !== id);
      setLocalAttendees(attendees);
    }
  },

  getAttendees: async (eventId) => {
    try {
      const res = await axios.get(`${API_BASE}/attendees?eventId=${eventId}`, { timeout: 3000 });
      return res.data;
    } catch (err) {
      return getLocalAttendees().filter((a) => a.eventId === eventId);
    }
  },

  createAttendee: async (attendeeData) => {
    try {
      const res = await axios.post(`${API_BASE}/attendees`, attendeeData, { timeout: 3000 });
      return res.data;
    } catch (err) {
      const attendees = getLocalAttendees();
      const newAttendee = {
        _id: 'a_' + Date.now(),
        ...attendeeData,
        createdAt: new Date().toISOString(),
      };
      const updated = [newAttendee, ...attendees];
      setLocalAttendees(updated);
      return newAttendee;
    }
  },

  deleteAttendee: async (id) => {
    try {
      await axios.delete(`${API_BASE}/attendees/${id}`, { timeout: 3000 });
    } catch (err) {
      const attendees = getLocalAttendees().filter((a) => a._id !== id);
      setLocalAttendees(attendees);
    }
  },
};

export default API_BASE;
