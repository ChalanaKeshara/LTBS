import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Test pricing in LKR
const testPrices = {
  'Complete Blood Count (CBC)': 1500,
  'Lipid Profile': 2500,
  'Thyroid Panel': 3000,
  'COVID-19 PCR': 5000,
  'Liver Function Test': 2000
}

function TestBooking() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [successMessage, setSuccessMessage] = React.useState('')
  const [selectedTestType, setSelectedTestType] = React.useState('')
  const [selectedPrice, setSelectedPrice] = React.useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setSuccessMessage('Please login first to book a test')
      setTimeout(() => setSuccessMessage(''), 3000)
      return
    }

    const formData = new FormData(e.target)
    const testType = formData.get('testType')
    const price = testPrices[testType] || 0
    
    const bookingData = {
      id: `LBC-${Date.now()}`,
      fullName: formData.get('fullName'),
      contactNumber: formData.get('contactNumber'),
      email: formData.get('email'),
      testType: testType,
      price: price,
      preferredDate: formData.get('preferredDate'),
      preferredTime: formData.get('preferredTime'),
      collectionMethod: formData.get('collectionMethod'),
      address: formData.get('address'),
      notes: formData.get('notes'),
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    }

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('labcare_bookings') || '[]')
    bookings.push(bookingData)
    localStorage.setItem('labcare_bookings', JSON.stringify(bookings))

    setSuccessMessage('Booking confirmed! Redirecting to dashboard...')
    
    setTimeout(() => {
      e.target.reset()
      setSelectedTestType('')
      setSelectedPrice(0)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <main className="hero">
      <div className="hero-copy">
        <p className="kicker">Book Test</p>
        <h1 className="headline">Schedule your lab test</h1>
        <p className="subhead">
          Choose the test, pick a date/time, and opt for home collection.
        </p>
      </div>
      <div className="hero-visual" style={{ justifyContent: 'flex-start' }}>
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full Name
              <input type="text" name="fullName" placeholder="John Doe" required />
            </label>
            <label>
              Contact Number
              <input type="tel" name="contactNumber" placeholder="+94 771234567" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <label>
              Test Type
              <select 
                name="testType" 
                required
                value={selectedTestType}
                onChange={(e) => {
                  const testType = e.target.value
                  setSelectedTestType(testType)
                  setSelectedPrice(testPrices[testType] || 0)
                }}
              >
                <option value="">Select a test</option>
                <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                <option value="Lipid Profile">Lipid Profile</option>
                <option value="Thyroid Panel">Thyroid Panel</option>
                <option value="COVID-19 PCR">COVID-19 PCR</option>
                <option value="Liver Function Test">Liver Function Test</option>
              </select>
              {selectedPrice > 0 && (
                <div style={{ 
                  marginTop: '8px', 
                  fontSize: '16px', 
                  fontWeight: 700, 
                  color: '#2162ff' 
                }}>
                  Price: LKR {selectedPrice.toLocaleString('en-US')}
                </div>
              )}
            </label>
            <label>
              Preferred Date
              <input type="date" name="preferredDate" required />
            </label>
            <label>
              Preferred Time
              <input type="time" name="preferredTime" required />
            </label>
            <label>
              Collection Method
              <select name="collectionMethod" required>
                <option value="">Select</option>
                <option>Home Sample Collection</option>
                <option>Walk-in at Lab</option>
              </select>
            </label>
            <label>
              Address (for home collection)
              <input type="text" name="address" placeholder="Street, City" />
            </label>
            <label className="full-width">
              Notes
              <textarea name="notes" rows="3" placeholder="Any special instructions"></textarea>
            </label>
            {selectedPrice > 0 && (
              <div className="full-width" style={{
                padding: '16px',
                backgroundColor: '#f8f9ff',
                borderRadius: '8px',
                border: '1px solid #e6e8f0',
                marginTop: '8px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  fontSize: '18px',
                  fontWeight: 700
                }}>
                  <span>Total Amount:</span>
                  <span style={{ color: '#2162ff', fontSize: '20px' }}>
                    LKR {selectedPrice.toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            )}
          </div>
          {successMessage && (
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#e8f5e9', 
              color: '#2e7d32', 
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {successMessage}
            </div>
          )}
          <div className="cta-row" style={{ marginTop: '16px' }}>
            <button type="submit" className="btn btn-dark">
              <span className="material-symbols-outlined"> bookmark </span>
              Confirm Booking
            </button>
            <Link className="btn btn-light" to="/dashboard">
              <span className="material-symbols-outlined"> dashboard </span>
              Go to Dashboard
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default TestBooking

