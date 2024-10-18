'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { australiaLocationsString } from '~/lib/locations'; 

export const HomeCarousel: React.FC = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={false}
      loop={true}
      slidesPerView={4}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper max-h-[120px]"
    >
      {Object.keys(australiaLocationsString).map((key: any, index: number) => (
        <SwiperSlide key={index}>
            <div className="p-2 text-center bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <h2 className="text-lg font-bold text-gray-800 mb-1">{australiaLocationsString[key]}</h2>
              <p className="text-sm text-gray-500">Weather: TBD</p>
              <div className="mt-1">
                <button className="px-2 py-2 bg-primary text-sm rounded-full shadow-md">
                  View Details
                </button>
              </div>
            </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeCarousel;
