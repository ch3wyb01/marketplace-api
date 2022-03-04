import mongoose from "mongoose";
import { Category } from "src/Persistence/categories/category.schema";

export interface IProduct {
  _id?: string | null,
  title: string;
  description: string;
  price: number;
  categories: any[];
}
