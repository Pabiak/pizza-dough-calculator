import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import calculateDough from "@/utils/calculateDough";
import IDoughData from "@/types/DoughData";
import getFormattedDate from "@/helpers/formatDate";

import Input from "@/components/Input";
import PageTransition from "@/components/PageTransition";

const CalculatorPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<IDoughData>({
    portions: 2,
    weight: 250,
    hydration: 60,
    saltPerLiter: 50,
    fatPerLiter: 0,
    totalTime: 24,
    fridgeTime: 12,
    roomTemperature: 20,
    recipeName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "recipeName") {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      return;
    }

    const numericValue = Number(value);

    if (isNaN(numericValue)) return;

    setData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  const doughParameters = calculateDough(data);

  const results = [
    { label: "Mąka", value: doughParameters.flourAmount },
    { label: "Woda", value: doughParameters.waterAmount },
    { label: "Sól", value: doughParameters.saltAmount },
    { label: "Drożdże świeże", value: doughParameters.yeastAmount },
    { label: "Oliwa", value: doughParameters.fatAmount },
  ];

  const handleSave = () => {
    const savedRecipe = {
      id: crypto.randomUUID(),
      name: data.recipeName,
      createdAt: getFormattedDate(new Date()),
      ingredients: results.map((item) => ({
        name: item.label,
        amount: `${item.value} g`,
      })),
      parameters: [
        { name: "Liczba porcji", value: data.portions.toString() },
        { name: "Waga Porcji", value: data.weight.toString() },
        { name: "Hydracja", value: `${data.hydration} %` },
        { name: "Czas całkowity", value: `${data.totalTime} h` },
        { name: "Czas w lodówce", value: `${data.fridgeTime} h` },
        { name: "Temperatura", value: `${data.roomTemperature} °C` },
      ],
    };
    console.log("Zapisany przepis:", savedRecipe);
    // save to a local storage
    const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    recipes.push(savedRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    navigate("/przepisy");
  };

  return (
    <PageTransition>
      <div className="flex flex-col gap-3 mb-[4.25rem]">
        <h1 className="font-bold text-lg text-[var(--text)] my-5 text-center tracking-normal leading-none">
          Kalkulator pizzy
        </h1>
        <section className="grid grid-cols-2 gap-4 py-3">
          <Input
            label="Liczba porcji"
            name="portions"
            onChange={handleChange}
            value={data.portions.toString()}
          />
          <Input
            label="Waga porcji (g)"
            name="weight"
            onChange={handleChange}
            value={data.weight.toString()}
          />
          <Input
            label="Hydracja (%)"
            name="hydration"
            onChange={handleChange}
            value={data.hydration.toString()}
          />
          <Input
            label="Sól (g)"
            name="saltPerLiter"
            onChange={handleChange}
            value={data.saltPerLiter.toString()}
          />
          <Input
            label="Tłuszcz (g)"
            name="fatPerLiter"
            onChange={handleChange}
            value={data.fatPerLiter.toString()}
          />
          <Input
            label="Czas całkowity (h)"
            name="totalTime"
            onChange={handleChange}
            value={data.totalTime.toString()}
          />
          <Input
            label="Czas w lodówce (h)"
            name="fridgeTime"
            onChange={handleChange}
            value={data.fridgeTime.toString()}
          />
          <Input
            label="Temperatura (°C)"
            name="roomTemperature"
            onChange={handleChange}
            value={data.roomTemperature.toString()}
          />
        </section>
        <section className="">
          <h2 className="text-[var(--text)] font-bold text-xl tracking-normal leading-none">
            Parametry Ciasta
          </h2>
          <ul className="flex flex-col py-3">
            {results.map(({ label, value }) => (
              <li
                key={label}
                className="text-[var(--placeholder)] text-sm leading-none border-t border-[var(--border)] py-3 flex justify-between"
              >
                <span>{label}:</span>
                <span>{value} g</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="w-full flex flex-col gap-4">
          <Input
            label="Nazwa przepisu do zapisu"
            name="recipeName"
            onChange={handleChange}
          />
          <button
            onClick={handleSave}
            className="w-full h-12 bg-[var(--primary)] rounded-3xl text-[var(--background)]"
          >
            Zapisz przepis
          </button>
        </section>
      </div>
    </PageTransition>
  );
};

export default CalculatorPage;
