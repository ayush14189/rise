
import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { FcBullish } from 'react-icons/fc'
import { HiOutlineCube, HiOutlineDocumentText, HiOutlineAnnotation, HiOutlineDocumentReport, HiOutlineTrendingUp, HiOutlineDocumentAdd, HiOutlineClipboardCheck, HiOutlineRefresh, HiOutlineExclamationCircle, HiOutlineChartSquareBar, HiOutlineCurrencyDollar, HiOutlineQuestionMarkCircle, HiOutlineCog,HiOutlineChartPie,HiOutlineUserGroup,HiOutlinePresentationChartLine } from 'react-icons/hi'
import { FaUsers } from 'react-icons/fa'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { MdDashboard, MdAttachMoney } from 'react-icons/md'
import { GiBookshelf, GiMoneyStack } from 'react-icons/gi'


// STARTUP SIDEBAR LINKS


export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/user',
        icon: <MdDashboard />
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
        icon: <HiOutlineDocumentAdd />
    },
    {
        key: 'fundingRequests',
        label: 'Funding Requests',
        path: 'funding-requests',
        icon: <GiMoneyStack />
    },
    {
        key: 'mentorship-requests',
        label: 'Mentorship Requests',
        path: 'mentorship-requests',
        icon: <IoIosNotificationsOutline />
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


// IPR SIDEBAR LINKS


export const IPR_SIDEBAR_LINKS = [
    {
        key: 'iprdashboard',
        label: 'Dashboard',
        path: '/iprmanager',
        icon: <MdDashboard />
    },
    {
        key: 'iprtrademarks',
        label: 'Manage Trademarks',
        path: 'trademarks',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'iprpatents',
        label: 'Manage Patents',
        path: 'patents',
        icon: <HiOutlineDocumentAdd />
    },
    // {
    //     key: 'iprstatus',
    //     label: 'Status Tracker',
    //     path: 'iprstatus',
    //     icon: <HiOutlineClipboardCheck />
    // },
    // {
    //     key: 'iprrenewals',
    //     label: 'Renewals',
    //     path: 'iprrenewals',
    //     icon: <HiOutlineRefresh />
    // },
    // {
    //     key: 'iprdisputes',
    //     label: 'Disputes',
    //     path: 'iprdisputes',
    //     icon: <HiOutlineExclamationCircle />
    // },
    // {
    //     key: 'iprreports',
    //     label: 'Reports',
    //     path: 'iprreports',
    //     icon: <HiOutlineChartSquareBar />
    // },
    // {
    //     key: 'iprresources',
    //     label: 'Legal Resources',
    //     path: 'iprresources',
    //     icon: <GiBookshelf />
    // }
]


export const IPR_SIDEBAR_BOTTOM_LINKS = [
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


// RESEARCHERS SIDEBAR LINKS


export const RESEARCHER_SIDEBAR_LINKS = [
    {
        key: 'resdashboard',
        label: 'Dashboard',
        path: '/researcher',
        icon: <MdDashboard />
    },
    {
        key: 'resprojects',
        label: 'Research Projects',
        path: 'research-projects',
        icon: <HiOutlineCube />
    },
    // {
    //     key: 'resproposals',
    //     label: 'Innovation Proposals',
    //     path: 'resproposals',
    //     icon: <HiOutlineDocumentAdd />
    // },
    {
        key: 'rescollaborations',
        label: 'Collaborations',
        path: 'collaborations',
        icon: <HiOutlineClipboardCheck />
    },
    // {
    //     key: 'respubs',
    //     label: 'Publications',
    //     path: 'respubs',
    //     icon: <HiOutlineDocumentText />
    // },
    // {
    //     key: 'resgrants',
    //     label: 'Grants and Funding',
    //     path: 'resgrants',
    //     icon: <MdAttachMoney />
    // },
    {
        key: 'resipr',
        label: 'Intellectual Property Rights',
        path: 'patents',
        icon: <HiOutlineChartSquareBar />
    }
]


export const RESEARCHER_SIDEBAR_BOTTOM_LINKS = [
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


// POLICY MAKERS SIDEBAR LINKS


export const POLICY_MAKER_SIDEBAR_LINKS = [
    {
        key: 'poldashboard',
        label: 'Dashboard',
        path: '/polmanage',
        icon: <MdDashboard />
    },
    {
        key: 'polprojects',
        label: 'Research Projects',
        path: 'polprojects',
        icon: <HiOutlineCube />
    },
    {
        key: 'polstartups',
        label: 'Startups',
        path: 'polstartups',
        icon: <FaUsers />
    },
    {
        key: 'polgrants',
        label: 'Grants and Funding',
        path: 'polgrants',
        icon: <MdAttachMoney />
    },
    {
        key: 'polipr',
        label: 'Intellectual Property Rights',
        path: 'polipr',
        icon: <HiOutlineChartSquareBar />
    },
    {
        key: 'polcollabs',
        label: 'Collaboration Requests',
        path: 'polcollabs',
        icon: <HiOutlineClipboardCheck />
    },
    {
        key: 'polanalytics',
        label: 'Analytics & Insights',
        path: 'polanalytics',
        icon: <HiOutlineRefresh />
    },
    {
        key: 'polreports',
        label: 'Reports',
        path: 'polreports',
        icon: <HiOutlineDocumentText />
    }
]


export const POLICY_MAKER_SIDEBAR_BOTTOM_LINKS = [
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


// INVESTORS SIDEBAR LINKS


export const INVESTOR_SIDEBAR_LINKS = [
    {
        key: 'invdashboard',
        label: 'Dashboard',
        path: '/investor',
        icon: <MdDashboard />
    },
    {
        key: 'myinvestments',
        label: 'MyInvestments',
        path: 'myinvestments',
        icon: <HiOutlineCurrencyDollar />
    },
    {
        key: 'collaborationRequests',
        label: 'Collaboration Requests',
        path: 'collaborationRequests',
        icon: <HiOutlineUserGroup />
    },
    {
        key: 'startupMonitoring',
        label: 'Startup Monitoring',
        path: 'startupmonitoring',
        icon: <HiOutlinePresentationChartLine />
    },
    // {
    //     key: 'invperformance',
    //     label: 'Performance',
    //     path: 'invperformance',
    //     icon: <HiOutlineTrendingUp />
    // },
    {
        key: 'fundrequests',
        label: 'Funding Requests',
        path: 'fundingRequests',
        icon: <HiOutlineDocumentReport />
    },
    // {
    //     key: 'invnetwork',
    //     label: 'Network',
    //     path: 'invnetwork',
    //     icon: <HiOutlineUserGroup />
    // }
]


export const INVESTOR_SIDEBAR_BOTTOM_LINKS = [
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

