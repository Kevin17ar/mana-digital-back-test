import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        type: Number,
        example: 10,
        description: 'Stock del producto'
    })
    @IsNumber()
    @IsPositive()
    stock?: number
}
