import React from 'react';

interface WeatherProps {
  tide: string;
  swell: string;
  temp: string;
  wind: string;
  location: string;
}

export const ShowWeather: React.FC<WeatherProps> = ({ tide, swell, temp, wind, location }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="font-bold text-xl mb-2">{location}</div>
      <ul className="list-none">
        <li className="text-gray-700 text-base"><strong>Tide:</strong> {tide}</li>
        <li className="text-gray-700 text-base"><strong>Swell:</strong> {swell}</li>
        <li className="text-gray-700 text-base"><strong>Temperature:</strong> {temp}</li>
        <li className="text-gray-700 text-base"><strong>Wind:</strong> {wind}</li>
      </ul>
    </div>
  );
};
