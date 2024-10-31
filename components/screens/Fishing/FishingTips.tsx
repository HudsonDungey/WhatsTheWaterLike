'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

type Step = {
  name: string;
  step: number;
};

type FishingTipsTypes = {
  step: number;
  handleStep: (input: number) => void;
  steps: Step[];
};

export const FishingTips = ({ step, handleStep, steps }: FishingTipsTypes) => {
  const [location, setLocation] = useState("");
  const [targetSpecies, setTargetSpecies] = useState("");
  const [fishingTime, setFishingTime] = useState("");
  const [baitOrLure, setBaitOrLure] = useState("");

  const dummyFishData = [
    { name: 'Barramundi', location: 'Queensland', bestTime: 'Dawn', bait: 'Live bait' },
    { name: 'Snapper', location: 'New South Wales', bestTime: 'Early morning', bait: 'Soft plastics' },
    { name: 'Flathead', location: 'Victoria', bestTime: 'Late afternoon', bait: 'Prawns' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ location, targetSpecies, fishingTime, baitOrLure });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
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
                <h1 className="absolute top-4 left-[60px] text-white text-[60px] font-bold z-10">Fishing Tips</h1>
                <Image
                  src="/images/species-banner.jpg"
                  alt="Fishing"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
      <div className="bg-white shadow-lg rounded-md w-6/12 p-8 mb-[50px]">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Fishing Tips</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">Location in Australia</label>
            <input
              type="text"
              placeholder="Enter your fishing location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 w-full text-black bg-gray-100 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">Target Species</label>
            <input
              type="text"
              placeholder="Enter target species"
              value={targetSpecies}
              onChange={(e) => setTargetSpecies(e.target.value)}
              className="border p-2 w-full text-black bg-gray-100 rounded-md"
              required
            />
          </div> 
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">Preferred Fishing Time</label>
            <input
              type="text"
              placeholder="Enter preferred fishing times (e.g., dawn, dusk)"
              value={fishingTime}
              onChange={(e) => setFishingTime(e.target.value)}
              className="border p-2 w-full text-black bg-gray-100 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">Bait or Lures Used</label>
            <input
              type="text"
              placeholder="Enter bait or lure choice"
              value={baitOrLure}
              onChange={(e) => setBaitOrLure(e.target.value)}
              className="border p-2 w-full text-black bg-gray-100 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Suggested Fish to Target</h2>
          <ul className="space-y-4">
            {dummyFishData.map((fish, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-md shadow-sm flex flex-col"
              >
                <h3 className="text-lg font-semibold text-gray-700">{fish.name}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {fish.location}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best Time to Fish:</strong> {fish.bestTime}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Recommended Bait:</strong> {fish.bait}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
