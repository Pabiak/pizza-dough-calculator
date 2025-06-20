import getFormattedDate from "@/helpers/formatDate";
import PizzaImg from "@/assets/pizza.png";
import Modal, { IRecipe } from "@/components/Modal";
import { useState } from "react";

const RecipesPage = () => {
  const exampleRecipes = [
    {
      id: crypto.randomUUID(),
      name: "przepis1",
      createdAt: "2023-10-01",
      ingredients: [
        { name: "Mąka", amount: "500g" },
        { name: "Woda", amount: "300ml" },
        { name: "Sól", amount: "10g" },
        { name: "Drożdże świeże", amount: "5g" },
        { name: "Oliwa", amount: "20g" },
      ],
      parameters: [
        { name: "Liczba porcji", value: "2" },
        { name: "Waga Porcji", value: "250g" },
        { name: "Hydracja", value: "60%" },
        { name: "Czas całkowity", value: "24h" },
        { name: "Czas w temperaturze pokojowej", value: "2h" },
        { name: "Czas w lodówce", value: "12h" },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "przepis2",
      createdAt: "2023-10-02",
      ingredients: [
        { name: "Mąka", amount: "600g" },
        { name: "Woda", amount: "350ml" },
        { name: "Sól", amount: "12g" },
        { name: "Drożdże świeże", amount: "6g" },
        { name: "Oliwa", amount: "25g" },
      ],
      parameters: [
        { name: "Liczba porcji", value: "2" },
        { name: "Waga Porcji", value: "250g" },
        { name: "Hydracja", value: "60%" },
        { name: "Czas całkowity", value: "24h" },
        { name: "Czas w temperaturze pokojowej", value: "2h" },
        { name: "Czas w lodówce", value: "12h" },
      ],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = (recipe: IRecipe) => {
    if (!recipe) return;
    setSelectedRecipe(recipe);
    setIsOpen(true);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    // Implement the logic to delete the recipe by its ID
    console.log(`Deleting recipe with ID: ${recipeId}`);
  };

  return (
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
      {exampleRecipes.map((recipe) => (
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
            {getFormattedDate(new Date(recipe.createdAt))}
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
                      (param) => param.name === "Liczba porcji",
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
                      (param) => param.name === "Waga Porcji",
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
                    recipe.parameters.find((param) => param.name === "Hydracja")
                      ?.value
                  }
                </span>
              </li>
            </ul>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RecipesPage;
