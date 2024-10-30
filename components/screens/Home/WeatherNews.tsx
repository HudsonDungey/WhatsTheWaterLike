import React from 'react';

export const WeatherNews = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-4 p-4">

      <div className="flex flex-col items-center w-full md:w-1/2">
        <img
          src="/images/australia-radar-map.png" 
          alt="Weather Radar"
          className="w-full object-cover rounded-lg shadow-md"
        />
        <span className="text-sm text-gray-500 mt-2">Live Weather Radar (BoM)</span>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/2">
        <img
          src="/images/news.jpg" 
          alt="Latest News"
          className="w-full object-cover rounded-lg shadow-md"
        />
        <span className="text-sm text-gray-500 mt-2">Latest News</span>
      </div>
    </div>
  );
};
