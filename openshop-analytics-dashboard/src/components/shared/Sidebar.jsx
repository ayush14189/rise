
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import {
    DASHBOARD_SIDEBAR_LINKS,
    DASHBOARD_SIDEBAR_BOTTOM_LINKS,
    IPR_SIDEBAR_LINKS,
    IPR_SIDEBAR_BOTTOM_LINKS,
    RESEARCHER_SIDEBAR_LINKS,
    RESEARCHER_SIDEBAR_BOTTOM_LINKS,
    POLICY_MAKER_SIDEBAR_LINKS,
    POLICY_MAKER_SIDEBAR_BOTTOM_LINKS,
    INVESTOR_SIDEBAR_LINKS,
    INVESTOR_SIDEBAR_BOTTOM_LINKS
} from '../../lib/constants'


import { FcBullish } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'


const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'


export default function Sidebar() {
	const userType=localStorage.getItem('userType')
    let sidebarLinks = [];
    let sidebarBottomLinks = [];
	console.log(userType)

    switch (userType) {
        case 'StartUp':
            sidebarLinks = DASHBOARD_SIDEBAR_LINKS;
            sidebarBottomLinks = DASHBOARD_SIDEBAR_BOTTOM_LINKS;
			console.log("hello")
            break;
        case 'ipr':
            sidebarLinks = IPR_SIDEBAR_LINKS;
            sidebarBottomLinks = IPR_SIDEBAR_BOTTOM_LINKS;
            break;
        case 'Researcher':
            sidebarLinks = RESEARCHER_SIDEBAR_LINKS;
            sidebarBottomLinks = RESEARCHER_SIDEBAR_BOTTOM_LINKS;
            break;
        case 'policy_maker':
            sidebarLinks = POLICY_MAKER_SIDEBAR_LINKS;
            sidebarBottomLinks = POLICY_MAKER_SIDEBAR_BOTTOM_LINKS;
            break;
        case 'investor':
            sidebarLinks = INVESTOR_SIDEBAR_LINKS;
            sidebarBottomLinks = INVESTOR_SIDEBAR_BOTTOM_LINKS;
            break;
        // default:
        //     sidebarLinks = [];
        //     sidebarBottomLinks = [];
    }

	console.log(sidebarLinks)
    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-neutral-200 text-lg">OpenShop</span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {sidebarLinks.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {sidebarBottomLinks.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
					<Link to='/login'>Logout</Link>
                    
                </div>
            </div>
        </div>
    )
}


function SidebarLink({ link }) {
    const { pathname } = useLocation()


    return (
        <Link
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    )
}



