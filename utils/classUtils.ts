export const getSeaConditionColor = (condition: string): string => {
    switch (condition) {
      case "Clam":
        return "text-green-500"; 
      case "Moderate":
        return "text-amber-500"; 
      case "Rough":
        return "text-red-500"; 
      default:
        return "text-gray-500"; 
    }
  };


export const getWaveConditionColor = (waveHeight: number): string => {
    if (waveHeight <= 1) {
      return "text-green-500"; 
    } else if (waveHeight > 1 && waveHeight <= 2) {
      return "text-amber-500"; 
    } else {
      return "text-red-500"; 
    }
  };
  

  export const getWindConditionColor = (windSpeed: number): string => {
    if (windSpeed < 10) {
      return "text-green-500"; 
    } else if (windSpeed >= 10 && windSpeed <= 20) {
      return "text-amber-500"; 
    } else {
      return "text-red-500"; 
    }
  };
  

  export const getTempConditionColor = (temp: number): string => {
    if (temp >= 20 && temp <= 25) {
      return "text-green-500"; 
    } else if (temp > 25 && temp <= 30) {
      return "text-amber-500";
    } else {
      return "text-red-500"; 
    }
  };
  