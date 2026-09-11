import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import './App.css';

function App() {
  // 'dashboard' | 'events' | 'detail'
  const [page, setPage] = useState('dashboard');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setPage('detail');
  };

  const handleBack = () => {
    setSelectedEvent(null);
    setPage('events');
  };

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />
      <main className="main-content">
        {page === 'dashboard' && (
          <Dashboard onViewEvents={() => setPage('events')} />
        )}
        {page === 'events' && (
          <EventList onSelectEvent={handleSelectEvent} />
        )}
        {page === 'detail' && selectedEvent && (
          <EventDetail event={selectedEvent} onBack={handleBack} />
        )}
      </main>
    </div>
  );
}

export default App;
