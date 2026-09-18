import React from 'react';

const ClaimCard = ({ name, email, description, claimAmount, status, submissionDate, approvedAmount, insurerComments, document }) => {
  // Format the ISO date string into a readable local date
  const formattedDate = submissionDate ? new Date(submissionDate).toLocaleDateString() : 'N/A';

  // Dynamic color coding for the claim status
  const statusColor = 
    status === 'Approved' ? 'text-green-600' : 
    status === 'Rejected' ? 'text-red-600' : 
    'text-yellow-600';

  return (
    <div className="p-6 w-80 bg-white rounded-lg shadow-md border border-gray-100 flex flex-col gap-2">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h3 className="font-bold text-lg text-gray-800">{name}</h3>
        <span className={`font-bold ${statusColor}`}>{status}</span>
      </div>
      
      <p className="text-sm text-gray-700"><strong>Email:</strong> {email}</p>
      <p className="text-sm text-gray-700"><strong>Submitted:</strong> {formattedDate}</p>
      <p className="text-sm text-gray-700"><strong>Description:</strong> {description}</p>
      <p className="text-sm text-gray-700"><strong>Claim Amount:</strong> ₹{claimAmount}</p>
      
      {approvedAmount !== null && approvedAmount !== undefined && (
        <p className="text-sm text-green-700 font-semibold mt-1"><strong>Approved Amount:</strong> ₹{approvedAmount}</p>
      )}
      
      {insurerComments && (
        <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-700 italic border-l-4 border-blue-400">
          <strong>Insurer Note:</strong> {insurerComments}
        </div>
      )}

      {document && (
        <a 
          href={document} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-4 text-center bg-blue-50 text-blue-600 py-2 rounded font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
        >
          View Supporting Document
        </a>
      )}
    </div>
  );
};

export default ClaimCard;