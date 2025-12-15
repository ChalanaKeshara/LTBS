import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../assets/logo.svg'

function Footer() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <footer className="site-footer">
      {isHomePage && (
        <div className="footer-columns">
          <div className="footer-col footer-about">
            <div className="brand">
              <img className="brand-img" src={logoImage} alt="LabCare logo" />
              <span className="brand-name">LabCare</span>
            </div>
            <p>
              Making healthcare accessible with reliable lab tests and quick
              results. Your health is our priority.
            </p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/test-booking">Brows Tests</Link>
            <Link to="/test-booking">Health Packages</Link>
            <Link to="/dashboard">About Us</Link>
            <Link to="/feedback">Contact</Link>
          </div>
          <div className="footer-col">
            <h3>Services</h3>
            <Link to="/test-booking">Home sample collection</Link>
            <Link to="/report-view">Online Reports</Link>
            <Link to="/test-booking">Doctor Consultation</Link>
            <Link to="/test-booking">Lab Locator</Link>
            <Link to="/dashboard">Corporate Health</Link>
          </div>
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p>Labcare Medical Center</p>
            <p>kandy-Colombo Road, Yakkala.</p>
            <p>1-800-LAB-CARE</p>
            <p>support@labcare.com</p>
          </div>
        </div>
      )}
      <div className="footer-bottom">
        <span>© 2025 LabCare. All rights reserved.</span>
        <div className="footer-links">
          {isHomePage ? (
            <>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              {location.pathname !== '/test-booking' && <Link to="/test-booking">Book a Test</Link>}
              {location.pathname !== '/report-view' && <Link to="/report-view">Reports</Link>}
              {location.pathname !== '/dashboard' && <Link to="/dashboard">Dashboard</Link>}
              {location.pathname !== '/feedback' && <Link to="/feedback">Feedback</Link>}
            </>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer

