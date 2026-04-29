"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-1">
              {items.length === 0
                ? "Your cart is empty"
                : items.length + " item" + (items.length !== 1 ? "s" : "") + " in your cart"}
            </p>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full mb-6">
              <ShoppingCart className="w-10 h-10 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Looks like you have not added anything to your cart yet. Explore our products and find something you love!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear all
                  </button>
                </div>

                <div>
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Free shipping progress */}
              {(() => {
                const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
                const progress = Math.min((subtotal / 50) * 100, 100);
                return (
                  <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">
                        {subtotal >= 50 ? "You qualify for free shipping!" : "Progress to free shipping"}
                      </span>
                      <span className="text-gray-500">${subtotal.toFixed(2)} / $50.00</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: progress + "%" }}
                      />
                    </div>
                    {subtotal < 50 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
