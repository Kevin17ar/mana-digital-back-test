import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { GlobalSwagger } from '../../common/decorators/global-swagger.decorator';
import { CreateProductDto, UpdateStockProductDto, ProductDto } from '../dto/__index';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @GlobalSwagger(
    'Crea un producto',
    'Permite agregar un producto al catálogo local y guardarlo en la base de datos.',
    ProductDto,
    201
  )
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    return this.productsService.create(createProductDto);
  }

  @GlobalSwagger(
    'Obtiene todos los productos',
    'Devuelve una lista de productos obtenidos de https://fakestoreapi.com.',
    [ProductDto])
  @Get()
  getAll(): Promise<ProductDto[]> {
    return this.productsService.getAll();
  }

  @GlobalSwagger(
    'Obtiene un producto',
    'Devuelve los detalles de un producto específico, integrando información desde https://fakestoreapi.com.',
    ProductDto
  )
  @Get(':id')
  getOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productsService.getOne(+id);
  }

  @GlobalSwagger(
    'Actualiza el stock de un producto',
    'Actualiza el stock de un producto almacenado localmente en la base de datos',
    ProductDto,
  )
  @Put('/:id/stock')
  updateStock(@Param('id') id: string, @Body() updateProductDto: UpdateStockProductDto) {
    return this.productsService.updateStock(+id, updateProductDto);
  }

  @GlobalSwagger(
    'Elimina un producto',
    'Elimina un producto almacenado localmente en la base de datos',
    null,
    204
  )
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
