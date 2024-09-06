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
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
