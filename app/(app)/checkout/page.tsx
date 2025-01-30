"use client";
import { ShippingAddressForm, Address } from "@/components/ShippingAddressForm";
import { ShippingRates } from "@/components/ShippingRates";
import { useState, useEffect } from "react";
import { useCart } from "@/stores/cart";
import { Rate } from "@/types/shipping";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(false);
  const { products } = useCart();

  const fetchRates = async (addressData: Address) => {
    setLoading(true);
    try {
      const response = await fetch("/api/shippo/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addressTo: addressData, items: products }),
      });
      const data = await response.json();
      setRates(data);
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = (addressData: Address) => {
    setAddress(addressData);
    if (products.length > 0) {
      fetchRates(addressData);
    }
  };

  function handlePurchase(): void {
    //no payment integration for this app
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <ShippingAddressForm onAddressSubmit={handleAddressSubmit} />
      {address && (
        <ShippingRates
          address={address}
          items={products}
          rates={rates}
          loading={loading}
          onRateSelect={setSelectedRate}
        />
      )}
      {products?.length === 0 && (
        <div className="text-red-500 mt-4">
          Your cart is empty. Please add items before checkout.
        </div>
      )}
      <Button
        size={"lg"}
        onClick={handlePurchase}
        disabled={!selectedRate || !address || products.length === 0}
        className="mt-8">
        Continue to Payment
      </Button>
    </div>
  );
}
