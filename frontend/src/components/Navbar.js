import React from 'react';

function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">📋 Event Dashboard</div>
      <div className="navbar-links">
        <button
          className={`nav-btn ${page === 'dashboard' ? 'active' : ''}`}
          onClick={() => setPage('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-btn ${page === 'events' || page === 'detail' ? 'active' : ''}`}
          onClick={() => setPage('events')}
        >
          Events
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
