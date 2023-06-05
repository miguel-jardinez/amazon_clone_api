import { IsOptional, IsString } from 'class-validator';

import { CreateProductRepository } from '../../domain/create-product.repository';

export class CreateProductDto implements CreateProductRepository {
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  name: string;
}
