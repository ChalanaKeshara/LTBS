import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import logoImage from '../assets/logo.svg'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = React.useState(false)
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false)

  const openLoginModal = () => {
    setLoginModalOpen(true)
  }

  const openRegisterModal = () => {
    setRegisterModalOpen(true)
  }

  const closeLoginModal = () => {
    setLoginModalOpen(false)
  }

  const closeRegisterModal = () => {
    setRegisterModalOpen(false)
  }

  const switchToRegister = () => {
    setLoginModalOpen(false)
    setRegisterModalOpen(true)
  }

  const switchToLogin = () => {
    setRegisterModalOpen(false)
    setLoginModalOpen(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderNavActions = () => {
    // Show user info and logout if authenticated
    if (isAuthenticated && user) {
      return (
        <>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>
            {user.fullName || user.email}
          </span>
          <button className="btn btn-light" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </>
      )
    }
    
    // Show register/login on home page
    if (location.pathname === '/') {
      return (
        <>
          <a className="link-register" href="#" onClick={(e) => { e.preventDefault(); openRegisterModal(); }}>
            Register
          </a>
          <a className="btn btn-dark" href="#" onClick={(e) => { e.preventDefault(); openLoginModal(); }}>
            <span className="material-symbols-outlined">login</span>
            Sign In
          </a>
        </>
      )
    } else if (location.pathname === '/test-booking') {
      return (
        <Link className="btn btn-dark" to="/dashboard">
          <span className="material-symbols-outlined"> dashboard </span>
          Dashboard
        </Link>
      )
    } else if (location.pathname === '/dashboard') {
      return (
        <Link className="btn btn-dark" to="/test-booking">
          <span className="material-symbols-outlined"> bookmark </span>
          Book Test
        </Link>
      )
    } else if (location.pathname === '/report-view') {
      return (
        <Link className="btn btn-dark" to="/feedback">
          <span className="material-symbols-outlined"> rate_review </span>
          Leave Feedback
        </Link>
      )
    } else if (location.pathname === '/feedback') {
      return (
        <Link className="btn btn-dark" to="/test-booking">
          <span className="material-symbols-outlined"> bookmark </span>
          Book Test
        </Link>
      )
    }
    return null
  }

  return (
    <>
      <header className="top-nav">
        <Link className="brand" to="/" aria-label="LabCare Home">
          <img className="brand-img" src={logoImage} alt="LabCare logo" />
          <span className="brand-name">LabCare</span>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/test-booking">Tests</Link>
          <Link to="/report-view">Reports</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/feedback">Feedback</Link>
        </nav>
        <div className="nav-actions">
          {renderNavActions()}
        </div>
      </header>
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={closeLoginModal} 
        onSwitchToRegister={switchToRegister}
      />
      <RegisterModal 
        isOpen={registerModalOpen} 
        onClose={closeRegisterModal} 
        onSwitchToLogin={switchToLogin}
      />
    </>
  )
}

export default Header

