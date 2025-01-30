// components/TrackingInfo.tsx
import { useState, useEffect } from 'react';

export function TrackingInfo({ trackingNumber, carrier }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/shippo/tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackingNumber, carrier }),
        });
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching tracking:', error);
      }
    };

    const interval = setInterval(checkStatus, 300000); // Check every 5 minutes
    checkStatus();

    return () => clearInterval(interval);
  }, [trackingNumber, carrier]);

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold">Tracking Information</h3>
      {status ? (
        <div className="space-y-2">
          <p>Status: {status.tracking_status.status}</p>
          <p>Location: {status.tracking_status.location?.city}</p>
          <p>Last Update: {new Date(status.tracking_status.status_date).toLocaleString()}</p>
          <p>Carrier: {carrier}</p>
          <p>Tracking Number: {trackingNumber}</p>
        </div>
      ) : (
        <p>Loading tracking information...</p>
      )}
    </div>
  );
}