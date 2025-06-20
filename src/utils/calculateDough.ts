import IDoughData from "@/types/doughData";

const calculateDough = (data: IDoughData) => {
  const {
    portions,
    weight,
    hydration,
    saltPerLiter,
    fatPerLiter,
    totalTime,
    fridgeTime,
    roomTemperature,
  } = data;

  const totalDoughWeight = portions * weight;
  const C = hydration * (saltPerLiter + fatPerLiter) + 1000 * (hydration + 100);
  const flourAmount = Math.round((100000 * totalDoughWeight) / C);
  const waterAmount = Math.round((flourAmount * hydration) / 100);
  const saltAmount = Math.round((waterAmount * saltPerLiter) / 1000);
  const fatAmount = Math.round((waterAmount * fatPerLiter) / 1000);

  const tempFactor = roomTemperature * 0.75;
  const timeFactor = Math.max(0.1, totalTime - (9 * fridgeTime) / 10);

  const yeastCoefficient =
    (1100 * (1 + saltPerLiter / 200) * (1 + fatPerLiter / 300)) /
    ((4.2 * hydration - 80 - 0.0305 * hydration * hydration) *
      Math.pow(tempFactor, 2.5) *
      Math.pow(timeFactor, 1.2));

  const yeastAmount = (flourAmount * yeastCoefficient).toFixed(2);

  return {
    flourAmount,
    waterAmount,
    saltAmount,
    fatAmount,
    yeastAmount,
  };
};

export default calculateDough;
