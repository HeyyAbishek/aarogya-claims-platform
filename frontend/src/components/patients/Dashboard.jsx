import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import ClaimCard from './ClaimCard.jsx';

const PatientDashboard = () => {
  const [showClaims, setShowClaims] = useState(false);
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();
  const { patientLogout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post('/patients/logout', {});
    } catch (err) {
      console.log("Backend logout error, forcing local logout:", err);
    } finally {
      // This will always run, ensuring you are never trapped!
      patientLogout();
      navigate('/patients/login');
    }
  };

  const handlegetClaims = async () => {
    try {
      // Interceptor handles the token automatically now
      const response = await axios.get('/patients/claimStatus');
      // Matches the updated backend response object
      setClaims(response.data.claims); 
      setShowClaims(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#79D7BE" }} className='w-full min-h-screen'>
      <br></br>
      <h1 className='text-4xl text-center font-bold text-gray-800'>Patient Dashboard</h1>
      <br></br>
      
      <nav className='flex flex-wrap gap-4 justify-center mt-6'>
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className='p-2 rounded-lg transition-transform transform hover:scale-105 shadow-sm font-semibold'
          onClick={handlegetClaims}>
          View Claims
        </button>
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className='p-2 rounded-lg transition-transform transform hover:scale-105 shadow-sm font-semibold'
          onClick={() => { navigate('/patients/createClaim') }}>
          Create Claim
        </button>
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className='p-2 rounded-lg transition-transform transform hover:scale-105 shadow-sm font-semibold'
          onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {showClaims && (
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 mt-10 text-center text-gray-800">Your Claims</h2>
          <div className='flex flex-wrap gap-6 justify-center'>
            {Array.isArray(claims) && claims.map((claim) => (
              <ClaimCard
                key={claim._id}
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
            {claims.length === 0 && <p className="text-gray-700">No claims found.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;