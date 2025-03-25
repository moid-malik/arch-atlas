import ProductCarousel from "@/components/ProductCarousel";
import { getProduct, getRelatedProducts } from "@/services/product";
import Image from "next/image";
import React from "react";
import Buttons from "./Buttons";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const [product, relatedProducts] = await Promise.all([
    getProduct(id),
    getRelatedProducts(id),
  ]);
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-10 lg:py-12">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Section */}
        <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] bg-white rounded-lg overflow-hidden shadow-sm">
          <Image
            src={product.image}
            alt={product.title}
            className="object-contain p-4 sm:p-8 md:p-12 lg:p-16 transition-all duration-300"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Product Details Section */}
        <div className="flex flex-col h-full md:border-l md:border-l-zinc-200">
          <div className="flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 gap-4 lg:gap-6 flex-grow">
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-black p-3 border rounded-md transition-colors"
              style={{ color: product.color }}>
              {product.title}
            </h1>
            
            <div className="flex items-center gap-2">
              <span
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold"
                style={{ color: product.color }}>
                ${product.price}
              </span>
              <span className="text-sm text-zinc-500">USD</span>
            </div>
            
            <div className="mt-2 md:mt-4">
              <Buttons product={product} />
            </div>  
          </div>

          {/* Related Products Section */}
          <div className="mt-8 md:mt-auto border-t border-zinc-200">
            <h2 className="text-xl font-semibold p-4 md:p-6">You may also like</h2>
            <ProductCarousel relatedProducts={relatedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
