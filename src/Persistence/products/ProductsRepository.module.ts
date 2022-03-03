import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])]
})

export class ProductsRepositoryModule {}