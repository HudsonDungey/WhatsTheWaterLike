import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

type Activity = {
  title: string;
  imgSrc: string;
};

type ActivityTypes = {
    handleActivityClick: (activityName: string) => void;
}

const activities: Activity[] = [
  { title: 'Fishing', imgSrc: '/images/fishing.jpg'},
  { title: 'Surfing', imgSrc: '/images/surfing.jpg'},
  { title: 'Boating', imgSrc: '/images/boating.jpg'},
  { title: 'Jetskiing', imgSrc: '/images/skiing.jpg'},
  { title: 'Flying', imgSrc: '/images/flying.jpg'},
  { title: 'Sailing', imgSrc: '/images/sailing.jpg'},
];

export const CommunityActivities = ({ handleActivityClick }: ActivityTypes) => {

  return (
    <div className="pt-[50px] p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-6">
        {activities.slice(0, 4).map((activity, index) => (
          <div key={index} className="flex rounded-2xl flex-col items-center" onClick={() => handleActivityClick(activity.title)}>
            <img
              src={activity.imgSrc}
              alt={activity.title}
              className="w-[250px] h-[250px] rounded-full shadow-md mb-2 hover:shadow-2xl hover:bg-gray-400"
            />
            <span className=" text-gray-50 flex flex-row gap-x-2 justify-center items-center text-base text-center font-semibold w-full px-1 rounded-full">
              {activity.title} <FaArrowRight size={10}/>
            </span>
          </div>
        ))}
      </div>
      <div className="flex pt-1 gap-1 justify-around">
        {activities.slice(4, 6).map((activity, index) => (
         <div key={index} className="flex rounded-2xl flex-col items-center" onClick={() => handleActivityClick(activity.title)}>
            <img
              src={activity.imgSrc}
              alt={activity.title}
              className="w-[250px] h-[250px] rounded-full shadow-md mb-2 hover:shadow-2xl hover:bg-gray-400"
            />
            <span className=" text-gray-50 flex flex-row gap-x-2 justify-center items-center text-base text-center font-semibold w-full px-1 rounded-full">
              {activity.title} <FaArrowRight size={10}/>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
