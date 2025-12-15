import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('labcare_user')
    const savedAuth = localStorage.getItem('labcare_auth')
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const register = (userData) => {
    // Store user data
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('labcare_user', JSON.stringify(newUser))
    localStorage.setItem('labcare_auth', 'false') // Not logged in yet
    return newUser
  }

  const login = (email, password) => {
    // Simple login - accept any input and grant access
    // If user exists, use that data, otherwise create a simple user
    const savedUser = localStorage.getItem('labcare_user')
    let user
    
    if (savedUser) {
      user = JSON.parse(savedUser)
    } else {
      // Create a simple user with whatever email was entered
      user = {
        id: Date.now().toString(),
        email: email || 'user@example.com',
        fullName: email || 'User',
        createdAt: new Date().toISOString()
      }
      localStorage.setItem('labcare_user', JSON.stringify(user))
    }
    
    setUser(user)
    setIsAuthenticated(true)
    localStorage.setItem('labcare_auth', 'true')
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.setItem('labcare_auth', 'false')
  }

  const value = {
    user,
    isAuthenticated,
    register,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

