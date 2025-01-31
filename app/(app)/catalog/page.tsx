"use client";

import ProductList from "@/components/ProductList";
import { getProducts } from "@/services/product";
import React, { useEffect, useRef, useState } from "react";
import Filters from "./Filters";
import { Product } from "@/types/product";

export default function Page() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const originalProducts = useRef<Product[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      originalProducts.current = products;
      filterProductsBySearch(products);
    });
  }, []);

  const filterProductsBySearch = (products: Product[]) => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    
    if (searchQuery) {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // Listen to URL changes
  useEffect(() => {
    const handleSearch = () => {
      filterProductsBySearch(originalProducts.current);
    };

    // Initial filter
    handleSearch();

    // Setup listener for URL changes
    window.addEventListener('popstate', handleSearch);
    const interval = setInterval(handleSearch, 500);

    return () => {
      window.removeEventListener('popstate', handleSearch);
      clearInterval(interval);
    };
  }, []);

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
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
