import React from 'react';

const StartupsMonitor = () => {
  const startups = [
    { name: 'Health First', progress: '70%', revenueGrowth: '15%' },
    { name: 'Tech Innovators', progress: '85%', revenueGrowth: '25%' },
    // Add more startups
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Startup Monitoring</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Startup Name</th>
            <th className="py-2 px-4 border-b">Progress</th>
            <th className="py-2 px-4 border-b">Revenue Growth</th>
          </tr>
        </thead>
        <tbody>
          {startups.map((startup, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{startup.name}</td>
              <td className="py-2 px-4 border-b">{startup.progress}</td>
              <td className="py-2 px-4 border-b">{startup.revenueGrowth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StartupsMonitor;
