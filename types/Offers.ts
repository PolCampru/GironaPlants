export type OffersPageProps = {
  params: Promise<{
    lng: string;
  }>;
};

export type Image = {
  url: string;
};

export type OfferType = {
  id: number;
  genus: string;
  description: string;
  pot_size: string;
  height: string;
  discount: number;
  quantity: number;
  old_price: number;
  new_price: number;
  text: string;
  images: Image[];
};

export type OffersDataType = OfferType[];
