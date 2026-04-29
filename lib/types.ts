export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  badge?: "sale" | "featured" | "new";
  stock: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
