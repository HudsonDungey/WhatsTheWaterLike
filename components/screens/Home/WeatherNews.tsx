import React from 'react';

export const WeatherNews = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-4 p-4">

      <div className="flex flex-col items-center w-full md:w-1/2">
        <img
          src="http://www.bom.gov.au/radar/IDR023.gif" 
          alt="Weather Radar"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <span className="text-sm text-gray-500 mt-2">Live Weather Radar (BoM)</span>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/2">
        <img
          src="/images/news.jpg" 
          alt="Latest News"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <span className="text-sm text-gray-500 mt-2">Latest News</span>
      </div>
    </div>
  );
};
