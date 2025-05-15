import React, { useState } from 'react';
import axios from 'axios';

function Reports() {
  const [format, setFormat] = useState('json');
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reports`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateClientsCountReport = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reports/clients-count?format=${format}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: format !== 'json' ? 'blob' : 'json'
      });
      
      if (format === 'json') {
        alert(`Total Clients: ${res.data.totalClients}`);
      } else {
        // For PDF or Excel, browser will handle download
        // The response headers set for download
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Reports</h1>
      <button onClick={fetchReports}>Load Reports</button>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => { setFormat('json'); generateClientsCountReport(); }}>Clients Count (JSON)</button>
        <button onClick={() => { setFormat('pdf'); generateClientsCountReport(); }}>Clients Count (PDF)</button>
        <button onClick={() => { setFormat('excel'); generateClientsCountReport(); }}>Clients Count (Excel)</button>
      </div>
      {reports.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Generated At</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.reportId}>
                <td>{r.reportId}</td>
                <td>{r.reportType}</td>
                <td>{new Date(r.generatedAt).toLocaleString()}</td>
                <td>{r.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Reports;