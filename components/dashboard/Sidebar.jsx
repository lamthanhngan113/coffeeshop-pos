"use client"

import { useState } from "react"

const Sidebar = ({ currentUser, onLogout, activePage, setActivePage, darkMode }) => {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { name: "POS", path: "pos", icon: "💰" },
    { name: "Orders", path: "orders", icon: "📋" },
    { name: "Products", path: "products", icon: "☕" },
    { name: "Employees", path: "employees", icon: "👥" },
    { name: "Reports", path: "reports", icon: "📊" },
    { name: "Settings", path: "settings", icon: "⚙️" },
  ]

  return (
    <div
      className={`${darkMode ? "bg-gray-800" : "bg-amber-900"} text-white h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      <div
        className={`flex items-center justify-between p-4 border-b ${darkMode ? "border-gray-700" : "border-amber-800"}`}
      >
        {!collapsed && (
          <div>
            <h2 className="font-bold text-xl">Brew Haven</h2>
            <p className={`text-xs ${darkMode ? "text-gray-300" : "text-amber-200"}`}>Coffee Shop POS</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1 rounded ${darkMode ? "hover:bg-gray-700" : "hover:bg-amber-800"} focus:outline-none`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.path)}
              className={`flex items-center px-3 py-2 rounded-md transition-colors w-full text-left ${
                activePage === item.path
                  ? darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-amber-700 text-white"
                  : darkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-amber-100 hover:bg-amber-800 hover:text-white"
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-amber-800"}`}>
        {!collapsed && (
          <div className="mb-2">
            <p className="font-medium truncate">{currentUser?.name}</p>
            <p className={`text-xs ${darkMode ? "text-gray-300" : "text-amber-200"} truncate`}>{currentUser?.email}</p>
          </div>
        )}
        <button
          onClick={onLogout}
          className={`flex items-center px-3 py-2 rounded-md ${
            darkMode
              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
              : "text-amber-100 hover:bg-amber-800 hover:text-white"
          } w-full transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <span className="text-xl mr-3">🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
