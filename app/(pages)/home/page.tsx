'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import classNames from 'classnames';
import { useLocationContext } from '~/utils/LocationContext';
import { HomeCarousel, WarningBox, ShowWeather, PlanBar, Activities, WeatherNews } from '~/components/screens';
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

const Home = () => {
  const { setLocation } = useLocationContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [manualLocation, setManualLocation] = useState<string>('');
  const [permissionRequested, setPermissionRequested] = useState<boolean>(false);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [ locationSet, setLocationSet ] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [location, setGoToLocation] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [activity, setActivity] = useState('');
  const router = useRouter();

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

  const handleActivityClick = (name: string) => {
    router.push(`/${encodeURIComponent(name)}`);
  };

  return (
    <div className="text-gray-900 bg-gray-50">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
            {locationPermissionGranted === null ? (
              <>
                <p className="mb-4 text-base flex flex-col">
                  We use your location to show relevant information.<span> Please allow location access.</span>
                </p>
                <button
                  onClick={handleLocationRequest}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-4"
                >
                  Allow Location Access
                </button>
                <button
                  onClick={() => setLocationPermissionGranted(false)} // Move to manual input
                  className="bg-gray-500 text-white px-4 py-2 rounded-md w-full"
                >
                  Enter Location Manually
                </button>
              </>
            ) : locationPermissionGranted === false ? (
              <div>
                <p className="mb-4">Please enter your location manually:</p>
                <input
                  type="text"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  placeholder="Enter your city or coordinates"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={handleManualLocationSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                >
                  Submit
                </button>
              </div>
            ) : (
              <p>Fetching your location...</p>
            )}
          </div>
        </div>
      )}
      
      <div className="w-screen px-10 pt-10">
        <div className="p-4 flex w-full justify-center items-center">
          <PlanBar
            location={location}
            setLocation={setGoToLocation}
            arrivalTime={arrivalTime}
            setArrivalTime={setArrivalTime}
            departureTime={departureTime}
            setDepartureTime={setDepartureTime}
            activity={activity}
            setActivity={setActivity}
          />
        </div>
        <HomeCarousel />
      </div>
    {/* 
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
     */}
      <div className="min-h-[500px]">
       <Activities  handleActivityClick={handleActivityClick}/>
       </div>
       <div className="min-h-[500px]">
       <WeatherNews/>
       </div>
      </div>
  );
};

export default Home;
