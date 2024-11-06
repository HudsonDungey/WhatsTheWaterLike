'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaStar, FaSearch, FaArrowLeft, FaRegCalendarAlt,  FaArrowDown, FaArrowUp, FaWater, FaFish } from 'react-icons/fa';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiSunrise } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { MapComponent } from '~/components';
import { FishingTips, Recipes, Species } from '~/components/screens';
import { FishingSpot } from '~/types/mainTypes';
import { getDateInfo } from '~/utils/utils';
import { getFishingSpots } from '~/lib/fishingLocations';

const Fishing = () => {
  const steps = [
    { name: "Tips", step: 1 },
    { name: "Recipes", step: 2 },
    { name: "Species", step: 3 },
  ];

  const fishingConditionsPercent = 75; 
  const currentDate = new Date().toLocaleDateString(); 
  const [hideSpots, setHideSpots] = useState(true)
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const fetchFishingSpots = async () => {
    const spots = await getFishingSpots();
    if(spots){
    setFishingSpots(spots);
    }
  };

  const handleFishingSpots = () => {
    if(hideSpots){
        setHideSpots(false)
        fetchFishingSpots();
    } else {
        setHideSpots(true)
    };
  };

  const handleStep = (newStep: number) => {
    setStep(newStep);
  };


  switch (step) {
    case 3:
      return (
        <Species step={step} handleStep={handleStep} steps={steps}/>
    );
    case 2:
      return (
        <Recipes userState={"NT"} step={step} handleStep={handleStep} steps={steps}/>
    );
    case 1:
      return (
        <FishingTips step={step} handleStep={handleStep} steps={steps}/>
    );

    default:
        return (
            <div className="min-h-screen bg-gray-100 pb-[60px]">
              <div className="w-screen p-[10px] bg-white text-start" onClick={() => router.push('/home')}>
                <FaArrowLeft color="#636AE8FF" />
              </div>
              <div className="relative w-full h-64 md:h-96">
                <h1 className="absolute top-4 left-[60px] text-white text-[60px] font-bold z-10">Fishing</h1>
                <Image
                  src="/images/fishing-banner.jpg"
                  alt="Fishing"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="mx-auto h-[600px] px-[50px] py-2 grid md:grid-cols-12 gap-8">
                <div className="bg-white col-span-8 shadow-md rounded-lg p-1">
                  <h2 className="text-3xl pl-6 pt-4 text-start font-semibold text-gray-700">Fishing Conditions</h2>
                  <p className="text-2xl pl-6 text-start font-semibold text-gray-700">Darwin Harbour</p>
                  <p className="text-xl pl-6 text-start font-semibold text-gray-700">{currentDate}</p>
                  <h1 className='text-green-600 pl-6 pt-6 text-start text-[40px] font-bold'>GOOD</h1>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-[200px] h-[200px] rounded-full bg-gray-200">
                      <div
                        className="absolute top-0 left-0 w-full h-full rounded-full"
                        style={{
                          padding: '50px',
                          background: `conic-gradient(#636AE8FF 75%, #e5e7eb 75%)`,
                        }}
                      />
                      <div className="absolute top-3 left-3 right-3 bottom-3 bg-white rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-blue-600">
                        75%
                      </div>
                    </div>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-4xl ${index < Math.round(75 / 20) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
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
                <div className="col-span-4 flex flex-col">
                <div
                  className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center relative cursor-pointer"
                  onClick={() => handleStep(1)}
                >
                  <h2 className="text-2xl font-semibold text-white mb-4 z-10">Fishing Tips</h2>
                  <Image
                    src="/images/fish-species.jpg"
                    alt="Fish"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="bg-white col-span-6 shadow-md mt-[15px] rounded-lg p-4 flex flex-col space-y-4">
                 <button
                   className="text-sm border px-2 py-1 rounded-[4px] flex flex-row items-center text-center justify-center shadow-md border-gray-300 text-black font-medium"
                   onClick={handleFishingSpots}
                 >
                   {hideSpots ? "Show Saved Locations" : "Hide Saved Locations"}
                 </button>
                 <div className="relative h-64 mt-4">
                   <MapComponent
                     longitude={130.8334}
                     latitude={-12.4578}
                     showSpots={!hideSpots}
                     fishingSpots={!hideSpots ? fishingSpots : []}
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
              <div className="relative w-full h-[140px] md:h-[150px] mt-[40px]">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] p-[20px]">
                  <div className=" bg-purple-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
                  <div className='w-full flex flex-row items-center justify-between'>
                    <h2 className="text-base font-medium text-purple-600">Wind</h2>
                    <FiWind color='black'/>
                    </div>
                    <p className="text-3xl font-semibold text-gray-800">Calm</p>
                    <p className="text-xl font-medium text-gray-800">N/E breeze</p>
                    <div className="mt-4 flex justify-end text-sm text-gray-500">
                      <span>5 kts</span> / <span>8 kmh</span>
                    </div>
                  </div>
            
                  <div className="bg-yellow-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
                  <div className='w-full flex flex-row items-center justify-between'>
                    <h2 className="text-base font-medium text-yellow-600">Weather</h2>
                    <TiWeatherPartlySunny color='black' />
                    </div>
                    <p className="text-sm text-yellow-600 flex flex-row items-center gap-1"><FaArrowDown color='red'/>Today {currentDate}</p>
                    <p className="text-3xl font-semibold text-gray-800">Cloudy</p>
                    <div className="mt-4 flex justify-end text-sm text-gray-500">
                      <span>Max: 30°C</span> / <span>Min: 20°C</span>
                    </div>
                  </div>
            
                  <div className="bg-green-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
                  <div className='w-full flex flex-row items-center justify-between'>
                    <h2 className="text-base font-medium text-green-600">Sunset/Sunrise</h2>
                    <FaWater color='black'/>
                    </div>
                    <p className="text-3xl font-semibold text-gray-800">6am - 7pm</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] p-[20px]">

                <div className="bg-blue-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
                   <div className='w-full flex flex-row items-center justify-between'>
                   <h2 className="text-base font-medium text-blue-600">Water/Tides</h2>
                   <FaWater color='black'/>
                   </div>
                   <h2 className="text-lg font-semibold flex justify-start items-center flex-row text-black gap-1">Show more detail <FaArrowDown/></h2>
                   <div className="flex flex-col items-end text-sm text-gray-500 space-y-1">
                     <div className="flex items-center space-x-2">
                       <span className="text-3xl font-semibold text-black">H</span>
                       <span className="bg-red-500 text-white px-2 py-1 font-semibold rounded-full text-base">6.2m</span>
                     </div>
                     <div className="flex items-center space-x-2">
                       <span className="text-3xl font-semibold text-black">L</span>
                       <span className='bg-red-500 text-white px-2 py-1 rounded-full font-semibold text-base'>2.2m</span>
                     </div>
                   </div>
                 </div>
            
                  <div className="bg-green-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
                  <div className='w-full flex flex-row items-center justify-between'>
                    <h2 className="text-base font-medium text-green-600">Swell</h2>
                    <FaWater color='black'/>
                    </div>
                    <p className="text-3xl font-semibold text-gray-800">4m, 10s</p>
                    <p className="text-sm text-green-600 flex flex-row items-center gap-1"><FaArrowUp color='green'/>0.4m, -3s</p>
                  </div>
            
                  <div className="bg-blue-100 p-3 rounded-lg text-start shadow-md flex flex-col justify-between">
                    <div className='w-full flex flex-row items-center justify-between'>
                    <h2 className="text-base font-medium text-blue-600">Fish Activity</h2>
                    <FaFish />
                    </div>
                    <h2 className="text-lg font-semibold flex justify-start items-center flex-row text-black gap-1">Show more detail <FaArrowDown/></h2>
                    <div className="flex flex-col items-end text-sm text-gray-500 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-semibold text-black">Hot</span>
                        <span className="bg-blue-500 text-white px-2 py-1 font-semibold rounded-full text-base">6pm</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-semibold text-black">Quiet </span>
                        <span className='bg-blue-500 text-white px-2 py-1 rounded-full font-semibold text-base'>11am</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
}
};

export default Fishing;
