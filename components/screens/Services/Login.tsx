import React, { useState } from 'react';
import { registerUser, loginUser, logoutUser } from '~/lib/authConfig'; // Adjust the import path
import { useAccountContext } from '~/utils/AccountContext';

type LoginTypes = {
  handleAccountClick?: () => void;
};

export const Login = ({ handleAccountClick }: LoginTypes) => {
  const { clearAccount, setAccount } = useAccountContext();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState<Error | undefined>(undefined);
  const [step, setStep] = useState<'initial' | 'login' | 'signup'>('initial'); // Step state

  const handleSignUp = async () => {
    try {
      const user = await registerUser(email, password, username, photoURL);
      setAccount(user);
      handleAccountClick?.();
    } catch (err) {
      console.error('Sign up failed:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred during sign up.'));
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await loginUser(email, password);
      setAccount(user);
      handleAccountClick?.();
    } catch (err) {
      console.error('Sign in failed:', err);
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

  // Render Form
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      {step === 'initial' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Welcome!</h2>
          <p className="text-center mb-4">Please select an option below:</p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => setStep('login')}
            >
              Log In
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={() => setStep('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {step === 'login' && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-2 w-full border rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 w-full border rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSignIn}
          >
            Log In
          </button>
          <button
            className="mt-4 text-sm text-blue-500 hover:underline"
            onClick={() => setStep('initial')}
          >
            Go Back
          </button>
        </div>
      )}

      {step === 'signup' && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-2 w-full border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="mb-4 p-2 w-full border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 w-full border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Profile Picture URL"
            className="mb-4 p-2 w-full border rounded"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <button
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className="mt-4 text-sm text-blue-500 hover:underline"
            onClick={() => setStep('initial')}
          >
            Go Back
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error.toString()}</p>}
    </div>
  );
};
