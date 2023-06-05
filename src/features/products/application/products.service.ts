import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { ProductServiceRepository } from '../domain/product-service.repository';
import { ProductExceptionService } from '../utils/product-exception.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './models/create-product.dto';

@Injectable()
export class ProductsService implements ProductServiceRepository {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(
    profileId: string,
    product: CreateProductDto,
  ): Promise<ProductEntity> {
    try {
      const productCreated = this.productRepository.create({
        ...product,
        profile: { id: profileId },
      });

      const data = await this.productRepository.save(productCreated);

      this.logger.log(`Product ${data} was created to profile ${profileId}`);

      return data;
    } catch (error) {
      throw new ProductExceptionService(error.message, error.status);
    }
  }

  async deleteProduct(
    profileId: string,
    productId: string,
  ): Promise<SimpleResponse> {
    try {
      const wasDeleted = await this.productRepository.delete({
        id: productId,
        profile: { id: profileId },
      });

      if (wasDeleted.affected === 0) {
        this.logger.error(
          `Product ${productId} was not deleted successfully for profile ${productId}`,
        );
        throw new HttpException(
          `Product ${productId} was not deleted`,
          HttpStatus.NOT_FOUND,
        );
      }

      this.logger.log(
        `Product ${productId} was deleted successfully for profile ${productId}`,
      );

      return {
        message: `Product ${productId} was deleted successfully`,
      };
    } catch (error) {
      throw new ProductExceptionService(error.message, error.status);
    }
  }

  async findProductById(
    profileId: string,
    productId: string,
  ): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findOneByOrFail({
        id: productId,
        profile: { id: profileId },
      });

      this.logger.log(`Product ${productId} was found`);

      return product;
    } catch (error) {
      throw new ProductExceptionService(error.message, error.status);
    }
  }

  async getAllProduct(profileId: string): Promise<ProductEntity[]> {
    try {
      const products = await this.productRepository.find();

      this.logger.log(`Products found for profile ${profileId}`);
      return products;
    } catch (error) {
      throw new ProductExceptionService(error.message, error.status);
    }
  }

  async updateProduct(
    profileId: string,
    productId: string,
    product: CreateProductDto,
  ): Promise<SimpleResponse> {
    try {
      const wasUpdated = await this.productRepository.update(
        {
          profile: { id: profileId },
        },
        product,
      );

      if (wasUpdated.affected === 0) {
        throw new HttpException(
          `Product ${productId} not found or do not belongs to profile ${profileId}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: `Product ${productId} updated`,
      };
    } catch (error) {
      throw new ProductExceptionService(error.message, error.status);
    }
  }
}
