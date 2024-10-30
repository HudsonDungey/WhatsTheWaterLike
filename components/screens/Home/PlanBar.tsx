import React, { useState } from 'react';
import { activities } from '~/lib/activities&countries';

type Activity = {
  name: string;
  icon: React.ReactNode;
};

type PlanBarProps = {
  location: string;
  setLocation: (value: string) => void;
  arrivalTime: string;
  setArrivalTime: (value: string) => void;
  departureTime: string;
  setDepartureTime: (value: string) => void;
  activity: string;
  setActivity: (value: string) => void;
};

export const PlanBar: React.FC<PlanBarProps> = ({
  location,
  setLocation,
  arrivalTime,
  setArrivalTime,
  departureTime,
  setDepartureTime,
  activity,
  setActivity,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleActivitySelect = (selectedActivity: string) => {
    setActivity(selectedActivity);
    setIsDropdownVisible(false);
  };

  return (
    <div className="flex items-center justify-around rounded-[40px] shadow-xl p-4 space-x-2 ">
      <div>
        <h1 className='font-semibold text-sm'>Location</h1>
      <input
        type="text"
        placeholder="Where are you going?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-1 h-[40px] rounded-md  focus:outline-none focus:ring-2  focus:ring-gray-400 text-sm"
      />
      </div>
      <div>
        <h1 className='font-semibold text-sm'>Location Arrival</h1>
      <input
        type="time"
        placeholder="Pick Time"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)}
        className="p-1 h-[40px] rounded-md focus:outline-none focus:ring-2  focus:ring-gray-400 text-sm"
      />
      </div>
      <div>
        <h1 className='font-semibold text-sm'>Location Departure</h1>
      <input
        type="time"
        placeholder="Pick Time"
        value={departureTime}
        onChange={(e) => setDepartureTime(e.target.value)}
        className="p-1 h-[40px] rounded-md  focus:outline-none focus:ring-2  focus:ring-gray-400 text-sm"
      />
      </div>
      <div>
      <h1 className='font-semibold text-sm'>Activity</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Select Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)} 
          className="p-1 h-[40px] w-full rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
        />
        {isDropdownVisible && (
          <ul className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-[150px] overflow-y-auto">
            {activities.map((activityItem, index) => (
              <li
                key={index}
                onClick={() => handleActivitySelect(activityItem.name)}
                className="px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer text-black flex items-center gap-2"
              >
                {activityItem.icon}
                {activityItem.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  );
};
