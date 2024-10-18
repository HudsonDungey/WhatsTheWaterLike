'use client'

import React, { useState } from 'react';
import classNames from 'classnames';
import { HomeCarousel, WarningBox } from '~/components/screens';
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
const [query, setQuery] = useState('');
const [filteredLocations, setFilteredLocations] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen bg-blue-100 text-gray-900">
      <div className="w-screen px-10 pt-10">
      <HomeCarousel/>
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
                setFilteredLocations([]); 
              }}
            >
              {location}
            </li>
          ))}
        </ul>
        )}
        </div>
      <div className="grid grid-cols-12 pt-4">
        <div className="col-start-9 col-span-3">
      <WarningBox warnings={dummyWarnings}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
