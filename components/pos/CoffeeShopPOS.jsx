"use client"

import { useState } from "react"
import ProductCatalog from "./ProductCatalog"
import OrderSummary from "./OrderSummary"
import CheckoutModal from "./CheckoutModal"
import { coffeeProducts } from "../../data/coffeeData"

function CoffeeShopPOS({ onOrderComplete }) {
  const [currentOrder, setCurrentOrder] = useState([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", ...new Set(coffeeProducts.map((product) => product.category))]

  const filteredProducts =
    activeCategory === "All" ? coffeeProducts : coffeeProducts.filter((product) => product.category === activeCategory)

  const addToOrder = (product) => {
    const existingItem = currentOrder.find((item) => item.id === product.id)

    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((item) => (item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item)),
      )
    } else {
      setCurrentOrder([...currentOrder, { ...product, quantity: 1 }])
    }
  }

  const removeFromOrder = (productId) => {
    setCurrentOrder(currentOrder.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromOrder(productId)
      return
    }

    setCurrentOrder(currentOrder.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearOrder = () => {
    setCurrentOrder([])
    setIsCheckoutOpen(false)
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const calculateTotal = () => {
    return currentOrder.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  }

  const handleOrderComplete = (customerName, paymentMethod) => {
    const orderData = {
      items: [...currentOrder],
      customerName,
      paymentMethod,
      subtotal: calculateTotal(),
      tax: calculateTotal() * 0.08,
      total: calculateTotal() * 1.08,
      timestamp: new Date().toISOString(),
    }

    if (onOrderComplete) {
      onOrderComplete(orderData)
    }

    clearOrder()
  }

  return (
    <div className="h-full">
      <div className="mb-4">
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category ? "bg-amber-600 text-white" : "bg-white text-amber-900 hover:bg-amber-100"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-3rem)]">
        <div className="lg:col-span-2">
          <ProductCatalog products={filteredProducts} onAddToOrder={addToOrder} />
        </div>
        <div>
          <OrderSummary
            orderItems={currentOrder}
            onRemoveItem={removeFromOrder}
            onUpdateQuantity={updateQuantity}
            onCheckout={handleCheckout}
            onClearOrder={clearOrder}
            total={calculateTotal()}
          />
        </div>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal
          orderItems={currentOrder}
          total={calculateTotal()}
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={handleOrderComplete}
        />
      )}
    </div>
  )
}

export default CoffeeShopPOS
