import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Startup/Register'
import Dashboard from './pages/Startup/Dashboard'
import Products from './pages/Startup/Products'
import LandingPg from './pages/LandingPg'
import Home from './pages/Home'
import IprForm from './pages/Startup/IprForm'
import ViewEditStartup from './pages/Startup/ViewEdit'
import FundingRequest from './pages/Startup/FundingRequest'
import MentorshipRequest from './pages/Startup/MentorshipRequests'
import CollaborationRequest from './pages/Startup/Collaborations'
import ResearchProjects from './pages/Researcher/ResearchProject'
import PatentFiling from './pages/Researcher/Patent'
import ResearcherDashboard from './pages/Researcher/Dashboard'
import ResearcherCollaboration from './pages/Researcher/Collaborations'
import InvestorDashboard from './pages/Investor/Dashboard'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPg />} />
                <Route path="/login" element={<Home/>} />
                <Route path="/user" element={<Layout />}>
                    <Route index element={<Dashboard />} />

                    <Route path="funding-requests" element={< FundingRequest/>} />
                    <Route path="EditStartup" element={<ViewEditStartup />} />
                    <Route path="mentorship-requests" element={<MentorshipRequest />} />
                    <Route path="collaborations" element={<CollaborationRequest />} />

                    <Route path="IPRFOrm" element={<IprForm />} />
                </Route>
                <Route path='/researcher' element={<Layout />}>
                    <Route index element={<ResearcherDashboard />} />
                    <Route path="research-projects" element={<ResearchProjects />} />
                    <Route path='collaborations' element={<ResearcherCollaboration />} />
                    <Route path='patents' element={<PatentFiling />} />
                </Route>
                <Route path='/investor' element={<Layout />}>
                    <Route index element={<InvestorDashboard />} />
                    <Route path='portfolio' element={<Products />} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
