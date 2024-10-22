'use client'

import { useAccountContext } from '~/utils/AccountContext'; // Adjust the path to your context
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Login } from '~/components/screens/Services';
import { MainProfileScreen, ManageAccount } from '~/components/screens';

const ProfilePage = () => {
  const { account } = useAccountContext();
  const [ step, setStep ] = useState(1)
  const [showSignup, setShowSignup] = useState(false); 

  useEffect(() => {
    if (!account?.email) {
      setShowSignup(true); 
    } else {
      setShowSignup(false); 
    }
  }, [account]);

  if (showSignup) {
    return (
          <Login/>
    );
  }
  
  if(account) {
    return (
      <>
      {step === 1 && (
        <MainProfileScreen account={account} setStep={setStep} />
      )}
      {step === 2 && (
        <ManageAccount account={account} setStep={setStep} />
      )}
      </>
    );
}
};

export default ProfilePage;
