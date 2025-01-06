import { Image } from "./Offers";

export type ItemType = {
  id: number;
  genus: string;
  description: string;
  pot_size?: string;
  height?: string;
  min_quantity: number;
  quantity: number;
  image?: Image[];
  oldPrice?: number;
  newPrice?: number;
  discount?: number;
};

export type CartStateType = {
  items: ItemType[];
};
