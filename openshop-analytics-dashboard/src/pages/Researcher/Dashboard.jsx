import React,{useEffect} from 'react'
import DashboardStatsGrid from '../../components/DashboardStatsGrid'
import TransactionChart from '../../components/TransactionChart'
import RecentOrders from '../../components/RecentOrders'
import BuyerProfilePieChart from '../../components/BuyerProfilePieChart'
import PopularProducts from '../../components/PopularProducts'
import ResearcherStatsGrid from '../../components/ResearcherDashboard/ResearcherStats'
import ResearchProjects from '../../components/ResearcherDashboard/ResearchProjects'

export default function Dashboard() {
	useEffect(() => {
        const userId = (JSON.parse(localStorage.getItem('user')))._id;
        if (userId) {
            fetch(`http://localhost:5000/api/user//researcher${userId}`)
                .then(response => response.json())
                .then(data => {
					console.log(data)
                    localStorage.setItem('userInfo', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, []);
	return (
		<div className="flex flex-col gap-4">
			<ResearcherStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<ResearchProjects />
				<PopularProducts />
			</div>
		</div>
	)
}
