import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, ProductDto, UpdateStockProductDto } from '../dto/__index';
import { mockCreateProductDto, mockProducDto, mockProduct } from '../__mocks__/__index';

describe('ProductsController test', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  const mockedCreateProductDto: CreateProductDto = mockCreateProductDto();
  const mockedProductDto: ProductDto = mockProducDto();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{
        provide: ProductsService,
        useValue: {
          create: jest.fn(),
          getAll: jest.fn(),
          getOne: jest.fn(),
          updateStock: jest.fn(),
          remove: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a promise that resolves to a ProductDto object', async () => {
      const createProductDto: CreateProductDto = mockedCreateProductDto;
      const productDto: ProductDto = mockedProductDto;
      jest.spyOn(productsService, 'create').mockResolvedValue(productDto);

      const result = await controller.create(createProductDto);
      expect(result).toEqual(productDto);
      expect(productsService.create).toHaveBeenCalledTimes(1);
      expect(productsService.create).toHaveBeenCalledWith(createProductDto);
    });

    it('should throw an error if the productsService.create method throws an error', async () => {
      const createProductDto: CreateProductDto = mockedCreateProductDto;
      const error = new BadRequestException('Key (title)=(Remera Sistematizadme 3) already exists.');
      jest.spyOn(productsService, 'create').mockRejectedValue(error);

      await expect(controller.create(createProductDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAll', () => {
    it('should return products', async () => {
      const products: ProductDto[] = [mockedProductDto];
      jest.spyOn(productsService, 'getAll').mockResolvedValue(products);

      const result = await controller.getAll();
      expect(result).toEqual(products);
      expect(productsService.getAll).toHaveBeenCalledTimes(1);
      expect(productsService.getAll).toHaveBeenCalledWith();
    });
  });

  describe('getOne', () => {
    it('should call productsService.getOne with the correct id', async () => {
      const id = '1';
      const productDto: ProductDto = mockedProductDto;

      jest.spyOn(productsService, 'getOne').mockResolvedValue(productDto);

      const result = await controller.getOne(id);

      expect(result).toEqual(productDto);
      expect(id).toBe(productDto.id.toString());
      expect(productsService.getOne).toHaveBeenCalledTimes(1);
      expect(productsService.getOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if productsService.getOne throws an error', async () => {
      const id = '123';
      const error = new Error('Test error');

      jest.spyOn(productsService, 'getOne').mockRejectedValue(error);

      await expect(controller.getOne(id)).rejects.toThrow(error);
    });
  });

  describe('updateStock', () => {
    it('should update stock successfully with valid id and updateProductDto', async () => {
      const id = '1';
      const updateProductDto: UpdateStockProductDto = { stock: 5 };
      const productDto: ProductDto = mockedProductDto;

      jest.spyOn(productsService, 'updateStock').mockResolvedValue(productDto);

      const result = await controller.updateStock(id, updateProductDto);

      expect(result).toEqual(productDto);
      expect(id).toBe(productDto.id.toString());
      expect(updateProductDto.stock).toBe(productDto.stock);
      expect(productsService.updateStock).toHaveBeenCalledTimes(1);
      expect(productsService.updateStock).toHaveBeenCalledWith(1, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product with a valid id', async () => {
      const id = '1';
      jest.spyOn(productsService, 'remove').mockResolvedValue();

      await controller.remove(id.toString());
      expect(productsService.remove).toHaveBeenCalledTimes(1);
      expect(productsService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw an error when removing a product that does not exist', async () => {
      const id = '2';
      const error = new NotFoundException(`Product not found with id: ${+id}`);

      jest.spyOn(productsService, 'remove').mockRejectedValue(error);
  
      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  })
});
