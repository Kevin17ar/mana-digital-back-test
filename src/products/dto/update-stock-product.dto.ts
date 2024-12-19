import { PickType } from "@nestjs/swagger";
import { UpdateProductDto } from "./update-product.dto";

export class UpdateStockProductDto extends PickType(UpdateProductDto, ['stock'] as const) { }