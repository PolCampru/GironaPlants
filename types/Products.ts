export type PlantAttributesType = {
  genus: string;
  description: string;
  pot_size: string;
  height: string;
  price: number;
};

export type PlantType = {
  id: number;
} & PlantAttributesType;

export type PlantsStateType = {
  data: PlantType[];
};
