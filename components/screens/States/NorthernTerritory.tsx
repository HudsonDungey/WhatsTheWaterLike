'use client';

import React, { useEffect, useState } from 'react';
import { QueryParams, Credentials } from '~/types/query';
import { getWeatherCondition, getSeaCondition } from '~/hooks/useIndividualStats';
import { genWWOUrl } from '~/utils/utils';
import { getSeaConditionColor, getTempConditionColor, getWindConditionColor, getWaveConditionColor } from '~/utils/classUtils';

const credentials: Credentials = {
    key: process.env.NEXT_PUBLIC_WWW_API_KEY!, 
    subscription: 'premium',
    responseType: 'json',
    locale: 'en'
};
  
const query: QueryParams = {
    q: 'Darwin', 
    tide: 'yes'   
};

const dummyWaterConditionsData = {
    main: {
      waterTemp: 22, // °C
      tideHeight: 1.5, // meters
      waveHeight: 2.0, // meters
      windSpeed: 15, // km/h
      seaCondition: "Rough", // Sea condition (Good, Rough, Bad)
    },
    weather: [
      {
        description: "Partly cloudy",
      }
    ]
  };
  


export const NorthernTerritoryScreen: React.FC = () => {
  // const [weatherData, setWeatherData] = useState<any>(dummyWeatherData); //dummy data for now
  const [loading, setLoading] = useState(true);
  const { waterTemp, tideHeight, waveHeight, windSpeed, seaCondition } = dummyWaterConditionsData.main;
  const weatherDescription = dummyWaterConditionsData.weather[0].description || "Clear";
  const seaConditionColorClass = getSeaConditionColor(seaCondition);
  const waveConditionColorClass = getWaveConditionColor(waveHeight);
  const windConditionColorClass = getWindConditionColor(windSpeed);
  const tempConditionColorClass = getTempConditionColor(waterTemp);

 //useEffect(() => {
 //  const fetchWeatherData = async () => {
 //    try {
 //      const url = genWWOUrl(credentials, 'marineWeatherApi', query);
 //      const response = await fetch(
 //        url
 //      );
 //      const data = await response.json();
 //      if (data && data !== 0) {
 //          setWeatherData(data);
 //          setLoading(false);
 //      }
 //    } catch (error) {
 //      console.error('Error fetching weather data:', error);
 //    }
 //  };
 //  fetchWeatherData();
 //}, []);

 //if (loading) {
 //  return <div>Loading weather data...</div>;
 //}

 return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Current Water Conditions Across NT</h1>

      <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <span className={`text-2xl font-bold ${tempConditionColorClass}`}>{waterTemp}°C</span>
            <p className="text-base text-gray-700">Water Temperature</p>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <span className="text-2xl font-bold text-teal-500">{tideHeight}m</span>
            <p className="text-base text-gray-700">Tide Height</p>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <span className={`text-2xl font-bold ${waveConditionColorClass}`}>{waveHeight}m</span>
            <p className="text-base text-gray-700">Wave Height</p>
          </div>

          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <span className={`text-2xl font-bold ${windConditionColorClass}`}>{windSpeed} km/h</span>
            <p className="text-base text-gray-700">Wind Speed</p>
          </div>
        </div>

        <div className="mt-6">
          <p className={`text-xl font-bold ${waveConditionColorClass}`}>
            Sea Condition: {waveHeight <= 1 ? 'Flat as' : waveHeight <= 2 ? 'Getting Pretty Crap' : 'Crap'}
          </p>
          <p className="text-xl text-gray-700">
            <strong>Overall Weather:</strong> {weatherDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
