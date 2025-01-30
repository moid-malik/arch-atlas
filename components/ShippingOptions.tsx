import React from 'react';

interface Rate {
  amount: string;
  provider: string;
  servicelevel: {
    name: string;
  };
  object_id: string;
}

interface ShippingOptionsProps {
  rates: Rate[];
  onSelectRate: (rate: Rate) => void;
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({ rates, onSelectRate }) => {
  return (
    <div>
      <h3>Shipping Options</h3>
      {rates.map((rate) => (
        <div key={rate.object_id}>
          <label>
            <input
              type="radio"
              name="shippingRate"
              value={rate.object_id}
              onChange={() => onSelectRate(rate)}
            />
            {`${rate.provider} - ${rate.servicelevel.name} - $${rate.amount}`}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ShippingOptions;
