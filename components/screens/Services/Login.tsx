import React, { useState } from 'react';
import { registerUser, loginUser, logoutUser } from '~/lib/authConfig'; // Adjust the import path
import { useAccountContext } from '~/utils/AccountContext';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '~/components';
import { AccountDetails } from '~/types/mainTypes';
import { activities, countries } from '~/lib/activities&countries';

type LoginTypes = {
  handleAccountClick?: () => void;
};

export const Login = ({ handleAccountClick }: LoginTypes) => {
  const router = useRouter();
  const { clearAccount, setAccount } = useAccountContext();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCountryDropdownVisible, setIsCountryDropdownVisible] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [memberShipTier, setMemberShipTier] = useState('free');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null); 
  const [mainActivity, setMainActivity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState<Error | undefined>(undefined);
  const [step, setStep] = useState<'initial' | 'login' | 'signup'>('initial'); 


  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      if (!profilePicture) {
        throw new Error('Please upload a profile picture');
      }
      const user = await registerUser(email, password, username, profilePicture, mainActivity, country, memberShipTier); 
      setAccount(user);
      handleAccountClick?.();
      setIsLoading(false);
    } catch (err) {
      console.error('Sign up failed:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred during sign up.'));
    }
  };

  // Handle sign-in
  const handleSignIn = async () => {
    setIsLoading(true);
    router.push("/profile");
    try {
      const { user, data } = await loginUser(email, password);
  
      const accountDetails: AccountDetails = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        memberShipTier,
        photoURL: user.photoURL || null,
        country: data?.country || null,
        mainActivity: data?.mainActivity || null,
      };
     
      setAccount(accountDetails);
      handleAccountClick?.();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err : new Error('Unknown error occurred during sign in.'));
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      clearAccount();
    } catch (err) {
      console.error('Sign out failed:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred during sign out.'));
    }
  };

  const handleActivitySelect = (activity: string) => {
    setMainActivity(activity);
    setIsDropdownVisible(false);
  };

  const handleCountryChange = (e: any) => {
    const value = e.target.value;
    setCountry(value);

    // Filter countries based on input
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setIsCountryDropdownVisible(false);
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-gray-100 p-4">
      <div className="w-3/12 pt-[50px]">
        <button className="text-black text-5xl text-right w-full" onClick={handleAccountClick}>X</button>
      </div>

      {step === 'initial' && (
        <div className="p-6 rounded-lg shadow-sm h-[450px]">
          <div className=" flex flex-col justify-center items-center">
            <h2 className="text-4xl text-black font-bold mb-4 text-center">Log In!</h2>
            <div className="flex flex-row gap-2">
              <h2 className="text-base text-gray-800"> New to the site? </h2>
              <button
                className="text-black text-base underline"
                onClick={() => setStep('signup')}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-[300px]">
            <div className="flex flex-col w-full items-start justify-start">
              <h1 className="text-black text-base pb-[5px]">Email<span className="text-gray-400 pl-[2px]">*</span></h1>
              <input
                type="email"
                placeholder="Email"
                className="mb-4 p-2 w-full border rounded text-black text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full items-start justify-start">
              <h1 className="text-black text-base pb-[5px]">Password<span className="text-gray-400 pl-[2px]">*</span></h1>
              <input
                type="password"
                placeholder="Password"
                className="mb-4 p-2 w-full border rounded text-black text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isLoading ? (
          <LoadingSpinner color="baby-blue"/>
          ) : (
            <button
              className="w-[300px] text-white text-base bg-black py-2 px-3 mt-[50px]"
              onClick={handleSignIn}
            >
              Log In
            </button>
          )}
          </div>
        </div>
      )}

      {step === 'signup' && (
        <div className="bg-white p-6 flex flex-col justify-center items-center rounded-lg shadow-md w-[400px] max-w-sm">
          <h2 className="text-2xl mb-4 text-center text-black">Sign Up</h2>
          <div className="flex flex-col items-start w-[300px] justify-start">
            <h1 className="text-black text-base pb-[5px]">Username<span className="text-gray-400 pl-[2px]">*</span></h1>
            <input
              type="text"
              placeholder="Username"
              className="mb-4 p-2 w-full border rounded text-black text-base"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start w-[300px] justify-start">
            <h1 className="text-black text-base pb-[5px]">Email<span className="text-gray-400 pl-[2px]">*</span></h1>
            <input
              type="email"
              placeholder="Email"
              className="mb-4 p-2 w-full border rounded text-black text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[300px] items-start justify-start">
            <h1 className="text-black text-base pb-[5px]">Password<span className="text-gray-400 pl-[2px]">*</span></h1>
            <input
              type="password"
              placeholder="Password"
              className="mb-4 p-2 w-full border rounded text-black text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative w-[300px] items-start justify-start">
            <h1 className="text-black text-base pb-[5px]">Primary Activity<span className="text-gray-400 pl-[2px]">*</span></h1>
            <input
              type="text"
              placeholder="Activity"
              className="mb-4 p-2 w-full border rounded text-black text-base"
              value={mainActivity}
              onChange={(e) => setMainActivity(e.target.value)}
              onFocus={() => setIsDropdownVisible(true)}
              onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)} // delay to allow click
            />
            {isDropdownVisible && (
              <ul className="absolute top-[80px] w-6/12 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {activities.map((activity, index) => (
                  <li
                    key={index}
                    onClick={() => handleActivitySelect(activity.name)}
                    className="px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer text-black flex justify-center flex-row items-center gap-x-2"
                  >
                    {activity.name}
                    {activity.icon}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col w-[300px] items-start justify-start relative">
            <h1 className="text-black text-base pb-[5px]">
              Country<span className="text-gray-400 pl-[2px]">*</span>
            </h1>
            <input
              type="text"
              placeholder="Country"
              className="mb-4 p-2 w-full border rounded text-black text-base"
              value={country}
              onChange={handleCountryChange}
              onFocus={() => setIsCountryDropdownVisible(true)}
              onBlur={() => setTimeout(() => setIsCountryDropdownVisible(false), 150)} 
            />
            {isCountryDropdownVisible && (
              <ul className="absolute top-[70px] w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-[150px] overflow-y-auto">
                {filteredCountries.map((countryName, index) => (
                  <li
                    key={index}
                    onClick={() => handleCountrySelect(countryName)}
                    className="px-4 py-2 text-xs hover:bg-gray-100 cursor-pointer text-black"
                  >
                    {countryName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col w-[300px] items-start justify-start">
            <h1 className="text-black text-base pb-[5px]">Profile Picture</h1>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files?.[0] || null)} // Set the profile picture
              className="mb-4 p-2 w-full border rounded text-black text-base"
            />
          </div>
          {isLoading ? (
          <LoadingSpinner color="baby-blue"/>
          ) : (
          <button
            className="w-[300px] text-white text-base bg-black py-2 px-3 mt-[20px]"
            onClick={handleSignUp} // Corrected from handleSignIn
          >
            Sign Up
          </button>
          )}
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error.toString()}</p>}
    </div>
  );
};
