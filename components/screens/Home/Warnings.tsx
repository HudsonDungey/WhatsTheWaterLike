import React from 'react';

interface WarningBoxProps {
  warnings: string[]; 
}

export const WarningBox: React.FC<WarningBoxProps> = ({ warnings }) => {
  if (!warnings || warnings.length === 0) return null; 

  return (
    <div className="p-4 mb-4 bg-red-100 border-l-4 border-red-700 text-red-800 rounded-md shadow-lg">
        <div className="flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.518 0 2.722-1.28 2.617-2.796L18.617 4.797C18.511 3.28 17.307 2 15.788 2H8.212c-1.518 0-2.722 1.28-2.828 2.797L3.322 17.204c-.105 1.517 1.099 2.796 2.617 2.796z"
            ></path>
          </svg>
          <h3 className="text-lg font-extrabold">Warning!</h3>
        </div>
        <ul className="list-disc list-inside mt-2 overflow-y-scroll">
          {warnings.map((warning, index) => (
            <li key={index} className="mb-1 text-base">
              {warning}
            </li>
          ))}
        </ul>
    </div>
  );
};
