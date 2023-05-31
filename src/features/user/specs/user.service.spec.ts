import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PasswordService } from '../../../core/shared/services/password/application/password.service';
import { UserEntity } from '../application/entities/user.entity';
import { UserService } from '../application/user.service';

describe('UserService', () => {
  let service: UserService;
  let passwordService: PasswordService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PasswordService,
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
    it('should ', async () => {
      // CONFIGURATION
      // CALL FUNCTIONS
      // ASSERTION
    });
  });

  describe('Update user', async () => {
    // CONFIGURATION
    // CALL FUNCTIONS
    // ASSERTION
  });

  describe('Delete user', async () => {
    // CONFIGURATION
    // CALL FUNCTIONS
    // ASSERTION
  });

  describe('Get by Id', async () => {
    // CONFIGURATION
    // CALL FUNCTIONS
    // ASSERTION
  });

  describe('Get by email', async () => {
    // CONFIGURATION
    // CALL FUNCTIONS
    // ASSERTION
  });
});
