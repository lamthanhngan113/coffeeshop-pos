"use client"

import { useState } from "react"
import LoginPage from "./components/auth/LoginPage"
import SignupPage from "./components/auth/SignupPage"
import Dashboard from "./components/dashboard/Dashboard"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("login")
  const [currentUser, setCurrentUser] = useState(null)

  // Simple navigation without React Router
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  // Simple login function
  const handleLogin = (email, password) => {
    // In a real app, you would validate credentials against a backend
    const user = {
      id: "emp-" + Math.floor(Math.random() * 1000),
      email,
      name: email.split("@")[0],
      role: "cashier",
    }

    setCurrentUser(user)
    navigateTo("dashboard")
    return user
  }

  // Simple signup function
  const handleSignup = (name, email, password) => {
    const user = {
      id: "emp-" + Math.floor(Math.random() * 1000),
      email,
      name,
      role: "cashier",
    }

    setCurrentUser(user)
    navigateTo("dashboard")
    return user
  }

  // Simple logout function
  const handleLogout = () => {
    setCurrentUser(null)
    navigateTo("login")
  }

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage onLogin={handleLogin} navigateTo={navigateTo} />
      case "signup":
        return <SignupPage onSignup={handleSignup} navigateTo={navigateTo} />
      case "dashboard":
        return <Dashboard currentUser={currentUser} onLogout={handleLogout} />
      default:
        return <LoginPage onLogin={handleLogin} navigateTo={navigateTo} />
    }
  }

  return <div className="App">{renderPage()}</div>
}

export default App
