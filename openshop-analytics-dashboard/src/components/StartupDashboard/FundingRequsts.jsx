import React,{useEffect,useState} from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'




export default function FundingRequsts() {
	const [fundingRequests, setFundingRequests] = useState([]);
    const startup = JSON.parse(localStorage.getItem('userInfo'));
    useEffect(() => {
     fetchFundingRequests();
    }, []);
    
    const fetchFundingRequests = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/user/funding-requests/${startup._id}`);
          const data = await response.json();
          setFundingRequests(data);
        } catch (error) {
          console.error('Error fetching funding requests:', error);
        }
      };
    const handleAcceptProposal = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/api/user/funding-requests/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            
          }, body : JSON.stringify({ status: 'accepted' })});
    
          if (response.ok) {
            const updatedRequest = await response.json();
            setFundingRequests((prevRequests) =>
              prevRequests.map((request) =>
                request._id === id ? updatedRequest : request
              )
            );
          } else {
            console.error('Failed to accept proposal');
          }
        } catch (error) {
          console.error('Error accepting proposal:', error);
        }
      };
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Funding Request</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                <thead>
          <tr>
            <th className="py-2">S. No.</th>
            <th className="py-2">Investor Name</th>
            <th className="py-2">Requested Amount</th>
            <th className="py-2">Proposed Equity</th>
            <th className="py-2">Purpose</th>
            <th className="py-2">Status</th>
            <th className="py-2">Counter Amount</th>
            <th className="py-2">Counter Equity</th>
            <th className="py-2">Negotiation Message</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log(fundingRequests)}
          {fundingRequests.length>0 && fundingRequests.map((request,index) => (
            <tr key={request._id}>
              <td className="py-2">{index+1}</td>
              <td className="py-2">{request.investor_id?.name || '-'}</td>
              <td className="py-2">{request.requestedAmount}</td>
              <td className="py-2">{request.proposedEquity}</td>
              <td className="py-2">{request.purpose || '-'}</td>
              <td className="py-2">{request.status}</td>
              <td className="py-2">{request.counterAmount || '-'}</td>
              <td className="py-2">{request.counterEquity || '-'}</td>
              <td className="py-2">{request.negotiationMessage || '-'}</td>
              <td className="py-2">
                {request.status === 'countered' && (
                  <button
                    onClick={() => handleAcceptProposal(request._id)}
                    className="px-4 py-2 text-white bg-green-500 rounded-md"
                  >
                    Accept Proposal
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
                </table>
            </div>
        </div>
    );


}
