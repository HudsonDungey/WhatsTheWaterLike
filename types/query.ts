export interface Credentials {
    key: string;
    subscription: 'free' | 'premium';
    responseType: 'json' | 'xml';
    locale: string;
  }
  
export interface QueryParams {
    [key: string]: string | number | boolean;
  }