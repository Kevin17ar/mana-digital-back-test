import { IProduct } from "../../fake-store-api/interfaces/product.interface";
import { mockGetAllProducts } from "./__index";

export const mockGetProduct = (): IProduct => {
    return {
        ...mockGetAllProducts()[0]
    }
}