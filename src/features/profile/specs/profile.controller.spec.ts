import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { RequestModel } from '../../../core/models/RequestModel';
import { SimpleResponse } from '../../../core/models/SimpleResponse';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { ProfileService } from '../application/profile.service';
import { ProfileController } from '../infrestructure/profile.controller';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: createMock<ProfileService>(),
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Update user', () => {
    it('Should return success message when user was updated', async () => {
      // CONFIGURATION
      const profileUpdated = {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone_code: '+52',
        phone_number: faker.phone.number(),
      } as UpdateProfileDto;

      const request = {
        user_id: faker.string.uuid(),
        profile_id: faker.string.uuid(),
      } as RequestModel;

      const successMessage = {
        message: `User ${request.profile_id} was updated`,
      } as SimpleResponse;

      const updateSpy = jest
        .spyOn(service, 'updateProfile')
        .mockResolvedValue(successMessage);

      // CALL FUNCTIONS
      const data = await controller.updateProfile(request, profileUpdated);

      // TESTING
      expect(updateSpy).toHaveBeenCalled();
      expect(data).toEqual(successMessage);
    });
  });
});
