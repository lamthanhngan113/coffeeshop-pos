"use client"

function OrderSummary({ orderItems, onRemoveItem, onUpdateQuantity, onCheckout, onClearOrder, total }) {
  const tax = total * 0.08 // 8% tax
  const grandTotal = total + tax

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-amber-900">Current Order</h2>
        {orderItems.length > 0 && (
          <button
            onClick={onClearOrder}
            className="px-3 py-1 text-sm border border-red-200 text-red-500 rounded hover:bg-red-50 hover:text-red-600"
          >
            Clear
          </button>
        )}
      </div>

      {orderItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500 flex-grow flex flex-col justify-center">
          <p>No items in order</p>
          <p className="text-sm mt-2">Select items from the menu to add them to your order</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6 overflow-y-auto flex-grow">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-amber-900">{item.name}</h3>
                  <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="h-7 w-7 border rounded flex items-center justify-center"
                    onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                  >
                    <span>-</span>
                  </button>

                  <span className="w-8 text-center">{item.quantity || 1}</span>

                  <button
                    className="h-7 w-7 border rounded flex items-center justify-center"
                    onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                  >
                    <span>+</span>
                  </button>

                  <button
                    className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <span>×</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-amber-900 pt-2 border-t">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-lg"
            onClick={onCheckout}
            disabled={orderItems.length === 0}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  )
}

export default OrderSummary
