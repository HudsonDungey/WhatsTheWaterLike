'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaStar, FaArrowLeft, FaArrowDown, FaArrowUp, FaWater, FaRegCalendarAlt } from 'react-icons/fa';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FiWind } from "react-icons/fi";
import { MapComponent } from '~/components';
import { FishingSpot } from '~/types/mainTypes';
import { getFishingSpots } from '~/lib/fishingLocations';
import { getDateInfo } from '~/utils/utils';

const Surfing = () => {
  const surfingConditionsPercent = 85; 
  const currentDate = new Date().toLocaleDateString(); 
  const [hideSpots, setHideSpots] = useState(true);
  const [surfSpots, setSurfSpots] = useState<FishingSpot[]>([]);
  const router = useRouter();

  const fetchSurfSpots = async () => {
    const spots = await getFishingSpots();
    if (spots) {
      setSurfSpots(spots);
    }
  };

  const handleSurfSpots = () => {
    if (hideSpots) {
      setHideSpots(false);
      fetchSurfSpots();
    } else {
      setHideSpots(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-[60px]">

      <div className="w-screen p-[10px] bg-white text-start" onClick={() => router.push('/home')}> 
        <FaArrowLeft color='#636AE8FF' /> 
      </div>

      <div className="relative w-full h-44 md:h-96">
        <h1 className="absolute top-4 left-[30px] md:left-[60px] text-white text-[40px] md:text-[60px] font-bold z-10">Surfing</h1>
        <Image
          src="/images/surfing-banner.jpg" 
          alt="Surfing"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <div className="mx-auto h-[390px] md:h-[600px] px-[30px] md:px-[50px] py-2 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8">
        <div className="bg-white col-span-8 shadow-md rounded-lg p-1 mb-[100px]">
          <h2 className="text-xl md:text-3xl pl-6 pt-4 text-start font-semibold text-gray-700">Surfing Conditions</h2>
          <p className="text-lg md:text-2xl pl-6 text-start font-semibold text-gray-700">Darwin Harbour</p>
          <p className="text-sm md:text-xl pl-6 text-start font-semibold text-gray-700">{currentDate}</p>
          <h1 className="text-green-600 md:pl-6 pt-6 mb-2 text-[20px] md:text-[40px] font-bold">EXCELLENT</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full bg-gray-200">
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full"
                style={{
                  padding: '50px',
                  background: `conic-gradient(#636AE8FF ${surfingConditionsPercent}%, #e5e7eb ${surfingConditionsPercent}%)`,
                }}
              />
              <div className="absolute top-3 left-3 right-3 bottom-3 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-blue-600">
                {surfingConditionsPercent}%
              </div>
            </div>
            <div className="flex mt-4">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-4xl ${index < Math.round(surfingConditionsPercent / 20) ? 'text-yellow-400' : 'text-gray-300'}`}
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

        <div className="hidden col-span-4 md:flex flex-col">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4">
            <button
              className="text-sm border px-2 py-1 rounded-[4px] flex flex-row items-center text-center justify-center shadow-md border-gray-300 text-black font-medium"
              onClick={handleSurfSpots}
            >
              {hideSpots ? "Show Surf Spots" : "Hide Surf Spots"}
            </button>
            <div className="relative h-64 mt-4">
              <MapComponent
                longitude={130.8334}
                latitude={-12.4578}
                showSpots={!hideSpots}
                fishingSpots={!hideSpots ? surfSpots : []}
              />
            </div>
            <button
              onClick={() => router.push('/Map')}
              className="text-sm border px-1 py-1 mt-2 rounded-[4px] flex flex-row items-center text-center justify-center shadow-md border-gray-300 text-black font-medium"
            >
              Open Map Full Size
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-[40px] p-[20px] md:p-[50px]">
        <div className="bg-purple-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
          <div className="w-full flex flex-row items-center justify-between">
            <h2 className="text-base font-medium text-purple-600">Wind</h2>
            <FiWind color="black" />
          </div>
          <p className="text-3xl font-semibold text-gray-800">Ideal for Surfing</p>
          <div className="mt-4 flex justify-end text-sm text-gray-500">
            <span>12 kts</span> / <span>20 kmh</span>
          </div>
        </div>

        <div className="bg-yellow-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
          <div className="w-full flex flex-row items-center justify-between">
            <h2 className="text-base font-medium text-yellow-600">Weather</h2>
            <TiWeatherPartlySunny color="black" />
          </div>
          <p className="text-sm text-yellow-600 flex flex-row items-center gap-1">
            <FaArrowDown color="red" /> Today {currentDate}
          </p>
          <p className="text-3xl font-semibold text-gray-800">Sunny</p>
          <div className="mt-4 flex justify-end text-sm text-gray-500">
            <span>Max: 28°C</span> / <span>Min: 18°C</span>
          </div>
        </div>

        <div className="bg-green-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
          <div className="w-full flex flex-row items-center justify-between">
            <h2 className="text-base font-medium text-green-600">Swell</h2>
            <FaWater color="black" />
          </div>
          <p className="text-3xl font-semibold text-gray-800">5m, 12s</p>
          <p className="text-sm text-green-600 flex flex-row items-center gap-1">
            <FaArrowUp color="green" /> 0.5m, +3s
          </p>
        </div>

        <div className="bg-blue-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
          <div className="w-full flex flex-row items-center justify-between">
            <h2 className="text-base font-medium text-blue-600">Water/Tides</h2>
            <FaWater color="black" />
          </div>
          <h2 className="text-lg font-semibold flex justify-start items-center flex-row text-black gap-1">
            Show more detail <FaArrowDown />
          </h2>
          <div className="flex flex-col items-end text-sm text-gray-500 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-semibold text-black">H</span>
              <span className="bg-red-500 text-white px-2 py-1 font-semibold rounded-full text-base">5.8m</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-semibold text-black">L</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded-full font-semibold text-base">1.9m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surfing;
