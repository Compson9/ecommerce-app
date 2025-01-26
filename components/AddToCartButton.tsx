"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const { addItem } = useBasketStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <button
      onClick={() => addItem(product)}
      className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-700"}`}
      disabled={disabled}
    >
      <span className="text-white font-semibold">
        Add to Cart
      </span>
    </button>
  );
}