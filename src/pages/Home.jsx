import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import doctorImage from '../assets/doctor.png'

function Home() {
  return (
    <main className="hero">
      <div className="hero-copy">
        <p className="kicker">Your Health</p>
        <h1 className="headline">Just a Click Away</h1>
        <p className="subhead">
          Book lab tests online, get home sample collection...
        </p>

        <div className="cta-row">
          <Link className="btn btn-dark" to="/test-booking">
            <span className="material-symbols-outlined"> bookmark </span>
            Book Test
          </Link>
          <Link className="btn btn-light" to="/dashboard">
            <span className="material-symbols-outlined"> find_replace </span>
            Dashboard
          </Link>
        </div>

        <div className="stats">
          <div className="stat-block">
            <div className="stat-title">Overview</div>
            <div className="stat-number">10K+</div>
            <div className="stat-label">Tests Booked</div>
          </div>
          <span className="divider"></span>
          <div className="stat-block">
            <div className="stat-number">500+</div>
            <div className="stat-label">Lab Tests</div>
          </div>
          <span className="divider"></span>
          <div className="stat-block">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image">
          <img src={heroImage} alt="Lab technician" loading="lazy" width="640" height="360" />
        </div>
        <div className="result-card">
          <div className="result-thumb">
            <img src={doctorImage} alt="Doctor" loading="lazy" width="120" height="120" />
          </div>
          <div className="result-text">
            <p className="result-title">Results Ready!</p>
            <p className="result-subtitle">Delivered in 24 hours</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home




