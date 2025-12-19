import React from 'react'
import { Link } from 'react-router-dom'

// Example reports with test types and prices
const exampleReports = [
  {
    id: 'LBC-2025-1042',
    testType: 'Complete Blood Count (CBC)',
    price: 1500,
    date: 'Dec 1, 2025',
    status: 'Ready'
  },
  {
    id: 'LBC-2025-0991',
    testType: 'Lipid Profile',
    price: 2500,
    date: 'Nov 20, 2025',
    status: 'Ready'
  },
  {
    id: 'LBC-2025-0880',
    testType: 'Thyroid Panel',
    price: 3000,
    date: 'Nov 5, 2025',
    status: 'Ready'
  }
]

function Reports() {
  const [reports, setReports] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchResult, setSearchResult] = React.useState(null)

  React.useEffect(() => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem('labcare_reports') || '[]')
    
    // Merge with example reports if no saved reports exist
    if (savedReports.length === 0) {
      setReports(exampleReports)
      // Save example reports to localStorage
      localStorage.setItem('labcare_reports', JSON.stringify(exampleReports))
    } else {
      setReports(savedReports)
    }
  }, [])

  const displayReports = reports.length > 0 ? reports : exampleReports
  const totalPrice = displayReports.reduce((sum, report) => sum + (report.price || 0), 0)

  const handleSearch = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const reportId = formData.get('reportId') || searchQuery
    
    if (!reportId.trim()) {
      setSearchResult(null)
      return
    }
    
    // Search for report
    const foundReport = displayReports.find(r => 
      r.id.toLowerCase().includes(reportId.toLowerCase().trim())
    )
    
    if (foundReport) {
      setSearchResult(foundReport)
    } else {
      setSearchResult({ error: true, message: 'Report not found. Please check the Report ID and try again.' })
    }
  }

  const handleView = (reportId) => {
    const report = displayReports.find(r => r.id === reportId)
    if (report) {
      alert(`Viewing report: ${report.testType}\nReport ID: ${report.id}\nDate: ${report.date}\nStatus: ${report.status}`)
    }
  }

  const handleDownload = (reportId) => {
    const report = displayReports.find(r => r.id === reportId)
    if (report) {
      alert(`Downloading report: ${report.testType}\nReport ID: ${report.id}\n\nThis would trigger a PDF download in a real application.`)
    }
  }

  return (
    <main className="hero">
      <div className="hero-copy">
        <p className="kicker">Reports</p>
        <h1 className="headline">Access your lab reports</h1>
        <p className="subhead">
          Enter your Report ID or browse your recent results.
        </p>
        <form className="form-inline" onSubmit={handleSearch}>
          <input 
            type="text" 
            name="reportId"
            placeholder="Enter Report ID (e.g., LBC-2025-1234)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required 
          />
          <button type="submit" className="btn btn-dark">
            <span className="material-symbols-outlined"> search </span>
            Find Report
          </button>
        </form>
        {searchResult && (
          <div style={{
            marginTop: '20px',
            padding: searchResult.error ? '16px' : '20px',
            borderRadius: '12px',
            backgroundColor: searchResult.error ? '#ffebee' : '#e8f5e9',
            border: `1px solid ${searchResult.error ? '#ffcdd2' : '#c8e6c9'}`,
            color: searchResult.error ? '#c62828' : '#2e7d32'
          }}>
            {searchResult.error ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="material-symbols-outlined">error</span>
                <span>{searchResult.message}</span>
              </div>
            ) : (
              <div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span className="material-symbols-outlined">check_circle</span>
                  Report Found
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Report ID:</strong> {searchResult.id}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Test Type:</strong> {searchResult.testType}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Date:</strong> {searchResult.date}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Status:</strong> <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backgroundColor: '#c8e6c9',
                    color: '#2e7d32',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginLeft: '8px'
                  }}>{searchResult.status}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn btn-light" 
                    type="button" 
                    onClick={() => handleView(searchResult.id)}
                  >
                    <span className="material-symbols-outlined"> visibility </span>
                    View
                  </button>
                  <button 
                    className="btn btn-dark" 
                    type="button" 
                    onClick={() => handleDownload(searchResult.id)}
                  >
                    <span className="material-symbols-outlined"> download </span>
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="hero-visual" style={{ justifyContent: 'flex-start' }}>
        <div className="report-list form-card" style={{ padding: '24px' }}>
          <h3 style={{ 
            marginTop: 0, 
            marginBottom: '20px', 
            fontSize: '20px', 
            fontWeight: 700,
            color: '#0a0a1a'
          }}>
            Recent Reports
          </h3>
          
          {displayReports.map((report, index) => (
            <div 
              key={report.id}
              style={{
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e6e8f0',
                background: '#ffffff',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#0a0a1a',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {report.id}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      {report.status}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#2162ff',
                    marginBottom: '8px',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    {report.testType}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Sample collected: {report.date}
                  </div>
                </div>
                <div style={{
                  textAlign: 'right',
                  marginLeft: '20px'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '4px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Price
                  </div>
                  <div style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#2162ff',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    LKR {report.price.toLocaleString('en-US')}
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #e6e8f0'
              }}>
                <button 
                  className="btn btn-light" 
                  type="button" 
                  onClick={() => handleView(report.id)}
                  style={{ minWidth: '120px' }}
                >
                  <span className="material-symbols-outlined"> visibility </span>
                  View
                </button>
                <button 
                  className="btn btn-dark" 
                  type="button" 
                  onClick={() => handleDownload(report.id)}
                  style={{ minWidth: '140px' }}
                >
                  <span className="material-symbols-outlined"> download </span>
                  Download
                </button>
              </div>
            </div>
          ))}

          {/* Total Price Section */}
          <div style={{
            marginTop: '24px',
            padding: '20px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2162ff 0%, #0a0a1a 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 16px rgba(33, 98, 255, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  fontSize: '14px',
                  opacity: 0.9,
                  marginBottom: '4px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Total Amount Paid
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  LKR {totalPrice.toLocaleString('en-US')}
                </div>
              </div>
              <div style={{
                fontSize: '40px',
                opacity: 0.2
              }}>
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
            </div>
            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '12px',
              opacity: 0.8
            }}>
              {displayReports.length} report{displayReports.length > 1 ? 's' : ''} • All reports ready
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Reports
