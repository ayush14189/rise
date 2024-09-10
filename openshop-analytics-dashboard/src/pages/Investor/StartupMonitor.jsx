import React,{useState,useEffect} from 'react';

const StartupsMonitor = () => {
  const [startups, setStartups] = useState([]);

    useEffect(() => {
      const fetchStartups = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/user/startup');
          const data = await response.json();
          setStartups(data);
        } catch (error) {
          console.error('Error fetching startups:', error);
        }
      };

      fetchStartups();
    }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Startup Monitoring</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Startup Name</th>
            <th className="py-2 px-4 border-b">Industry Sector</th>
            <th className="py-2 px-4 border-b">Business Stage</th>
          </tr>
        </thead>
        <tbody>
          {startups.map((startup, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{startup.startup_name}</td>
              <td className="py-2 px-4 border-b">{startup.industry_sector}</td>
              <td className="py-2 px-4 border-b">{startup.business_stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StartupsMonitor;
