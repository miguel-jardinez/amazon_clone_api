import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { UserRoles } from '../../../core/models/UserRoles';
import { UserEntity } from '../application/entities/user.entity';
import { UserService } from '../application/user.service';
import { UserController } from '../infrestucture/user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let id: string;
  let user: UserEntity;

  beforeEach(async () => {
    id = faker.string.uuid();
    user = {
      id,
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: [UserRoles.CLIENT],
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Routes', () => {
    it('should return createUser when route return success', async () => {
      // CONFIGURATION
      const getSpy = jest.spyOn(service, 'createUser').mockResolvedValue(user);

      // CALL FUNCTIONS
      const data = await controller.createUser(user);

      // ASSERTIONS
      expect(getSpy).toHaveBeenCalled();
      expect(data).toEqual(user);
    });

    it('should return deleteUser when route return success', async () => {
      // CONFIGURATION
      const deleteSpy = jest.spyOn(service, 'deleteUser').mockResolvedValue({
        message: 'success',
      });

      // CALL FUNCTIONS
      const data = await controller.deleteUser({ email: user.email });

      // ASSERTIONS
      expect(deleteSpy).toHaveBeenCalled();
      expect(data).toEqual({ message: 'success' });
    });

    it('should return getById when route return success', async () => {
      // CONFIGURATION
      const getSpy = jest.spyOn(service, 'getById').mockResolvedValue(user);

      // CALL FUNCTIONS
      const data = await controller.getById(id);

      // ASSERTIONS
      expect(getSpy).toHaveBeenCalled();
      expect(data).toEqual(user);
    });

    it('should return finAllUsers when route return success', async () => {
      // CONFIGURATION
      const findAllSpy = jest
        .spyOn(service, 'finAllUsers')
        .mockResolvedValue([user]);

      // CALL FUNCTIONS
      const data = await controller.finAllUsers();

      // ASSERTIONS
      expect(data).toEqual([user]);
      expect(findAllSpy).toHaveBeenCalled();
    });
  });
});
