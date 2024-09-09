import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const IPRDashboard = () => {
  const [iprMonthlyData, setIprMonthlyData] = useState([]);
  const [trademarkChartData, setTrademarkChartData] = useState([]);
  const [patentChartData, setPatentChartData] = useState([]);
  const [totalApplications, setTotalApplications] = useState({});
  const [applicationsByStatus, setApplicationsByStatus] = useState({});


  useEffect(() => {
    // Fetch applications filed each month
    axios.get('http://localhost:5000/api/user/ipr/dashboard/applications-by-month')
      .then(response => {
        const { iprs, trademarks, patents } = response.data;
        setIprMonthlyData(iprs);
        setTrademarkChartData(trademarks);
        setPatentChartData(patents);
      })
      .catch(error => console.error('Error fetching applications by month:', error));


    // Fetch total applications by category
    axios.get('http://localhost:5000/api/user/ipr/dashboard/total-applications')
      .then(response => setTotalApplications(response.data))
      .catch(error => console.error('Error fetching total applications:', error));


    // Fetch applications by status
    axios.get('http://localhost:5000/api/user/ipr/dashboard/applications-by-status')
      .then(response => setApplicationsByStatus(response.data))
      .catch(error => console.error('Error fetching applications by status:', error));
  }, []);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">IPR Managers Dashboard</h2>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* IPR Line Chart */}
        {/* <div className="shadow-lg rounded-lg p-6 bg-white">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">IPR Applications Over Time</h3>
          <LineChart width={400} height={300} data={iprMonthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div> */}


        {/* Trademark Bar Chart */}
        <div className="shadow-lg rounded-lg p-6 bg-white">
          <h3 className="text-xl font-semibold mb-4 text-green-600">Trademark Applications by Status</h3>
          <BarChart width={400} height={300} data={trademarkChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>


        {/* Patent Pie Chart */}
        <div className="shadow-lg rounded-lg p-6 bg-white">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Patent Applications by Status</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={patentChartData}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {patentChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>


      {/* Numerical Statistics */}
      <div className="mt-8">
        {/* <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">Numerical Statistics</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div className="shadow-lg rounded-lg p-6 bg-blue-100">
            <h4 className="text-lg font-semibold text-blue-700">Total IPR Applications</h4>
            <p className="text-3xl font-bold text-blue-900">{totalApplications.totalIPRs}</p>
          </div> */}
          <div className="shadow-lg rounded-lg p-6 bg-green-100">
            <h4 className="text-lg font-semibold text-green-700">Total Trademark Applications</h4>
            <p className="text-3xl font-bold text-green-900">{totalApplications.totalTrademarks}</p>
          </div>
          <div className="shadow-lg rounded-lg p-6 bg-purple-100">
            <h4 className="text-lg font-semibold text-purple-700">Total Patent Applications</h4>
            <p className="text-3xl font-bold text-purple-900">{totalApplications.totalPatents}</p>
          </div>
        </div>
      </div>


      {/* Applications by Status */}
      <div className="mt-8">
        {/* <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">Applications by Status</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div className="shadow-lg rounded-lg p-6 bg-yellow-100">
            <h4 className="text-lg font-semibold text-yellow-700">IPR Applications by Status</h4>
            {applicationsByStatus.iprStatusCounts && applicationsByStatus.iprStatusCounts.map(status => (
              <p key={status._id} className="text-xl text-yellow-900">{status._id}: {status.count}</p>
            ))}
          </div> */}
          <div className="shadow-lg rounded-lg p-6 bg-red-100">
            <h4 className="text-lg font-semibold text-red-700">Trademark Applications by Status</h4>
            {applicationsByStatus.trademarkStatusCounts && applicationsByStatus.trademarkStatusCounts.map(status => (
              <p key={status._id} className="text-xl text-red-900">{status._id}: {status.count}</p>
            ))}
          </div>
          <div className="shadow-lg rounded-lg p-6 bg-indigo-100">
            <h4 className="text-lg font-semibold text-indigo-700">Patent Applications by Status</h4>
            {applicationsByStatus.patentStatusCounts && applicationsByStatus.patentStatusCounts.map(status => (
              <p key={status._id} className="text-xl text-indigo-900">{status._id}: {status.count}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default IPRDashboard;