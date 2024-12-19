import { ApiProperty } from "@nestjs/swagger"

export class RatingDto {
    @ApiProperty({ type: Number, example: 3.9 })
    rate: number;

    @ApiProperty({ type: Number, example: 120 })
    count: number;
}

export class ProductDto {
    @ApiProperty({
        type: Number,
        example: 1,
        description: 'Id del producto'
    })
    id: number;

    @ApiProperty({
        type: String,
        example: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        description: 'Title del producto'
    })
    title: string;

    @ApiProperty({
        type: Number,
        example: 109.95,
        description: 'Precio del producto'
    })
    price: number;

    @ApiProperty({
        type: Number,
        example: 120,
        description: 'Stock del producto'
    })
    stock: number;

    @ApiProperty({
        type: String,
        example: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) and display',
        description: 'Descripcion del producto'
    })
    description: string;

    @ApiProperty({
        type: String,
        example: 'men\'s clothing',
        description: 'Categoria en la que se encuentra el producto'
    })
    category: string;

    @ApiProperty({
        type: String,
        example: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        description: 'Url de la imagen del producto'
    })
    image: string;

    @ApiProperty({
        type: RatingDto,
        description: 'Rating del producto'
    })
    rating: RatingDto;
}