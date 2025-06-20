interface IDoughData {
  portions: number;
  weight: number;
  hydration: number;
  saltPerLiter: number;
  fatPerLiter: number;
  totalTime: number;
  fridgeTime: number;
  roomTemperature: number;
  recipeName?: string;
}

export default IDoughData;
