"use client";
import { ShippingAddressForm, Address } from "@/components/ShippingAddressForm";
import { ShippingRates } from "@/components/ShippingRates";
import { useState } from "react";
import { useCart } from "@/stores/cart";
import { Rate } from "@/types/shipping";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(false);
  const { products } = useCart();

  const handleAddressSubmit = (addressData: Address, shippingRates: Rate[]) => {
    setAddress(addressData);
    setRates(shippingRates);
  };

  const handlePurchase = () => {
    // Implement payment integration here
    console.log('Processing purchase with:', {
      address,
      selectedRate,
      products
    });
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <ShippingAddressForm onAddressSubmit={handleAddressSubmit} />
        </div>

        {address && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <ShippingRates
              address={address}
              items={products}
              rates={rates}
              loading={loading}
              onRateSelect={setSelectedRate}
            />
          </div>
        )}

        {products?.length === 0 && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
            Your cart is empty. Please add items before checkout.
          </div>
        )}

        <Button
          size="lg"
          onClick={handlePurchase}
          disabled={!selectedRate || !address || products.length === 0}
          className="w-full">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
