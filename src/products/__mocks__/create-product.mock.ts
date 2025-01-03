import { CreateProductDto } from "../dto/__index";

export const mockCreateProductDto = (): CreateProductDto => {
    return {
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) and display in the padded sleeve, your everyday',
        category: 'men clothing',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    }
}