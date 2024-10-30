'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Line } from 'react-chartjs-2'; // Import Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { australiaLocationsString, northernTerritory } from '~/lib/locations';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const weatherScore = 46
const starCount = Math.round(weatherScore / 20);

export const HomeCarousel: React.FC = () => {

  return (
    <div className="space-y-1 pt-5">
    
      {/* First Swiper */}
      <Swiper
        spaceBetween={5}
        centeredSlides={false}
        loop={true}
        slidesPerView={5}
        modules={[Autoplay, Pagination, Navigation]}
        className="max-h-[230px]" 
      >
        {Object.keys(northernTerritory).map((key: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="home-cards p-2 flex flex-row h-[115px] text-start bg-light-purple rounded-lg shadow-md transition-transform transform duration-500">
              <div className="w-1/2">
                <h2 className="card-title text-lg text-gray-800 mb-1">
                  {northernTerritory[key]}
                </h2>
                <p className="text-sm text-gray-500">Weather:</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    index < starCount ? (
                      <FaStar key={index} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={index} className="text-gray-300" />
                    )
                  ))}
                </div>
              </div>
              <div>
              <TiWeatherPartlySunny size={44}/>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Second Swiper */}
      <Swiper
        spaceBetween={5} 
        centeredSlides={false}
        loop={true}
        slidesPerView={5}
        modules={[Autoplay, Pagination, Navigation]}
        className="max-h-[200px] mt-[10px]" 
      >
        {Object.keys(australiaLocationsString).map((key: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="home-cards flex flex-row p-2 h-[115px] text-start bg-light-purple rounded-lg shadow-md transition-transform transform hover:bg-black duration-500">
              <div className="w-1/2">
                <h2 className="card-title text-lg text-gray-800 mb-1">
                  {australiaLocationsString[key]}
                </h2>
                <p className="text-sm text-gray-500">Weather:</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    index < starCount ? (
                      <FaStar key={index} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={index} className="text-gray-300" />
                    )
                  ))}
                </div>
              </div>
              <div>
              <TiWeatherPartlySunny size={44}/>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Third Swiper */}
      <Swiper
        spaceBetween={5} 
        centeredSlides={false}
        loop={true}
        slidesPerView={5}
        modules={[Autoplay, Pagination, Navigation]}
        className="max-h-[200px] mt-[10px]" 
      >
        {Object.keys(australiaLocationsString).map((key: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="home-cards flex flex-row p-2 h-[115px] text-start bg-light-purple rounded-lg shadow-md transition-transform transform hover:bg-black duration-500">
              <div className="w-1/2">
                <h2 className="card-title text-lg text-gray-800 mb-1">
                  {australiaLocationsString[key]}
                </h2>
                <p className="text-sm text-gray-500">Weather:</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    index < starCount ? (
                      <FaStar key={index} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={index} className="text-gray-300" />
                    )
                  ))}
                </div>
              </div>
              <div>
              <TiWeatherPartlySunny size={44}/>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
