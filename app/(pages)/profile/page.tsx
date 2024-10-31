'use client'

import { useAccountContext } from '~/utils/AccountContext'; // Adjust the path to your context
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Login } from '~/components/screens/Services';
import { MainProfileScreen, ManageAccount } from '~/components/screens';

const ProfilePage = () => {
  const { account } = useAccountContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState("");
  const [country, setCountry] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [ step, setStep ] = useState(1)
  const [showSignup, setShowSignup] = useState(false); 

  useEffect(() => {
    if (!account?.email) {
      setShowSignup(true); 
    } else {
      setShowSignup(false); 
    }
  }, [account]);

  const handleChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setPhotoURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPhotoURL("");
  };

  const handleSaveProfile = () => {
    console.log({
      username,
      email,
      activity,
      country,
      photoURL,
    });
    setStep(1); 
  };

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
        <ManageAccount
          account={account}
          setStep={setStep}
          handleSaveProfile={handleSaveProfile}
          handleChooseImage={handleChooseImage}
          handleRemoveImage={handleRemoveImage} 
          username={username}
          email={email}
          activity={activity}
          country={country}
          photoURL={photoURL}
          setUsername={setUsername}
          setEmail={setEmail}
          setActivity={setActivity}
          setCountry={setCountry}
          setPhotoURL={setPhotoURL}
          />
      )}
      </>
    );
}
};

export default ProfilePage;
