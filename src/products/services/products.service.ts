import { DeleteResult, Repository } from 'typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FakeStoreApiService } from '../../fake-store-api/services/fake-store-api.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto, ProductDto, UpdateProductDto, UpdateStockProductDto } from '../dto/__index';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly fakeStoreApiService: FakeStoreApiService,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    const { count, rate, createdAt, updatedAt, ...productSaved } = await this.save(createProductDto);

    return {
      ...productSaved,
      rating: {
        rate: rate,
        count: count,
      }
    };
  }


  async getAll(): Promise<ProductDto[]> {
    const products = await this.fakeStoreApiService.getAllProducts();

    const productWithStock: ProductDto[] = products.map((product) => {
      return {
        ...product,
        stock: Math.floor(Math.random() * 100),
      };
    });

    return productWithStock;
  }

  async getOne(id: number): Promise<ProductDto> {
    const product = await this.fakeStoreApiService.getProductDetailById(id);
    if (!product) {
      throw new NotFoundException('Product not found with id: ' + id);
    }

    const productWithStock: ProductDto = {
      ...product,
      stock: Math.floor(Math.random() * 100),
    };

    return productWithStock;
  }

  async updateStock(id: number, updateStockDto: UpdateStockProductDto): Promise<ProductDto> {
    const { count, rate, ...productUpdated } = await this.update(id, updateStockDto);

    return {
      ...productUpdated,
      rating: {
        rate: rate,
        count: count,
      }
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException('Product not found with id: ' + id);
    }

    return this.save(product);
  }

  async remove(id: number): Promise<void> {
    const deleteResult: DeleteResult = await this.productsRepository.delete({ id });

    if (!deleteResult.affected) {
      throw new NotFoundException('Product not found with id: ' + id);
    };
  }

  async save(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productsRepository.save(createProductDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(`Product already exists. ${error.detail}`);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
