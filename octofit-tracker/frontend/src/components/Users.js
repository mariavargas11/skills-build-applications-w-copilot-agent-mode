import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `${API_BASE}/users/`;
        console.log('Fetching from API endpoint:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Users data received:', data);

        const usersList = data.results || data;
        setUsers(Array.isArray(usersList) ? usersList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container-lg">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-lg">
        <div className="alert alert-danger mt-5" role="alert">
          <h4 className="alert-heading">Error Loading Users</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6">👤 Users</h1>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Add User
          </button>
        </div>

        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <div className="empty-state-text">No users found.</div>
            <p className="text-muted">Users will appear here once they sign up for OctoFit Tracker.</p>
          </div>
        ) : (
          <div className="data-table-wrapper">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '30%' }}>
                      <strong>Username</strong>
                    </th>
                    <th style={{ width: '30%' }}>
                      <strong>Email</strong>
                    </th>
                    <th style={{ width: '20%' }}>
                      <strong>First Name</strong>
                    </th>
                    <th style={{ width: '20%' }}>
                      <strong>Last Name</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <strong>{user.username || 'N/A'}</strong>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email || 'N/A'}</a>
                      </td>
                      <td>{user.first_name || 'N/A'}</td>
                      <td>{user.last_name || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
