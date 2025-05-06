"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import CoffeeShopPOS from "../pos/CoffeeShopPOS"

const Dashboard = ({ currentUser, onLogout }) => {
  const [activePage, setActivePage] = useState("pos")

  // Simple content renderer based on active page
  const renderContent = () => {
    switch (activePage) {
      case "pos":
        return <CoffeeShopPOS />
      case "orders":
        return <div className="p-4">Orders page coming soon</div>
      case "products":
        return <div className="p-4">Products page coming soon</div>
      case "employees":
        return <div className="p-4">Employees page coming soon</div>
      case "reports":
        return <div className="p-4">Reports page coming soon</div>
      case "settings":
        return <div className="p-4">Settings page coming soon</div>
      default:
        return <CoffeeShopPOS />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentUser={currentUser} onLogout={onLogout} activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentUser={currentUser} />
        <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
      </div>
    </div>
  )
}

export default Dashboard
