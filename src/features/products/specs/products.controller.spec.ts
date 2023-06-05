import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { RequestModel } from '../../../core/models/RequestModel';
import { ProductEntity } from '../application/entities/product.entity';
import { CreateProductDto } from '../application/models/create-product.dto';
import { DeleteProductDto } from '../application/models/delete-product.dto';
import { ProductsService } from '../application/products.service';
import { ProductsController } from '../infrestucture/products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: createMock<ProductsService>(),
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Controllers', () => {
    let createProduct: CreateProductDto;
    let product: ProductEntity;
    let request: RequestModel;
    let productId: string;

    beforeEach(() => {
      // ALL REQUIREMENTS YOU NEED FOR TEST
      createProduct = {
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        name: faker.commerce.productName(),
      };

      productId = faker.string.uuid();

      product = {
        ...createProduct,
        id: productId,
        profile: null,
      };

      request = {
        user_id: faker.string.uuid(),
        profile_id: faker.string.uuid(),
      };
    });

    describe('Create product', () => {
      it('should return product entity when services return success', async () => {
        // CONFIGURATION
        const createSpy = jest
          .spyOn(service, 'createProduct')
          .mockResolvedValue(product);

        // CALL FUNCTIONS
        const data = await controller.createProduct(request, createProduct);

        // ASSERTIONS
        expect(createSpy).toHaveBeenCalled();
        expect(data).toEqual(product);
      });
    });

    describe('Update product', () => {
      it('should return success message when services return success', async () => {
        // CONFIGURATION
        const message = 'Product updated';
        const updateSpy = jest
          .spyOn(service, 'updateProduct')
          .mockResolvedValue({
            message,
          });

        // CALL FUNCTIONS
        const data = await controller.updateProduct(
          request,
          productId,
          createProduct,
        );

        // ASSERTIONS
        expect(updateSpy).toHaveBeenCalled();
        expect(data).toEqual({ message });
      });
    });

    describe('Delete product', () => {
      it('should return success message when services return success', async () => {
        // CONFIGURATION
        const deleteDto: DeleteProductDto = {
          id: productId,
        };

        const message = `Product ${productId} deleted`;

        const deleteSpy = jest
          .spyOn(service, 'deleteProduct')
          .mockResolvedValue({
            message,
          });

        // CALL FUNCTIONS
        const data = await controller.deleteProduct(request, deleteDto);

        // ASSERTIONS
        expect(deleteSpy).toHaveBeenCalled();
        expect(data).toEqual({ message });
      });
    });

    describe('Find all products', () => {
      it('should return product llist when services return success', async () => {
        // CONFIGURATION
        const findAllSpy = jest
          .spyOn(service, 'getAllProduct')
          .mockResolvedValue([product]);

        // CALL FUNCTIONS
        const data = await controller.getAllProduct(request);

        // ASSERTIONS
        expect(findAllSpy).toHaveBeenCalled();
        expect(data).toEqual([product]);
      });
    });

    describe('Find product by id', () => {
      it('should return product entity when services return success', async () => {
        // CONFIGURATION
        const findSpy = jest
          .spyOn(service, 'findProductById')
          .mockResolvedValue(product);

        // CALL FUNCTIONS
        const data = await controller.findProductById(request, productId);

        // ASSERTIONS
        expect(findSpy).toHaveBeenCalled();
        expect(data).toEqual(product);
      });
    });
  });
});
