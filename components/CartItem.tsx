"use client";

import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100 last:border-0">
      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-0.5">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label="Decrease quantity"
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Minus className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="Increase quantity"
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Plus className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(product.id)}
              aria-label={"Remove " + product.name + " from cart"}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
