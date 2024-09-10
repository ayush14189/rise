import React,{useState,useEffect} from 'react';

const MyInvestments = () => {
  // const investments = [
  //   { startupName: 'Tech Innovators', amount: '$50,000', date: '2024-01-12' },
  //   { startupName: 'Eco Solutions', amount: '$75,000', date: '2024-03-23' },
  //   // Add more investment data
  // ];
  
  const [investments, setInvestments] = useState([]);
  const investor = JSON.parse(localStorage.getItem('userInfo'))
    useEffect(() => {
      const fetchInvestments = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/user/investments/${investor._id}`); // Replace with your API endpoint
          const data = await response.json();
          setInvestments(data);
        } catch (error) {
          console.error('Error fetching investments:', error);
        }
      };

      fetchInvestments();
    }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Investments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">Startup Name</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Equity</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {investments.length>0 && investments?.map((investment, index) => (
              <tr
                key={index}
                className={`hover:bg-blue-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="py-3 px-4 border-b text-gray-800">{investment.startupName?.startup_name}</td>
                <td className="py-3 px-4 border-b text-gray-800">{investment.amount}</td>
                <td className="py-3 px-4 border-b text-gray-800">{investment.equityPercentage + "%"}</td>
                <td className="py-3 px-4 border-b text-gray-800">{investment.investmentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInvestments;
