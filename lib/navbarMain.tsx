import { FaCloudSun, FaWater, FaCalendarAlt, FaLightbulb } from 'react-icons/fa'; 

export const mainNav = [
  { text: "Weather", url: '/home', icon: <FaCloudSun /> }, 
  { text: "Water", url: '/Water', icon: <FaWater /> }, 
  { text: "Upcoming", url: '/UpcomingWeather', icon: <FaCalendarAlt /> }, 
  { text: "Tips", url: '/Tips', icon: <FaLightbulb /> }, 
];
