import { useState } from "react";
import { Product } from "@/types/product";
import { Rate } from "@/types/shipping";
import { Clock, Package, Shield, Truck } from "lucide-react";

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
  const [selectedRateId, setSelectedRateId] = useState<string>("");

  const getEstimatedDays = (serviceName: string) => {
    const daysMatch = serviceName.match(/(\d+)-?(\d+)?/);
    if (daysMatch) {
      return `${daysMatch[0]} Days Delivery`;
    }
    if (serviceName.toLowerCase().includes("express")) {
      return "1-2 Days Express Delivery";
    }
    if (serviceName.toLowerCase().includes("priority")) {
      return "2-3 Days Priority Delivery";
    }
    return "3-5 Days Standard Delivery";
  };

  const formatAddress = (addr: typeof address) => {
    return `${addr.name}, ${addr.street1}, ${addr.city}, ${addr.state} ${addr.zip}, ${addr.country}`;
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col gap-2 border-b pb-4">
        <h3 className="text-2xl font-bold text-gray-900">Shipping Options</h3>
        <div className="text-sm text-gray-600">
          <strong>Delivering to:</strong> {formatAddress(address)}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Finding best shipping rates...</p>
        </div>
      ) : rates.length > 0 ? (
        <div className="space-y-4">
          {rates.map((rate) => {
            return (
              <label
                key={rate.objectId}
                onClick={() => {
                  setSelectedRateId(rate.objectId);
                  console.log(selectedRateId);
                }}
                className={`
                  block relative rounded-xl border-2 transition-all duration-200 cursor-pointer
                  ${
                    rate.objectId === selectedRateId
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }
                `}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Truck
                          className={`w-6 h-6 ${
                            rate.objectId === selectedRateId
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        />
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {rate.provider}
                          </h4>
                          <p className="text-md text-gray-700">
                            {rate.servicelevel.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {getEstimatedDays(rate.servicelevel.name)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${parseFloat(rate.amount).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {rate.servicelevel.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Insurance & Tracking Included
                      </span>
                    </div>
                  </div>

                  {rate.objectId === selectedRateId && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            No shipping rates available for this destination
          </p>
        </div>
      )}
    </div>
  );
}
