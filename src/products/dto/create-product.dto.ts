import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        type: String,
        example: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        description: 'Titulo del producto'
    })
    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: Number,
        example: 109.95,
        description: 'Precio del producto'
    })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({
        type: Number,
        example: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        description: 'Descripcion del producto'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: String,
        example: 'men clothing',
        description: 'Categoria del producto'
    })
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    category: string;

    @ApiProperty({
        type: String,
        example: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        description: 'Imagen del producto'
    })
    @IsString()
    @IsUrl()
    @IsNotEmpty()
    image: string;
}