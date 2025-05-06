"use client"

const OrderDetails = ({ order, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-amber-900">Order Details: {order.id}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p>{formatDate(order.timestamp || order.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p
                className={`font-medium ${
                  order.status === "Completed"
                    ? "text-green-600"
                    : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {order.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p>{order.customerName || "Guest"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p>{order.paymentMethod || "Card"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Employee</p>
              <p>{order.employee || "Unknown"}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{item.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{item.quantity || 1}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${order.subtotal ? order.subtotal.toFixed(2) : (order.total * 0.926).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span>${order.tax ? order.tax.toFixed(2) : (order.total * 0.074).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-amber-900 pt-2 border-t">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50" onClick={onClose}>
              Close
            </button>
            <button
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              onClick={() => window.print()}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
