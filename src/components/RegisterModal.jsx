import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [successMessage, setSuccessMessage] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    // Simple registration - accept any input, no password validation
    const userData = {
      fullName: formData.get('fullName') || 'User',
      email: formData.get('email') || 'user@example.com',
      phone: formData.get('phone') || '',
      password: formData.get('registerPassword') || ''
    }
    
    register(userData)
    setSuccessMessage('Registration successful! Redirecting to login...')
    
    // Close modal and switch to login after 1.5 seconds
    setTimeout(() => {
      e.target.reset()
      setSuccessMessage('')
      onClose()
      onSwitchToLogin()
    }, 1500)
  }


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Create Account</h2>
        <form id="registerForm" className="form" onSubmit={handleSubmit} autoComplete="off">
          {/* Hidden dummy fields to prevent browser password saving */}
          <input type="text" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
          <input type="password" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              placeholder="Enter your full name" 
              autoComplete="off"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="registerEmail">Email Address</label>
            <input 
              type="email" 
              id="registerEmail" 
              name="email" 
              placeholder="Enter your email" 
              autoComplete="off"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="Enter your phone number" 
              autoComplete="off"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="registerPassword">Password</label>
            <input 
              type="password" 
              id="registerPassword" 
              name="registerPassword" 
              placeholder="Enter any password" 
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Enter any password" 
              autoComplete="new-password"
            />
            {successMessage && (
              <span style={{ color: '#2e7d32', fontSize: '12px', marginTop: '4px' }}>
                {successMessage}
              </span>
            )}
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="agreeTerms" name="agree" />
            <label htmlFor="agreeTerms">I agree to the Terms and Conditions</label>
          </div>
          <button type="submit" className="btn btn-dark full-width">Create Account</button>
          <p className="form-footer">
            Already have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal

