import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';

const EditClaim = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [claim, setClaim] = useState({
    name: '',
    email: '',
    description: '',
    claimAmount: '',
    status: 'Pending',
    approvedAmount: '',
    insurerComments: '',
    document: '' 
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        // Axios interceptor handles the JWT token automatically
        const response = await axios.get(`/insurers/claims/${id}`);
        const data = response.data;
        
        setClaim({
          ...data,
          // Ensure null amounts map nicely to an empty input string
          approvedAmount: data.approvedAmount === null ? '' : data.approvedAmount,
          insurerComments: data.insurerComments || ''
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch claim details');
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/insurers/claims/${id}`, {
        status: claim.status,
        approvedAmount: claim.approvedAmount,
        insurerComments: claim.insurerComments
      });
      navigate('/insurers/dashboard');
    } catch (err) {
      console.log(err);
      setError('Failed to update claim');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaim({ ...claim, [name]: value });
  };

  if (loading) return <div className="text-center mt-20 text-2xl font-bold">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-2xl text-red-500 font-bold">{error}</div>;

  return (
    <div style={{ backgroundColor: "#79D7BE" }} className='w-full min-h-screen py-10 flex flex-col items-center'>
      
      <nav className="w-full max-w-4xl flex justify-start mb-6 px-4">
        <button
          onClick={() => navigate('/insurers/dashboard')}
          className="bg-[#F6F4F0] p-2 rounded-lg font-semibold shadow-sm hover:scale-105 transition-transform"
        >
          ← Back to Dashboard
        </button>
      </nav>
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Review Claim</h1>
        
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          
          {claim.document && (
            <a
              href={claim.document}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-50 text-blue-600 text-center font-bold p-3 rounded transition-colors hover:bg-blue-100 border border-blue-200"
            >
              View Supporting Document
            </a>
          )}
          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Patient Name</label>
            <input
              type="text"
              value={claim.name}
              className="border border-gray-300 bg-gray-50 p-2 rounded text-gray-700"
              readOnly
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              value={claim.email}
              className="border border-gray-300 bg-gray-50 p-2 rounded text-gray-700"
              readOnly
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Claim Description</label>
            <textarea
              value={claim.description}
              className="border border-gray-300 bg-gray-50 p-2 rounded h-20 text-gray-700"
              readOnly
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Requested Amount (₹)</label>
            <input
              type="number"
              value={claim.claimAmount}
              className="border border-gray-300 bg-gray-50 p-2 rounded text-gray-700"
              readOnly
            />
          </div>

          <hr className="my-4 border-gray-200" />
          <h3 className="font-bold text-lg text-gray-800 text-center">Insurer Action</h3>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Update Status</label>
            <select
              name="status"
              value={claim.status}
              onChange={handleChange}
              className="border border-blue-400 p-2 rounded bg-white font-semibold"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Approved Amount (₹)</label>
            <input
              type="number"
              name="approvedAmount"
              placeholder="Leave blank if rejected"
              value={claim.approvedAmount}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Internal Comments</label>
            <textarea
              name="insurerComments"
              placeholder="Reason for approval/rejection..."
              value={claim.insurerComments}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded h-20"
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold p-3 mt-4 rounded transition-transform transform hover:scale-105 shadow-md"
          >
            Submit Decision
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClaim;