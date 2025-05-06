"use client"

const RevenueByCategory = ({ orders }) => {
  // Calculate revenue by category
  const revenueByCategory = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      const category = item.category || "Uncategorized"
      const revenue = item.price * (item.quantity || 1)

      if (!acc[category]) {
        acc[category] = 0
      }

      acc[category] += revenue
    })

    return acc
  }, {})

  // Convert to array and sort by revenue
  const categoryData = Object.entries(revenueByCategory)
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a, b) => b.revenue - a.revenue)

  // Calculate total revenue
  const totalRevenue = categoryData.reduce((sum, item) => sum + item.revenue, 0)

  return (
    <div className="space-y-4">
      {categoryData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No data available</p>
        </div>
      ) : (
        categoryData.map((item) => (
          <div key={item.category} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.category}</span>
              <span>${item.revenue.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-amber-600 h-2.5 rounded-full"
                style={{ width: `${(item.revenue / totalRevenue) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 text-right">
              {((item.revenue / totalRevenue) * 100).toFixed(1)}% of total
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default RevenueByCategory
