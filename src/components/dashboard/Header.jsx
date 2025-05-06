"use client"

import { useState, useEffect } from "react"

const Header = ({ currentUser }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const formattedDate = currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold text-amber-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          {formattedDate} | {formattedTime}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span className="text-xl">🔔</span>
          </button>
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center mr-2">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="font-medium text-gray-700">{currentUser?.name}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
