import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRoles } from '../../../core/models/UserRoles';
import { PasswordService } from '../../../core/shared/services/password/application/password.service';
import { UserEntity } from '../application/entities/user.entity';
import { CreateUserDto } from '../application/models/create-user.dto';
import { UserService } from '../application/user.service';

describe('UserService', () => {
  let service: UserService;
  let passwordService: PasswordService;
  let repository: Repository<UserEntity>;

  let CreateUserDto: CreateUserDto;
  let mockId: string;

  beforeEach(async () => {
    CreateUserDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: [UserRoles.CLIENT],
    };

    mockId = faker.string.uuid();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PasswordService,
          useValue: createMock<PasswordService>(),
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: createMock<UserEntity>(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    passwordService = module.get<PasswordService>(PasswordService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  describe('Services', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repository).toBeDefined();
      expect(passwordService).toBeDefined();
    });
  });

  describe('Create user', () => {
    it('should return an user entity when repository respond success', async () => {
      const mockUser = {
        ...CreateUserDto,
        id: mockId,
      };

      // CONFIGURATION
      const hashPasswordSpy = jest
        .spyOn(passwordService, 'hashPassword')
        .mockResolvedValue(CreateUserDto.password);

      const createSpy = jest
        .spyOn(repository, 'create')
        .mockReturnValue(mockUser);

      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockUser);

      // CALL FUNCTIONS
      const data = await service.createUser(CreateUserDto);

      // ASSERTION
      expect(data).toEqual(mockUser);
      expect(createSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
      expect(hashPasswordSpy).toHaveBeenCalledWith(CreateUserDto.password);
    });
  });

  describe('Update user', () => {
    it('should ', async () => {
      // CONFIGURATION
      // CALL FUNCTIONS
      // ASSERTION
    });
  });

  describe('Delete user', () => {
    it('should ', async () => {
      // CONFIGURATION
      // CALL FUNCTIONS
      // ASSERTION
    });
  });

  describe('Get by Id', () => {
    it('should ', async () => {
      // CONFIGURATION
      // CALL FUNCTIONS
      // ASSERTION
    });
  });

  describe('Get by email', () => {
    it('should ', async () => {
      // CONFIGURATION
      // CALL FUNCTIONS
      // ASSERTION
    });
  });
});
