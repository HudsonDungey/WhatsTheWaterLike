export const getWeatherCondition = (temp: number, humidity: number): string => {
    if (temp >= 30) return "Hot";
    if (temp >= 20 && temp < 30) return "Warm";
    if (temp < 20 && temp >= 10) return "Mild";
    return "Cold";
  };
  
export  const getHumidityCondition = (humidity: number): string => {
    if (humidity >= 70) return "Humid";
    if (humidity >= 40 && humidity < 70) return "Comfortable";
    return "Dry";
  };

export  const getSeaCondition = (waveHeight: number): string => {
    if (waveHeight <= 1) return "Calm";
    if (waveHeight > 1 && waveHeight <= 2) return "Moderate";
    if (waveHeight > 2) return "Rough";
    return "Unknown";
  };