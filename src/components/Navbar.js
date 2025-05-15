import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar">
      <div>
        <Link to="/dashboard">Dashboard</Link>
        {isAuthenticated && (
          <>
            <Link to="/clients">Clients</Link>
            <Link to="/reports">Reports</Link>
          </>
        )}
      </div>
      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={onLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;