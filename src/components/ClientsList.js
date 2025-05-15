import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ClientsList() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clients', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`http://localhost:5000/api/clients/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchClients();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h1>Clients</h1>
      <button onClick={() => navigate('/clients/new')}>Add New Client</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Info</th>
            <th>Address</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientId}>
              <td>{client.name}</td>
              <td>{client.contactInfo}</td>
              <td>{client.address || 'N/A'}</td>
              <td>{client.notes || 'N/A'}</td>
              <td>
                <button onClick={() => navigate(`/clients/edit/${client.clientId}`)}>Edit</button>
                <button onClick={() => deleteClient(client.clientId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsList;