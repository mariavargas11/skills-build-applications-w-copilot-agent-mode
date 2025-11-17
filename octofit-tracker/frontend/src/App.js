import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_BASE } from './config';

function App() {
  console.log('App mounted. Using API base:', API_BASE);
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    📊 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    👥 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👤 Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="page-container">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container-lg">
                  <div className="jumbotron">
                    <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                    <p className="lead">
                      🏃 Track your fitness activities, 🏆 compete on leaderboards, and 👥 join teams!
                    </p>
                    <hr className="my-4" />
                    <p>Use the navigation menu above to explore fitness data, build your workouts, and connect with your community.</p>
                    <Link className="btn btn-primary btn-lg" to="/activities" role="button">
                      Get Started 🚀
                    </Link>
                  </div>

                  {/* Quick Stats */}
                  <div className="row mt-5">
                    <div className="col-md-3 mb-4">
                      <div className="card text-center">
                        <div className="card-body">
                          <h5 className="card-title">Activities</h5>
                          <p className="card-text">Track all your fitness activities</p>
                          <Link to="/activities" className="btn btn-sm btn-outline-primary">
                            View All
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-4">
                      <div className="card text-center">
                        <div className="card-body">
                          <h5 className="card-title">Workouts</h5>
                          <p className="card-text">Create and manage your workouts</p>
                          <Link to="/workouts" className="btn btn-sm btn-outline-primary">
                            View All
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-4">
                      <div className="card text-center">
                        <div className="card-body">
                          <h5 className="card-title">Teams</h5>
                          <p className="card-text">Join teams and compete together</p>
                          <Link to="/teams" className="btn btn-sm btn-outline-primary">
                            View All
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-4">
                      <div className="card text-center">
                        <div className="card-body">
                          <h5 className="card-title">Leaderboard</h5>
                          <p className="card-text">See the top competitors</p>
                          <Link to="/leaderboard" className="btn btn-sm btn-outline-primary">
                            View All
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="footer mt-5">
          <div className="container">
            <p>&copy; 2024 OctoFit Tracker. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
