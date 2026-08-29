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

/** Where a line was added from, for the quote funnel in Umami. */
export type QuoteItemSource = "catalogue" | "offer" | "custom";

export type CartStateType = {
  items: ItemType[];
  /** False until the browser's saved quote has been adopted after mount, so
   *  the first client render matches the server's. */
  hydrated: boolean;
};
