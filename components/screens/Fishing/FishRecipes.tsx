import React from 'react';
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
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
        <div className="w-screen bg-gray-900 flex items-center justify-between p-[10px]">
          <div onClick={() => handleStep(0)} className="flex items-center">
          <FaArrowLeft color="white" size={20} />
          </div>
          <div className="flex space-x-[20px] rounded-lg bg-gray-50">
            {steps.map((stepData) => (
              <button
                key={stepData.step}
                onClick={() => handleStep(stepData.step)}
                className={`p-1 px-6 text-base ${
                  step === stepData.step ? 'text-white bg-[#636AE8FF] rounded-lg' : 'text-black'
                }`}
              >
                {stepData.name}
              </button>
            ))}
          </div>
          <div className="w-8"></div>
        </div>
    <div className="w-screen p-[70px]">
      <div className="w-full flex flex-col justify-center items-center px-[30px]">
      <h2 className="text-5xl w-full font-bold text-start text-black mb-2 px-[100px]">Top Recipes</h2>
      <p className="text-gray-600 w-full text-start  text-sm tracking-tight px-[100px]">Try the best fish recipes the community has to offer!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-[50px] px-[100px]">
        {topRecipes.map((recipe, index) => (
          <div key={index} className="bg-white rounded-md">
            <div className="relative w-full h-[200px] mb-4">
              <Image
                src={recipe.image}
                alt={recipe.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="h-[180px]">
            <h3 className="text-xl font-semibold text-black px-3">{recipe.name}</h3>
            <p className="text-gray-600 text-sm mt-2 px-3">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <h1 className="text-4xl w-full font-bold text-center text-black mt-[60px]">Recipes</h1>
      {recipes.length > 0 ? (
        <ul className="space-y-[20px] grid items-center grid-cols-4 gap-2">
        {recipes.map((recipe, index) => (
          <li key={index} className="relative pb-[100px] flex flex-col justify-center items-center p-4">
            <div className="relative w-[150px] h-[150px] mb-4">
              <Image
                src={recipe.image}
                alt={recipe.name}
                layout="fill"
                objectFit="cover"
                className="rounded-[300px] z-10"
              />
            </div>
            <div className="absolute text-start top-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 bg-white p-6 min-h-[250px] rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-black pt-[70px]">{recipe.name}</h2>
              <p className="text-gray-600 text-sm pt-2">{recipe.description}</p>
              <div className="w-full flex justify-end z-10">
                <button className="bg-slate-300 text-[#636AE8FF] text-xs rounded-xl font-semibold px-4 py-1">details</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      ) : (
        <p>No recipes available for this region.</p>
      )}
    </div>
    </div>
  );
};
