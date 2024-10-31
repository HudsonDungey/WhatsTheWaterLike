import React from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

type Step = {
    name: string;
    step: number;
};

type UserState = 'NT' | 'SA';

type SpeciesProps = {
  userState: UserState; 
  step: number;
  handleStep: (input: number) => void;
  steps: Step[];
};

export const Species = ({ userState, step, handleStep, steps }: SpeciesProps) => {
  const speciesByState = {
    NT: ['Barramundi', 'Mackerel', 'Threadfin Salmon', 'Mangrove Jack'],
    SA: ['Snapper', 'Gummy Shark', 'King George Whiting', 'Flathead'],
  };

  const species = speciesByState[userState] || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="w-screen flex items-center justify-between p-[10px]">
          <div onClick={() => handleStep(0)} className="flex items-center">
            <FaArrowLeft color="#636AE8FF" />
          </div>
          <div className="flex space-x-4">
            {steps.map((stepData) => (
              <button
                key={stepData.step}
                onClick={() => handleStep(stepData.step)}
                className={`p-2 px-4 rounded-md shadow-md ${
                  step === stepData.step ? 'text-[#636AE8FF]' : 'text-black'
                }`}
              >
                {stepData.name}
              </button>
            ))}
          </div>
          <div className="w-8"></div>
        </div>
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
      <h1 className="text-3xl font-bold mb-6">Species in {userState}</h1>
      {species.length > 0 ? (
        <ul className="space-y-4">
          {species.map((speciesName: string, index: number) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-4 text-lg font-semibold text-gray-700">
              {speciesName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No species information available for this region.</p>
      )}
    </div>
  );
};
