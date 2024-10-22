'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Line } from 'react-chartjs-2'; // Import Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { australiaLocationsString, northernTerritory } from '~/lib/locations';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const upcomingWeatherData = {
  labels: ['Now', '2pm', '4pm', '6pm', '8pm'], 
  datasets: [
    {
      label: 'Roughness #/10', 
      data: [1, 4, 4, 3, 2],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1, 
    },
  ],
};

export const WaterCarousel: React.FC = () => {
  const status = "good"; 

  return (
    <div>
      <h1 className="text-black text-4xl font-bold text-start pb-2">Current Water Conditions</h1>
      <h1 className="text-gray-500 text-base text-start pb-4">Get to know what is going on, without being a meteorologist.</h1>
      {/* First Swiper */}
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        loop={true}
        slidesPerView={4}
        modules={[Autoplay, Pagination, Navigation]}
        className="max-h-[300px]" 
      >
        {Object.keys(northernTerritory).map((key: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="home-cards p-2 flex flex-row  h-[150px] text-start bg-light-baby-blue rounded-xl shadow-lg transition-transform transform duration-500">
              <div className="w-1/2">
              <h2 className="card-title text-lg text-gray-800 mb-1">
                {northernTerritory[key]}
              </h2>
              <p className="text-sm text-gray-500">
                Weather: 
              </p>
              <span className={
                  status === "good"
                    ? "text-green-500 font-bold"
                    : status === "bad"
                    ? "text-red-500 font-bold"
                    : "text-yellow-500 font-bold"
                }>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                </div>
              <div className="w-1/2 h-[120px]">
                <Line
                  data={upcomingWeatherData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true, 
                        grid: {
                          display: false, 
                        },
                      },
                      x: {
                        grid: {
                          display: false, 
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Second Swiper */}
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        loop={true}
        slidesPerView={4}
        modules={[Autoplay, Pagination, Navigation]}
        className="max-h-[200px] mt-[50px]" 
      >
        {Object.keys(australiaLocationsString).map((key: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="home-cards flex flex-row p-2 h-[150px] text-start bg-light-baby-blue rounded-xl shadow-lg transition-transform transform hover:bg-black duration-500">
            <div className="w-1/2">
              <h2 className="card-title text-lg text-gray-800 mb-1">
                {australiaLocationsString[key]}
              </h2>
              <p className="text-sm text-gray-500">
                Weather: 
              </p>
              <span className={
                  status === "good"
                    ? "text-green-500 font-bold"
                    : status === "bad"
                    ? "text-red-500 font-bold"
                    : "text-yellow-500 font-bold"
                }>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <div className="w-1/2 h-[120px]">
                <Line
                  data={upcomingWeatherData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true, 
                        grid: {
                          display: false, 
                        },
                      },
                      x: {
                        grid: {
                          display: false, 
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
