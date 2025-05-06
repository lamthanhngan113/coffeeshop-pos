"use client"

import { useState } from "react"

const SettingsPage = ({ darkMode, setDarkMode, language, setLanguage, currency, setCurrency }) => {
  const [activeTab, setActiveTab] = useState("general")

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
  ]

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b">
        <nav className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "general"
                ? "border-b-2 border-amber-600 text-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "appearance"
                ? "border-b-2 border-amber-600 text-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("appearance")}
          >
            Appearance
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "notifications"
                ? "border-b-2 border-amber-600 text-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "about" ? "border-b-2 border-amber-600 text-amber-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "general" && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">General Settings</h2>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Language</h3>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">Select your preferred language for the interface</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Currency</h3>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.name} ({curr.symbol})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">Select your preferred currency for transactions</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Receipt Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="auto-print" type="checkbox" className="h-4 w-4 text-amber-600 border-gray-300 rounded" />
                  <label htmlFor="auto-print" className="ml-2 text-sm text-gray-700">
                    Automatically print receipt after checkout
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="include-logo"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="include-logo" className="ml-2 text-sm text-gray-700">
                    Include logo on receipts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="include-tax"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="include-tax" className="ml-2 text-sm text-gray-700">
                    Show tax breakdown on receipts
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Appearance Settings</h2>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Theme</h3>
              <div className="flex items-center space-x-4">
                <button
                  className={`px-4 py-2 rounded-md ${
                    !darkMode ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setDarkMode(false)}
                >
                  Light Mode
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    darkMode ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setDarkMode(true)}
                >
                  Dark Mode
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Choose between light and dark mode for the interface</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Font Size</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm">A</span>
                <input
                  type="range"
                  min="1"
                  max="3"
                  defaultValue="2"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-lg">A</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">Adjust the font size for better readability</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Accent Color</h3>
              <div className="grid grid-cols-5 gap-2">
                <button className="w-8 h-8 rounded-full bg-amber-600 ring-2 ring-offset-2 ring-amber-600"></button>
                <button className="w-8 h-8 rounded-full bg-red-600"></button>
                <button className="w-8 h-8 rounded-full bg-green-600"></button>
                <button className="w-8 h-8 rounded-full bg-blue-600"></button>
                <button className="w-8 h-8 rounded-full bg-purple-600"></button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Choose your preferred accent color</p>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Order Notifications</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <p className="text-xs text-gray-500">Receive notifications when new orders are placed</p>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Inventory Alerts</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <p className="text-xs text-gray-500">Get alerts when inventory items are running low</p>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Employee Logins</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <p className="text-xs text-gray-500">Receive notifications when employees log in or out</p>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Daily Summary</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <p className="text-xs text-gray-500">Receive a daily summary of sales and activity</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">About Brew Haven POS</h2>

            <div className="text-center py-4">
              <h1 className="text-3xl font-bold text-amber-900">Brew Haven</h1>
              <p className="text-amber-700">Coffee Shop POS System</p>
              <p className="mt-2 text-sm text-gray-500">Version 1.0.0</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">System Information</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Application:</span>
                  <span>Brew Haven POS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Version:</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>May 6, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Framework:</span>
                  <span>Next.js 14</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Support</h3>
              <p className="text-sm text-gray-500 mb-2">For support or feature requests, please contact our team:</p>
              <a href="mailto:support@brewhaven.com" className="text-amber-600 hover:text-amber-800 text-sm">
                support@brewhaven.com
              </a>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500 text-center">&copy; 2023 Brew Haven. All rights reserved.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsPage
