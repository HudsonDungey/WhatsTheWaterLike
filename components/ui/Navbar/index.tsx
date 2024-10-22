'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Login } from '~/components/screens/Services';
import { australianStates, activities } from '~/lib/locations';
import { mainNav } from '~/lib/navbarMain';
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
    'after:bg-primary hover:text-primary': pathname === '/home',
  });

  const activeClass = classNames(
    'text-primary after:text-black bg-lemon-yellow p-2 border-black rounded-3xl text-black'
  );  

  const expandedClasses = classNames(
    'w-screen flex items-center px-4 lg:px-10 py-6 shadow-lg'
  );

  return (
    <header className="z-50 bg-baby-blue text-white">
      <nav className={expandedClasses}>
        <div className="flex flex-row">
          <Link href="/" className="inline-block text-xl lg:text-2xl pr-[100px]">
            <h1 className="text-xl text-black hover:text-primary transition-colors duration-300 flex flex-row">
            <img src="/images/wind.png" alt="logo" className="w-[30px] h-[30px] pr-1 invert" />
              Whats the water like?
            </h1>
          </Link>
        </div>
        <div>
        <ul className="hidden bg-black lg:flex h-full items-center justify-center border-black rounded-3xl py-[10px] px-[40px] gap-x-[40px]">
            {mainNav.map((link, index) => (
              <li key={index}>
                <Link
                  className={`${navLinkClasses} ${
                    link.url === pathname && activeClass
                  }`}
                  href={link.url}
                >
                  <span className="text-xl pr-2">{link.icon}</span>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-x-3 items-center md:gap-x-6 text-[20px] w-[430px] justify-end font-bebas">
          <div className="relative">
            <button
              className="border border-transparent font-bold bg-light-baby-blue w-[200px] text-black px-6 py-1 rounded-md shadow-black"
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
                      setIsOpen(false); 
                    }}
                    className="px-4 py-2 hover:bg-gray-700 rounded-md text-white cursor-pointer"
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-[100px]">
          {account ? (
            <button className="flex flex-col justify-center items-center" onClick={handleProfileClick}>
              <FaUserCircle size={30} className="invert"/>
              <span>{account.displayName}</span>
            </button>
          ) : (
            <button onClick={handleAccountClick}>
              <FaUserCircle size={30} className="invert"/>
            </button>
          )}
          </div>
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
