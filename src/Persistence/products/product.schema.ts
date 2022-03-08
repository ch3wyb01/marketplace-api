import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IProduct } from '../../Domain/products/IProduct';
import { Schema as MongooseSchema } from 'mongoose';
import { Category } from '../categories/category.schema';

export type Product = _productSchema & Document;

@Schema()
class _productSchema implements IProduct {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  img_url: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Category' })
  categories: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(_productSchema);
