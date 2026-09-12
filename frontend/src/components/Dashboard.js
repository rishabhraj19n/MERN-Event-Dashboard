import React, { useEffect, useState } from 'react';
import { eventService } from '../api';

function Dashboard({ onViewEvents }) {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    popularEvent: '-',
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const events = await eventService.getEvents();

        // For each event, fetch attendee count
        const attendeeCounts = await Promise.all(
          events.map(async (e) => {
            const atts = await eventService.getAttendees(e._id);
            return {
              name: e.name,
              count: atts.length,
            };
          })
        );

        const totalAttendees = attendeeCounts.reduce((sum, e) => sum + e.count, 0);
        const popular = attendeeCounts.sort((a, b) => b.count - a.count)[0];

        setStats({
          totalEvents: events.length,
          totalAttendees,
          popularEvent: popular && popular.count > 0 ? popular.name : 'N/A',
        });
        setRecentEvents(events.slice(0, 3));
      } catch (err) {
        console.error('Failed to load dashboard stats:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Events</h3>
          <div className="stat-value">{stats.totalEvents}</div>
          <div className="stat-label">events created</div>
        </div>
        <div className="stat-card">
          <h3>Total Registrations</h3>
          <div className="stat-value">{stats.totalAttendees}</div>
          <div className="stat-label">attendees registered</div>
        </div>
        <div className="stat-card">
          <h3>Most Popular</h3>
          <div className="stat-value" style={{ fontSize: '20px', paddingTop: '8px' }}>
            {stats.popularEvent}
          </div>
          <div className="stat-label">by registrations</div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="section-header">
        <h2>Recent Events</h2>
        <button className="btn btn-primary btn-small" onClick={onViewEvents}>
          View All Events
        </button>
      </div>

      {recentEvents.length === 0 ? (
        <p className="empty-text">No events found. Go to Events to add one.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.venue}</td>
                  <td>{event.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
