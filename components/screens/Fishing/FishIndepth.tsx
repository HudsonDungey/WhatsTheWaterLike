'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { speciesType } from '~/types/mainTypes'

type IndepthProps = {
  stepAlt: number;
  setStepAlt: (input: number) => void;
  selectedFish: speciesType;
};

export const FishIndepth = ({ stepAlt, setStepAlt, selectedFish }: IndepthProps) => {
  const renderStars = (rating: number) => (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  );
  const size = 55 // change later
  const maxSize = 130; 
  const percentage = (size / maxSize) * 100;
  console.log(selectedFish.imageUrl)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-[20px]">
      <div className="relative w-full h-[100px] md:h-[300px]">
        <h1 className="absolute top-4 left-[40px] md:left-[60px] text-white text-[40px] md:text-[60px] font-bold z-10">{selectedFish.name}</h1>
        <Image
          src={`/images/${selectedFish.name}-banner.jpg`}
          alt="Fishing"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      <div className="w-screen bg-gray-900 flex items-center justify-start p-[10px]">
          <div onClick={() => setStepAlt(0)} className="flex items-center">
          <FaArrowLeft color="white" size={20} />
          </div>
      </div>
      <div className="mt-[15px] md:mt-[40px] w-10/12 md:w-8/12 bg-white rounded-lg">
       <p className="text-black tracking-tight text-base text-start p-3">
         Barramundi are a top catch for anglers in northern Australia, 
         known for their strong fight and great taste. 
         These fish are true survivors, moving between 
         fresh and saltwater—from rivers and mangroves to estuaries and coastal spots.
         Their shiny, silver bodies and strong tails make them a thrill to hook,
         and they’re a delicious reward at the end of any fishing trip.
         If you’re looking for a challenge with a tasty payoff,
         barramundi are the fish to go for!
       </p>
      </div>

    <div>
      <div className="p-[20px] md:p-[40px] w-full flex flex-row items-center gap-x-4 md:gap-x-10 justify-center">
        <Image
          src={selectedFish.imageUrl}
          alt={selectedFish.name}
          width={230}
          height={230}
        />
        <div>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-base md:text-2xl font-semibold text-gray-900">Eating Rating</p>
            {renderStars(selectedFish.eatingRating)}
          </div>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-base md:text-2xl font-semibold text-gray-900">Fight Rating</p>
            {renderStars(selectedFish.fightingRating)}
          </div>
          </div>
        </div>
    </div>

    <div className="flex flex-col md:grid md:grid-cols-5 justify-center items-center md:px-[60px]">
      <div className="col-span-3 col-start-1 w-full space-y-[40px]">
        <div className="bg-white rounded-xl text-start p-8 mx-3">
            <h1 className="text-black font-bold tracking-tight pl-2 pb-[20px]">Where to fish for {selectedFish.name}</h1>
            <p className="text-sm text-gray-700 w-8/12">Barramundi migrate from freshwater rivers to coastal estuaries during the wet season,
                often coinciding with warmer months,
                to spawn and take advantage of nutrient-rich waters.
            </p>
            <ul className="list-disc pl-7 pt-[20px] space-y-2">
             <li className="text-sm text-black"><span className="font-semibold text-black text-sm pr-3">Brackish waters:</span>Thive in environments with a mix of fresha and salt water.</li>
             <li className="text-sm text-black"><span className="font-semibold text-black text-sm pr-3">Mangrove swamps:</span>Found in mangroves, which provide shelter and feeding grounds.</li>
             <li className="text-sm text-black"><span className="font-semibold text-black text-sm pr-3">Estuarine lagoons:</span>Utilize lagoons in estuarires for protection and feeding</li>
             <li className="text-sm text-black"><span className="font-semibold text-black text-sm pr-3">Tidal flats:</span>Often found in tidal flats, especially in coastal areas.</li>
            </ul>
   
         </div>

         <div className="col-span-3 col-start-1 w-full mx-3">
         <div className="bg-white rounded-xl text-start p-8">
            <h1 className="text-black font-bold tracking-tight pl-2 pb-[20px]">How to catch {selectedFish.name}</h1>
            <p className="text-sm text-gray-700 w-8/12">
            If you’re looking to hook a barramundi, 
            using the right lure and technique can make all the difference.
             Here’s what works best:
            </p>
            <p className="text-sm text-gray-700 w-8/12 pt-3">
            To catch barramundi, focus on fishing at dawn or dusk when they’re
            most active, with river fishing best in the wet season and coastal 
            spots better in the dry. Target areas with structure like snags,
            rock bars, and submerged trees where they hide to ambush prey.
            Use a slow, steady retrieve as they prefer a consistent motion, 
            and bring strong tackle to handle their power. Pay attention to the tides, 
            as barramundi feed more during rising or falling tides when baitfish are stirred up.
            </p>
            <h1 className="text-black font-semibold text-base py-[20px]">Best Lures for {selectedFish.name}</h1>
            <ul className="list-disc pl-7 space-y-2">
             <li className="text-sm text-black"><span className="font-semibold text-black text-sm pr-3">Soft Plastics:</span>Paddle-tail soft plastics that imitate baitfish movements.</li>
             <li className="text-sm text-black"><span className="font-semibold text-black text-sm pr-3">Hard-Body Lures:</span>Shallow-diving and suspending lures, perfect around structure.</li>
             <li className="text-sm text-black"><span className="font-semibold text-black text-sm pr-3">Vibes and Blades:</span> Effective in murky or deeper waters with their fish-attracting vibrations.</li>
             <li className="text-sm text-black"><span className="font-semibold text-black text-sm pr-3">Topwater Lures:</span>Great during early mornings and late evenings when barramundi surface.</li>
            </ul>
   
          </div>
        </div>

        <div className="bg-white rounded-xl text-start p-8 mx-3">
            <h1 className="text-black font-bold tracking-tight pl-2 pb-[20px]">Size and Weight</h1>
            <p className="text-sm text-gray-700 w-10/12">
                Barramundi can vary widely in size, typically ranging from 40 to 120 cm (16 to 47 inches) in length,
                though some individuals grow over 150 cm (59 inches). In terms of weight,
                they commonly range from 2 to 15 kg (4.4 to 33 lbs), but larger specimens can reach up to
                60 kg (132 lbs) in ideal conditions.
            </p>
        </div>
      </div>
      <div className="col-span-2 mt-10 md:mt-0">
        <h1 className="md:hidden font-bold text-2xl pb-3"> Habitats for {selectedFish.name}</h1>
      {selectedFish.habitats.map((habitat: string, index: number) => (
              <li
                key={index}
                className="bg-gray-100 md:p-4 justify-center items-center rounded-md flex flex-col"
              >
                <h3 className="text-xl font-bold text-gray-900">{habitat}</h3>
                <Image
                  src={`/images/${habitat}.png`}
                  alt={habitat}
                  width={350}
                  height={350}
                />
              </li>
            ))}
      </div>
    </div>
    <div className="w-8/12 bg-white flex flex-col justify-center items-start p-[20px] md:mt-[30px] rounded-2xl">
       <h1 className="font-bold">Size Regulations</h1>
       <div className="w-full max-w-[400px] mt-4">
        <h1 className="text-sm font-bold text-start">Minimum size: {size}cm</h1>
         <div className="relative h-2 bg-gray-200 rounded-full">
           <div
             className="absolute h-2 bg-red-600 rounded-full"
             style={{ width: `${percentage}%` }}
           ></div>
         </div>
         <div className="flex justify-between text-sm mt-2 ">
           <span>0cm</span>
           <span>{size}cm</span>
           <span>130cm</span>
         </div>
       </div>

       <div className="w-full max-w-[400px] mt-4">
       <h1 className="text-sm font-bold text-start">Maximum size: No Limit </h1>
         <div className="relative h-2 bg-gray-200 rounded-full">
           <div
             className="absolute h-2 bg-red-600 rounded-full"
             style={{ width: `${0}%` }} //edit later
           ></div>
         </div>
         <div className="flex justify-between text-sm mt-2 ">
           <span>0cm</span>
           <span>{size}cm</span>
           <span>130cm</span>
         </div>
       </div>
    </div>
    </div>
  );
};
