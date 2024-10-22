import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

type ManageAccountTypes = {
  account: any;
  setStep: (input: number) => void;
}

export const ManageAccount = ({ account, setStep }: ManageAccountTypes) => {

  return (
    <div className="flex flex-col items-center pt-10 min-h-screen bg-gray-50"> 
      <h1 className="text-4xl mb-[30px] font-bold text-black">Manage Account</h1>
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full"> 
        <div className="flex justify-center items-center flex-col">
          <FaUserCircle size={100} className="text-gray-400" /> 
          <h1 className="text-2xl font-semibold text-gray-900 mt-4">
            {account.displayName}
          </h1> 
        </div>
        <button 
        onClick={() => setStep(1)} 
        className="text-gray-500 text-sm underline mb-4"
      >
        Back to Profile
      </button>
      </div>
    </div>
  );
};
