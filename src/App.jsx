import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import TestBooking from './pages/TestBooking'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import Feedback from './pages/Feedback'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/test-booking" element={<TestBooking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report-view" element={<Reports />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

