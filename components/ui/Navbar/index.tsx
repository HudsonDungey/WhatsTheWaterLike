'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion, MotionProps } from 'framer-motion';

const links = [
  { url: '/home', text: 'HOME' },
  { url: '/forecast', text: 'FORECAST' },
  { url: '/about', text: 'ABOUT' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const commonClasses = `text-base font-bebas tracking-widest flex items-center py-2 px-4 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-primary transition-all duration-300 hover:text-primary`;
  
  const navLinkClasses = classNames(commonClasses, {
    'text-md after:bg-primary': pathname === '/home',
  });

  const expandedClasses = classNames(
    'container flex items-center justify-between px-4 lg:px-10 py-6'
  );

  return (
    <header className="z-50 border-b border-gray-700 bg-gray-900 text-white">
      <nav className={expandedClasses}>
        <div>
        <Link href="/" className="inline-block text-xl lg:text-2xl pr-[100px]">
        <h1 className="text-2xl hover:text-primary transition-colors duration-300 flex flex-row">
            Whats the water like?
          <img src="/images/wind.png" alt="logo" className="w-[30px] h-[30px] invert"/>
          </h1>
        </Link>
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full md:w-[300px] text-sm px-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out"
        />
        </div>
        <div>
        <ul className="hidden lg:flex items-center gap-x-8">
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
        </div>
        <div className="lg:hidden flex items-center">
          <button
            className="focus:outline-none text-white"
            onClick={() => setIsMenuOpen((prevState) => !prevState)}
          >
            <motion.svg
              animate={isMenuOpen ? 'open' : 'closed'}
              className="fill-current stroke-current"
              height="2rem"
              viewBox="0 0 24 24"
              width="2rem"
            >
              <Line
                y1="6"
                x2="24"
                y2="6"
                variants={{
                  closed: { y1: 6, y2: 6 },
                  open: { y1: 12, y2: 12 },
                }}
              />
              <Line
                y1="12"
                x2="24"
                y2="12"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <Line
                y1="18"
                x2="24"
                y2="18"
                variants={{
                  closed: { y1: 18, y2: 18 },
                  open: { y1: 12, y2: 12 },
                }}
              />
            </motion.svg>
          </button>
        </div>
        {isMenuOpen && (
          <motion.ul
            className="absolute top-[60px] right-0 w-[70%] bg-gray-800 h-[calc(100vh-60px)] z-50 flex flex-col items-start justify-start px-8 py-12"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 70, damping: 12 }}
          >
            {links.map((link, index) => (
              <li key={index} className="mb-6">
                <Link
                  className={`text-2xl font-semibold hover:text-primary transition-colors duration-300 ${
                    link.url === pathname && 'text-primary'
                  }`}
                  href={link.url}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </nav>
    </header>
  );
};

const Line = (
  props: Omit<JSX.IntrinsicElements['line'] & MotionProps, 'ref'>
) => (
  <motion.line
    stroke="white"
    strokeLinecap="round"
    strokeWidth="2"
    {...props}
  />
);

export default Navbar;
