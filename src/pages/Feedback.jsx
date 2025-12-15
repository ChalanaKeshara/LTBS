import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Feedback() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [successMessage, setSuccessMessage] = React.useState('')
  const [rating, setRating] = React.useState(0)
  const [hoveredRating, setHoveredRating] = React.useState(0)

  // Example feedbacks
  const exampleFeedbacks = [
    {
      id: 'FB-001',
      fullName: 'D.G.C Keshara',
      email: 'keshara@example.com',
      rating: 5,
      feedback: 'Excellent service! The home sample collection was very convenient and the phlebotomist was professional and punctual. Received my reports within 24 hours as promised. Highly recommend LabCare for all lab test needs.',
      createdAt: '2025-01-15T10:30:00Z'
    },
    {
      id: 'FB-002',
      fullName: 'Hirusha Prabash',
      email: 'hirusha@example.com',
      rating: 4,
      feedback: 'Great experience overall. The booking process was smooth and the staff was friendly. Reports were accurate and easy to understand. Only minor suggestion would be to expand the test menu a bit more.',
      createdAt: '2025-01-14T14:20:00Z'
    },
    {
      id: 'FB-003',
      fullName: 'Samidu',
      email: 'samidu@example.com',
      rating: 5,
      feedback: 'Outstanding service! The online booking system is user-friendly and the home collection service saved me a lot of time. The reports came quickly via email and were very detailed. Will definitely use LabCare again.',
      createdAt: '2025-01-13T09:15:00Z'
    },
    {
      id: 'FB-004',
      fullName: 'Bawantha Dudiranaga',
      email: 'bawantha@example.com',
      rating: 4,
      feedback: 'Very satisfied with the service. The customer support team was helpful when I had questions about my test results. The dashboard feature makes it easy to track all my bookings and reports in one place.',
      createdAt: '2025-01-12T16:45:00Z'
    }
  ]

  const ratingLabels = {
    1: 'Poor',
    2: 'Needs improvement',
    3: 'Okay',
    4: 'Good',
    5: 'Excellent'
  }

  const handleStarClick = (value) => {
    setRating(value)
  }

  const handleStarHover = (value) => {
    setHoveredRating(value)
  }

  const handleStarLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      // Show error message instead of alert
      setSuccessMessage('Please login first to submit feedback')
      setTimeout(() => setSuccessMessage(''), 3000)
      return
    }

    const formData = new FormData(e.target)
    const feedbackData = {
      id: `FB-${Date.now()}`,
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      bookingId: formData.get('bookingId'),
      rating: formData.get('rating'),
      feedback: formData.get('feedback'),
      createdAt: new Date().toISOString()
    }

    // Save feedback to localStorage
    const feedbacks = JSON.parse(localStorage.getItem('labcare_feedbacks') || '[]')
    feedbacks.push(feedbackData)
    localStorage.setItem('labcare_feedbacks', JSON.stringify(feedbacks))

    setSuccessMessage('Thank you for your feedback! Redirecting to dashboard...')
    
    setTimeout(() => {
      e.target.reset()
      setRating(0)
      setHoveredRating(0)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <main className="hero">
      <div className="hero-copy">
        <p className="kicker">Feedback</p>
        <h1 className="headline">Tell us about your experience</h1>
        <p className="subhead">
          Your feedback helps us improve home collection, reporting, and support.
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
              Email
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <label>
              Booking / Report ID
              <input type="text" name="bookingId" placeholder="Optional" />
            </label>
            <label className="full-width">
              Rating
              <div style={{
                marginTop: '8px',
                padding: '20px',
                backgroundColor: '#f8f9ff',
                borderRadius: '12px',
                border: '1px solid #e6e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= (hoveredRating || rating)
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={(e) => {
                          handleStarHover(star)
                          e.currentTarget.style.transform = 'scale(1.1)'
                        }}
                        onMouseLeave={(e) => {
                          handleStarLeave()
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '8px',
                          fontSize: '40px',
                          color: isActive ? '#ffc107' : '#d9d9d9',
                          transition: 'transform 0.2s ease, color 0.2s ease',
                          lineHeight: 1,
                          borderRadius: '8px'
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <span className="material-symbols-outlined" style={{
                          fontSize: '40px',
                          fontVariationSettings: isActive ? '"FILL" 1' : '"FILL" 0',
                          filter: isActive ? 'drop-shadow(0 2px 4px rgba(255, 193, 7, 0.3))' : 'none',
                          transition: 'all 0.2s ease'
                        }}>
                          star
                        </span>
                      </button>
                    )
                  })}
                </div>
                {(rating > 0 || hoveredRating > 0) && (
                  <div style={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: rating > 0 ? '#2162ff' : '#666',
                    fontFamily: 'Roboto, sans-serif',
                    transition: 'color 0.2s ease'
                  }}>
                    {ratingLabels[hoveredRating || rating]}
                  </div>
                )}
                {rating === 0 && hoveredRating === 0 && (
                  <div style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#999',
                    fontStyle: 'italic'
                  }}>
                    Click on a star to rate
                  </div>
                )}
                <input 
                  type="hidden" 
                  name="rating" 
                  value={rating > 0 ? `${rating} - ${ratingLabels[rating]}` : ''} 
                  required 
                />
              </div>
            </label>
            <label className="full-width">
              Feedback
              <textarea name="feedback" rows="4" placeholder="Share details about booking, collection, or reports" required></textarea>
            </label>
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
              <span className="material-symbols-outlined"> send </span>
              Submit Feedback
            </button>
            <Link className="btn btn-light" to="/dashboard">
              <span className="material-symbols-outlined"> dashboard </span>
              Back to Dashboard
            </Link>
          </div>
        </form>
      </div>

      {/* Example Feedbacks Section */}
      <div style={{ 
        marginTop: '64px', 
        width: '100%',
        maxWidth: '1440px',
        padding: '0 32px'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px' 
        }}>
          <p className="kicker" style={{ marginBottom: '8px' }}>What Our Customers Say</p>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 700, 
            marginBottom: '12px',
            color: '#000'
          }}>
            Recent Feedback
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            See what our customers have to say about their experience with LabCare
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {exampleFeedbacks.map((feedback) => (
            <div key={feedback.id} style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e6e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    marginBottom: '4px',
                    color: '#000'
                  }}>
                    {feedback.fullName}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    margin: 0
                  }}>
                    {feedback.email}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '4px'
                }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined"
                      style={{
                        fontSize: '20px',
                        color: star <= feedback.rating ? '#ffc107' : '#d9d9d9',
                        fontVariationSettings: star <= feedback.rating ? '"FILL" 1' : '"FILL" 0'
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#333',
                margin: 0,
                marginBottom: '12px'
              }}>
                {feedback.feedback}
              </p>
              <div style={{
                fontSize: '12px',
                color: '#999',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  schedule
                </span>
                {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Feedback

