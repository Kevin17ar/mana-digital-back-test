import { Product } from "../entities/product.entity";
import { mockCreateProductDto } from "./create-product.mock";
import { ProductDto } from "../dto/product.dto";

export const mockProduct = (): Product => {
    return {
        id: 1,
        stock: 5,
        rate: 0.0,
        count: 0,
        ...mockCreateProductDto(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
};

export const mockProducDto = (): ProductDto => {
    return {
        id: 1,
        stock: 5,
        ...mockCreateProductDto(),
        rating: {
            count: 0,
            rate: 0.0
        }
    }
};