import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CreateProductRepository } from '../../domain/create-product.repository';

export class CreateProductDto implements CreateProductRepository {
  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  name: string;
}
