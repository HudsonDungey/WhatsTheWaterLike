'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { FaStar, FaSearch, FaArrowLeft, FaArrowDown, FaWater, FaRegCalendarAlt } from 'react-icons/fa';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiSunrise } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { MapComponent } from '~/components';
import { FishingSpot } from '~/types/mainTypes';
import { getDateInfo } from '~/utils/utils';
import { getFishingSpots } from '~/lib/fishingLocations';

const Sailing = () => {
  const conditionsPercent = 63;
  const currentDate = new Date().toLocaleDateString();
  const [hideSpots, setHideSpots] = useState(true);
  const [spots, setSpots] = useState<FishingSpot[]>([]);
  const router = useRouter();

  const fetchSpots = async () => {
    const data = await getFishingSpots();
    if(data){
      setSpots(data);
    }
  };

  const toggleSpots = () => {
    if(hideSpots){
        setHideSpots(false);
        fetchSpots();
    } else {
        setHideSpots(true);
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <div className="w-screen p-2 bg-white" onClick={() => router.push('/home')}> 
        <FaArrowLeft color='#636AE8FF' size={24} /> 
      </div>
      
      <div className="relative w-full h-44 md:h-96">
        <h1 className="absolute top-20 left-8 text-white text-4xl md:text-5xl font-bold z-10">Sailing</h1>
        <Image
          src="/images/boating-banner.jpg" 
          alt="Sailing"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      
      <div className="mx-auto h-[390px] md:h-[600px] px-[50px] py-2 flex flex-col md:grid md:grid-cols-12 gap-8">
        <div className="bg-white col-span-8 shadow-md rounded-lg p-1 mb-[100px]">
          <h2 className="text-xl md:text-3xl pl-6 pt-4 text-start font-semibold text-gray-700">Sailing Conditions</h2>
          <p className="text-lg md:text-2xl pl-6 text-start font-semibold text-gray-700">Darwin Harbour</p>
          <p className="text-sm md:text-xl pl-6 text-start font-semibold text-gray-700">{currentDate}</p>
          <h1 className="text-green-600 md:pl-6 pt-6 mb-2 text-[20px] md:text-[40px] font-bold">Decent</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full bg-gray-200">
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full"
                style={{
                  padding: '50px',
                  background: `conic-gradient(#636AE8FF ${conditionsPercent}%, #e5e7eb ${conditionsPercent}%)`,
                }}
              />
              <div className="absolute top-3 left-3 right-3 bottom-3 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-blue-600">
                {conditionsPercent}%
              </div>
            </div>
            <div className="flex mt-4">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-4xl ${index < Math.round(conditionsPercent / 20) ? 'text-yellow-400' : 'text-gray-300'}`}
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

         <div className="md:col-span-4 flex flex-col">
         <div className="hidden md:flex bg-white col-span-6 shadow-md mt-[15px] rounded-lg p-4 flex-col space-y-4">
          <div className="relative h-64 mt-4">
            <MapComponent
              longitude={130.8334}
              latitude={-12.4578}
            />
          </div>
          <button
            onClick={() => router.push('/Map')}
            className="text-sm border px-1 py-1 mt-2 rounded-[4px] flex flex-row items-center text-center justify-center shadow-md border-gray-300 text-black font-medium"
          >
            Click here to open map full size
          </button>
         </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-4 md:p-12">
        {[
          {
            title: "Wind",
            subtitle: "Good For Sailing",
            icon: <FiWind />,
            data: "14 kts / 26 kmh",
            bg: "bg-purple-100",
            textColor: "text-purple-600",
          },
          {
            title: "Weather",
            subtitle: "Cloudy but hot",
            icon: <TiWeatherPartlySunny />,
            data: `Today ${currentDate}`,
            detail: "Max: 35°C / Min: 28°C",
            bg: "bg-yellow-100",
            textColor: "text-yellow-600",
          },
          {
            title: "Sunrise / Sunset",
            subtitle: "56,201",
            icon: <WiSunrise size={35} />,
            detail: "-2.43%",
            bg: "bg-green-100",
            textColor: "text-green-600",
          },
          {
            title: "Water/Tides",
            subtitle: "Show more detail",
            icon: <FaWater />,
            detail: (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-semibold text-black">H</span>
                  <span className="bg-red-500 text-white px-2 py-1 font-semibold rounded-full text-base">6.2m</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-semibold text-black">L</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full font-semibold text-base">2.2m</span>
                </div>
              </>
            ),
            bg: "bg-blue-100",
            textColor: "text-blue-600",
          },
        ].map((card, index) => (
          <div key={index} className={`${card.bg} p-4 rounded-lg shadow-md flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-base font-medium ${card.textColor}`}>{card.title}</h2>
              {card.icon}
            </div>
            <p className="text-3xl font-semibold text-gray-800">{card.subtitle}</p>
            {card.detail && (
              <p className="mt-4 flex justify-end text-sm text-gray-500">
                {card.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sailing;
