import React from 'react'
import DashboardStatsGrid from '../../components/DashboardStatsGrid'
import TransactionChart from '../../components/TransactionChart'
import RecentOrders from '../../components/RecentOrders'
import BuyerProfilePieChart from '../../components/BuyerProfilePieChart'
import PopularProducts from '../../components/PopularProducts'
import ResearcherStatsGrid from '../../components/ResearcherDashboard/ResearcherStats'
import ResearchProjects from '../../components/ResearcherDashboard/ResearchProjects'

export default function Dashboard() {
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
