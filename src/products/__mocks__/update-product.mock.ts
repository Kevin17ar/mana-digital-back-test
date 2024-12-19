import { UpdateProductDto } from "../dto/__index";
import { mockCreateProductDto } from "./create-product.mock";


export const mockUpdateProduct = (): UpdateProductDto => {
    return {
        stock: 5,
        ...mockCreateProductDto
    }
};