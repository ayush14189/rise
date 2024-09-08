import React from 'react';

const MyInvestments = () => {
  const investments = [
    { startupName: 'Tech Innovators', amount: '$50,000', date: '2024-01-12' },
    { startupName: 'Eco Solutions', amount: '$75,000', date: '2024-03-23' },
    // Add more investment data
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Investments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">Startup Name</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment, index) => (
              <tr
                key={index}
                className={`hover:bg-blue-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="py-3 px-4 border-b text-gray-800">{investment.startupName}</td>
                <td className="py-3 px-4 border-b text-gray-800">{investment.amount}</td>
                <td className="py-3 px-4 border-b text-gray-800">{investment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInvestments;
