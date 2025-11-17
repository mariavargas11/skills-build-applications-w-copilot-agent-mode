import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `${API_BASE}/leaderboard/`;
        console.log('Fetching from API endpoint:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Leaderboard data received:', data);

        const leaderboardList = data.results || data;
        setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container-lg">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading leaderboard...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-lg">
        <div className="alert alert-danger mt-5" role="alert">
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <div className="mt-5">
        <h1 className="display-6 mb-4">🏆 Leaderboard</h1>

        {leaderboard.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-text">No leaderboard data found.</div>
            <p className="text-muted">Start tracking activities to see competitors on the leaderboard.</p>
          </div>
        ) : (
          <div className="data-table-wrapper">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '10%' }}>
                      <strong>Rank</strong>
                    </th>
                    <th style={{ width: '40%' }}>
                      <strong>User</strong>
                    </th>
                    <th style={{ width: '25%' }}>
                      <strong>Score</strong>
                    </th>
                    <th style={{ width: '25%' }}>
                      <strong>Points</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td>
                        {index === 0 ? (
                          <span className="badge bg-warning text-dark">🥇 1st</span>
                        ) : index === 1 ? (
                          <span className="badge bg-secondary">🥈 2nd</span>
                        ) : index === 2 ? (
                          <span className="badge bg-danger">🥉 3rd</span>
                        ) : (
                          <strong>#{index + 1}</strong>
                        )}
                      </td>
                      <td>
                        <strong>{entry.user_name || entry.username || entry.user || 'Unknown'}</strong>
                      </td>
                      <td>
                        <div className="badge bg-primary">{entry.score || entry.total_score || 0}</div>
                      </td>
                      <td>
                        <div className="badge bg-success">{entry.points || 0}</div>
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

export default Leaderboard;
