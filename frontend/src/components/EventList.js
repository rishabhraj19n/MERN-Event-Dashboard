import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import AddEventForm from './AddEventForm';
import { eventService } from '../api';

function EventList({ onSelectEvent }) {
  const [events, setEvents] = useState([]);
  const [attendeeCounts, setAttendeeCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const evts = await eventService.getEvents();
      setEvents(evts);

      // Fetch attendee counts for all events
      const counts = {};
      await Promise.all(
        evts.map(async (e) => {
          const r = await eventService.getAttendees(e._id);
          counts[e._id] = r.length;
        })
      );
      setAttendeeCounts(counts);
    } catch (err) {
      console.error('Failed to load events:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (formData) => {
    try {
      await eventService.createEvent(formData);
      setMessage('Event added successfully!');
      setShowForm(false);
      fetchEvents();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: ' + (err.message || 'Failed to create event'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event and all its registrations?')) return;
    try {
      await eventService.deleteEvent(id);
      setMessage('Event deleted.');
      fetchEvents();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error deleting event.');
    }
  };

  return (
    <div>
      <div className="section-header">
        <h1 className="page-title" style={{ margin: 0 }}>Events</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Event'}
        </button>
      </div>

      {message && (
        <div className={`alert ${message.startsWith('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}

      {showForm && <AddEventForm onSubmit={handleAddEvent} />}

      {loading ? (
        <p className="loading-text">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="empty-text">No events yet. Click "+ Add Event" to create one.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              attendeeCount={attendeeCounts[event._id] || 0}
              onView={() => onSelectEvent(event)}
              onDelete={() => handleDelete(event._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
