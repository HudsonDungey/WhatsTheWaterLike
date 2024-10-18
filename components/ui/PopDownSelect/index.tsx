import { useState } from 'react';

type PopDownTypes = {
    options: string[],
    selectedOption: string,
    onChange: (value: string) => void,
    title: string,
}

const PopdownSelect = ({ options, selectedOption, onChange, title }: PopDownTypes) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: any) => {
    onChange(option); 
    setIsOpen(false); 
  };

  return (
    <div className="relative text-[20px] font-bebas">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between gap-x-3 md:gap-x-6 px-3 py-2 bg-black text-white rounded-md"
      >
        {selectedOption ? selectedOption : title}
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 bg-black bg-opacity-60 border border-gray-300 rounded-md shadow-lg z-100"
          style={{ minWidth: '100px' }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="px-4 py-2 hover:bg-gray-700 text-white cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopdownSelect;
