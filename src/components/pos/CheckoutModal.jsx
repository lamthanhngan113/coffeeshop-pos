"use client"

import { useState } from "react"

function CheckoutModal({ orderItems, total, onClose, onComplete }) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [customerName, setCustomerName] = useState("")

  const tax = total * 0.08 // 8% tax
  const grandTotal = total + tax

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 1500)
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  const handleNewOrder = () => {
    onComplete()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {!isComplete ? (
          <>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-amber-900">Checkout</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={onClose} disabled={isProcessing}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  id="customerName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <label htmlFor="card">Credit/Debit Card</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />
                    <label htmlFor="cash">Cash</label>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-amber-900 pt-2 border-t">
                  <span>Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay $${grandTotal.toFixed(2)}`}
              </button>
            </form>
          </>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">Payment Complete!</h2>
            <p className="text-gray-600 mb-6">
              {customerName ? `Thank you, ${customerName}!` : "Thank you for your order!"}
            </p>

            <div className="space-y-3">
              <button
                className="w-full py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-2"
                onClick={handlePrintReceipt}
              >
                <span>🖨️</span> Print Receipt
              </button>

              <button
                className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                onClick={handleNewOrder}
              >
                New Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutModal
