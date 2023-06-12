import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { ProductEntity } from '../application/entities/product.entity';
import { CreateProductDto } from '../application/models/create-product.dto';
import { DeleteProductDto } from '../application/models/delete-product.dto';
import { ProductsService } from '../application/products.service';
import { ProductServiceRepository } from '../domain/product-controller.repository';

@ApiTags('Products')
@Controller('products')
export class ProductsController implements ProductServiceRepository {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({ type: ProductEntity })
  createProduct(
    @Req() request: RequestModel,
    @Body() product: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.createProduct(request.profile_id, product);
  }

  @Delete()
  deleteProduct(
    @Req() request: RequestModel,
    @Body() deleteProduct: DeleteProductDto,
  ): Promise<SimpleResponse> {
    return this.productsService.deleteProduct(
      request.profile_id,
      deleteProduct.id,
    );
  }

  @Get('/:productId')
  @ApiOkResponse({ type: ProductEntity })
  findProductById(
    @Req() request: RequestModel,
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return this.productsService.findProductById(request.profile_id, productId);
  }

  @Get()
  @ApiOkResponse({ type: [ProductEntity] })
  getAllProduct(@Req() request: RequestModel): Promise<ProductEntity[]> {
    return this.productsService.getAllProduct(request.profile_id);
  }

  @Put('/:productId')
  updateProduct(
    @Req() request: RequestModel,
    @Param('productId') productId: string,
    @Body() product: CreateProductDto,
  ): Promise<SimpleResponse> {
    return this.productsService.updateProduct(
      request.profile_id,
      productId,
      product,
    );
  }
}
