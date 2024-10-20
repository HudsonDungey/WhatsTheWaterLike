'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Login } from '~/components/screens/Services';
import { australianStates, activities } from '~/lib/locations';
import { useLocationContext } from '~/utils/LocationContext';
import { useActivityContext } from '~/utils/ActivityContext'; 
import { useAccountContext } from '~/utils/AccountContext';
import { motion, MotionProps } from 'framer-motion';

const links = [
  { url: '/home', text: 'HOME' },
  { url: '/forecast', text: 'FORECAST' }
];

const Navbar = () => {
  const { account } = useAccountContext();
  const { location } = useLocationContext()
  const { selectedActivity, setSelectedActivity } = useActivityContext();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleAccountClick = () => 
    setIsLoginModalOpen(prevState => !prevState);

  const handleActivitySelect = (activity: any) => {
    setSelectedActivity(activity);
  };

  const commonClasses = `text-base font-bebas tracking-widest flex items-center relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-primary transition-all duration-300 hover:text-primary`;

  const navLinkClasses = classNames(commonClasses, {
    'text-md after:bg-primary': pathname === '/home',
  });

  const expandedClasses = classNames(
    'w-screen flex items-center justify-between px-4 lg:px-10 py-6'
  );

  return (
    <header className="z-50 border-b border-gray-700 bg-gray-900 text-white">
      <nav className={expandedClasses}>
        <div className="flex flex-row">
          <Link href="/" className="inline-block text-xl lg:text-2xl pr-[100px]">
            <h1 className="text-2xl hover:text-primary transition-colors duration-300 flex flex-row">
              Whats the water like?
              <img src="/images/wind.png" alt="logo" className="w-[30px] h-[30px] invert" />
            </h1>
            {location ? (
              <p className="text-base">
                Your location is: Latitude {location.latitude}, Longitude {location.longitude}
              </p>
            ) : (
              <p className="text-base">Location not available</p>
            )}
          </Link>
        </div>
        <div className="flex items-center flex-col">
          <ul className="hidden lg:flex items-center gap-x-8">
            {australianStates.map((link, index) => (
              <li key={index}>
                <Link
                  className="text-xs"
                  href={link.url}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-x-3 md:gap-x-6 text-[20px] w-[200px] justify-end font-bebas">
          <div className="relative">
            <ul className="hidden lg:flex items-center justify-center gap-x-8">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    className={navLinkClasses}
                    href={link.url}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="border border-black bg-gray-700 w-[200px] text-white px-6 py-1 rounded-md shadow-black"
              onClick={toggleList}
            >
              {selectedActivity ? selectedActivity : 'Select Activity'}
            </button>
            {isOpen && (
              <ul className="absolute mt-2 w-[200px] bg-black bg-opacity-80 rounded-md shadow-lg z-100">
                {activities.map((activity, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleActivitySelect(activity);
                      setIsOpen(false); // Close the dropdown when an activity is selected
                    }}
                    className="px-4 py-2 hover:bg-gray-700 rounded-md text-white cursor-pointer"
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {account ? (
            <button className="flex flex-col justify-center items-center" onClick={handleProfileClick}>
              <FaUserCircle size={30} />
              <span>{account.displayName}</span>
            </button>
          ) : (
            <button onClick={handleAccountClick}>
              <FaUserCircle size={30} />
            </button>
          )}
        </div>
      </nav>
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-black text-2xl"
              onClick={handleAccountClick}
            >
              &times;
            </button>
            <Login handleAccountClick={handleAccountClick}/> 
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
