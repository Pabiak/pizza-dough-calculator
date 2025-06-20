import { createPortal } from "react-dom";

import { IIngredient, IParameter, IRecipe } from "@/types/Recipe";

import CloseIcon from "@/assets/close.svg?react";

interface IModalProps {
  name: string;
  onClose: () => void;
  onRecipeDelete: (recipeId: string) => void;
  isOpen: boolean;
  recipe: IRecipe | null;
}

const Modal = ({
  name,
  onClose,
  isOpen,
  recipe,
  onRecipeDelete,
}: IModalProps) => {
  if (!isOpen) return null;
  if (!recipe) return null;

  const handleDelete = () => {
    if (!recipe.id) return;
    onRecipeDelete(recipe.id);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-40 transition-opacity duration-[.4s] w-full flex items-center justify-center p-6 backdrop-blur-xs bg-gray-400/70"
      onClick={onClose || undefined}
      onKeyDown={onClose || undefined}
      data-name={name}
      role="dialog"
      aria-modal="true"
    >
      <div
        role="button"
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full bg-white rounded-xl max-h-[98svh] overflow-y-auto min-w-[20rem] lg:min-w-[65rem] raise-from-center"
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {recipe.name}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text)] focus:outline-none"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="p-4">
          <h3 className="text-md font-semibold text-[var(--text)] text-center">
            Składniki
          </h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient: IIngredient) => (
              <li
                key={ingredient.name}
                className="flex justify-between text-[var(--placeholder)]"
              >
                <span className="text-[var(--text)]">{ingredient.name}</span>
                <span className="text-[var(--placeholder)]">
                  {ingredient.amount}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="mt-4 text-md font-semibold text-[var(--text)] text-center">
            Parametry
          </h3>
          <ul className="space-y-2 mt-2">
            {recipe.parameters.map((parameter: IParameter) => (
              <li key={parameter.name} className="flex justify-between">
                <span className="text-[var(--text)]">{parameter.name}</span>
                <span className="text-[var(--placeholder)]">
                  {parameter.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <footer className="p-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="w-full h-12 rounded-3xl border text-[var(--primary)] bg-[var(--background)] border-[var(--primary)]"
          >
            Usuń przepis
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
