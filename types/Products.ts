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

export type Meta = {
  page: number;
  pageCount: number;
  total: number;
  query: QueryType;
};

export type PlantsStateType = {
  plants: PlantType[];
  meta: Meta;
  loading: boolean;
};

export type QueryType = {
  search: string;
  offers: boolean;
  genus: Record<number, string>;
  format: Record<number, string>;
};
