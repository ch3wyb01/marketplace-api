import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICategory } from 'src/Domain/categories/ICategory';

export type Category = _categorySchema & Document;

@Schema()
class _categorySchema implements ICategory {
  @Prop({ required: true })
  category_name: string;

  @Prop({ required: true })
  category_description: string;
}

export const CategorySchema = SchemaFactory.createForClass(_categorySchema);
