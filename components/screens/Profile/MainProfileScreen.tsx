'use client'
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { addFishingSpot, getFishingSpots } from '~/lib/fishingLocations';
import { FishingSpot } from '~/types/mainTypes';

type MainProfileScreenTypes = {
  account: any;
  setStep: (input: number) => void;
}

export const MainProfileScreen = ({ account, setStep }: MainProfileScreenTypes) => {
  //Fishing spot state
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [activity, setActivity] = useState('');
  const [description, setDescription] = useState('');

  // array of spots
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && latitude && longitude) {
      addFishingSpot(name, parseFloat(latitude), parseFloat(longitude), activity, description);
    }
  };

  const fetchFishingSpots = async () => {
    const spots = await getFishingSpots();
    if(spots){
    setFishingSpots(spots);
    }
    setActivity('');
    setDescription('');
    setLatitude('');
    setLongitude('');
    setName('');
  };

  useEffect(() => {
    fetchFishingSpots();
  }, []);

  return (
    <div className="flex flex-row gap-x-[50px] justify-center min-h-screen pt-10 bg-gray-50"> 
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md h-[500px] w-full"> 
          <div className="flex justify-center items-center flex-col mb-2">
          {account.photoURL ? (
                <img src={account.photoURL} alt="Profile" className="w-[80px] h-[80px] rounded-full" />
              ) : (
                <FaUserCircle size={30} className="invert" />
              )}
            <h1 className="text-2xl font-semibold text-gray-900 mt-4">{account.displayName}</h1> 
            <button 
            className="text-gray-500 underline text-sm"
            onClick={() => setStep(2)}>
              Manage Account
            </button>
          </div>
          
          <div className="mb-6 flex flex-col items-center justify-center">
            <h2 className="text-sm text-gray-900 mb-4">🇦🇺 Australia</h2>
          </div>
        </div>
       <div className="flex flex-col gap-y-[40px] w-[600px]">
      <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Spot Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full text-base text-black"
        required
      />
      <input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        className="border p-2 w-full text-base text-black"
        required
      />
      <input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        className="border p-2 w-full text-base text-black"
        required
      />
      <input
        type="text"
        placeholder="Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="border p-2 w-full text-base text-black"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full text-base text-black"
        required
      />
      <button onClick={() => { fetchFishingSpots(); }} type="submit" className="bg-black text-base text-white py-1 px-[50px] rounded">
        Add Spot
      </button>
    </form>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Latitude</th>
            <th className="py-3 px-6 text-left">Longitude</th>
            <th className="py-3 px-6 text-left">Activity</th>
            <th className="py-3 px-6 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {fishingSpots.map((spot) => (
            <tr key={spot.name} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{spot.name}</td>
              <td className="py-3 px-6 text-left">{spot.location.lat}</td>
              <td className="py-3 px-6 text-left">{spot.location.lng}</td>
              <td className="py-3 px-6 text-left">{spot.activity}</td>
              <td className="py-3 px-6 text-left">{spot.description || 'No description available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
};
