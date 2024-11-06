import React from 'react';

type Activity = {
  title: string;
  imgSrc: string;
  subtext: string;
};

type ActivityTypes = {
    handleActivityClick: (activityName: string) => void;
}

const activities: Activity[] = [
  { title: 'Fishing', imgSrc: '/images/fishing.jpg', subtext: "54 reccomended locations" },
  { title: 'Surfing', imgSrc: '/images/surfing.jpg', subtext: "12 reccomended locations" },
  { title: 'Boating', imgSrc: '/images/boating.jpg', subtext: "78 reccomended locations" },
  { title: 'Jetskiing', imgSrc: '/images/skiing.jpg', subtext: "34 reccomended locations" },
  { title: 'Flying', imgSrc: '/images/flying.jpg', subtext: "12 reccomended locations · 143km away" },
  { title: 'Sailing', imgSrc: '/images/sailing.jpg', subtext: "2 locations with correct conditions" },
];

export const Activities = ({ handleActivityClick }: ActivityTypes) => {
  return (
    <div className="pt-[50px] p-4">
      <h2 className="text-3xl mb-4 text-start px-[40px]">Activity</h2>
      <div className="flex justify-around mb-6">
        {activities.slice(0, 4).map((activity, index) => (
          <div key={index} className="flex p-3 rounded-2xl flex-col items-center hover:shadow-xl hover:bg-gray-200" onClick={() => handleActivityClick(activity.title)}>
            <img
              src={activity.imgSrc}
              alt={activity.title}
              className="w-[276px] h-[320px] rounded-lg shadow-md mb-2"
            />
            <span className="text-base text-start font-semibold w-full px-1 rounded-full">
              {activity.title}
            </span>
            <span className="text-sm text-start text-gray-400 w-full px-1 rounded-full leading-tight">
              {activity.subtext}
            </span>
          </div>
        ))}
      </div>
      <div className="flex pt-2 justify-around">
        {activities.slice(4, 6).map((activity, index) => (
         <div key={index} className="flex p-3 rounded-2xl flex-col items-center hover:shadow-xl hover:bg-gray-200" onClick={() => handleActivityClick(activity.title)}>
            <img
              src={activity.imgSrc}
              alt={activity.title}
              className="w-[276px] h-[320px] rounded-lg shadow-md mb-2"
            />
            <span className="text-base text-start font-semibold w-full px-1 rounded-full">
              {activity.title}
            </span>
            <span className="text-sm text-start text-gray-400 w-full px-1 rounded-full leading-tight">
              {activity.subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
