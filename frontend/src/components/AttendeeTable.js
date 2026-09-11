import React from 'react';

function AttendeeTable({ attendees, onDelete }) {
  if (attendees.length === 0) {
    return <p className="empty-text">No attendees registered yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Registered On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((a, index) => (
            <tr key={a._id}>
              <td>{index + 1}</td>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.phone || '—'}</td>
              <td>{new Date(a.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-danger" onClick={() => onDelete(a._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendeeTable;
