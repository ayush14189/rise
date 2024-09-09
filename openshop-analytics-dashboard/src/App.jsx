import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Startup/Register'
import Dashboard from './pages/Startup/Dashboard'
import Products from './pages/Startup/Products'
import LandingPg from './pages/LandingPg'
import Home from './pages/Home'

import ViewEditStartup from './pages/Startup/ViewEdit'

import MentorshipRequest from './pages/Startup/MentorshipRequests'
import CollaborationRequest from './pages/Startup/Collaborations'
import ResearchProjects from './pages/Researcher/ResearchProject'

import ResearcherDashboard from './pages/Researcher/Dashboard'
import ResearcherCollaboration from './pages/Researcher/Collaborations'
import InvestorDashboard from './pages/Investor/Dashboard'
import MyInvestments from './pages/Investor/MyInvestements'
import CollaborationRequests from './pages/Investor/CollaborationRequests'
import FundingRequests from './pages/Investor/FundingRequests'
import StartupsMonitor from './pages/Investor/StartupMonitor'
import IPRDashboard from './pages/IPRManager/IPRDashboard'
import NewTrademarkApplications from './pages/IPRManager/NewTrademarkApplications'
import NewPatentApplications from './pages/IPRManager/NewPatentApplications'
import PatentForm from './pages/Startup/Patents'
import TrademarkForm from './pages/Startup/Trademarks'
import StartupFundingRequests from './pages/Startup/FundingRequest'
import ResearcherPatents from './pages/Researcher/Patents'
import ResearcherTrademarks from './pages/Researcher/Trademarks'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPg />} />
                <Route path="/login" element={<Home/>} />
                <Route path="/user" element={<Layout />}>
                    <Route index element={<Dashboard />} />

                    <Route path="funding-requests" element={< 
                    StartupFundingRequests/>} />
                    <Route path="EditStartup" element={<ViewEditStartup />} />
                    <Route path="mentorship-requests" element={<MentorshipRequest />} />
                    <Route path="collaborations" element={<CollaborationRequest />} />

                    <Route path="patents" element={<PatentForm />} />
                    <Route path="trademarks" element={<TrademarkForm />} />
                </Route>
                <Route path='/researcher' element={<Layout />}>
                    <Route index element={<ResearcherDashboard />} />
                    <Route path="research-projects" element={<ResearchProjects />} />
                    <Route path='collaborations' element={<ResearcherCollaboration />} />
                    <Route path='patents' element={<ResearcherPatents />} />
                    <Route path='trademarks' element={<ResearcherTrademarks />} />
                </Route>
                <Route path='/investor' element={<Layout />}>
                    <Route index element={<InvestorDashboard />} />
                    <Route path='myinvestments' element={<MyInvestments />} />
                    <Route path='collaborationRequests' element={<CollaborationRequests />} />
                    <Route path='fundingRequests' element={<FundingRequests />} />
                    <Route path='startupmonitoring' element={<StartupsMonitor />} />
                </Route>
                <Route path='/iprmanager' element={<Layout />}>
                    <Route index element={<IPRDashboard />} />
                    <Route path='trademarks' element={<NewTrademarkApplications/>} />
                    <Route path='patents' element={<NewPatentApplications/>} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
