import React from 'react';
import { IoIosWarning } from "react-icons/io";
import { MdAnnouncement } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import Image from 'next/image';

const Alerts = [
 { info: "Cat 3 Cyclone", dates: "24/03/2025 - 29/03/2025", location: "Greater Darwin Region" },
 { info: "Heat Wave", dates: "30/01/2025 - 11/01/2025", location: "Alice Springs" },
 { info: "Drought", dates: "01/12/2024 - 27/12/2024", location: "Barkly Tablelands" }
];

const newsAlerts = [
  { info: "5.3m Quintrex Giveaway", dates: "24/04/2025"},
  { info:  "Million Dollar Barra releases fresh batch of winning barra", dates: "24/04/2025"},
  { info: "BCF 50% off sale", dates: "24/04/2025"},
];


export const WeatherNews = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around pt-20 gap-4 p-4">

    <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-b from-white to-gray-400 shadow-xl rounded-lg">
        <h1 className="font-bold pb-[20px] text-[30px] md:text-[40px] flex flex-row justify-center items-center">
            <IoIosWarning size={64} color='red' className='mr-3'/> Weather Alerts
        </h1>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {Alerts.map((alert, index) => (
            <li key={index} className="mb-2 bg-gray-300 flex flex-row justify-center items-center p-2 rounded-[10px] max-h-[300px] overflow-y-scroll">
            <RiErrorWarningFill size={40} color='red' className="mr-3"/>
            <div className="flex flex-col items-start justify-start">
            <p>
            {alert.info}
            </p>
            <p>
            {alert.location}
            </p>
            <p>
            {alert.dates}
            </p>
            </div>
            </li>
          ))}
        </ul>
    </div>


    <div className="flex flex-col items-center w-full md:w-1/2 bg-gradient-to-b from-white to-gray-400 shadow-xl h-[300px] rounded-lg">
        <h1 className="font-bold pb-[20px] text-[30px] md:text-[40px] flex flex-row justify-center items-center">
            <MdAnnouncement size={54} className='mr-3'/> News
        </h1>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {newsAlerts.map((item, index) => (
            <li key={index} className="mb-2 flex flex-col pb-2 justify-center items-center">
            <p className="w-10/12">
              {item.info}
            </p>
            <p className="">
              {item.dates}
            </p>
            </li>
          ))}
        </ul>
    </div>
    </div>
  );
};
