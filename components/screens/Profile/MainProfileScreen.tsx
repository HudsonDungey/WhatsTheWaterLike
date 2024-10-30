import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { ImLocation2 } from "react-icons/im";
import { addFishingSpot, getFishingSpots } from '~/lib/fishingLocations';
import { FishingSpot } from '~/types/mainTypes';
import MapGL, { Marker } from 'react-map-gl';

type MainProfileScreenTypes = {
  account: any;
  setStep: (input: number) => void;
}

export const MainProfileScreen = ({ account, setStep }: MainProfileScreenTypes) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [activity, setActivity] = useState('');
  const [description, setDescription] = useState('');
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]); 
  const [showSpots, setShowSpots] = useState(false);

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
    e.preventDefault();
    if (name && latitude && longitude) {
      await addFishingSpot(name, parseFloat(latitude), parseFloat(longitude), activity, description);
      fetchFishingSpots(); 
      setName('');
      setLatitude('');
      setLongitude('');
      setActivity('');
      setDescription('');
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 px-4"> 
      <div className="flex flex-row gap-8 w-full max-w-6xl pt-4">
        <div className="w-1/2 space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <div className="flex flex-col items-center">
              {account.photoURL ? (
                <img src={account.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
              ) : (
                <FaUserCircle size={40} className="text-gray-600" />
              )}
              <h1 className="text-lg font-semibold text-gray-900 mt-2">{account.displayName}</h1> 
              <button 
                className="text-gray-500 underline text-sm"
                onClick={() => setStep(2)}>
                Manage Account
              </button>
            </div>
            <div className="flex flex-col justify-center mt-2">
              <h2 className="text-sm text-gray-600">Country: {account.country}</h2>
              <h2 className="text-sm text-gray-600">Main Activity: {account.mainActivity}</h2>
            </div>
          </div>

          <div>
            <button className="bg-black text-white text-sm py-2 px-4 rounded mb-3 w-6/12" 
              onClick={() => setShowSpots(!showSpots)}>
              {showSpots ? "Enter Location" : "Show Saved Spots"}
            </button>

            {showSpots ? (
              <div className="overflow-auto bg-white rounded-lg p-2 h-[300px]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 text-xs uppercase">
                      <th className="py-2 px-2 text-left">Name</th>
                      <th className="py-2 px-2 text-left">Latitude</th>
                      <th className="py-2 px-2 text-left">Longitude</th>
                      <th className="py-2 px-2 text-left">Activity</th>
                      <th className="py-2 px-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-xs font-light">
                    {fishingSpots.map((spot) => (
                      <tr key={spot.name} className="border-b hover:bg-gray-100">
                        <td className="py-2 px-2">{spot.name}</td>
                        <td className="py-2 px-2">{spot.location.lat}</td>
                        <td className="py-2 px-2">{spot.location.lng}</td>
                        <td className="py-2 px-2">{spot.activity}</td>
                        <td className="py-2 px-2">{spot.description || 'No description'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
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
                  required
                />
                <button 
                  type="submit" 
                  className="bg-black text-white py-1 w-6/12 rounded">
                  Add Spot
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="w-1/2 h-[500px]">
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
