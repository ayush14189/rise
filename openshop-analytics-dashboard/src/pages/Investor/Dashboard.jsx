import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement);

const InvestorDashboard = () => {
  // Bar chart data
  const barData = {
    labels: ['Tech Innovators', 'Eco Solutions', 'Health Heroes', 'GreenTech'],
    datasets: [
      {
        label: 'Investment Amount ($)',
        data: [50000, 75000, 60000, 80000],
        backgroundColor: ['#4F46E5', '#16A34A', '#F97316', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  // Line chart data
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly Return on Investment (%)',
        data: [5, 8, 7, 12, 10],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: ['Technology', 'Healthcare', 'Environment', 'Finance'],
    datasets: [
      {
        label: 'Sector Distribution',
        data: [30, 25, 20, 25],
        backgroundColor: ['#4F46E5', '#16A34A', '#F97316', '#DC2626'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Investor Dashboard</h1>

        {/* Grid for Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bar Chart - Investments */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Investment by Startup</h2>
            <Bar data={barData} options={{ responsive: true }} />
          </div>

          {/* Line Chart - ROI */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Monthly ROI (%)</h2>
            <Line data={lineData} options={{ responsive: true }} />
          </div>

          {/* Pie Chart - Sector Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Sector Distribution</h2>
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Investment Summary */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Investment Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-500 text-white p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold">$260,000</h3>
              <p className="mt-2">Total Investments</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold">4</h3>
              <p className="mt-2">Startups Funded</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold">10%</h3>
              <p className="mt-2">Average ROI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
