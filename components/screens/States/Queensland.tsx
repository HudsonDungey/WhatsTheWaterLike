'use client';

import React, { useEffect, useState } from 'react';

export const Queensland: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&appid=YOUR_API_KEY`
        );
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New South Wales Weather</h1>

      <div className="mb-8">
        <iframe
          width="650"
          height="450"
          src="https://embed.windy.com/embed2.html?lat=-33.8688&lon=151.2093&zoom=6&level=surface&overlay=radar&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&detailLat=-33.8688&detailLon=151.2093&metricWind=default&metricTemp=default&radarRange=-1"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <div className="bg-blue-100 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Current Weather in Sydney</h2>
        <p className="text-lg">
          <strong>Temperature:</strong> {weatherData?.main?.temp} °C
        </p>
        <p className="text-lg">
          <strong>Feels Like:</strong> {weatherData?.main?.feels_like} °C
        </p>
        <p className="text-lg">
          <strong>Humidity:</strong> {weatherData?.main?.humidity} %
        </p>
        <p className="text-lg">
          <strong>Weather:</strong> {weatherData?.weather[0]?.description}
        </p>
      </div>
    </div>
  );
};
