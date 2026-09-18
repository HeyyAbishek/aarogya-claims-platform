import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import ClaimCard from './ClaimCard.jsx';

const InsurerDashboard = () => {
  const [claims, setClaims] = useState([]);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');

  const navigate = useNavigate();
  const { insurerLogout } = useContext(AuthContext);

  // Fetch claims utilizing our robust backend filtering logic
  const handleGetClaims = async () => {
    try {
      const response = await axios.get('/insurers/claims', {
        params: {
          status: statusFilter || undefined,
          date: dateFilter || undefined,
          maxAmount: amountFilter || undefined
        }
      });
      setClaims(response.data.claims);
    } catch (err) {
      console.log(err);
    }
  };

  // Automatically fetch claims on load and whenever a filter changes
  useEffect(() => {
    handleGetClaims();
  }, [statusFilter, dateFilter, amountFilter]);

  const handleLogout = async () => {
    try {
      await axios.post('/insurers/logout', {});
    } catch (err) {
      console.log("Backend logout error, forcing local logout:", err);
    } finally {
      // This will always run, ensuring you are never trapped!
      insurerLogout();
      navigate('/insurers/login');
    }
  };

  return (
    <div style={{ backgroundColor: "#79D7BE" }} className="w-full min-h-screen pb-10">
      <br />
      <h1 className="text-4xl text-center font-bold text-gray-800">Insurer Dashboard</h1>
      <br />
      
      <nav className="flex flex-wrap gap-4 justify-center mt-2 mb-6">
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className="p-2 rounded-lg transition-transform transform hover:scale-105 shadow-sm font-semibold"
          onClick={handleGetClaims}
        >
          Refresh Claims
        </button>
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className="p-2 rounded-lg transition-transform transform hover:scale-105 shadow-sm font-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Filter Form */}
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md mb-8 flex flex-wrap gap-4 items-center justify-center">
        <h3 className="text-lg font-bold text-gray-800">Filters:</h3>
        
        <div className="flex items-center">
          <label className="mr-2 font-semibold text-gray-700">Status:</label>
          <select
            className="border p-1 rounded bg-gray-50"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2 font-semibold text-gray-700">Submitted On:</label>
          <input
            type="date"
            className="border p-1 rounded bg-gray-50"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label className="mr-2 font-semibold text-gray-700">Max Amount (₹):</label>
          <input
            type="number"
            className="border p-1 rounded w-32 bg-gray-50"
            placeholder="e.g. 5000"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => { setStatusFilter(''); setDateFilter(''); setAmountFilter(''); }}
          className="text-sm text-blue-600 underline hover:text-blue-800 ml-2"
        >
          Clear Filters
        </button>
      </div>

      {/* Claims Display */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {claims.map((claim) => (
          <ClaimCard
            key={claim._id}
            id={claim._id}
            name={claim.name}
            email={claim.email}
            description={claim.description}
            claimAmount={claim.claimAmount}
            status={claim.status}
            submissionDate={claim.submissionDate}
            approvedAmount={claim.approvedAmount}
            insurerComments={claim.insurerComments}
            document={claim.document}
          />
        ))}
        {claims.length === 0 && <p className="text-gray-800 font-semibold text-lg">No claims match your filters.</p>}
      </div>
    </div>
  );
};

export default InsurerDashboard;