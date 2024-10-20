'use client'

import { useAccountContext } from '~/utils/AccountContext'; // Adjust the path to your context
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Login } from '~/components/screens/Services';

const ProfilePage = () => {
  const { account } = useAccountContext();
  const [showSignup, setShowSignup] = useState(false); 

  useEffect(() => {
    if (!account?.email) {
      setShowSignup(true); 
    } else {
      setShowSignup(false); 
    }
  }, [account]);

  console.log(account?.email)

  if (showSignup) {
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-black">You do not have an account! <br/>Login or setup an account to become the best meteorologist out there!</h1>
         <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <Login/>
        </div>
    </div>
    );
  }
  
  if(account) {
  return (
    <div className="flex flex-col items-center pt-20 h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center items-center flex-col mb-4">
        <FaUserCircle size={80} />
        <h1 className="text-black">{account.displayName}</h1>
        </div>
        
        <div>
          <h1 className="text-black bold">Your marked spots</h1>
          <li className='text-black'>Mandorah</li>
          <li className='text-black'>Lee Point Wide</li>
          <li className='text-black'>Nightcliff</li>
        </div>
      </div>
    </div>
  );
}
};

export default ProfilePage;
