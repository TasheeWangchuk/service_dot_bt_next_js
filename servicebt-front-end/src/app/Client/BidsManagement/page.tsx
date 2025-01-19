'use client';

import React, { useState } from 'react';

export default function BidsManagement() {
  // Sample data
  const [bids, setBids] = useState([
    {
      id: 1,
      providerName: "John Doe",
      summary: "Full-stack development with 5 years experience",
      details: "Experienced developer specializing in React and Node.js. Previous projects include...",
      status: "pending",
      price: "2500"
    },
    {
      id: 2,
      providerName: "Jane Smith",
      summary: "Senior React Developer - 8 years experience",
      details: "Expert in modern React practices including hooks and state management...",
      status: "pending",
      price: "3000"
    },
    {
      id: 3,
      providerName: "Mike Johnson",
      summary: "Full-stack engineer with cloud expertise",
      details: "AWS certified developer with experience in serverless architecture...",
      status: "pending",
      price: "2800"
    }
  ]);

  // State management
  const [selectedBids, setSelectedBids] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBid, setCurrentBid] = useState<any>(null);

  // Handlers
  const handleSelectBid = (bidId: number) => {
    const newSelected = new Set(selectedBids);
    if (newSelected.has(bidId)) {
      newSelected.delete(bidId);
    } else {
      newSelected.add(bidId);
    }
    setSelectedBids(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedBids.size === bids.length) {
      setSelectedBids(new Set());
    } else {
      setSelectedBids(new Set(bids.map(bid => bid.id)));
    }
  };

  const handleViewDetails = (bid: any) => {
    setCurrentBid(bid);
    setModalOpen(true);
  };

  const handleAccept = (bidId: number) => {
    setBids(bids.map(bid => {
      if (bid.id === bidId) {
        return { ...bid, status: 'accepted' };
      }
      return { ...bid, status: bid.status === 'pending' ? 'rejected' : bid.status };
    }));
  };

  const handleReject = (bidId: number) => {
    setBids(bids.map(bid => 
      bid.id === bidId ? { ...bid, status: 'rejected' } : bid
    ));
  };

  const handleBulkReject = () => {
    setBids(bids.map(bid => 
      selectedBids.has(bid.id) ? { ...bid, status: 'rejected' } : bid
    ));
    setSelectedBids(new Set());
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'accepted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div
    className="sticky min-h-screen"
    style={{
      backgroundImage: "url('/Artboard.png')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
    }}
  >
    <div className="p-6">
      {/* Main Container */}
      <div className=" rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Bids Management</h2>
          {selectedBids.size > 0 && (
            <button 
              onClick={handleBulkReject}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Reject Selected ({selectedBids.size})
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedBids.size === bids.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {bids.map(bid => (
                <tr key={bid.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    {bid.status === 'pending' && (
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedBids.has(bid.id)}
                        onChange={() => handleSelectBid(bid.id)}
                      />
                    )}
                  </td>
                  <td className="p-4 whitespace-nowrap text-gray-700">{bid.providerName}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleViewDetails(bid)}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                    >
                      {bid.summary}
                    </button>
                  </td>
                  <td className="p-4 whitespace-nowrap text-bold text-gray-900">Nu {bid.price}</td>
                  <td className="p-4">
                    <span className={`${getStatusColor(bid.status)} text-white px-2 py-1 rounded-full text-xs`}>
                      {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    {bid.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(bid.id)}
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded-md shadow-sm text-sm flex items-center gap-1 transition-colors"
                        >
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(bid.id)}
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded-md shadow-sm text-sm flex items-center gap-1 transition-colors"
                        >
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h3 className="text-lg font-bold mb-4 text-gray-900">Proposal Details</h3>
            
            {currentBid && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Provider</h4>
                  <p className="mt-1 text-gray-600">{currentBid.providerName}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Price</h4>
                  <p className="mt-1 text-gray-600">{currentBid.price}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Status</h4>
                  <span className={`${getStatusColor(currentBid.status)} text-white px-2 py-1 rounded-full text-xs mt-1 inline-block`}>
                    {currentBid.status.charAt(0).toUpperCase() + currentBid.status.slice(1)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Details</h4>
                  <p className="mt-1 text-gray-600">{currentBid.details}</p>
                </div>

                {currentBid.status === 'pending' && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => {
                        handleAccept(currentBid.id);
                        setModalOpen(false);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Accept Proposal
                    </button>
                    <button
                      onClick={() => {
                        handleReject(currentBid.id);
                        setModalOpen(false);
                      }}
                      className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md border border-gray-300 flex items-center gap-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Reject Proposal
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}