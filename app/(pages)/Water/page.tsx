'use client'

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocationContext } from '~/utils/LocationContext';
import { WaterCarousel, WarningBox, ShowWeather } from '~/components/screens';
import {
  newSouthWales,
  northernTerritory,
  southAustralia,
  westernAustralia,
  actWaterLocations,
  tasmania,
  queensland,
  victoria
} from '~/lib/locations';

const dummyWarnings = [
  "Darwin: Mild storm",
  "Cairns: High gusts",
  "Melbourne: Lightning"
];

const allLocations = [
  ...newSouthWales,
  ...victoria,
  ...queensland,
  ...southAustralia,
  ...westernAustralia,
  ...tasmania,
  ...northernTerritory,
  ...actWaterLocations
];

const Water = () => {
  const { setLocation } = useLocationContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [manualLocation, setManualLocation] = useState<string>('');
  const [permissionRequested, setPermissionRequested] = useState<boolean>(false);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [ locationSet, setLocationSet ] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const location = JSON.parse(savedLocation);
      setLocation(location);
      setIsModalOpen(false); 
    }
  }, [setLocation]); 

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = allLocations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleLocationRequest = () => {
    setPermissionRequested(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          localStorage.setItem('userLocation', JSON.stringify(location));
          setLocationPermissionGranted(true);
          setIsModalOpen(false);
        },
        (error: GeolocationPositionError) => {
          console.error('Error getting location:', error);
          setLocationPermissionGranted(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocationPermissionGranted(false);
    }
  };

  const handleManualLocationSubmit = () => {
    if (manualLocation.trim() !== '') {
      setLocation({ latitude: 0, longitude: 0 });
      localStorage.setItem('userLocation', JSON.stringify(location));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="h-screen bg-baby-blue text-gray-900">
      <div className="w-screen px-10 pt-10">
        <WaterCarousel />
      </div>

      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Where are you going?"
          value={query}
          onChange={handleInputChange}
          className="w-[350px] mt-4 text-sm pr-10 pl-2 py-1 text-bold text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out"
        />
        {filteredLocations.length > 0 && (
          <ul className="absolute border border-gray-300 rounded-md shadow-lg bg-gray-900 mt-[50px] max-h-[250px] overflow-y-scroll z-50">
            {filteredLocations.map((location, index) => (
              <li
                key={index}
                className="px-2 py-2 w-[350px] cursor-pointer text-white hover:bg-primary text-base"
                onClick={() => {
                  setQuery(location);
                  setLocationSet(true);
                  setFilteredLocations([]);
                }}
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-center pt-[70px]">
      {query && locationSet && (
      <ShowWeather tide={"4m"} swell={"1m, 3s"} temp={"32 degrees c"} wind={"10kts"} location={query} />
      )}
      </div>
    </div>
  );
};

export default Water;
