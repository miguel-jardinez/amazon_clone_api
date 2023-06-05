import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../application/entities/product.entity';
import { CreateProductDto } from '../application/models/create-product.dto';
import { ProductsService } from '../application/products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: createMock<ProductEntity>(),
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Service', () => {
    let createProduct: CreateProductDto;
    let profileId: string;
    let id: string;

    beforeEach(() => {
      profileId = faker.string.uuid();
      id = faker.string.uuid();

      createProduct = {
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        name: faker.commerce.productName(),
      };
    });

    describe('Create product', () => {
      it('should return a product entity when service return success', async () => {
        // CONFIGURATION
        const response: ProductEntity = {
          ...createProduct,
          id,
          profile: null,
        };

        const createSpy = jest
          .spyOn(repository, 'create')
          .mockReturnValue(response);

        const saveSpy = jest
          .spyOn(repository, 'save')
          .mockResolvedValue(response);

        // CALL FUNCTIONS
        const data = await service.createProduct(profileId, createProduct);

        // ASSERTIONS
        expect(data).toEqual(response);
        expect(createSpy).toHaveBeenCalled();
        expect(saveSpy).toHaveBeenCalled();
      });

      it('should return error when repository fails', async () => {
        // CONFIGURATION
        const error = `Error to save product ${createProduct.name}`;

        const response: ProductEntity = {
          ...createProduct,
          id,
          profile: null,
        };

        jest.spyOn(repository, 'create').mockReturnValue(response);

        jest
          .spyOn(repository, 'save')
          .mockRejectedValue(new HttpException(error, HttpStatus.CONFLICT));

        // CALL FUNCTIONS
        await expect(
          service.createProduct(profileId, createProduct),
        ).rejects.toThrowError(error);

        // ASSERTIONS
      });
    });

    describe('Find All Products', () => {
      it('should return all products when repository return success', async () => {
        // CONFIGURATION
        const product: ProductEntity = {
          ...createProduct,
          id,
          profile: null,
        };

        const findSpy = jest
          .spyOn(repository, 'find')
          .mockResolvedValue([product]);

        // CALL FUNCTIONS
        const data = await service.getAllProduct(profileId);

        // ASSERTIONS
        expect(data).toEqual([product]);
        expect(findSpy).toHaveBeenCalled();
      });

      it('should return error when get all products fails', async () => {
        // CONFIGURATION
        const error = `Error to find products for user ${profileId}`;

        jest
          .spyOn(repository, 'find')
          .mockRejectedValue(new HttpException(error, HttpStatus.NOT_FOUND));

        // ASSERTIONS
        await expect(service.getAllProduct(profileId)).rejects.toThrowError(
          error,
        );
      });
    });

    describe('Update product', () => {
      it('should update product when repository return success', async () => {
        // CONFIGURATION
        const message = `Product ${id} updated`;
        const updateSpy = jest.spyOn(repository, 'update').mockResolvedValue({
          affected: 1,
          raw: [],
          generatedMaps: [],
        });

        // CALL FUNCTIONS
        const data = await service.updateProduct(profileId, id, createProduct);

        // ASSERTIONS
        expect(updateSpy).toHaveBeenCalled();
        expect(data).toEqual({
          message,
        });
      });

      it('should return error exception when repository fails', async () => {
        // CONFIGURATION
        const message = `Product ${id} not found or do not belongs to profile ${profileId}`;
        jest.spyOn(repository, 'update').mockResolvedValue({
          affected: 0,
          raw: [],
          generatedMaps: [],
        });

        // ASSERTIONS
        await expect(
          service.updateProduct(profileId, id, createProduct),
        ).rejects.toThrowError(message);
      });
    });

    describe('Delete product', () => {
      it('should delete product when repository return success', async () => {
        // CONFIGURATION
        const message = `Product ${id} was deleted successfully`;
        const updateSpy = jest.spyOn(repository, 'delete').mockResolvedValue({
          affected: 1,
          raw: [],
        });

        // CALL FUNCTIONS
        const data = await service.deleteProduct(profileId, id);

        // ASSERTIONS
        expect(updateSpy).toHaveBeenCalled();
        expect(data).toEqual({
          message,
        });
      });

      it('should return error exception when repository fails', async () => {
        // CONFIGURATION
        const message = `Product ${id} was not deleted`;
        jest.spyOn(repository, 'delete').mockResolvedValue({
          affected: 0,
          raw: [],
        });

        // ASSERTIONS
        await expect(service.deleteProduct(profileId, id)).rejects.toThrowError(
          message,
        );
      });
    });

    describe('Get product by id', () => {
      it('should return product by id when repository return success', async () => {
        // CONFIGURATION
        const product: ProductEntity = {
          ...createProduct,
          id,
          profile: null,
        };

        const findOneSpy = jest
          .spyOn(repository, 'findOneByOrFail')
          .mockResolvedValue(product);

        // CALL FUNCTIONS
        const data = await service.findProductById(profileId, id);

        // ASSERTIONS
        expect(findOneSpy).toHaveBeenCalled();
        expect(data).toEqual(product);
      });

      it('should throw an error when repository fails', async () => {
        // CONFIGURATION
        const message = 'Not product found';
        jest
          .spyOn(repository, 'findOneByOrFail')
          .mockRejectedValue(new HttpException(message, HttpStatus.NOT_FOUND));

        // ASSERTIONS
        await expect(
          service.findProductById(profileId, id),
        ).rejects.toThrowError(message);
      });
    });
  });
});
