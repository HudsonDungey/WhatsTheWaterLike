import React from "react";
import { FishingSpot } from "~/types/mainTypes";
import { IoShareOutline } from "react-icons/io5";



type Spots = {
    fishingSpots: FishingSpot[];
};

export const FishingSpotTable = ({ fishingSpots }: Spots) => {


    const handleShare = (spot: FishingSpot) => {
        const shareText = `Check out this ${spot.activity} spot: ${spot.name}!\n\nLocated at (${spot.location.lat}, ${spot.location.lng})`;
        const shareUrl = `https://whats-the-water-like.vercel.app/Map?lat=${spot.location.lat}&lng=${spot.location.lng}`;
        
        if (navigator.share) {
          navigator.share({
            title: "Fishing Spot",
            text: `${shareText}\n\n${shareUrl}`,
          });
        } else {
          navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
          alert("Link copied to clipboard!");
        }
      };
      
      

  return (
    <div className="w-screen overflow-x-auto p-4 ">
      <table className="min-w-full bg-white shadow-md rounded-[10px]">
        <thead className="bg-gray-100 py-2 px-4 border-b text-left text-base font-medium">
          <tr>
            <th className="py-2 px-4 border-b text-left text-base font-medium text-gray-700">Name</th>
            <th className="py-2 px-4 border-b text-left text-base font-medium text-gray-700">Activity</th>
            <th className="py-2 px-4 border-b text-left text-base font-medium text-gray-700">Location Coordinates</th>
            <th className="py-2 px-4 border-b text-left text-base font-medium text-gray-700">Share</th>
          </tr>
        </thead>
        <tbody>
          {fishingSpots.map((spot: FishingSpot) => (
            <tr key={spot.name} className="hover:bg-gray-100 text-start text-base">
              <td className="py-4 px-4 border-b font-semibold">{spot.name}</td>
              <td className="py-4 px-4 border-b">{spot.activity}</td>
              <td className="py-4 px-4 border-b">
                ({spot.location.lat.toFixed(4)}, {spot.location.lng.toFixed(4)})
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleShare(spot)}
                  className="pl-2.5 hover:underline"
                >
                  <IoShareOutline size={25}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
