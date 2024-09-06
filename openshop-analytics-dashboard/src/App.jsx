import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Startup/Register'
import Dashboard from './pages/Startup/Dashboard'
import Products from './pages/Startup/Products'
import LandingPg from './pages/LandingPg'
import Home from './pages/Home'
import IprForm from './pages/Startup/IprForm'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPg />} />
                <Route path="/login" element={<Home/>} />
                <Route path="/user" element={<Layout />}>
                    <Route index element={<Dashboard />} />

                    <Route path="products" element={<Products />} />
                    <Route path="IPRFOrm" element={<IprForm />} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
