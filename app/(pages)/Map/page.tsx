'use client';
import React, { useState } from 'react';
import MapGL, { ViewStateChangeEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API; 

const Map = () => {
    const [query, setQuery] = useState('');  
    const [searchResults, setSearchResults] = useState<any[]>([]);  
    const [showLatitude, setShowLatitude] = useState(-12.4578); 
    const [showLongitude, setShowLongitude] = useState(130.8334); 

    const [options, setOptions] = useState({
        showRadar: false,
        showFishingSpots: false,
        showRoughPatches: false,
    });

    const [viewport, setViewport] = useState({
        latitude: showLatitude,
        longitude: showLongitude,
        zoom: 5, 
        bearing: 0,
        pitch: 0,
    });

    const handleViewportChange = (event: ViewStateChangeEvent) => {
        setViewport(event.viewState);
    };

    const handleToggle = (option: keyof typeof options) => {
        setOptions(prevOptions => ({
          ...prevOptions,
          [option]: !prevOptions[option],
        }));
    };

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        console.log(input)
        setQuery(input);

        if (input.length > 2) {
            console.log("getting location");
            const res = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?proximity=-25.2744,88.7751&country=AU&access_token=${MAPBOX_TOKEN}`
            );
            const data = await res.json();
            console.log(data);
            setSearchResults(data.features);
        } else {
            setSearchResults([]);
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
        <div className="w-screen h-screen bg-baby-blue grid grid-cols-4 p-5 gap-x-2">
            <div className="col-span-2 col-start-1 flex flex-col items-center bg-gray-100 shadow-lg h-[600px] p-4 rounded-2xl">
                <h2 className="font-bold text-lg text-black  mb-4">Map Options</h2>
                <div className="flex flex-row gap-[50px]">
                <div>
                <input
                   type="text"
                   placeholder="Where are you going?"
                   value={query}
                   onChange={handleInputChange}
                   className="w-[350px] mt-4 text-sm pr-10 pl-2 py-1 text-bold text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out"
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
                </div>
                <div>
                <div className="flex items-center text-black mb-2">
                    <input
                      type="checkbox"
                      id="showRadar"
                      checked={options.showRadar}
                      onChange={() => handleToggle('showRadar')}
                      className="mr-2"
                    />
                    <label htmlFor="showRadar" className="text-sm">
                      Show Radar
                    </label>
                </div>
                <div className="flex text-black items-center mb-2">
                    <input
                      type="checkbox"
                      id="showFishingSpots"
                      checked={options.showFishingSpots}
                      onChange={() => handleToggle('showFishingSpots')}
                      className="mr-2"
                    />
                    <label htmlFor="showFishingSpots" className="text-sm">
                      Show Fishing Spots
                    </label>
                </div>
                <div className="flex text-black items-center mb-2">
                    <input
                      type="checkbox"
                      id="showRoughPatches"
                      checked={options.showRoughPatches}
                      onChange={() => handleToggle('showRoughPatches')}
                      className="mr-2"
                    />
                    <label htmlFor="showRoughPatches" className="text-sm">
                      Show Rough Patches
                    </label>
                </div>
            </div>
            </div>
            </div>

            <div className="col-start-3 col-span-2 h-[600px] rounded-2xl">
                <MapGL
                  {...viewport}
                  mapStyle="mapbox://styles/mapbox/satellite-v9"
                  mapboxAccessToken={MAPBOX_TOKEN}
                  onMove={handleViewportChange}
                >
                    {/* {options.showRadar && <RadarLayer />} */}
                    {/* {options.showFishingSpots && <FishingSpotsLayer />} */}
                    {/* {options.showRoughPatches && <RoughPatchesLayer />} */}
                </MapGL>
            </div>
        </div>
    );
};

export default Map;
