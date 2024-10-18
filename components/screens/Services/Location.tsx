import { useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

const UseMyLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error: GeolocationPositionError) => {
          setError("Unable to retrieve your location");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <button
        onClick={handleUseMyLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Use My Location
      </button>
      {location && (
        <p>
          Your location: Latitude {location.latitude}, Longitude {location.longitude}
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UseMyLocation;
