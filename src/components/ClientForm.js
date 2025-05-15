import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    name: '',
    contactInfo: '',
    address: '',
    notes: ''
  });
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetchClient();
    }
  }, [id]);

  const fetchClient = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/clients/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setClientData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/clients/${id}`, clientData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/clients', clientData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      navigate('/clients');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit Client' : 'Add New Client'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={clientData.name}
          onChange={handleChange}
          required
        />
        <input
          name="contactInfo"
          placeholder="Contact Info"
          value={clientData.contactInfo}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={clientData.address}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={clientData.notes}
          onChange={handleChange}
        />
        <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default ClientForm;