import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AttendeeTable from './AttendeeTable';
import AddAttendeeForm from './AddAttendeeForm';

const API = 'http://localhost:5000/api';

function EventDetail({ event, onBack }) {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const fetchAttendees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/attendees?eventId=${event._id}`);
      setAttendees(res.data);
    } catch (err) {
      console.error('Failed to load attendees:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [event._id]);

  const handleAddAttendee = async (formData) => {
    // Check capacity
    if (attendees.length >= event.capacity) {
      setMessage('Error: Event is at full capacity.');
      return;
    }
    try {
      await axios.post(`${API}/attendees`, { ...formData, eventId: event._id });
      setMessage('Attendee registered successfully!');
      setShowForm(false);
      fetchAttendees();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteAttendee = async (id) => {
    if (!window.confirm('Remove this attendee?')) return;
    try {
      await axios.delete(`${API}/attendees/${id}`);
      setMessage('Attendee removed.');
      fetchAttendees();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error removing attendee.');
    }
  };

  return (
    <div>
      {/* Back button */}
      <div className="back-row">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Events
        </button>
      </div>

      {/* Event summary */}
      <div className="detail-header">
        <h2>{event.name}</h2>
        <p>
          📅 {event.date} &nbsp;|&nbsp; 📍 {event.venue} &nbsp;|&nbsp;
          👥 {attendees.length} / {event.capacity} registered
          {event.description && ` | 📝 ${event.description}`}
        </p>
      </div>

      {/* Section header */}
      <div className="section-header">
        <h2>Attendees</h2>
        <button
          className="btn btn-primary btn-small"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Register Attendee'}
        </button>
      </div>

      {message && (
        <div className={`alert ${message.startsWith('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}

      {showForm && <AddAttendeeForm onSubmit={handleAddAttendee} />}

      {loading ? (
        <p className="loading-text">Loading attendees...</p>
      ) : (
        <AttendeeTable attendees={attendees} onDelete={handleDeleteAttendee} />
      )}
    </div>
  );
}

export default EventDetail;
