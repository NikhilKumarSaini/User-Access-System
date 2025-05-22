import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Software {
  id: number;
  name: string;
  accessLevels: string[];
}

const RequestAccess = () => {
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState('');
  const [accessType, setAccessType] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/software', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSoftwareList(response.data);
      } catch (error) {
        console.error('Error fetching software:', error);
      }
    };
    fetchSoftware();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/requests', {
        softwareId: selectedSoftware,
        accessType,
        reason
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Request submitted successfully!');
      setSelectedSoftware('');
      setAccessType('');
      setReason('');
    } catch (error) {
      alert('Error submitting request');
    }
  };

  return (
    <div className="form-container">
      <h2>Request Software Access</h2>
      <select
        value={selectedSoftware}
        onChange={(e) => setSelectedSoftware(e.target.value)}
      >
        <option value="">Select Software</option>
        {softwareList.map(software => (
          <option key={software.id} value={software.id}>
            {software.name}
          </option>
        ))}
      </select>
      
      <select
        value={accessType}
        onChange={(e) => setAccessType(e.target.value)}
      >
        <option value="">Select Access Type</option>
        {softwareList.find(s => s.id === Number(selectedSoftware))?.accessLevels.map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      <textarea
        placeholder="Reason for access"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
};

export default RequestAccess;