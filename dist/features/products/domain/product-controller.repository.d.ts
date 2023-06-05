import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { ProductEntity } from '../application/entities/product.entity';
import { CreateProductDto } from '../application/models/create-product.dto';
import { DeleteProductDto } from '../application/models/delete-product.dto';
export interface ProductServiceRepository {
    createProduct(request: RequestModel, product: CreateProductDto): Promise<ProductEntity>;
    updateProduct(request: RequestModel, productId: string, product: CreateProductDto): Promise<SimpleResponse>;
    deleteProduct(request: RequestModel, deleteProduct: DeleteProductDto): Promise<SimpleResponse>;
    getAllProduct(request: RequestModel): Promise<ProductEntity[]>;
    findProductById(request: RequestModel, productId: any): Promise<ProductEntity>;
}
