import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiShieldCheck,
	HiOutlineCurrencyRupee
} from 'react-icons/hi'
import { GrCertificate } from "react-icons/gr";
export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/user',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'EditStartup',
		label: 'View/Edit Startup',
		path: 'EditStartup',
		icon: <HiOutlineCube />
	},
	{
		key: 'IprForm',
		label: 'IPR Form',
		path: 'IprForm',
		icon: <HiShieldCheck />
	},
	{
		key: 'fundingRequests',
		label: 'Funding Requests',
		path: 'funding-requests',
		icon: <HiOutlineCurrencyRupee />
	},
	{
		key: 'mentorship-requests',
		label: 'Mentorship Requests',
		path: 'mentorship-requests',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'collaborations',
		label: 'Collaborations',
		path: 'collaborations',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
