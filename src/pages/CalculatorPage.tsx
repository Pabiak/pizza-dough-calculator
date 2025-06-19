import Input from "@/components/Input";
import React, { useEffect, useState } from "react";

const CalculatorPage = () => {
  const [data, setData] = useState({
    portions: 2,
    weight: 250,
    hydration: 60,
    salt: 50,
    fat: 0,
    totalTime: 24,
    fridgeTime: 12,
    roomTemperature: 20,
    recipeName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);

  return (
    <div className="flex flex-col gap-3">
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
          name="salt"
          onChange={handleChange}
          value={data.salt.toString()}
        />
        <Input
          label="Tłuszcz (g)"
          name="fat"
          onChange={handleChange}
          value={data.fat.toString()}
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
        <ul>
          <li className="text-[var(--placeholder)] text-sm leading-mone block">
            Waga ciasta: {data.weight * data.portions} g
          </li>
          <li className="text-[var(--placeholder)] text-sm leading-mone">
            Hydracja: {data.hydration}%
          </li>
          <li className="text-[var(--placeholder)] text-sm leading-mone">
            Sól: {data.salt} g
          </li>
          <li className="text-[var(--placeholder)] text-sm leading-mone">
            Tłuszcz: {data.fat} g
          </li>
          <li className="text-[var(--placeholder)] text-sm leading-mone">
            Czas całkowity: {data.totalTime} h
          </li>
          <li className="text-[var(--placeholder)] text-sm leading-mone">
            Czas w lodówce: {data.fridgeTime} h
          </li>
          <li className="text-[var(--placeholder)] text-sm leading-mone">
            Temperatura: {data.roomTemperature} °C
          </li>
        </ul>
      </section>
      <section className="w-full flex flex-col gap-4">
        <Input
          label="Nazwa przepisu do zapisu"
          name="recipeName"
          onChange={handleChange}
        />
        <button className="w-full h-12 bg-[var(--primary)] rounded-3xl text-[var(--background)]">
          Zapisz przepis
        </button>
      </section>
    </div>
  );
};

export default CalculatorPage;
