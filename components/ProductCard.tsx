"use client"
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { useCart } from "@/stores/cart";

type Props = {
  product: Product;
  small?: boolean;
  averagePurchases?: number;
};

export default function ProductCard(props: Props) {
  const { product, small, averagePurchases } = props;
  const admin = !!averagePurchases;
  const isAboveAverage = product.purchases > (averagePurchases || 0);
  const { addToCart } = useCart()

  return (
    <Link
      target={admin ? "_blank" : "_self"}
      href={`/product/${product._id}`}
      className="space-y-3 group relative"
    >
      <div
        className={`group relative w-full ${small ? "h-[200px]" : "h-[400px]"} flex justify-center items-center bg-secondary/5 overflow-hidden`}
      >
        {admin ? null : (
          <TbShoppingBagPlus 
            className="absolute right-8 top-[28px] -translate-y-1/2 translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 z-[1] text-3xl cursor-pointer hover:scale-110" 
            onClick={(e) => {
              e.preventDefault();
              addToCart({ ...product, count: 1 })
            }} 
          />
        )}
        <Image
          src={product.image}
          alt="Image"
          fill
          priority
          className="object-contain p-10 group-hover:opacity-65 transition-all duration-300 transform group-hover:scale-105"
        />
      </div>

      {admin ? (
        <div className="flex items-center gap-1.5 border-b pb-3 border-b-zinc-200">
          <div className="flex items-center gap-1">
            {isAboveAverage ? (
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-green-500/90" />
                <GoArrowUpRight className="text-green-500" />
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-red-500/90" />
                <GoArrowDownRight className="text-red-500" />
              </div>
            )}
          </div>
          <span className="font-semibold">{product.purchases}</span>
          <span className="font-medium text-zinc-700">
            {isAboveAverage ? "above" : "below"} Average{" "}
            {`(${averagePurchases})`}
          </span>
        </div>
      ) : null}

      <div className="space-y-2">
        <p className="font-bold tracking-tight text-lg text-primary/80 line-clamp-1 group-hover:text-primary transition-colors">{product.title}</p>
        <p className="font-medium text-lg">${product.price}</p>
      </div>
    </Link>
  );
}
