export interface IProduct {
  _id?: string | null;
  title: string;
  description: string;
  img_url: string;
  price: number;
  categories: any[];
}
