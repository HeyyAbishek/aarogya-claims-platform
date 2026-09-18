import React from 'react';
import { Link } from 'react-router-dom';

const ClaimCard = ({ 
  id, 
  name, 
  email, 
  description, 
  claimAmount, 
  status, 
  submissionDate, 
  approvedAmount, 
  insurerComments, 
  document 
}) => {

  const formattedDate = submissionDate ? new Date(submissionDate).toLocaleDateString() : 'N/A';

  const statusColor = 
    status === 'Approved' ? 'text-green-600' : 
    status === 'Rejected' ? 'text-red-600' : 
    'text-yellow-600';

  const handleViewDocument = (e) => {
    e.preventDefault(); // Prevents the card's <Link> from triggering when clicking the button
    if (document) {
      window.open(document, '_blank');
    }
  };

  return (
    // Note: Ensure your App.jsx route matches this path for the edit screen
    <Link to={`/insurers/edit/${id}`} className="no-underline block h-full">
      <div className="p-6 w-80 h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col gap-2">
        
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <h3 className="font-bold text-lg text-gray-800">{name}</h3>
          <span className={`font-bold ${statusColor}`}>{status}</span>
        </div>
        
        <p className="text-sm text-gray-700"><strong>Email:</strong> {email}</p>
        <p className="text-sm text-gray-700"><strong>Submitted:</strong> {formattedDate}</p>
        <p className="text-sm text-gray-700 truncate"><strong>Description:</strong> {description}</p>
        <p className="text-sm text-gray-700"><strong>Requested:</strong> ₹{claimAmount}</p>
        
        {approvedAmount !== null && approvedAmount !== undefined && approvedAmount !== '' && (
          <p className="text-sm text-green-700 font-semibold mt-1"><strong>Approved:</strong> ₹{approvedAmount}</p>
        )}
        
        {insurerComments && (
          <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-700 italic border-l-4 border-blue-400">
            <strong>Insurer Note:</strong> {insurerComments}
          </div>
        )}
        
        {document && (
          <button
            onClick={handleViewDocument}
            className="mt-3 bg-blue-50 text-blue-600 font-semibold py-2 rounded hover:bg-blue-100 transition-colors border border-blue-200"
          >
            View Document
          </button>
        )}
        
        <div className="mt-auto pt-3 text-center text-gray-400 text-sm italic">
          Click anywhere to review & edit status
        </div>

      </div>
    </Link>
  );
};

export default ClaimCard;