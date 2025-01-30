"use client";

import ProductList from "@/components/ProductList";
import { getProducts } from "@/services/product";
import React, { useEffect, useRef, useState } from "react";
import Filters from "./Filters";
import { Product } from "@/types/product";
import { FiFilter } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Page() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const originalProducts = useRef<Product[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setFilteredProducts(products);
      originalProducts.current = products;
    });
  }, []);

  return (
    <div className="flex md:flex-row flex-col py-12 w-full relative">
      <Sheet>
        <SheetTrigger asChild>
          <button className="fixed top-24 left-4 z-50 p-3 bg-black text-white rounded-full shadow-lg hover:bg-zinc-800">
            <FiFilter size={20} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Filters
            products={originalProducts.current}
            setProducts={setFilteredProducts}
          />
        </SheetContent>
      </Sheet>

      <div className="space-y-2 md:p-20 p-12 w-full">
        <span className="font-semibold text-zinc-500 text-sm">
          Showing {filteredProducts.length} results
        </span>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
