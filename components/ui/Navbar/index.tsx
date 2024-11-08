'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { GiFishing, GiHelicopter, GiWaveSurfer } from 'react-icons/gi';
import { IoBoatSharp } from 'react-icons/io5';
import JetSkiIcon from '~/public/images/jetski.png';
import classNames from 'classnames';
import { Login } from '~/components/screens/Services';
import { mainNav } from '~/lib/navbarMain';
import { useLocationContext } from '~/utils/LocationContext';
import { useActivityContext } from '~/utils/ActivityContext'; 
import { useAccountContext } from '~/utils/AccountContext';

const links = [
  { url: '/home', text: 'HOME' },
  { url: '/forecast', text: 'FORECAST' }
];

const activities = [
  { name: 'Fishing', icon: <GiFishing /> },
  { name: 'Boating', icon: <IoBoatSharp /> },
  { name: 'Jet Skiing', icon: <Image src={JetSkiIcon} alt="Jet Ski" width={25} height={25} />},
  { name: 'Flying', icon: <GiHelicopter /> },
  { name: 'Surfing', icon: <GiWaveSurfer />}
];

const Navbar = () => {
  const { account } = useAccountContext();
  const { location } = useLocationContext();
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
    'text-primary after:text-red-600 border-black rounded-3xl text-red-800'
  );  

  const expandedClasses = classNames(
    'w-screen flex items-center px-4 lg:px-1 py-3 shadow-lg'
  );

  return (
    <header className="z-50 bg-white text-white">
      <nav className={expandedClasses}>
        <div className="flex flex-row items-center justify-between w-full">
          <Link href="/" className="inline-block text-xl lg:text-2xl pr-[100px]">
            <h1 className="text-sm md:text-xl text-black font-bold hover:text-primary transition-colors duration-300 flex flex-row">
              <img src="/images/wind.png" alt="logo" className="w-[30px] h-[30px] pr-1 invert" />
              Whats the water like?
            </h1>
          </Link>
        </div>


        <div className="flex-1">
          <ul className="hidden text-start lg:flex h-full items-center justify-start rounded-3xl text-black py-[10px] px-[10px] gap-x-[40px]">
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

        <div className="flex gap-x-3 items-center md:gap-x-6 text-[20px] w-auto ml-auto pr-4">
          <div className="relative">
            <button
              className="border border-transparent font-bold text-center text-black px-[14px] py-1 rounded-md shadow-black"
              onClick={toggleList}
            >
              {selectedActivity ? selectedActivity : '?'}
            </button>
            {isOpen && (
              <ul className="absolute mt-2 w-[50px] bg-black bg-opacity-80 rounded-md shadow-lg z-100">
                {activities.map((activity, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleActivitySelect(activity.icon);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-700 text-lg rounded-md text-white cursor-pointer flex items-center space-x-2"
                  >
                    {activity.icon}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button 
            className="lg:hidden flex flex-col items-center justify-center pr-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5  bg-black transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-black my-2 transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-black transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          <div>
            {account ? (
              <button className="flex flex-col justify-center items-center" onClick={handleProfileClick}>
                {account.photoURL ? (
                  <img src={account.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <FaUserCircle size={30} className="invert" />
                )}
              </button>
            ) : (
              <button onClick={handleAccountClick}>
                <FaUserCircle size={30} className="invert"/>
              </button>
            )}
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden bg-white absolute top-0 left-0 w-full p-6 shadow-lg z-50">
          <ul className="space-y-4 text-black">
            {mainNav.map((link, index) => (
              <li key={index}>
                <Link
                  className={`${navLinkClasses} ${
                    link.url === pathname && activeClass
                  }`}
                  href={link.url}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

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
