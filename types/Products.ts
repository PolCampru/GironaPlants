export type PlantAttributesType = {
  genus: string;
  description: string;
  pot_size: string;
  height: string;
  price: number;
  quantity?: number;
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
  format: Record<number, string>;
};

export type potSizeOptionsType = {
  id: number;
  value: string;
  label: string;
}[];

export type productsDataType = {
  title: string;
  table: {
    titleGenus: string;
    titleDescription: string;
    titlePotSize: string;
    titleHeight: string;
    titlePrice: string;
  };
  filters: {
    title: string;
    searchPlaceholder: string;
    offersTitle: string;
    potFilters: {
      title: string;
      seeAll: string;
      options: {
        id: number;
        value: string;
        label: string;
      }[];
    };
  };
};

export type AddProductType = {
  question: string;
  button: string;
  modal: {
    title: string;
    button: string;
    inputs: {
      label: string;
      name: string;
      required?: boolean;
      requiredError: string;
    }[];
  };
};

export type ProductsPageProps = {
  params: {
    lng: string;
  };
};
