"use client";

import { useCart } from "@/lib/cart-context";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartSummary() {
  const { subtotal, totalItems } = useCart();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

      <div className="space-y-3 mb-5">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-emerald-600 font-medium">Free</span>
          ) : (
            <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Estimated Tax</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
      </div>

      {subtotal < 50 && subtotal > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 mb-5 text-xs text-indigo-700">
          Add <strong>${(50 - subtotal).toFixed(2)}</strong> more to get free shipping!
        </div>
      )}

      <div className="border-t border-gray-200 pt-4 mb-5">
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span className="text-lg">${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Proceed to Checkout
        <ArrowRight className="w-4 h-4" />
      </button>

      <Link
        href="/"
        className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors py-2 focus:outline-none focus:text-indigo-600"
      >
        <ShoppingCart className="w-4 h-4" />
        Continue Shopping
      </Link>

      {/* Trust badges */}
      <div className="mt-5 pt-5 border-t border-gray-200 grid grid-cols-3 gap-2 text-center">
        {["Secure Checkout", "Free Returns", "24/7 Support"].map((badge) => (
          <div key={badge} className="text-xs text-gray-500 leading-tight">
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
