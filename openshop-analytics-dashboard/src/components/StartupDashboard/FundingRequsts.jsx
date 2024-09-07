import React,{useEffect,useState} from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'




export default function FundingRequsts() {
	const [fundingRequests, setFundingRequests] = useState([]);
    const startup = JSON.parse(localStorage.getItem('userInfo'));
    // useEffect(() => {
    //  fetchFundingRequests();
    // }, []);
    
    // const fetchFundingRequests = async () => {
    //  try {
    //      const response = await fetch(`http://localhost:5000/api/user/funding-requests/${startup._id}`);
    //      const data = await response.json();
    //      setFundingRequests(data);
    //  } catch (error) {
    //      console.error('Error fetching funding requests:', error);
    //  }
    // };

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Funding Request</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Amount Requested</th>
                            <th>Customer Name</th>
                            <th>Purpose</th>
                            <th>Request Date</th>
                            
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {fundingRequests && fundingRequests.map((request,index) => (
                            
                            <tr key={request._id}>
                                <td>
                                    {index}
                                </td>
                                <td>
                                    {request.amount_requested}
                                </td>
                                <td>
                                    {request.purpose}
                                </td>
                                <td>{format(new Date(request.created_at), 'dd MMM yyyy')}</td>
                                <td>{request.order_total}</td>
                                
                                <td>{request.funding_status}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


}
