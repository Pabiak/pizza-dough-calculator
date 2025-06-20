export interface IIngredient {
  name: string;
  amount: string;
}

export interface IParameter {
  name: string;
  value: string;
}

export interface IRecipe {
  id: string;
  name: string;
  createdAt: string;
  ingredients: Array<IIngredient>;
  parameters: Array<IParameter>;
}
