import { Product } from "@/types/product";
import { DistanceUnitEnum, Shippo, WeightUnitEnum } from "shippo";

const addressFrom = {
  name: "Shippo",
  street1: "215 Clayton St.",
  city: "San Francisco",
  state: "CA",
  zip: "94117",
  country: "US",
  phone: "+1 555 341 9393+1 555 341 9393",
  email: "hippotle@shippo.com",
};

export async function getShippingRates(addressTo: any, items: Product[]) {
  try {
    const formattedAddressTo = {
      name: addressTo.name,
      street1: addressTo.street1,
      city: addressTo.city,
      state: addressTo.state,
      zip: addressTo.zip,
      country: addressTo.country,
    };

    const parcels = items.map((item) => ({
      length: String(item?.length || 50),
      width: String(item?.width || 50),
      height: String(item?.height || 50),
      distanceUnit: DistanceUnitEnum.In,
      weight: String(item?.weight || 14),
      massUnit: WeightUnitEnum.Lb,
    }));
    

    const shippo = new Shippo({
      apiKeyHeader: process.env.SHIPPO_API_KEY,
      shippoApiVersion: "2018-02-08",
    });

    const shipment = await shippo.shipments.create({
      addressFrom,
      addressTo: formattedAddressTo,
      parcels,
      async: false,
    });

    
    const shipmentData = await shippo.shipments.get(shipment.objectId);
    // console.log("getShippingRates:", getShippingRates);
    return shipmentData.rates;

  } catch (error) {
    console.error("Error in getShippingRates:", error);
    throw new Error("Failed to fetch shipping rates");
  }
}