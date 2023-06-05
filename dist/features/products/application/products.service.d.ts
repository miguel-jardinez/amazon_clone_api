import { Repository } from 'typeorm';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { ProductServiceRepository } from '../domain/product-service.repository';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './models/create-product.dto';
export declare class ProductsService implements ProductServiceRepository {
    private readonly productRepository;
    private readonly logger;
    constructor(productRepository: Repository<ProductEntity>);
    createProduct(profileId: string, product: CreateProductDto): Promise<ProductEntity>;
    deleteProduct(profileId: string, productId: string): Promise<SimpleResponse>;
    findProductById(profileId: string, productId: string): Promise<ProductEntity>;
    getAllProduct(profileId: string): Promise<ProductEntity[]>;
    updateProduct(profileId: string, productId: string, product: CreateProductDto): Promise<SimpleResponse>;
}
