import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    
    // Simple login - accept any input
    login(email, password)
    
    e.target.reset()
    onClose()
    // Navigate to dashboard after login
    setTimeout(() => {
      navigate('/dashboard')
      setIsLoading(false)
    }, 300)
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
        <h2>Sign In</h2>
        <form id="loginForm" className="form" onSubmit={handleSubmit} autoComplete="off">
          {/* Hidden dummy fields to prevent browser password saving */}
          <input type="text" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
          <input type="password" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
          <div className="form-group">
            <label htmlFor="loginEmail">Email Address</label>
            <input 
              type="email" 
              id="loginEmail" 
              name="email" 
              placeholder="Enter your email" 
              autoComplete="off"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input 
              type="password" 
              id="loginPassword" 
              name="password" 
              placeholder="Enter your password" 
              autoComplete="new-password"
              required 
            />
            {error && (
              <span style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>
                {error}
              </span>
            )}
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="rememberMe" name="remember" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="btn btn-dark full-width" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          <p className="form-footer">
            Don't have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
              Register here
            </a>
          </p>
          <p className="form-footer"><a href="#">Forgot password?</a></p>
        </form>
      </div>
    </div>
  )
}

export default LoginModal

