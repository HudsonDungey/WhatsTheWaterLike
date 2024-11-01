'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { AustralianState, speciesType } from '~/types/mainTypes';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { FishIndepth } from './FishIndepth';
import { speciesByState } from '~/lib/fish';

type Step = {
  name: string;
  step: number;
};

type SpeciesProps = {
  step: number;
  handleStep: (input: number) => void;
  steps: Step[];
};

export const Species = ({ step, handleStep, steps }: SpeciesProps) => {
  const [targetSpecies, setTargetSpecies] = useState('');
  const [selectedFish, setSelectedFish] = useState<speciesType | null>(null);
  const [stepAlt, setStepAlt] = useState(0);
  const [activeState, setActiveState] = useState<AustralianState>('');
  const states: AustralianState[] = ['', 'NT', 'SA', 'NSW', 'VIC', 'QLD', 'WA', 'TAS', 'ACT'];

  // Defining "All States" species by gathering species from all individual states
  speciesByState[''] = [
    ...speciesByState['NT'],
    ...speciesByState['SA'],
    ...speciesByState['NSW'],
    ...speciesByState['VIC'],
    ...speciesByState['QLD'],
    ...speciesByState['WA'],
    ...speciesByState['TAS'],
    ...speciesByState['ACT'],
  ];

  const species = activeState ? speciesByState[activeState] : speciesByState[''];
  const filteredSpecies = species.filter((speciesObj) =>
    speciesObj.name.toLowerCase().includes(targetSpecies.toLowerCase())
  );

  const renderStars = (rating: number) => (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  );

  if (stepAlt === 1 && selectedFish) {
    return (
      <FishIndepth stepAlt={stepAlt} setStepAlt={setStepAlt} selectedFish={selectedFish} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-[20px]">
      <div className="relative w-full h-[200px]">
        <h1 className="absolute top-4 left-[60px] text-white text-[60px] font-bold z-10">Fish Species</h1>
        <Image
          src="/images/species-banner.jpg"
          alt="Fishing"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      <div className="w-screen bg-gray-900 flex items-center justify-between p-[10px]">
        <div onClick={() => handleStep(0)} className="flex items-center cursor-pointer">
          <FaArrowLeft color="white" size={20} />
        </div>
        <div className="flex space-x-[20px] rounded-lg bg-gray-50">
          {steps.map((stepData) => (
            <button
              key={stepData.step}
              onClick={() => handleStep(stepData.step)}
              className={`p-1 px-6 text-base ${
                step === stepData.step ? 'text-white bg-[#636AE8FF] rounded-lg' : 'text-black'
              }`}
            >
              {stepData.name}
            </button>
          ))}
        </div>
        <div className="w-8"></div>
      </div>
      <div className="flex flex-row w-screen items-center justify-center p-[50px]">
        <h1 className="text-xl font-bold pr-[10px] text-black">Fish Species</h1>
        <input
          type="text"
          placeholder="Search species"
          value={targetSpecies}
          onChange={(e) => setTargetSpecies(e.target.value)}
          className="border px-2 py-4 w-6/12 text-black text-sm rounded-md"
        />
      </div>
      <div className="flex items-center justify-center mt-1 space-x-2">
        {states.map((state) => (
          <button
            key={state}
            onClick={() => setActiveState(state)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 ${
              activeState === state ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {state || 'All States'}
          </button>
        ))}
      </div>
      {filteredSpecies.length > 0 ? (
        <ul className="grid grid-cols-3 gap-8 pt-3">
          {filteredSpecies.map((speciesObj, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedFish(speciesObj);
                setStepAlt(1);
              }}              
              className="bg-white shadow-md rounded-lg p-4 text-lg font-semibold text-gray-700 cursor-pointer"
            >
              <div className="relative h-[110px] w-[260px] rounded-lg overflow-hidden">
                <Image
                  src="/images/fish-img.png"
                  alt={speciesObj.name}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
              </div>
              <div className="pt-4 w-full flex flex-col items-start justify-center">
                <p className="mt-2 font-bold">{speciesObj.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-sm text-gray-500">Taste:</p>
                  {renderStars(speciesObj.eatingRating)}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-sm text-gray-500">Fight:</p>
                  {renderStars(speciesObj.fightingRating)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black text-base">No species information available for this region.</p>
      )}
    </div>
  );
};
