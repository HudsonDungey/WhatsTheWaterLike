import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

type ManageAccountTypes = {
  account: any;
  setStep: (input: number) => void;
  handleSaveProfile: () => void;
  handleChooseImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  username: string;
  email: string;
  activity: string;
  country: string;
  photoURL: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setActivity: (activity: string) => void;
  setCountry: (country: string) => void;
  setPhotoURL: (photoURL: string) => void;
};

export const ManageAccount = ({
  account,
  setStep,
  handleSaveProfile,
  handleChooseImage,
  handleRemoveImage,
  username,
  email,
  activity,
  country,
  photoURL,
  setUsername,
  setEmail,
  setActivity,
  setCountry,
  setPhotoURL,
}: ManageAccountTypes) => {
  return (
    <div className="flex flex-col items-center pt-10 min-h-screen bg-gray-50"> 
      <div className="bg-white shadow-lg rounded-md w-6/12 h-8/12 mb-[50px]"> 
        <img src="/images/profile-banner.jpg" alt="Profile" className="rounded-md w-full" />
        <div className="flex justify-start p-4 items-center flex-row">
          {account.photoURL ? (
            <img src={account.photoURL} alt="Profile" className="rounded-[150px] w-[200px] h-[200px]" />
          ) : (
            <FaUserCircle size={200} className="text-gray-400" /> 
          )}
          <div className="flex flex-col text-start pl-[50px] gap-1">
            <h1 className="font-semibold text-black text-base">Profile Photo</h1>
            <h1 className="text-gray-700 text-base">Upload Your Photo</h1>
            <h1 className="text-gray-700 text-base">Your photo should be in PNG or JPG format only</h1>
            <div className="flex flex-row gap-x-4">
              <label className="p-2 rounded-md border text-sm text-[#636AE8FF] border-[#636AE8FF] cursor-pointer">
                Choose image
                <input 
                  type="file" 
                  accept="image/png, image/jpeg" 
                  onChange={handleChooseImage} 
                  className="hidden" 
                />
              </label>
              <button onClick={handleRemoveImage} className="text-gray-500 text-sm"> Remove</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[30px] gap-y-6">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-black font-bold text-sm pb-1">Username</h1>
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full text-black bg-gray-100 rounded-md text-sm"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-black font-bold text-sm pb-1">Email</h1>
            <input
              type="text"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full text-black bg-gray-100 rounded-md text-sm"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-black font-bold text-sm pb-1">Activity</h1>
            <input
              type="text"
              placeholder="Your main activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="border p-2 w-full text-black bg-gray-100 rounded-md text-sm"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-black font-bold text-sm pb-1">Country</h1>
            <input
              type="text"
              placeholder="Your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border p-2 w-full text-black bg-gray-100 rounded-md text-sm"
              required
            />
          </div>
        </div>
        <div className="w-11/12 flex gap-x-[30px] pt-[20px] flex-row justify-end items-center">
          <button 
            onClick={() => setStep(1)} 
            className="text-gray-500 text-base mb-4"
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveProfile} 
            className="text-gray-50 bg-[#636AE8FF] p-2 rounded-lg text-base mb-4"
          >
            Save profile
          </button>
        </div>
      </div>
    </div>
  );
};
