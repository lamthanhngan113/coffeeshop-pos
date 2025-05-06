"use client"

const SalesChart = ({ orders }) => {
  // This is a placeholder for a real chart component
  // In a real application, you would use a library like Chart.js, Recharts, or D3.js

  // Group orders by date
  const groupedOrders = orders.reduce((acc, order) => {
    const date = new Date(order.timestamp || order.date)
    const dateString = date.toLocaleDateString()

    if (!acc[dateString]) {
      acc[dateString] = {
        date: dateString,
        revenue: 0,
        orders: 0,
      }
    }

    acc[dateString].revenue += order.total
    acc[dateString].orders += 1

    return acc
  }, {})

  // Convert to array and sort by date
  const chartData = Object.values(groupedOrders).sort((a, b) => new Date(a.date) - new Date(b.date))

  // Calculate max revenue for scaling
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 0)

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        {/* X and Y axes */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>

        {/* Chart bars */}
        <div className="absolute left-12 right-4 top-4 bottom-8 flex items-end">
          {chartData.map((data, index) => (
            <div key={data.date} className="flex-1 flex flex-col items-center">
              <div
                className="w-8 bg-amber-500 rounded-t"
                style={{
                  height: `${maxRevenue ? (data.revenue / maxRevenue) * 100 : 0}%`,
                  minHeight: "4px",
                }}
              ></div>
              <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left whitespace-nowrap">
                {new Date(data.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </div>
            </div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <div>${maxRevenue.toFixed(0)}</div>
          <div>${(maxRevenue * 0.75).toFixed(0)}</div>
          <div>${(maxRevenue * 0.5).toFixed(0)}</div>
          <div>${(maxRevenue * 0.25).toFixed(0)}</div>
          <div>$0</div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        Note: This is a simplified chart visualization. In a production environment, use a proper charting library.
      </div>
    </div>
  )
}

export default SalesChart
