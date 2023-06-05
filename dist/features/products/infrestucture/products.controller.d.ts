import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { ProductEntity } from '../application/entities/product.entity';
import { CreateProductDto } from '../application/models/create-product.dto';
import { DeleteProductDto } from '../application/models/delete-product.dto';
import { ProductsService } from '../application/products.service';
import { ProductServiceRepository } from '../domain/product-controller.repository';
export declare class ProductsController implements ProductServiceRepository {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(request: RequestModel, product: CreateProductDto): Promise<ProductEntity>;
    deleteProduct(request: RequestModel, deleteProduct: DeleteProductDto): Promise<SimpleResponse>;
    findProductById(request: RequestModel, productId: string): Promise<ProductEntity>;
    getAllProduct(request: RequestModel): Promise<ProductEntity[]>;
    updateProduct(request: RequestModel, productId: string, product: CreateProductDto): Promise<SimpleResponse>;
}
