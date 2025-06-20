import { useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

import CalcualtorIcon from "@/assets/calculator.svg?react";
import RecipesIcon from "@/assets/recipes.svg?react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/")[1];

  return (
    <nav className="flex items-center justify-between px-6 py-2 bg-[var(--background)] fixed bottom-0 left-0 w-full border-t border-[var(--border)] z-50">
      <button
        className={cn(
          "flex flex-col items-center justify-center gap-1 w-[50%] transition-colors duration-200",
          {
            "text-[var(--placeholder)]": splitLocation === "",
          },
        )}
        onClick={() => navigate("/")}
      >
        <CalcualtorIcon />
        <span className="text-xs ">Kalkulator</span>
      </button>
      <button
        className={cn(
          "flex flex-col items-center justify-center gap-1 w-[50%] transition-colors duration-200",
          {
            "text-[var(--placeholder)]": splitLocation === "przepisy",
          },
        )}
        onClick={() => navigate("/przepisy")}
      >
        <RecipesIcon />
        <span className="text-xs ">Przepisy</span>
      </button>
    </nav>
  );
};

export default Navbar;
