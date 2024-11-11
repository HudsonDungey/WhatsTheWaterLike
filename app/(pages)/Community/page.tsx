'use client'

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CommunityActivities } from '~/components/screens/Community';

const Community = () => {
    const router = useRouter();

    const handleActivityClick = (name: string) => {
        router.push(`/${encodeURIComponent(name)}`);
    };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center">
        <div className="relative w-full h-[500px]">
          <Image
            src="/images/community.jpg"
            alt="Fishing"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>

      <div className="w-full px-4">
        <section className="h-screen p-4 rounded-lg shadow-lg">
          <h2 className="text-[40px] w-screen mt-14 text-start font-medium text-white">Exploring Activity Forums</h2>
          <div className="min-h-[500px]">
             <CommunityActivities  handleActivityClick={handleActivityClick}/>
          </div>
        </section>
        
        <section className="h-screen bg-white p-14 rounded-lg shadow-lg">
          <div>
          <h2 className="text-[40px] w-screen mt-14 text-start font-medium ">Community Trips</h2>
          </div>
          <div>
          <h2 className="text-[40px] w-screen mt-14 text-start font-medium">Local Fishing Spots</h2>
          </div>

        </section>
        
        <section className="h-screen p-14 rounded-lg shadow-lg">
          <h2 className="text-[40px] w-screen mt-14 text-start font-medium text-white">Share your content with us for a chance to be re-shared on our pages!</h2>

        </section>
        
      </div>
    </div>
  );
};

export default Community;
