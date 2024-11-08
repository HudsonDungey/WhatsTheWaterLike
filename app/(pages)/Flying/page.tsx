'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaStar, FaSearch, FaArrowLeft, FaArrowDown, FaWater, FaRegCalendarAlt } from 'react-icons/fa';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiSunrise } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { MapComponent } from '~/components';
import { AirportType } from '~/types/mainTypes';
import { getDateInfo } from '~/utils/utils';

const Flying = () => {
  const flyingConditionsPercent = 21; 
  const currentDate = new Date().toLocaleDateString(); 
  const router = useRouter();
  const [airports, setAirports] = useState<AirportType[]>([]);

  const fetchAirports = async () => {
    const response = await fetch(`https://api.core.openaip.net/api/airports?country=AU&apiKey=${process.env.NEXT_PUBLIC_AIRPORT_API}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const formattedData = data.items.map((airport: any) => ({
      name: airport.name,
      latitude: airport.geometry.coordinates[1],
      longitude: airport.geometry.coordinates[0]
    }));
    setAirports(formattedData);
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-screen p-[10px] bg-white text-start" onClick={() => router.push('/home')}> 
        <FaArrowLeft color='#636AE8FF' /> 
      </div>

      <div className="relative w-full h-44 md:h-96">
        <h1 className="absolute bottom-6 left-[30px] text-white text-[40px] md:text-[60px] font-bold z-10">Flying</h1>
        <Image
          src="/images/flying-banner.jpg" 
          alt="Flying"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <div className="mx-auto h-[390px] md:h-[600px] px-[50px] py-2 flex flex-col md:grid md:grid-cols-12 gap-8">
        <div className="bg-white col-span-8 shadow-md rounded-lg p-1 mb-[100px]">
          <h2 className="text-xl md:text-3xl pl-6 pt-4 text-start font-semibold text-gray-700">Flying Conditions</h2>
          <p className="text-lg md:text-2xl pl-6 text-start font-semibold text-gray-700">EMKAYTEE</p>
          <p className="text-sm md:text-xl pl-6 text-start font-semibold text-gray-700">{currentDate}</p>
          <h1 className="text-red-600 md:pl-6 pt-6 mb-2 text-[20px] md:text-[40px] font-bold">POOR</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full bg-gray-200">
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full"
                style={{
                  padding: '50px',
                  background: `conic-gradient(#636AE8FF ${flyingConditionsPercent}%, #e5e7eb ${flyingConditionsPercent}%)`,
                }}
              />
              <div className="absolute top-3 left-3 right-3 bottom-3 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-blue-600">
                {flyingConditionsPercent}%
              </div>
            </div>
            <div className="flex mt-4">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-4xl ${index < Math.round(flyingConditionsPercent / 20) ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <div className="hidden md:block w-full">
            <h1 className="w-full mt-[25px] p-2 leading-tight text-sm rounded-[10px] flex flex-row justify-center items-center gap-2 bg-[#636AE8FF]">
              <FaRegCalendarAlt size={20} /> Select Date
            </h1>
            <div className="flex px-[5px] space-x-2 justify-between pt-2">
              {[0, 1, 2, 3, 4].map((daysOffset) => {
                const { dayOfMonth, dayAbbreviation } = getDateInfo(daysOffset);
                return (
                  <div
                    key={daysOffset}
                    className="bg-gray-200 text-sm text-gray-900 flex flex-col rounded-lg justify-center items-center w-2/12 p-2"
                  >
                    <span className="font-medium text-black text-lg">{dayOfMonth}</span>
                    <span className="text-base text-gray-800">{dayAbbreviation}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden md:flex col-span-4 flex-col">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-black">Airports</h2>
            <div className="flex items-center text-start border border-gray-300 bg-gray-200 rounded-[20px] px-24 py-2">
              <FaSearch className="text-gray-500 mr-2 text-sm" />
              <input
                type="text"
                placeholder="Search location"
                className="focus:outline-none bg-gray-200 text-gray-700 text-sm flex-grow"
              />
            </div>
            <div className="relative h-64 mt-4">
              <MapComponent longitude={130.8334} latitude={-12.4578} airports={airports}/>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block relative w-full h-[140px] md:h-[150px] mt-[100px]">
        <Image
          src="/images/weather-banner.jpg"
          alt="Fishing"
          layout="fill" 
          objectFit="cover" 
          className="rounded-lg" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-black bg-white rounded-[40px] text-2xl font-bold py-3 px-8">Weather</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] p-[50px]">
        <div className="bg-purple-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
          <div className='w-full flex flex-row items-center justify-between'>
            <h2 className="text-base font-medium text-purple-600">Wind</h2>
            <FiWind color='black' />
          </div>
          <p className="text-3xl font-semibold text-gray-800">Strong Winds</p>
          <div className="mt-4 flex justify-end font-semibold text-sm text-gray-500">
            <span>22.7 kts</span> / <span>42 kmh</span>
          </div>
        </div>

        <div className="bg-yellow-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
          <div className='w-full flex flex-row items-center justify-between'>
            <h2 className="text-base font-medium text-yellow-600">Weather</h2>
            <TiWeatherPartlySunny color='black' />
          </div>
          <p className="text-sm font-semibold text-yellow-600 flex flex-row items-center gap-1">
            <FaArrowDown/>Today {currentDate}
          </p>
          <p className="text-3xl font-semibold text-gray-800">Probable Rain</p>
          <div className="mt-4 flex justify-end text-sm font-semibold text-gray-500">
            <span>Max: 34°C</span> / <span>Min: 27°C</span>
          </div>
        </div>

        <div className="bg-green-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
          <div className='w-full flex flex-row items-center justify-between'>
            <h2 className="text-base font-medium text-green-600">Sunrise / Sunset</h2>
            <WiSunrise size={35} color='black' />
          </div>
          <p className="text-3xl font-semibold text-gray-800">6:00 am - 6:30 pm</p>
        </div>
      </div>
    </div>
  );
};

export default Flying;
