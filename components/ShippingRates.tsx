import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Rate } from "@/types/shipping";

interface ShippingRatesProps {
  address: {
    name: string;
    street1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: Product[];
  rates: Rate[];
  loading: boolean;
  onRateSelect: (rate: Rate) => void;
}

export function ShippingRates({
  address,
  items,
  rates,
  loading,
  onRateSelect,
}: ShippingRatesProps) {
  console.log('ShippingRates props:', { "address": address,"items": items,"rates": rates,"loading": loading });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Shipping Options</h3>
      {loading ? (
        <p>Loading rates...</p>
      ) : rates.length > 0 ? (
        <div className="space-y-2">
          {rates.map((rate) => (
            <div
              key={rate.object_id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-50"
              onClick={() => onRateSelect(rate)}>
              <p>
                {rate.provider} - {rate.servicelevel.name}
              </p>
              <p className="font-bold">${rate.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No shipping rates available</p>
      )}
    </div>
  );
}
