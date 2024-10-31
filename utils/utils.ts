import { QueryParams, Credentials } from "~/types/query";
  
  // generate query parameters from an object
  const genQueryParams = (query: QueryParams): string => {
    let params = '';
    for (const pr in query) {
      if (pr !== "") {
        params += `${pr}=${query[pr]}&`;
      }
    }
    return params.slice(0, -1); // Remove trailing '&'
  };
  
  // generate the correct endpoint based on the method
  const genUrlEP = (method: keyof typeof avlMethods): string => {
    const avlMethods: Record<string, string> = {
      searchApi: 'search',
      localWeatherApi: 'weather',
      timeZoneApi: 'tz',
      skiWeatherApi: 'ski',
      marineWeatherApi: 'marine',
      historicalWeatherApi: 'past-weather'
    };
  
    return `${avlMethods[method]}.ashx`;
  };
  
  // generate the middle part of the URL based on subscription
  const genMidUrl = (subscription: 'free' | 'premium'): string => {
    const avlSubscriptions: Record<'free' | 'premium', string> = {
      free: '/free/v2/',
      premium: '/premium/v1/'
    };
  
    return avlSubscriptions[subscription];
  };
  
  // generate the full World Weather Online API URL
  export const genWWOUrl = (
    credentials: Credentials, 
    method: keyof typeof avlMethods, 
    query: QueryParams = {}
  ): string => {
    const { key, subscription, responseType, locale } = credentials;
    
    const avlMethods: Record<string, string> = {
      searchApi: 'search',
      localWeatherApi: 'weather',
      timeZoneApi: 'tz',
      skiWeatherApi: 'ski',
      marineWeatherApi: 'marine',
      historicalWeatherApi: 'past-weather'
    };
  
    const preUrl = `https://api.worldweatheronline.com${genMidUrl(subscription)}${genUrlEP(method)}?key=${key}&format=${responseType}&lang=${locale.toLowerCase()}`;
  
    const fullUrl = Object.keys(query).length > 0 ? `${preUrl}&${genQueryParams(query)}` : preUrl;
  
    return fullUrl;
  };
  

  export const getDateInfo = (daysOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset); 

    // Get day of the month and day abbreviation
    const dayOfMonth = date.getDate();
    const dayAbbreviation = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();

    return { dayOfMonth, dayAbbreviation };
  };