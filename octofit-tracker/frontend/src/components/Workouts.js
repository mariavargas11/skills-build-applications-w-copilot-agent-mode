import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `${API_BASE}/workouts/`;
        console.log('Fetching from API endpoint:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Workouts data received:', data);

        const workoutsList = data.results || data;
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container-lg">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading workouts...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-lg">
        <div className="alert alert-danger mt-5" role="alert">
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg">
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>💪 Workouts</h1>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Create Workout
          </button>
        </div>

        {workouts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💪</div>
            <div className="empty-state-text">No workouts found.</div>
            <p className="text-muted">Create a workout plan to get started with your fitness journey.</p>
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
                    <th>Intensity</th>
                    <th>Created By</th>
                    <th style={{ width: '14%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id || workout.pk}>
                      <td><strong>{workout.name || workout.workout_type || 'Workout'}</strong></td>
                      <td>{workout.workout_type || '-'}</td>
                      <td>{workout.duration ? `${workout.duration} min` : '-'}</td>
                      <td>{workout.intensity ?? '-'}</td>
                      <td>{workout.user || '-'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">View</button>
                        <button className="btn btn-sm btn-outline-success me-2">Start</button>
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

export default Workouts;
