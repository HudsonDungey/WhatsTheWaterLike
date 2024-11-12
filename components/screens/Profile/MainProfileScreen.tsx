import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt,  } from 'react-icons/fa';
import { TbWorldCheck } from "react-icons/tb";
import { FaUserCircle } from 'react-icons/fa';
import { ImLocation2 } from "react-icons/im";
import { addFishingSpot, getFishingSpots } from '~/lib/fishingLocations';
import { FishingSpot } from '~/types/mainTypes';
import { LoadingSpinner, MapComponent } from '~/components'
import { FishingSpotTable } from './FishingSpotTable';
import { convertTimestampToDate } from '~/utils/utils';
import MapGL, { Marker } from 'react-map-gl';

type MainProfileScreenTypes = {
  account: any;
  setStep: (input: number) => void;
};

const dummytags = [
  "#jetski",
  "#fishing",
  "#NorthernTerritory",
  "#boating",
];


export const MainProfileScreen = ({ account, setStep }: MainProfileScreenTypes) => {
  const [loading, setLoading] = useState(false);
  const [showTrips, setShowTrips] = useState(true);
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [longitude, setLongitude] = useState('');
  const [activity, setActivity] = useState('');
  const [description, setDescription] = useState('');
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);
  const [showSpots, setShowSpots] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const [viewport, setViewport] = useState({
    latitude: -12.4578,
    longitude: 130.8334,
    zoom: 5,
    bearing: 0,
    pitch: 0,
  });

  const fetchFishingSpots = async () => {
    const spots = await getFishingSpots();
    if (spots) setFishingSpots(spots);
  };

  const handleMapClick = (event: any) => {
    const { lng, lat } = event.lngLat;
    setLatitude(lat);
    setLongitude(lng);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: lng,
      zoom: 10,
    });
  };

  useEffect(() => {
    fetchFishingSpots();
  }, []);

  const handleViewportChange = (event: any) => {
    setViewport(event.viewState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (name && latitude && longitude && image) {
      await addFishingSpot(name, parseFloat(latitude), parseFloat(longitude), activity, description, image);
      fetchFishingSpots();
      setName('');
      setLatitude('');
      setLongitude('');
      setActivity('');
      setDescription('');
      setImage(null);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative w-full h-[250px]">
        <Image
          src="/images/profile-banner2.jpg"
          alt="Fishing"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      {/* Profile and Saved Spots Section */}
      <div className="w-full flex justify-center">
         <div className="grid grid-cols-6 w-full max-w-screen-xl">
           {/* Profile Card */}
           <div className="flex flex-col md:flex-row items-start col-span-6 md:col-span-2 pt-8 relative">
             <div className="absolute top-[-100px] bg-gray-50 rounded-2xl p-6 w-full">
               <div className="flex flex-col items-center">
                 {account.photoURL ? (
                   <img src={account.photoURL} alt="Profile" className="w-[150px] h-[150px] rounded-full" />
                 ) : (
                   <FaUserCircle size={40} className="text-gray-600" />
                 )}
                 <h1 className="text-lg font-semibold text-gray-900 mt-2">{account.displayName}</h1>
                 <button 
                   className="text-gray-500 underline text-sm"
                   onClick={() => setStep(2)}>
                   Edit Account
                 </button>
               </div>
               <div className="mt-4">
                 <h2 className="text-sm text-gray-600">Country: {account.country}</h2>
                 <h2 className="text-sm text-gray-600">Main Activity: {account.mainActivity}</h2>
               </div>
               <div className="mt-4">
                 <p className="text-sm text-gray-400">#Tags</p>
                 <div className="grid grid-cols-2 gap-2 mt-1">
                   {dummytags.map((tag: string, index: number) => (
                     <span
                       key={index}
                       className="bg-gray-100 p-1 flex justify-center items-center rounded-md text-xs text-gray-900"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
           </div>
       
           {/* Saved Locations Slider */}
           <div className="col-span-6 md:col-start-3 md:col-span-4 p-6 mt-8 md:mt-0 h-[400px] bg-white shadow-lg rounded-2xl">
               <div className="flex items-center gap-x-5 text-base pb-3 text-gray-600 font-semibold">
               <button className={showTrips ? "text-blue-600 font-bold border-b-4 border-blue-600" : ""} onClick={() => setShowTrips(true)}>Trips ({fishingSpots.length})</button>
                <button className={!showTrips ? "text-blue-600 font-bold border-b-4 border-blue-600" : ""} onClick={() => setShowTrips(false)}>Spots ({fishingSpots.length})</button>
               </div>
               {showTrips ? (
                <div className="flex gap-3 overflow-x-auto whitespace-nowrap h-full">
                {fishingSpots && fishingSpots.length > 0 ? (
                  fishingSpots.map((spot: FishingSpot) => (
                    <div key={spot.name} className="border shadow-md rounded-lg p-3 min-w-[260px] h-[320px] flex flex-col">
                      <h3 className="font-semibold text-sm text-start">{spot.activity} @</h3>
                      <h3 className="font-semibold text-sm text-start">{spot.name}</h3>
                      <p className="text-xs text-start text-gray-400 flex flex-row items-center">{convertTimestampToDate(spot.timestamp.seconds)} • <TbWorldCheck size={17} className='pl-1'/></p>
                      <div className="h-[200px] w-full overflow-hidden rounded-md mt-[50px]">
                        <Image 
                          src={spot.imageUrl}
                          alt={`${spot.name} image`}
                          className="h-full w-full object-cover"
                          width={150}
                          height={130}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border shadow-md rounded-lg p-3 min-w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-black text-center">You have no memories yet! Create one now</h1>
                  </div>
                )}
              </div>
              ) : (
              <div className="flex gap-3 overflow-x-auto whitespace-nowrap h-full">
                {fishingSpots && fishingSpots.length > 0 ? (
                  fishingSpots.map((spot: FishingSpot) => (
                    <div key={spot.name} className="border shadow-md rounded-lg p-3 min-w-[260px] h-[320px] flex flex-col">
                      <h3 className="font-semibold text-sm text-start">{spot.name}</h3>
                      <p className="text-xs text-start text-gray-400 flex flex-row items-center">{convertTimestampToDate(spot.timestamp.seconds)} • <TbWorldCheck size={17} className='pl-1'/></p>
                      <div className="h-[200px] w-full overflow-hidden rounded-md mt-[50px]">
                      <MapComponent
                        longitude={spot.location.lng}
                        latitude={spot.location.lat}
                        showSpots={true}
                        spot={spot.location}
                      />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border shadow-md rounded-lg p-3 min-w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-black text-center">You have no memories yet! Create one now</h1>
                  </div>
                )}
              </div>
              )}
            </div>
         </div>
       </div>
    <div className="w-screen pt-10">
      <h1 className="font-semibold text-start pl-[50px]">Saved Locations</h1>
      <FishingSpotTable fishingSpots={fishingSpots}/>
    </div>
      <div className="flex flex-col pt-[10px] md:flex-row items-start max-w-6xl mx-auto space-y-6 md:space-y-0 md:space-x-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-4 w-full md:w-[50%] space-y-3">
          <h2 className="text-lg font-semibold mb-2">Add New Trip</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border p-2 w-full text-black text-sm"
          />
          <input
            type="text"
            placeholder="Spot Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full text-black text-sm"
            required
          />
          <input
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="border p-2 w-full text-black text-sm"
            required
          />
          <input
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="border p-2 w-full text-black text-sm"
            required
          />
          <input
            type="text"
            placeholder="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border p-2 w-full text-black text-sm"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full text-black text-sm"
          />
          {loading ? (
            <LoadingSpinner color="baby-blue"/>
          ) : (
          <button type="submit" className="bg-black text-white py-1 w-full rounded">
            Add Spot
          </button>
          )}
        </form>

        <div className="w-full md:w-[50%] h-[500px] mt-4 md:mt-0">
          <MapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API}
            onMove={handleViewportChange}
            onClick={handleMapClick}
            style={{ height: '100%', width: '100%' }}
          >
            {latitude && longitude && (
              <Marker
                key={1}
                longitude={Number(longitude)}
                latitude={Number(latitude)}
                anchor="bottom"
              >
                <ImLocation2 size={30} color="red" />
              </Marker>
            )}
            {showSpots && fishingSpots.map((spot) => (
              <Marker
                key={spot.id}
                longitude={spot.location.lng}
                latitude={spot.location.lat}
                anchor="bottom"
              >
                <FaMapMarkerAlt color="red" size={32} />
              </Marker>
            ))}
          </MapGL>
        </div>
      </div>
    </div>
  );
};
