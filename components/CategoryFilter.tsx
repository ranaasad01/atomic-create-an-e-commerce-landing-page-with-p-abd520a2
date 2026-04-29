"use client";

import { CATEGORIES } from "@/lib/products";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Product categories"
      className="flex items-center gap-2 overflow-x-auto pb-2"
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={[
              "flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900",
            ].join(" ")}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
