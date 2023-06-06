"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_exception_service_1 = require("../utils/product-exception.service");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = ProductsService_1 = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.logger = new common_1.Logger(ProductsService_1.name);
    }
    async createProduct(profileId, product) {
        try {
            const productCreated = this.productRepository.create(Object.assign(Object.assign({}, product), { profile: { id: profileId } }));
            const data = await this.productRepository.save(productCreated);
            this.logger.log(`Product ${data} was created to profile ${profileId}`);
            return data;
        }
        catch (error) {
            throw new product_exception_service_1.ProductExceptionService(error.message, error.status);
        }
    }
    async deleteProduct(profileId, productId) {
        try {
            const wasDeleted = await this.productRepository.delete({
                id: productId,
                profile: { id: profileId },
            });
            if (wasDeleted.affected === 0) {
                this.logger.error(`Product ${productId} was not deleted successfully for profile ${productId}`);
                throw new common_1.HttpException(`Product ${productId} was not deleted`, common_1.HttpStatus.NOT_FOUND);
            }
            this.logger.log(`Product ${productId} was deleted successfully for profile ${productId}`);
            return {
                message: `Product ${productId} was deleted successfully`,
            };
        }
        catch (error) {
            throw new product_exception_service_1.ProductExceptionService(error.message, error.status);
        }
    }
    async findProductById(profileId, productId) {
        try {
            const product = await this.productRepository.findOneByOrFail({
                id: productId,
                profile: { id: profileId },
            });
            this.logger.log(`Product ${productId} was found`);
            return product;
        }
        catch (error) {
            throw new product_exception_service_1.ProductExceptionService(error.message, error.status);
        }
    }
    async getAllProduct(profileId) {
        try {
            const products = await this.productRepository.find();
            this.logger.log(`Products found for profile ${profileId}`);
            return products;
        }
        catch (error) {
            throw new product_exception_service_1.ProductExceptionService(error.message, error.status);
        }
    }
    async updateProduct(profileId, productId, product) {
        try {
            const wasUpdated = await this.productRepository.update({
                id: productId,
                profile: { id: profileId },
            }, Object.assign({}, product));
            if (wasUpdated.affected === 0) {
                throw new common_1.HttpException(`Product ${productId} not found or do not belongs to profile ${profileId}`, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                message: `Product ${productId} updated`,
            };
        }
        catch (error) {
            throw new product_exception_service_1.ProductExceptionService(error.message, error.status);
        }
    }
};
ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map