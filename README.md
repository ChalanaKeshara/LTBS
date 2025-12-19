# LabCare - Lab Test Booking System

**Software Process Modeling Assignment**  
**Group: Group_01**  
**LAB TEST BOOKING SYSTEM**

---

## 📋 Table of Contents

1. ProjectOverview
2. Objectives
3. FeaturesImplemented
4. ProjectStructure
5. Contributors

---

## 🎯 Project Overview

LabCare is a modern, responsive web application designed to streamline the lab test booking process. The system allows users to book lab tests online, view reports, manage appointments, and provide feedback. This project was developed as part of the Software Process Modeling course assignment, demonstrating the application of modern web development practices and React.js framework.

### Problem Statement

Traditional lab test booking systems often require physical visits or phone calls, leading to inefficiencies and inconvenience for patients. LabCare addresses these challenges by providing a user-friendly digital platform for:

- Online test booking with home sample collection options
- Real-time report access
- Appointment management
- User feedback collection

---

## 🎯 Objectives

1. **User Experience**: Create an intuitive and user-friendly interface for booking lab tests
2. **Accessibility**: Enable users to book tests and access reports from anywhere
3. **Efficiency**: Streamline the booking process with automated scheduling
4. **Transparency**: Display test pricing and availability clearly
5. **Modern Technology**: Implement using React.js and modern web development practices

---

## ✨ Features Implemented

### 1. **Authentication System**

- User registration with form validation
- Simple login system (accepts any credentials for demo purposes)
- Session management using React Context API
- User profile display in header
- Logout functionality

### 2. **Home Page**

- Welcome page with statistics (10K+ Tests Booked, 500+ Lab Tests, 98% Satisfaction)
- Quick action buttons (Book Test, Dashboard)
- Hero section with visual elements
- Responsive design

### 3. **Test Booking System**

- Comprehensive booking form with:
  - Personal information fields (Name, Contact, Email)
  - Test type selection with dynamic pricing
  - Date and time selection
  - Collection method (Home collection / Walk-in)
  - Address input for home collection
  - Notes section
             ** Dynamic Pricing System**:
  - Complete Blood Count (CBC): LKR 1,500
  - Lipid Profile: LKR 2,500
  - Thyroid Panel: LKR 3,000
  - COVID-19 PCR: LKR 5,000
  - Liver Function Test: LKR 2,000
  - When a test is selected, its price is added to the real-time total.
  -Multiple selections allowed.
- Real-time price display
- Total amount calculation
- Booking confirmation with navigation

### 4. **Dashboard**

- Health overview statistics:
  - Upcoming appointments: 0
  - Available reports: 3
  - Feedback submitted: 1
  - Satisfaction rate: 98%
- Quick action buttons
- Next appointment card display
- Booking history integration

### 5. **Reports View**

- Example reports display (3 reports)
- Each report shows:
  - Report ID
  - Test type
  - Sample collection date
  - Status badge
  - **Price in LKR**
- View and Download buttons for each report
- **Total amount paid** section with gradient design
- Attractive card-based layout with hover effects

### 6. **Feedback System**

- Feedback form with:
  - User information
  - Booking/Report ID (optional)
  - Rating system (1-5 scale)
  - Detailed feedback textarea
  - SMS/Email Notifications: Confirmation + reminders before test
- Form submission handling
- Success messages

### 7. **Navigation & UI Components**

- Responsive header with context-aware buttons
- Dynamic footer (full on home, simplified on other pages)
- Modal components for login/registration
- Material Symbols icons integration
- Consistent color scheme and typography

---

## 📁 Project Structure

```
LTBS/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header with auth buttons
│   │   ├── Footer.jsx           # Site footer component
│   │   ├── LoginModal.jsx       # Login modal component
│   │   └── RegisterModal.jsx    # Registration modal component
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context provider
│   ├── pages/
│   │   ├── Home.jsx             # Home page component
│   │   ├── TestBooking.jsx      # Test booking page with pricing
│   │   ├── Dashboard.jsx       # User dashboard
│   │   ├── Reports.jsx          
│   │   └── Feedback.jsx          # Feedback submission page
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # React entry point
│   └── styles.css               # Global stylesheet
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

## 👥 Contributors

**Group_01** - Software Process Modeling Assignment

LAB TEST BOOKING SYSTEM

### Team Members

- D.G.C Keshara [GWU/HICT/2022/29]
- W.H.H.P Hettiarachchi [GWU/HICT/2022/04]
- K.S Prasad [GWU/HICT/2022/02]
- W.M.B.D Wijethunga [GWU/HICT/2022/67]

### Project Timeline

- **Start Date**: [2025/11/22]
- **Completion Date**: [2025/12/15]
- **Duration**: [23 Days]

## 📝 Notes

- This is a demonstration project for academic purposes
- Authentication accepts any credentials for demo purposes
- Data is stored in browser localStorage (cleared on browser data clear)
- All prices are in Sri Lankan Rupees (LKR)

---

## 📄 License

© 2025 LabCare. All rights reserved.

This project is developed for educational purposes as part of the Software Process Modeling course assignment.

---

## 🙏 Acknowledgments

- React.js community
- Vite development team
- Material Symbols for icons
- Google Fonts for typography

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: Completed
