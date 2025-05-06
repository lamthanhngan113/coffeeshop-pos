"use client"

const TopSellingProducts = ({ orders }) => {
  // Calculate sales by product
  const salesByProduct = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      if (!acc[item.id]) {
        acc[item.id] = {
          id: item.id,
          name: item.name,
          quantity: 0,
          revenue: 0,
        }
      }

      acc[item.id].quantity += item.quantity || 1
      acc[item.id].revenue += item.price * (item.quantity || 1)
    })

    return acc
  }, {})

  // Convert to array and sort by quantity
  const productData = Object.values(salesByProduct)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5) // Top 5 products

  return (
    <div>
      {productData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No data available</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productData.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${product.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TopSellingProducts
