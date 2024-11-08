'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

type UserState = 'NT' | 'SA';

type Recipe = {
  name: string;
  description: string;
  image: string;
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
    const [ searchedRecipes, setSearchedRecipes ] = useState("");
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const updateScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 768);
      };
      updateScreenSize();
      window.addEventListener('resize', updateScreenSize);
      return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

  const recipesByState: Record<UserState, Recipe[]> = {
    NT: [
        { 
            name: 'Grilled Mackerel with Herb Marinade', 
            description: 'Perfectly grilled mackerel with a blend of herbs.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Lemon Garlic Barramundi', 
            description: 'Barramundi fillets pan-seared with lemon and garlic.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Crispy Snapper with Dill Sauce', 
            description: 'A crispy snapper filet served with a creamy dill sauce.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Honey Soy Grilled Salmon', 
            description: 'Salmon grilled with a honey soy glaze, perfect for summer.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Spicy Tuna Tacos', 
            description: 'Fresh tuna spiced up and served in a taco shell.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Garlic Butter Shrimp', 
            description: 'Juicy shrimp cooked in a savory garlic butter sauce.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Blackened Grouper Sandwich', 
            description: 'A southern-style blackened grouper sandwich with fresh slaw.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Teriyaki Marinated Cod', 
            description: 'Cod marinated in teriyaki sauce, grilled to perfection.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Pan-Fried Tilapia with Lime', 
            description: 'Tilapia filets pan-fried with a hint of lime zest.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Chili Lime Mahi-Mahi', 
            description: 'Mahi-Mahi cooked with a zesty chili lime marinade.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Coconut Curry Swordfish', 
            description: 'Swordfish in a rich coconut curry sauce with fresh herbs.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Lemon Butter Halibut', 
            description: 'Halibut served with a simple lemon butter sauce.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Cajun Spiced Catfish', 
            description: 'A bold, spicy Cajun-flavored catfish filet.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Ginger Sesame Sea Bass', 
            description: 'Sea bass marinated in ginger and sesame oil, pan-seared.', 
            image: '/images/recipe-image.jpg' 
          },
          { 
            name: 'Parmesan Crusted Flounder', 
            description: 'Flounder filet topped with a crispy parmesan crust.', 
            image: '/images/recipe-image.jpg' 
          },
    ],
    SA: [
      { name: 'Pan-fried Snapper with Garlic', description: 'Lightly pan-fried snapper with garlic and herbs.', image: '/images/recipe-image.jpg' },
      { name: 'Gummy Shark with Lemon and Dill', description: 'A tender gummy shark recipe with fresh lemon and dill.', image: '/images/recipe-image.jpg' },
    ],
  };
  const topRecipes = [
    { 
      name: 'Grilled Mackerel with Herb Marinade', 
      description: 'Perfectly grilled mackerel with a blend of herbs.', 
      image: '/images/recipe-image.jpg' 
    },
    { 
      name: 'Lemon Garlic Barramundi', 
      description: 'Barramundi fillets pan-seared with lemon and garlic.', 
      image: '/images/recipe-image.jpg' 
    },
    { 
      name: 'Crispy Snapper with Dill Sauce', 
      description: 'A crispy snapper filet served with a creamy dill sauce.', 
      image: '/images/recipe-image.jpg' 
    },
  ];

  const recipes = recipesByState[userState] || [];


  const smallScreenLayout = (
    <ul className="grid items-center justify-center pt-1 grid-cols-2 gap-2">
      {recipes.map((recipe, index) => (
        <div key={index} className="bg-white rounded-md">
        <div className="relative w-full h-[120px] mb-4">
          <Image
            src={recipe.image}
            alt={recipe.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="h-[130px] ">
        <h3 className="text-sm md:text-xl font-semibold text-black px-3">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mt-2 px-3">{recipe.description}</p>
        </div>
      </div>
      ))}
    </ul>
  );

  const largeScreenLayout = (
    <ul className=" grid items-center grid-cols-3 gap-2">
      {recipes.map((recipe, index) => (
        <li key={index} className="relative mb-[140px] flex flex-col justify-center items-center p-3">
          <div className="relative w-[200px] h-[200px] mb-6">
            <Image src={recipe.image} alt={recipe.name} layout="fill" objectFit="cover" className="rounded-full z-10" />
          </div>
          <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8/12 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-black">{recipe.name}</h2>
            <p className="text-gray-600 text-sm pt-2">{recipe.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="relative w-full h-[200px]">
            <h1 className="absolute top-4 left-[30px] text-[40px] md:left-[60px] text-white md:text-[60px] font-bold z-10">Fish Recipes</h1>
            <Image
              src="/images/species-banner.jpg"
              alt="Fishing"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
        </div>
        <div className="w-screen bg-gray-900 flex items-center justify-between p-[10px]">
          <div onClick={() => handleStep(0)} className="flex items-center pr-2">
          <FaArrowLeft color="white" size={20} />
          </div>
          <input
             type="text"
             placeholder="Search Tips..."
             value={searchedRecipes}
             onChange={(e) => setSearchedRecipes(e.target.value)}
             className=" bg-gray-600 px-2 py-2 w-5/12 text-black text-sm rounded-md"
           />
          <div className="flex w-7/12 rounded-lg ml-1 bg-gray-50">
            {steps.map((stepData) => (
              <button
                key={stepData.step}
                onClick={() => handleStep(stepData.step)}
                className={`p-1 md:px-6 w-1/3 text-sm md:text-base ${
                  step === stepData.step ? 'text-white bg-[#636AE8FF] rounded-lg' : 'text-black'
                }`}
              >
                {stepData.name}
              </button>
            ))}
          </div>
          <div className="hidden md:w-8"></div>
        </div>
    <div className="w-screen pt-6 md:p-[70px]">
      <div className="w-full flex flex-col justify-center items-center px-[30px]">
      <h2 className="text-2xl md:text-5xl w-full font-bold md:text-start text-black mb-2 md:px-[100px]">Top Recipes</h2>
      <p className="text-gray-600 w-full md:text-start  text-sm tracking-tight md:px-[100px]">Try the best fish recipes the community has to offer!</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-4 md:gap-10 md:pt-[50px] md:px-[100px] w-full">
        {topRecipes.map((recipe, index) => (
          <div key={index} className="bg-white rounded-md">
            <div className="relative w-full h-[120px] md:h-[200px] mb-4">
              <Image
                src={recipe.image}
                alt={recipe.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="h-[120px] md:h-[180px]">
            <h3 className="text-sm md:text-xl font-semibold text-black px-3">{recipe.name}</h3>
            <p className="text-gray-600 text-sm mt-2 px-3">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <h1 className="text-4xl w-full font-bold text-center text-black my-[40px]">Recipes</h1>
    {isSmallScreen ? smallScreenLayout : largeScreenLayout}
    </div>
    </div>
  );
};
