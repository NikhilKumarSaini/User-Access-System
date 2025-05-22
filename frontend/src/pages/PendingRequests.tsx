import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Request {
  id: number;
  software: { name: string };
  user: { username: string };
  accessType: string;
  reason: string;
  status: string;
}

const PendingRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests/pending', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleDecision = async (requestId: number, status: 'Approved' | 'Rejected') => {
    try {
      await axios.patch(`http://localhost:5000/api/requests/${requestId}`, {
        status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRequests(requests.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <div className="table-container">
      <h2>Pending Access Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Software</th>
            <th>User</th>
            <th>Access Type</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.software.name}</td>
              <td>{request.user.username}</td>
              <td>{request.accessType}</td>
              <td>{request.reason}</td>
              <td>
                <button 
                  className="approve-btn"
                  onClick={() => handleDecision(request.id, 'Approved')}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleDecision(request.id, 'Rejected')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRequests;