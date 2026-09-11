import React, { useState } from 'react';

function AddEventForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    venue: '',
    capacity: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const { name, date, venue, capacity } = formData;

    if (!name || !date || !venue || !capacity) {
      setError('Name, date, venue, and capacity are required.');
      return;
    }
    if (isNaN(capacity) || Number(capacity) < 1) {
      setError('Capacity must be a number greater than 0.');
      return;
    }

    onSubmit({ ...formData, capacity: Number(capacity) });
  };

  return (
    <div className="form-card">
      <h3>Add New Event</h3>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Event Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Hackathon 2025"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="venue">Venue *</label>
            <input
              id="venue"
              name="venue"
              type="text"
              placeholder="e.g. Seminar Hall A"
              value={formData.venue}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity *</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              placeholder="e.g. 100"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Optional short description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default AddEventForm;
