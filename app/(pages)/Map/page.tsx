'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MapGL, { ViewStateChangeEvent, Marker } from 'react-map-gl';
import { FaMapMarkerAlt, FaCamera } from "react-icons/fa";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import { addFishingSpot, getFishingSpots } from '~/lib/fishingLocations';
import { FishingSpot } from '~/types/mainTypes';

const Map = () => {
    const [query, setQuery] = useState('');  
    const [searchResults, setSearchResults] = useState<any[]>([]);  
    const [showLatitude, setShowLatitude] = useState(-12.4578); 
    const [showLongitude, setShowLongitude] = useState(130.8334); 
    const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);

    // New location state
    const [spotName, setSpotName] = useState("");
    const [image, setImage] = useState<File | null>(null); // Keep as File for upload
    const [info, setInfo] = useState("");
    const [savedLat, setSavedLat] = useState("");
    const [savedLong, setSavedLong] = useState("");

    const [options, setOptions] = useState({
        showRadar: false,
        showLandFishingSpots: false,
        showBoatFishingSpots: false,
        showBoatRamps: false,
        showAvoidPatches: false,
    });

    const [weatherOptions, setWeatherOptions] = useState({
      showWind: false,
      showRain: false,
      showClouds: false,
      showTemp: false,
      showWaves: false,
      showSwell: false,
      showSnow: false,
    });

    const [viewport, setViewport] = useState({
        latitude: showLatitude,
        longitude: showLongitude,
        zoom: 5, 
        bearing: 0,
        pitch: 0,
    });

    const fetchFishingSpots = async () => {
        const spots = await getFishingSpots();
        if (spots) {
            setFishingSpots(spots);
        }
    };
    
    useEffect(() => {
        fetchFishingSpots();
    }, []);

    const handleViewportChange = (event: ViewStateChangeEvent) => {
        setViewport(event.viewState);
    };

    const handleToggle = (option: keyof typeof options) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
    };

    const handleToggleWeather = (weatherOption: keyof typeof weatherOptions) => {
      setWeatherOptions((prevOptions) => ({
          ...prevOptions,
          [weatherOption]: !prevOptions[weatherOption],
      }));
    };

    const handleUploadSpot = async () => {
      if (image) {
        await addFishingSpot(spotName, Number(savedLat), Number(savedLong), "fishing", info, image);
        setImage(null);
        setSpotName("");
        setInfo("");
        setSavedLong("");
        setSavedLat("");
      }
    };

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setQuery(input);

        if (input.length > 2) {
            const res = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?proximity=-25.2744,88.7751&country=AU&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API}`
            );
            const data = await res.json();
            setSearchResults(data.features);
        } else {
            setSearchResults([]);
        }
    };

    // Handle selecting image file
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]); // Set the file directly
        }
    };

    const handleLocationSelect = (location: any) => {
        const { center, place_name } = location;
        setQuery(place_name); 
        setViewport({
            ...viewport,
            longitude: center[0],
            latitude: center[1],
            zoom: 10, 
        });
        setSearchResults([]); 
    };

    return (
      <div className="w-screen min-h-screen bg-gray-100 flex flex-col">
          <div className="relative h-[700px] rounded-2xl p-[40px]">
              <MapGL
                  {...viewport}
                  mapStyle="mapbox://styles/mapbox/satellite-v9"
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API}
                  onMove={handleViewportChange}
              >
                  {fishingSpots.map((spot) => (
                      <Marker
                          key={spot.id}
                          longitude={spot.location.lng}
                          latitude={spot.location.lat}
                          anchor="bottom"
                      >
                          <FaMapMarkerAlt color="red" size={32} />
                      </Marker>
                  ))}
              </MapGL>
              <div className="absolute top-14 left-14 bg-white bg-opacity-90 p-2 rounded-md shadow-lg w-[300px]">
                  <h2 className="font-bold text-sm text-gray-700 mb-2">Map Options</h2>
                  <input
                      type="text"
                      placeholder="Where are you going?"
                      value={query}
                      onChange={handleInputChange}
                      className="w-full mt-4 text-sm pr-10 pl-2 py-1 text-bold text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out"
                  />
                  {searchResults && (
                      <ul className="mt-2 shadow-md rounded-md max-h-[300px] bg-black text-sm text-white overflow-y-auto">
                          {searchResults.map((result) => (
                              <li
                                  key={result.id}
                                  className="p-2 hover:bg-gray-800 cursor-pointer border-b"
                                  onClick={() => handleLocationSelect(result)}
                              >
                                  {result.place_name}
                              </li>
                          ))}
                      </ul>
                  )}
                  <div className="flex flex-col gap-2">
                  <h1 className="text-sm font-semibold">Activity Options</h1>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={options.showBoatFishingSpots}
                              onChange={() => handleToggle('showBoatFishingSpots')}
                              className="mr-2"
                          />
                          Show Offshore Fishing Spots
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={options.showLandFishingSpots}
                              onChange={() => handleToggle('showLandFishingSpots')}
                              className="mr-2"
                          />
                          Show Land-Based Fishing Spots
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={options.showAvoidPatches}
                              onChange={() => handleToggle('showAvoidPatches')}
                              className="mr-2"
                          />
                          Show Rough Patches
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={options.showBoatRamps}
                              onChange={() => handleToggle('showBoatRamps')}
                              className="mr-2"
                          />
                          Show Boat Ramps
                      </label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-sm font-semibold pt-8">Weather Options</h1>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={weatherOptions.showClouds}
                              onChange={() => handleToggleWeather('showClouds')}
                              className="mr-2"
                          />
                          Show Clouds
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={weatherOptions.showRain}
                              onChange={() => handleToggleWeather('showRain')}
                              className="mr-2"
                          />
                          Show Rain
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={weatherOptions.showSnow}
                              onChange={() => handleToggleWeather('showSnow')}
                              className="mr-2"
                          />
                          Show Snow
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={weatherOptions.showSwell}
                              onChange={() => handleToggleWeather('showSwell')}
                              className="mr-2"
                          />
                          Show Swell
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={weatherOptions.showTemp}
                              onChange={() => handleToggleWeather('showTemp')}
                              className="mr-2"
                          />
                          Show Temps
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={weatherOptions.showWaves}
                              onChange={() => handleToggleWeather('showWaves')}
                              className="mr-2"
                          />
                          Show Waves
                      </label>
                      <label className="flex items-center text-sm text-gray-600">
                          <input
                              type="checkbox"
                              checked={weatherOptions.showWind}
                              onChange={() => handleToggleWeather('showWind')}
                              className="mr-2"
                          />
                          Show Wind
                      </label>
                  </div>
              </div>
          </div>
          <div className="w-screen p-[40px] flex flex-row gap-x-3">
              <div className="w-1/2 p-[20px] rounded-[10px] flex flex-col justify-start items-start shadow-xl">
                  <h1 className="font-bold text-4xl">New Location</h1>
                  <p className="font-semibold text-sm pt-2">Location Photo</p>
                  <div className="relative w-[350px] h-[250px] rounded-md overflow-hidden bg-gray-200 cursor-pointer">
                      <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="file-input"
                      />
                      <label htmlFor="file-input" className="cursor-pointer w-full h-full flex items-center justify-center">
                          {image ? (
                              <img src={URL.createObjectURL(image)} alt="Selected" className="w-full h-full object-cover" />
                          ) : (
                              <div className="flex flex-col items-center text-gray-500">
                                  <FaCamera size={30} />
                                  <span className="text-sm">Upload Image</span>
                              </div>
                          )}
                      </label>
                  </div>
                  <input
                      type="text"
                      placeholder="Spot Name..."
                      value={spotName}
                      onChange={(e) => setSpotName(e.target.value)}
                      className="w-full text-sm pr-10 pl-2 py-1 text-bold text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out"
                  />
                  <p className="font-semibold text-sm pt-2">Location Coordinates</p>
                  <input
                      type="text"
                      placeholder="Latitude..."
                      value={savedLat}
                      onChange={(e) => setSavedLat(e.target.value)}
                      className="w-full text-sm pr-10 pl-2 py-1 text-bold text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out"
                  />
                  <input
                      type="text"
                      placeholder="Longitude..."
                      value={savedLong}
                      onChange={(e) => setSavedLong(e.target.value)}
                      className="w-full mt-4 text-sm pr-10 pl-2 py-1 text-bold text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out"
                  />
                  <p className="font-semibold text-sm pt-2">Location Info</p>
                  <textarea
                      placeholder="Enter location details..."
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                      className="w-full h-[200px] text-start text-sm pr-10 pl-2 pt-1 text-bold text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out resize-none"
                  />
              <div className="w-full mt-[15px] flex flex-row gap-x-[30px] justify-end">
                <button className="text-sm text-gray-700"> Cancel</button>
                <button className="text-sm p-2 text-white rounded-lg bg-custom-purple" onClick={handleUploadSpot}>Save Location</button>
              </div>
              </div>
          </div>
      </div>
  );
};

export default Map;
