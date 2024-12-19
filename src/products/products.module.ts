import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { FakeStoreApiModule } from 'src/fake-store-api/fake-store-api.module';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    FakeStoreApiModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
