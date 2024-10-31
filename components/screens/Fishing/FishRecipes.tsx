import React from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

type UserState = 'NT' | 'SA';

type Recipe = {
  name: string;
  description: string;
};

type Step = {
    name: string;
    step: number;
};

type RecipesProps = {
  userState: UserState;
  handleStep: (input: number) => void;
  steps: Step[];
  step: number;
};

export const Recipes = ({ userState, handleStep, step, steps }: RecipesProps) => {

  const recipesByState: Record<UserState, Recipe[]> = {
    NT: [
      { name: 'Barramundi with Lemon Butter Sauce', description: 'A simple yet delicious recipe for barramundi.' },
      { name: 'Grilled Mackerel with Herb Marinade', description: 'Perfectly grilled mackerel with a blend of herbs.' },
    ],
    SA: [
      { name: 'Pan-fried Snapper with Garlic', description: 'Lightly pan-fried snapper with garlic and herbs.' },
      { name: 'Gummy Shark with Lemon and Dill', description: 'A tender gummy shark recipe with fresh lemon and dill.' },
    ],
  };
  const recipes = recipesByState[userState] || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="w-screen flex items-center justify-between p-[10px]">
          <div onClick={() => handleStep(0)} className="flex items-center">
            <FaArrowLeft color="#636AE8FF" />
          </div>
          <div className="flex space-x-4">
            {steps.map((stepData) => (
              <button
                key={stepData.step}
                onClick={() => handleStep(stepData.step)}
                className={`p-2 px-4 rounded-md shadow-md ${
                  step === stepData.step ? 'text-[#636AE8FF]' : 'text-black'
                }`}
              >
                {stepData.name}
              </button>
            ))}
          </div>
          <div className="w-8"></div>
        </div>
        <div className="relative w-full h-[200px]">
                <h1 className="absolute top-4 left-[60px] text-white text-[60px] font-bold z-10">Fish Recipes</h1>
                <Image
                  src="/images/species-banner.jpg"
                  alt="Fishing"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
      <h1 className="text-3xl font-bold mb-6">Recipes for {userState}</h1>
      {recipes.length > 0 ? (
        <ul className="space-y-4">
          {recipes.map((recipe, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold">{recipe.name}</h2>
              <p className="text-gray-600">{recipe.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes available for this region.</p>
      )}
    </div>
  );
};
