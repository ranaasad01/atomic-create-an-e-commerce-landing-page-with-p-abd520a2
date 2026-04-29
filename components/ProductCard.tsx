"use client";

import { useState } from "react";
import { ShoppingCart, Star, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
}

function getBadgeClass(badge: string): string {
  if (badge === "sale") return "bg-red-500 text-white";
  if (badge === "featured") return "bg-amber-500 text-white";
  return "bg-emerald-500 text-white";
}

function getBadgeLabel(badge: string): string {
  if (badge === "sale") return "Sale";
  if (badge === "featured") return "Featured";
  return "New";
}

function getStarClass(index: number, rating: number): string {
  if (index < Math.floor(rating)) return "w-3.5 h-3.5 text-amber-400 fill-amber-400";
  if (index < rating) return "w-3.5 h-3.5 text-amber-400 fill-amber-200";
  return "w-3.5 h-3.5 text-gray-200 fill-gray-200";
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className={"absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide " + getBadgeClass(product.badge)}>
            {getBadgeLabel(product.badge)}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-white text-red-600 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={getStarClass(i, product.rating)} />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          aria-label={"Add " + product.name + " to cart"}
          className={
            "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 " +
            (added
              ? "bg-emerald-500 text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95")
          }
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
