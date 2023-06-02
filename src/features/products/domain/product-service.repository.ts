import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { ProductEntity } from '../application/entities/product.entity';
import { CreateProductDto } from '../application/models/create-product.dto';

export interface ProductServiceRepository {
  createProduct(
    profileId: string,
    product: CreateProductDto,
  ): Promise<ProductEntity>;
  updateProduct(
    profileId: string,
    productId: string,
    product: CreateProductDto,
  ): Promise<SimpleResponse>;
  deleteProduct(profileId: string, productId: string): Promise<SimpleResponse>;
  getAllProduct(profileId: string): Promise<ProductEntity[]>;
  findProductById(profileId: string, productId): Promise<ProductEntity>;
}
