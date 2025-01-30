"use client";

import ProductList from "@/components/ProductList";
import { getProducts } from "@/services/product";
import React, { useEffect, useRef, useState } from "react";
import Filters from "./Filters";
import { Product } from "@/types/product";
import { FiFilter } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const originalProducts = useRef<Product[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    getProducts().then((products) => {
      originalProducts.current = products;
      if (searchQuery) {
        const searchResults = products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(searchResults);
      } else {
        setFilteredProducts(products);
      }
    });
  }, [searchQuery]);

  return (
    <div className="flex md:flex-row flex-col py-12 w-full relative">
          <Filters
            products={originalProducts.current}
            setProducts={setFilteredProducts}
          />
      <div className="space-y-2 md:p-20 p-12 w-full">
        <span className="font-semibold text-zinc-500 text-sm">
          Showing {filteredProducts.length} results
        </span>
        <ProductList  products={filteredProducts} />
      </div>
    </div>
  );
}
