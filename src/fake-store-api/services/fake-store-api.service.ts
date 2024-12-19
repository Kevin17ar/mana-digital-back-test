import { Inject, Injectable, Logger } from '@nestjs/common';
import { config } from '../../config';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { IProduct } from '../interfaces/product.interface';

@Injectable()
export class FakeStoreApiService {
    private readonly logger = new Logger(FakeStoreApiService.name);
    private readonly fakeStoreApi: string;

    constructor(
        @Inject(config.KEY)
        private readonly configuration: ConfigType<typeof config>,
        private readonly httpService: HttpService,
    ) {
        this.fakeStoreApi = this.configuration.services.fakeStoreApi;
    }

    async getAllProducts(): Promise<IProduct[]> {
        const host = `${this.fakeStoreApi}/products`;
        this.logger.log(`Get all products from ${host}`);
        
        const { data } = await this.httpService.axiosRef.get<IProduct[]>(host);
        return data;
    };

    async getProductDetailById(id: number): Promise<IProduct> {
        const host = `${this.fakeStoreApi}/products/${id}`;
        this.logger.log(`Get product details from ${host}`);

        const { data } = await this.httpService.axiosRef.get<IProduct>(host);
        return data;
    };
}
