import React, { useState, useContext } from 'react';
import axios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateClaim = () => {
  const navigate = useNavigate();
  const { patientLogout } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [document, setDocument] = useState(null);
  const [notification, setNotification] = useState('');

  const handleLogout = async () => {
    try {
      await axios.post('/patients/logout', {});
      patientLogout();
      navigate('/patients/login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('claimAmount', claimAmount);
    formData.append('document', document); // Must match your Multer upload key

    try {
      // Interceptor handles Auth; Axios automatically sets the multipart/form-data boundary
      await axios.post('/patients/claim', formData);
      setNotification('Claim created successfully!');
      setTimeout(() => {
        navigate('/patients/dashboard');
      }, 2000); 
    } catch (err) {
      console.log(err);
      setNotification('Failed to create claim. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: "#79D7BE" }} className='w-full min-h-screen p-8'>
      <nav className='flex justify-between items-center max-w-4xl mx-auto mb-8'>
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className='p-2 rounded-lg transition-transform transform hover:scale-105 shadow-sm font-semibold'
          onClick={() => navigate('/patients/dashboard')}>
          Back to Dashboard
        </button>
        <button
          style={{ backgroundColor: "#F6F4F0" }}
          className='p-2 rounded-lg transition-transform transform hover:scale-105 shadow-sm font-semibold'
          onClick={handleLogout}>
          Logout
        </button>
      </nav>
      
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Submit New Claim</h2>
        
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full"
            required
          />
          <textarea
            placeholder="Claim Description (e.g., Doctor consultation, medication)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full h-24"
            required
          />
          <input
            type="number"
            placeholder="Claim Amount (₹)"
            value={claimAmount}
            onChange={(e) => setClaimAmount(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full"
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Supporting Document</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-400 p-2 rounded w-full"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold p-3 rounded mt-4 transition-transform transform hover:scale-105 shadow-md">
            Submit Claim
          </button>
        </form>

        {notification && (
          <div className={`mt-6 p-3 text-center text-white font-semibold rounded ${notification.includes('successfully') ? 'bg-green-500' : 'bg-red-500'}`}>
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateClaim;