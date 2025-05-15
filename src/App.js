import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ClientsList from './components/ClientsList';
import ClientForm from './components/ClientForm';
import Reports from './components/Reports';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      // Fetch user info
      // Ideally, decode token or fetch user info
      // For simplicity, store user info in localStorage or fetch from backend
      // Here, assuming token contains userId and fetching user data
      // Implement accordingly
    }
  }, [authToken]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken('');
  };

  return (
    <Router>
      <Navbar isAuthenticated={!!authToken} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={authToken ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/clients"
            element={authToken ? <ClientsList /> : <Navigate to="/login" />}
          />
          <Route
            path="/clients/new"
            element={authToken ? <ClientForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/clients/edit/:id"
            element={authToken ? <ClientForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/reports"
            element={authToken ? <Reports /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;