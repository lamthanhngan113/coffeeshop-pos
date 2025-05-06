"use client"

import { useState } from "react"
import SalesChart from "./SalesChart"
import RevenueByCategory from "./RevenueByCategory"
import TopSellingProducts from "./TopSellingProducts"

const ReportsPage = ({ orders = [] }) => {
  const [dateRange, setDateRange] = useState("week")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  // Calculate average order value
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0

  // Count total items sold
  const totalItemsSold = orders.reduce(
    (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + (item.quantity || 1), 0),
    0,
  )

  // Get filtered orders based on date range
  const getFilteredOrders = () => {
    if (dateRange === "custom" && startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999) // Set to end of day

      return orders.filter((order) => {
        const orderDate = new Date(order.timestamp || order.date)
        return orderDate >= start && orderDate <= end
      })
    }

    const now = new Date()
    const filterDate = new Date()

    switch (dateRange) {
      case "today":
        filterDate.setHours(0, 0, 0, 0)
        break
      case "week":
        filterDate.setDate(now.getDate() - 7)
        break
      case "month":
        filterDate.setMonth(now.getMonth() - 1)
        break
      case "year":
        filterDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        return orders
    }

    return orders.filter((order) => {
      const orderDate = new Date(order.timestamp || order.date)
      return orderDate >= filterDate
    })
  }

  const filteredOrders = getFilteredOrders()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-amber-900">Reports & Analytics</h1>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>

            {dateRange === "custom" && (
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="flex items-center">to</span>
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-amber-700 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-amber-900">${totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-amber-700 mt-1">{filteredOrders.length} orders in selected period</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-amber-700 mb-1">Average Order Value</h3>
            <p className="text-3xl font-bold text-amber-900">${averageOrderValue.toFixed(2)}</p>
            <p className="text-xs text-amber-700 mt-1">Per order average</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-amber-700 mb-1">Items Sold</h3>
            <p className="text-3xl font-bold text-amber-900">{totalItemsSold}</p>
            <p className="text-xs text-amber-700 mt-1">Total products sold</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-amber-900 mb-4">Sales Trend</h2>
          <div className="h-80">
            <SalesChart orders={filteredOrders} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium text-amber-900 mb-4">Revenue by Category</h2>
            <RevenueByCategory orders={filteredOrders} />
          </div>

          <div>
            <h2 className="text-lg font-medium text-amber-900 mb-4">Top Selling Products</h2>
            <TopSellingProducts orders={filteredOrders} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
