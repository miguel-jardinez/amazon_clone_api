import { CreateProductRepository } from '../../domain/create-product.repository';
export declare class CreateProductDto implements CreateProductRepository {
    description: string;
    image: string;
    name: string;
}
