import { FaCloudSun, FaWater, FaCalendarAlt, FaRegMap, FaPeopleCarry, FaNewspaper } from 'react-icons/fa'; 

export const mainNav = [
  { text: "Home", url: '/home', icon: <FaCloudSun /> }, 
  { text: "Water", url: '/Water', icon: <FaWater /> }, 
  { text: "Upcoming", url: '/UpcomingWeather', icon: <FaCalendarAlt /> }, 
  { text: "Map", url: '/Map', icon: <FaRegMap /> }, 
  { text: "Community", url: '/Community', icon: <FaPeopleCarry /> }, 
  { text: "News", url: '/News', icon: <FaNewspaper /> }, 
];
