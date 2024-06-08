// import { Bid } from './bid';

export interface IProduct {
  _id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  countInStock: number;
  discount: number;
  categoryName: string;
}

export interface AddProductForm {
  _id: object;
  name: string;
  category: string;
  isShow: boolean;
  price: number;
  description: string;
  rating: number;
  image: string;
  countInStock: number;
  discount: number;
}
