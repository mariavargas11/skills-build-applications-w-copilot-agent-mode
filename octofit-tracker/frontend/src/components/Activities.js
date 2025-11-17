import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `${API_BASE}/activities/`;
        console.log('Fetching from API endpoint:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Activities data received:', data);

        const activitiesList = data.results || data;
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container-lg">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading activities...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-lg">
        <div className="alert alert-danger mt-5" role="alert">
          <h4 className="alert-heading">Error Loading Activities</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6">📊 Activities</h1>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Add Activity
          </button>
        </div>

        {activities.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-text">No activities found.</div>
            <p className="text-muted">Start tracking your fitness activities to see them here.</p>
          </div>
        ) : (
          <div className="data-table-wrapper">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Calories</th>
                    <th>Distance</th>
                    <th>Description</th>
                    <th style={{ width: '12%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id || activity.pk}>
                      <td><strong>{activity.name || activity.activity_type || 'Activity'}</strong></td>
                      <td>{activity.activity_type || activity.type || '-'}</td>
                      <td>{activity.duration ? `${activity.duration} min` : '-'}</td>
                      <td>{activity.calories_burned ?? '-'}</td>
                      <td>{activity.distance ? `${activity.distance} km` : '-'}</td>
                      <td>{activity.description ? activity.description : '-'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">View</button>
                        <button className="btn btn-sm btn-outline-danger">Delete</button>
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

export default Activities;
