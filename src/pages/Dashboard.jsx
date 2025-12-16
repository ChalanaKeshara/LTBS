import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import doctorImage from '../assets/doctor.png'

// Example reports for display if no reports exist
const exampleReports = [
  {
    id: 'LBC-2025-1042',
    testType: 'Complete Blood Count (CBC)',
    date: 'Dec 1, 2025',
    status: 'Ready'
  },
  {
    id: 'LBC-2025-0991',
    testType: 'Lipid Profile',
    date: 'Nov 20, 2025',
    status: 'Ready'
  },
  {
    id: 'LBC-2025-0880',
    testType: 'Thyroid Panel',
    date: 'Nov 5, 2025',
    status: 'Ready'
  }
]

function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const [bookings, setBookings] = React.useState([])
  const [reports, setReports] = React.useState([])
  const [upcomingBookings, setUpcomingBookings] = React.useState(0)
  const [availableReports, setAvailableReports] = React.useState(0)
  const [feedbacksCount, setFeedbacksCount] = React.useState(0)

  React.useEffect(() => {
    // Load bookings and reports from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('labcare_bookings') || '[]')
    const savedReports = JSON.parse(localStorage.getItem('labcare_reports') || '[]')
    const savedFeedbacks = JSON.parse(localStorage.getItem('labcare_feedbacks') || '[]')
    
    // Sort bookings by date (upcoming first)
    const sortedBookings = savedBookings.sort((a, b) => {
      const dateA = new Date(a.preferredDate + ' ' + a.preferredTime)
      const dateB = new Date(b.preferredDate + ' ' + b.preferredTime)
      return dateA - dateB
    })
    
    setBookings(sortedBookings)
    setReports(savedReports)
    
    // Calculate stats
    const today = new Date()
    const upcomingCount = sortedBookings.filter(booking => {
      const bookingDate = new Date(booking.preferredDate + ' ' + booking.preferredTime)
      return bookingDate >= today && booking.status !== 'Completed'
    }).length
    
    const reportsCount = savedReports.length > 0 ? savedReports.length : exampleReports.length
    const feedbacksCount = savedFeedbacks.length
    
    setUpcomingBookings(upcomingCount)
    setAvailableReports(reportsCount)
    setFeedbacksCount(feedbacksCount)
  }, [])

  return (
    <main className="hero">
      <div className="hero-copy">
        <p className="kicker">Dashboard</p>
        <h1 className="headline">Your health at a glance</h1>
        <p className="subhead">
          Track bookings, reports, and feedback in one place.
        </p>
        <div className="cta-row">
          <Link className="btn btn-dark" to="/test-booking">
            <span className="material-symbols-outlined"> add_task </span>
            New Booking
          </Link>
          <Link className="btn btn-light" to="/report-view">
            <span className="material-symbols-outlined"> description </span>
            View Reports
          </Link>
        </div>
        <div className="stats">
          <div className="stat-block">
            <div className="stat-title">Upcoming</div>
            <div className="stat-number">{upcomingBookings}</div>
            <div className="stat-label">Scheduled tests</div>
          </div>
          <span className="divider"></span>
          <div className="stat-block">
            <div className="stat-title">Reports</div>
            <div className="stat-number">{availableReports}</div>
            <div className="stat-label">Available</div>
          </div>
          <span className="divider"></span>
          <div className="stat-block">
            <div className="stat-title">Feedback</div>
            <div className="stat-number">{feedbacksCount}</div>
            <div className="stat-label">Submitted</div>
          </div>
        </div>
      </div>
      <div className="hero-visual" style={{ justifyContent: 'flex-start', flexDirection: 'column', gap: '24px' }}>
        {/* Next Booking Card */}
        {bookings.length > 0 && bookings[0] ? (
          <div className="result-card" style={{ position: 'static', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', width: '100%' }}>
            <div className="result-thumb">
              <img src={doctorImage} alt="Doctor" loading="lazy" width="96" height="96" />
            </div>
            <div className="result-text">
              <p className="result-title">Next visit</p>
              <p className="result-subtitle">
                {bookings[0].collectionMethod} - {bookings[0].preferredDate} {bookings[0].preferredTime}
              </p>
            </div>
          </div>
        ) : (
          <div className="result-card" style={{ position: 'static', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', width: '100%' }}>
            <div className="result-thumb">
              <img src={doctorImage} alt="Doctor" loading="lazy" width="96" height="96" />
            </div>
            <div className="result-text">
              <p className="result-title">No upcoming bookings</p>
              <p className="result-subtitle">Book your first test to get started</p>
            </div>
          </div>
        )}

        {/* Recent Bookings List */}
        {bookings.length > 0 && (
          <div className="form-card" style={{ padding: '24px', width: '100%' }}>
            <h3 style={{ 
              marginTop: 0, 
              marginBottom: '20px', 
              fontSize: '20px', 
              fontWeight: 700,
              color: '#0a0a1a'
            }}>
              Recent Bookings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {bookings.slice(0, 5).map((booking) => (
                <div 
                  key={booking.id}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #e6e8f0',
                    background: '#ffffff',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#0a0a1a',
                        marginBottom: '4px'
                      }}>
                        {booking.testType}
                      </div>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px'
                      }}>
                        Booking ID: {booking.id}
                      </div>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#666',
                        display: 'flex',
                        gap: '16px',
                        flexWrap: 'wrap'
                      }}>
                        <span>📅 {booking.preferredDate}</span>
                        <span>🕐 {booking.preferredTime}</span>
                        <span>📍 {booking.collectionMethod}</span>
                      </div>
                    </div>
                    <div style={{
                      textAlign: 'right',
                      marginLeft: '16px'
                    }}>
                      <div style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        backgroundColor: booking.status === 'Completed' ? '#e8f5e9' : '#fff3e0',
                        color: booking.status === 'Completed' ? '#2e7d32' : '#f57c00',
                        fontSize: '12px',
                        fontWeight: 600,
                        marginBottom: '8px'
                      }}>
                        {booking.status}
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#2162ff'
                      }}>
                        LKR {booking.price?.toLocaleString('en-US') || '0'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {bookings.length > 5 && (
              <Link 
                to="/test-booking" 
                style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  marginTop: '16px',
                  color: '#2162ff',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                View all bookings →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Dashboard

