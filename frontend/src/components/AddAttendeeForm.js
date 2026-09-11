import React, { useState } from 'react';

function AddAttendeeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const { name, email } = formData;

    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="form-card">
      <h3>Register Attendee</h3>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="att-name">Full Name *</label>
            <input
              id="att-name"
              name="name"
              type="text"
              placeholder="e.g. Risha Sharma"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="att-email">Email *</label>
            <input
              id="att-email"
              name="email"
              type="email"
              placeholder="e.g. risha@college.edu"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="att-phone">Phone</label>
            <input
              id="att-phone"
              name="phone"
              type="text"
              placeholder="e.g. 9876543210 (optional)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default AddAttendeeForm;
