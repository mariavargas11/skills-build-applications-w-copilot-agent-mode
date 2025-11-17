import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `${API_BASE}/teams/`;
        console.log('Fetching from API endpoint:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Teams data received:', data);

        const teamsList = data.results || data;
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container-lg">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading teams...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-lg">
        <div className="alert alert-danger mt-5" role="alert">
          <h4 className="alert-heading">Error Loading Teams</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6">👥 Teams</h1>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Create Team
          </button>
        </div>

        {teams.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <div className="empty-state-text">No teams found.</div>
            <p className="text-muted">Create a team to collaborate with other fitness enthusiasts.</p>
          </div>
        ) : (
          <div className="data-table-wrapper">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Members</th>
                    <th>Score</th>
                    <th>Description</th>
                    <th style={{ width: '12%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id || team.pk}>
                      <td><strong>{team.name || 'Team'}</strong></td>
                      <td>
                        <span className="badge bg-info">
                          {team.member_count !== undefined ? team.member_count : (team.members ? team.members.length : 0)}
                        </span>
                      </td>
                      <td>{team.score ?? '-'}</td>
                      <td>{team.description ? team.description : '-'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">View</button>
                        <button className="btn btn-sm btn-outline-success">Join</button>
                      </td>
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

export default Teams;
