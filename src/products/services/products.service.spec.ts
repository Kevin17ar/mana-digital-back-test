import { QueryFailedError, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { FakeStoreApiService } from '../../fake-store-api/services/fake-store-api.service';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto, ProductDto, UpdateProductDto, UpdateStockProductDto } from '../dto/__index';
import { mockCreateProductDto, mockGetAllProducts, mockProducDto, mockProduct, mockUpdateProduct, mockGetProduct } from '../__mocks__/__index';
import { IProduct } from 'src/fake-store-api/interfaces/product.interface';
import {  } from 'src/fake-store-api/__mocks__/get-product.mock';

describe('ProductsService', () => {
  let service: ProductsService;
  let fakeStoreApiService: FakeStoreApiService;
  let productsRepository: Repository<Product>;

  const mockedCreateProductDto: CreateProductDto = mockCreateProductDto();
  const mockedProduct: Product = mockProduct();
  const mockedUpdateProductDto: UpdateProductDto = mockUpdateProduct();
  const mockedIProduct: IProduct[] = mockGetAllProducts();
  const mockedProductDto: ProductDto = mockProducDto();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: FakeStoreApiService,
          useValue: {
            getAllProducts: jest.fn(),
            getProductDetailById: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: jest.fn(),
            preload: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
          }
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    fakeStoreApiService = module.get<FakeStoreApiService>(FakeStoreApiService);
    productsRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should create a product successfully', async () => {
      const createProductDto: CreateProductDto = mockedCreateProductDto;
      const productCreated: Product = mockedProduct;

      jest.spyOn(productsRepository, 'save').mockResolvedValue(productCreated);

      const result = await service.save(createProductDto);
      expect(result).toBe(productCreated);
    });

    it('should throw BadRequestException if product already exists', async () => {
      const createProductDto: CreateProductDto = mockedCreateProductDto;
      const driveError = {
        code: '23505',
        detail: 'Key (title)=(Remera Sistematizadme 3) already exists.',
      };

      const error = new QueryFailedError('query failed', [], driveError as any);

      jest.spyOn(productsRepository, 'save').mockRejectedValue(error);

      await expect(service.save(createProductDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      const createProductDto: CreateProductDto = mockedCreateProductDto;
      const error = new Error('Internal server error');

      jest.spyOn(productsRepository, 'save').mockRejectedValue(error);

      await expect(service.save(createProductDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('should remove a product successfully', async () => {
      const id = 1;
      const deleteResult = { raw: 1, affected: 1 };

      jest.spyOn(productsRepository, 'delete').mockResolvedValue(deleteResult);

      await service.remove(id);

      expect(productsRepository.delete).toHaveBeenCalledTimes(1);
      expect(productsRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw NotFoundException if product not found', async () => {
      const id = 1;
      const deleteResult = { raw: 0, affected: 0 };
      jest.spyOn(productsRepository, 'delete').mockResolvedValue(deleteResult);

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      const id = 1;
      const updateProductDto: UpdateProductDto = { ...mockedUpdateProductDto };
      const product = mockedProduct;

      jest.spyOn(productsRepository, 'preload').mockResolvedValue(product);
      jest.spyOn(productsRepository, 'save').mockResolvedValue(product);

      const result = await service.update(id, updateProductDto);
      expect(result).toBe(product);
    });

    it('should throw NotFoundException if product not found', async () => {
      const id = 1;
      const updateProductDto: UpdateProductDto = mockedUpdateProductDto;

      jest.spyOn(productsRepository, 'preload').mockResolvedValue(null);

      await expect(service.update(id, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStock', () => {
    it('should update stock with valid id and updateStockDto', async () => {
      const id = 1;
      const updateStockDto: UpdateStockProductDto = { stock: 10 };
      const product = mockedProduct;
      const { count, rate, ...productUpdated } = product;

      jest.spyOn(productsRepository, 'preload').mockResolvedValue(product);
      jest.spyOn(productsRepository, 'save').mockResolvedValue(product);

      const result = await service.updateStock(id, updateStockDto);

      expect(result).toEqual({
        ...productUpdated,
        rating: {
          rate: rate,
          count: count,
        }
      });


    });

    it('should throw NotFoundException if product not found with id', async () => {
      const id = 1;
      const updateStockDto: UpdateStockProductDto = { stock: 5 };

      jest.spyOn(productsRepository, 'preload').mockResolvedValue(null);

      await expect(service.updateStock(id, updateStockDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getOne', () => {
    it('should return a product with stock', async () => {
      const id = 1;
      const product = mockGetProduct();
      const productWithStock: ProductDto = mockedProductDto;
  
      jest.spyOn(fakeStoreApiService, 'getProductDetailById').mockResolvedValue(product);
  
      const result = await service.getOne(id);
  
      expect(result.id).toBe(productWithStock.id);
    });
  
    it('should throw NotFoundException if product not found', async () => {
      const id = 1;
      jest.spyOn(fakeStoreApiService, 'getProductDetailById').mockResolvedValue(null);
  
      await expect(service.getOne(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllProducts', () => {
    it('should return a list of products with stock', async () => {
      const products = mockedIProduct;
      jest.spyOn(fakeStoreApiService, 'getAllProducts').mockResolvedValue(products);

      const result = await service.getAll();
      expect(result).toEqual(
        products.map((product) => ({
          ...product,
          stock: expect.any(Number),
        })),
      );
    });

    it('should return an empty array when fakeStoreApiService.getAllProducts returns an empty array', async () => {
      jest.spyOn(fakeStoreApiService, 'getAllProducts').mockResolvedValue([]);
      const result = await service.getAll();
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const createProductDto: CreateProductDto = mockedCreateProductDto;
      const productCreated: Product = mockedProduct;
      const producDto: ProductDto = mockedProductDto;

      jest.spyOn(productsRepository, 'save').mockResolvedValue(productCreated);

      const result = await service.create(createProductDto);
      expect(result).toEqual(producDto);
    });

    it('should throw BadRequestException if product already exists', async () => {
      const createProductDto: CreateProductDto = mockedCreateProductDto;
      const driveError = {
        code: '23505',
        detail: 'Key (title)=(Remera Sistematizadme 3) already exists.',
      };

      const error = new QueryFailedError('query failed', [], driveError as any);

      jest.spyOn(productsRepository, 'save').mockRejectedValue(error);

      await expect(service.create(createProductDto)).rejects.toThrow(BadRequestException);
    });
  })
});
