import React from 'react';

function EventCard({ event, attendeeCount, onView, onDelete }) {
  const percentage = Math.min((attendeeCount / event.capacity) * 100, 100);
  const isFull = attendeeCount >= event.capacity;

  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <div className="event-info">
        <span>📅 {event.date}</span>
        <span>📍 {event.venue}</span>
        {event.description && <span>📝 {event.description}</span>}
      </div>

      {/* Capacity progress bar */}
      <div className="capacity-bar-wrapper">
        <div
          className={`capacity-bar ${isFull ? 'full' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="capacity-text">
        {attendeeCount} / {event.capacity} registered
        {isFull && ' — FULL'}
      </p>

      <div className="event-card-actions">
        <button className="btn btn-primary btn-small" onClick={onView}>
          View Attendees
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;
