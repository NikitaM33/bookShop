interface IImgLink {
  thumbnail: String
}

interface IListPrice {
  amount: Number
}

interface VolumeInt {
  title: String;
  description: String;
  imageLinks: IImgLink;
  authors: [String];
}

interface PriceInt {
  listPrice: IListPrice;
  isEbook: Boolean;
}

export interface FetchBooks {
  volumeInfo: VolumeInt;
  saleInfo: PriceInt;
  // id: string;
  // image: string;
  // author: string;
  // name: string;
  // reviews: number;
  // annotation: string;
  // price: number;
  items: Array<Object>;
}
