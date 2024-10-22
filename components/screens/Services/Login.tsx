import React, { useState } from 'react';
import { registerUser, loginUser, logoutUser } from '~/lib/authConfig'; // Adjust the import path
import { useAccountContext } from '~/utils/AccountContext';
import { LoadingSpinner } from '~/components';

type LoginTypes = {
  handleAccountClick?: () => void;
};

export const Login = ({ handleAccountClick }: LoginTypes) => {
  const { clearAccount, setAccount } = useAccountContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null); // For profile picture
  const [error, setError] = useState<Error | undefined>(undefined);
  const [step, setStep] = useState<'initial' | 'login' | 'signup'>('initial'); // Step state

  // Handle sign-up with profile picture
  const handleSignUp = async () => {
    try {
      if (!profilePicture) {
        throw new Error('Please upload a profile picture');
      }
      const user = await registerUser(email, password, username, profilePicture); // Pass the picture file
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
    try {
      const user = await loginUser(email, password);
      setAccount(user);
      handleAccountClick?.();
      setIsLoading(false);
    } catch (err) {
      console.error('Sign in failed:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred during sign in.'));
    }
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await logoutUser();
      clearAccount();
    } catch (err) {
      console.error('Sign out failed:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred during sign out.'));
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-gray-100 p-4">
      <div className="w-3/12 pt-[100px]">
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
          {/* Add file input for profile picture */}
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
            className="w-[300px] text-white text-base bg-black py-2 px-3 mt-[50px]"
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
