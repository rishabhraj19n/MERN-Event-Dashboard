const express = require('express');
const cors = require('cors');

const eventRoutes = require('./routes/events');
const attendeeRoutes = require('./routes/attendees');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/attendees', attendeeRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Event Dashboard API is running (in-memory mode)' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Running in in-memory mode — no MongoDB needed!');
});
