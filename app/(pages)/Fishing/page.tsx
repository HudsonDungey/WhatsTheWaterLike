'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaStar, FaSearch, FaArrowLeft, FaRegCalendarAlt } from 'react-icons/fa';
import { Map } from '~/components';
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
  //const currentDate = new Date().toLocaleDateString(); 
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
        <Species userState={"NT"} step={step} handleStep={handleStep} steps={steps}/>
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
            <div className="min-h-screen bg-gray-100">
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
              <div className="mx-auto h-[400px] px-[50px] py-2 grid md:grid-cols-11 gap-8">
                <div className="bg-white col-span-5 shadow-md rounded-lg p-1">
                  <h2 className="text-xl pl-6 pt-4 text-start font-semibold text-gray-700">Boating Conditions</h2>
                  <p className="text-lg pl-6 text-start font-semibold text-gray-700">Darwin Harbour</p>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-gray-200">
                      <div
                        className="absolute top-0 left-0 w-full h-full rounded-full"
                        style={{
                          background: `conic-gradient(#636AE8FF 75%, #e5e7eb 75%)`,
                        }}
                      />
                      <div className="absolute top-3 left-3 right-3 bottom-3 bg-white rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">
                        75%
                      </div>
                    </div>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-3xl ${index < Math.round(75 / 20) ? 'text-yellow-400' : 'text-gray-300'}`}
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
                <div className="bg-white col-span-6 shadow-md rounded-lg p-4 flex flex-col space-y-4">
                  <div className="flex items-center justify-between pb-2">
                    <h2 className="text-lg font-semibold text-black"> Fishing Locations</h2>
                    <div className="flex items-center text-start border border-gray-300 bg-gray-200 rounded-[20px] px-24 py-2">
                      <FaSearch className="text-gray-500 mr-2 text-sm" />
                      <input
                        type="text"
                        placeholder="Search location"
                        className="focus:outline-none bg-gray-200 text-gray-700 text-sm flex-grow"
                      />
                    </div>
                    <button
                      className="text-sm border px-2 py-1 rounded-[4px] flex flex-row items-center shadow-md border-gray-300 text-black font-medium"
                      onClick={handleFishingSpots}
                    >
                      {hideSpots ? "Show Saved Locations" : "Hide Saved Locations"}
                    </button>
                  </div>
                  <div className="relative h-64 mt-4">
                    <Map
                      longitude={130.8334}
                      latitude={-12.4578}
                      showSpots={!hideSpots}
                      fishingSpots={!hideSpots ? fishingSpots : []}
                    />
                  </div>
                </div>
              </div>
              <div className="mx-auto px-4 py-2 w-screen flex justify-center">
                <div
                  className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center relative h-64 w-6/12 cursor-pointer"
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
              </div>
            </div>
          );
  }
};

export default Fishing;
