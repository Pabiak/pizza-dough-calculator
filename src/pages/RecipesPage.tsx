import { useState } from "react";

import { IParameter, IRecipe } from "@/types/Recipe";

import Modal from "@/components/Modal";

import PizzaImg from "@/assets/pizza.png";
import PageTransition from "@/components/PageTransition";

const RecipesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);

  const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = (recipe: IRecipe) => {
    if (!recipe) return;
    setSelectedRecipe(recipe);
    setIsOpen(true);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    if (!recipeId) return;

    const updatedRecipes = recipes.filter(
      (recipe: IRecipe) => recipe.id !== recipeId,
    );

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setSelectedRecipe(null);
    setIsOpen(false);
  };

  return (
    <PageTransition>
      <div className="grid grid-cols-1 gap-3 mb-[4.25rem]">
        <h1 className="font-bold text-lg text-[var(--text)] my-5 text-center tracking-normal leading-none">
          Przepisy
        </h1>
        <Modal
          name="recipe-modal"
          isOpen={isOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onRecipeDelete={handleDeleteRecipe}
        />
        {recipes.map((recipe: IRecipe) => (
          <button
            onClick={() => handleOpenModal(recipe)}
            type="button"
            aria-label="Open recipe modal"
            key={recipe.id}
            className="w-full text-left p-4 bg-white rounded-lg shadow-md flex gap-2 relative"
          >
            <figure className="flex-shrink-0">
              <img
                src={PizzaImg}
                alt="Placeholder - pizza image"
                className="w-[5rem]"
              />
            </figure>
            <p className="absolute top-[12px] right-[12px] text-sm text-gray-600 mb-2">
              {recipe.createdAt}
            </p>
            <div className="flex flex-col justify-center">
              <h2 className="font-bold text-lg text-[var(--text)]">
                {recipe.name}
              </h2>
              <ul className="flex gap-4">
                <li className="flex flex-col">
                  <span className="text-[var(--placeholder)] text-xs">
                    Liczba porcji:
                  </span>
                  <span className="text-[var(--text)] text-center">
                    {
                      recipe.parameters.find(
                        (param: IParameter) => param.name === "Liczba porcji",
                      )?.value
                    }
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="text-[var(--placeholder)] text-xs">
                    Waga porcji:
                  </span>
                  <span className="text-[var(--text)] text-center">
                    {
                      recipe.parameters.find(
                        (param: IParameter) => param.name === "Waga Porcji",
                      )?.value
                    }
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="text-[var(--placeholder)] text-xs">
                    Hydracja:
                  </span>
                  <span className="text-[var(--text)] text-center">
                    {
                      recipe.parameters.find(
                        (param: IParameter) => param.name === "Hydracja",
                      )?.value
                    }
                  </span>
                </li>
              </ul>
            </div>
          </button>
        ))}
      </div>
    </PageTransition>
  );
};

export default RecipesPage;
