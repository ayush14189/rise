import React ,{useEffect}from 'react'
import DashboardStatsGrid from '../../components/DashboardStatsGrid'
import TransactionChart from '../../components/TransactionChart'
import FundingRequests from '../../components/StartupDashboard/FundingRequsts'
import BuyerProfilePieChart from '../../components/BuyerProfilePieChart'
import PopularProducts from '../../components/PopularProducts'

export default function Dashboard() {
	useEffect(() => {
        const userId = (JSON.parse(localStorage.getItem('user')))._id;
        if (userId) {
            fetch(`http://localhost:5000/api/user/startup/${userId}`)
                .then(response => response.json())
                .then(data => {
					console.log(data)
                    localStorage.setItem('userInfo', JSON.stringify(data[0]));
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, []);
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<FundingRequests />
				<PopularProducts />
			</div>
		</div>
	)
}
