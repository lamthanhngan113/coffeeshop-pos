"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import CoffeeShopPOS from "../pos/CoffeeShopPOS"
import OrdersPage from "../orders/OrdersPage"
import ProductsPage from "../products/ProductsPage"
import EmployeesPage from "../employees/EmployeesPage"
import ReportsPage from "../reports/ReportsPage"
import SettingsPage from "../settings/SettingsPage"

const Dashboard = ({ currentUser, onLogout }) => {
  const [activePage, setActivePage] = useState("pos")
  const [completedOrders, setCompletedOrders] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [currency, setCurrency] = useState("USD")

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }, [darkMode])

  // Function to add a completed order
  const addCompletedOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString(),
      status: "Completed",
      employee: currentUser?.name || "Unknown",
    }
    setCompletedOrders((prev) => [newOrder, ...prev])
  }

  // Simple content renderer based on active page
  const renderContent = () => {
    switch (activePage) {
      case "pos":
        return <CoffeeShopPOS onOrderComplete={addCompletedOrder} />
      case "orders":
        return <OrdersPage orders={completedOrders} />
      case "products":
        return <ProductsPage />
      case "employees":
        return <EmployeesPage currentUser={currentUser} />
      case "reports":
        return <ReportsPage orders={completedOrders} />
      case "settings":
        return (
          <SettingsPage
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            language={language}
            setLanguage={setLanguage}
            currency={currency}
            setCurrency={setCurrency}
          />
        )
      default:
        return <CoffeeShopPOS onOrderComplete={addCompletedOrder} />
    }
  }

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      <Sidebar
        currentUser={currentUser}
        onLogout={onLogout}
        activePage={activePage}
        setActivePage={setActivePage}
        darkMode={darkMode}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentUser={currentUser} darkMode={darkMode} />
        <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
      </div>
    </div>
  )
}

export default Dashboard
