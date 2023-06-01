import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { CreateProfileDto } from '../application/dto/create-profile.dto';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { ProfileEntity } from '../application/entities/profile.entity';
import { ProfileService } from '../application/profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let repository: Repository<ProfileEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(ProfileEntity),
          useValue: createMock<ProfileEntity>(),
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    repository = module.get<Repository<ProfileEntity>>(
      getRepositoryToken(ProfileEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Service', () => {
    let id = faker.string.uuid();
    let profileCreated: CreateProfileDto;
    let profileUpdated: UpdateProfileDto;
    let request: RequestModel;

    beforeEach(() => {
      id = faker.string.uuid();

      profileUpdated = {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone_code: '+52',
        phone_number: faker.phone.number(),
      };

      request = {
        user_id: faker.string.uuid(),
        profile_id: faker.string.uuid(),
      };

      profileCreated = {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone_code: '+52',
        phone_number: faker.phone.number(),
      };
    });

    describe('Create Profile', () => {
      it('should return success response', async () => {
        // CONFIGURATION
        const createSpy = jest.spyOn(repository, 'create').mockReturnValue({
          ...profileCreated,
          id,
          user: null,
        });

        const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue({
          ...profileCreated,
          id,
          user: null,
        });

        // CALL FUNCTION
        const data = await service.createProfile(
          request.user_id,
          profileCreated,
        );

        // ASSERTIONS
        expect(createSpy).toHaveBeenCalled();
        expect(saveSpy).toHaveBeenCalled();
        expect(data).toEqual({ ...profileCreated, id, user: null });
      });

      it('should return error exception', async () => {
        // CONFIGURATION
        const errorMessage = 'Error to save user';

        jest
          .spyOn(repository, 'save')
          .mockRejectedValue(
            new HttpException(errorMessage, HttpStatus.CONFLICT),
          );

        // CALL FUNCTION
        await expect(
          service.createProfile(request.user_id, profileCreated),
        ).rejects.toThrowError(errorMessage);
      });
    });

    describe('Update Profile', () => {
      it('should return success response', async () => {
        // CONFIGURATION
        const successMessage = {
          message: `Profile ${request.profile_id} successfully updated`,
        } as SimpleResponse;

        const updateSpy = jest.spyOn(repository, 'update').mockResolvedValue({
          affected: 1,
          raw: [],
          generatedMaps: [],
        });

        // CALL FUNCTION
        const data = await service.updateProfile(
          request.profile_id,
          profileUpdated,
        );

        // ASSERTIONS
        expect(updateSpy).toHaveBeenCalled();
        expect(data).toEqual(successMessage);
      });

      it('should return error exception', async () => {
        // CONFIGURATION
        jest.spyOn(repository, 'update').mockResolvedValue({
          affected: 0,
          raw: [],
          generatedMaps: [],
        });

        // CALL FUNCTION
        await expect(
          service.updateProfile(request.profile_id, profileUpdated),
        ).rejects.toThrowError(`Profile ${request.profile_id} not found`);
      });
    });
  });
});
