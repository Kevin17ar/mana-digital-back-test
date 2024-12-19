import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { config } from '../../config';
import { FakeStoreApiService } from './fake-store-api.service';
import { mockGetAllProduct } from '../__mocks__/get-all-products.mock';
import { IProduct } from '../interfaces/product.interface';
import { mockGetProduct, mockGetProductNotFound } from '../__mocks__/get-product.mock';

describe('FakeStoreApiService test', () => {
  let service: FakeStoreApiService;
  let httpService: HttpService;

  const mockedGetProductsData = mockGetAllProduct();
  const mockedGetProductData = mockGetProduct();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          ignoreEnvFile: true,
          isGlobal: true,
          load: [config],
        }),
        HttpModule
      ],
      providers: [
        FakeStoreApiService,
      ],
    }).compile();

    service = module.get<FakeStoreApiService>(FakeStoreApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return data on successful', async () => {
      jest.spyOn(httpService.axiosRef, 'get').mockResolvedValue(mockedGetProductsData);

      const result = await service.getAllProducts();
      expect(result).toEqual(mockedGetProductsData.data);
    });
  });

  describe('getProductDetailById', () => {
    it('should return product details for valid ID', async () => {
      const id = 1;
      const product: IProduct = mockedGetProductData.data;

      jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce(mockedGetProductData);

      const result = await service.getProductDetailById(id);
      expect(result).toEqual(product);
    });

    it('should throw error for invalid or non-existent product ID', async () => {
      const id = 999999;
      const response = mockGetProductNotFound();

      jest.spyOn(httpService.axiosRef, 'get').mockResolvedValue(response);

      const result = await service.getProductDetailById(id);

      expect(result).toBe('');
    });
  })
});
