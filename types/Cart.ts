export type ItemType = {
  id: number;
  genus: string;
  description: string;
  pot_size?: string;
  height?: string;
  quantity: number;
  image?: string;
  oldPrice?: number;
  newPrice?: number;
  discount?: number;
};

export type CartStateType = {
  items: ItemType[];
};
