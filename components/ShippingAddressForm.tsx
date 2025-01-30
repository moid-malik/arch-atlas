"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface Address {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Props {
  onAddressSubmit: (address: Address, rates: any[]) => void;
}

export function ShippingAddressForm({ onAddressSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Address>({
    defaultValues: {
      country: 'PK'
    }
  });
  
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data: Address) => {
    if (loading) return;
    setLoading(true);
    
    try {
      data.zip = data.zip.replace(/\s/g, '');
      const response = await fetch('/api/shippo/rates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          addressTo: data,
          items: [{
            length: 10,
            width: 6,
            height: 4,
            weight: 2,
          }] 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shipping rates');
      }
      
      const rates = await response.json();
      onAddressSubmit(data, rates);
      reset();
    } catch (error: any) {
      console.error('Error fetching rates:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Full Name
        </label>
        <Input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          id="name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="street1" className="block text-sm font-medium">
          Street Address
        </label>
        <Input
          {...register("street1", {
            required: "Street address is required",
            minLength: {
              value: 5,
              message: "Please enter a valid street address",
            },
          })}
          id="street1"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.street1 && (
          <p className="text-red-500 text-sm">{errors.street1.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <Input
            {...register("city", {
              required: "City is required",
              pattern: {
                value: /^[a-zA-Z\s-]+$/,
                message: "Please enter a valid city name",
              },
            })}
            id="city"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium">
            State
          </label>
          <Input
            {...register("state", {
              required: "State is required",
              pattern: {
                value: /^[a-zA-Z\s-]+$/,
                message: "Please enter a valid state name",
              },
            })}
            id="state"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zip" className="block text-sm font-medium">
            ZIP Code
          </label>
          <Input
            {...register("zip", {
              required: "ZIP code is required",
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message:
                  "Please enter a valid ZIP code (e.g. 12345 or 12345-6789)",
              },
            })}
            id="zip"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.zip && (
            <p className="text-red-500 text-sm">{errors.zip.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium">
            Country
          </label>
          <select
            {...register("country", { required: "Country is required" })}
            id="country"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="PK">Pakistan</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>
      </div>

      <Button
        // type=""
        size={"lg"}
        onClick={() => {
          alert("Not implemented");
        }}
        disabled={loading}>
        {loading ? "Loading..." : "Continue to Shipping"}
      </Button>
    </form>
  );
}
