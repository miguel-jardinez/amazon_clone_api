import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { RequestModel } from '../../../core/models/RequestModel';
import { UserRoles } from '../../../core/models/UserRoles';
import { AuthService } from '../application/auth.service';
import { RegisterAuthDto } from '../application/models/register-auth.dto';
import { AuthController } from '../infrestucture/auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Routes', () => {
    it('should return login response', async () => {
      // CONFIGURATION
      const token = faker.string.uuid();

      const req: RequestModel = {
        user_id: faker.string.uuid(),
        profile_id: faker.string.uuid(),
      };

      const loginSpy = jest.spyOn(service, 'login').mockResolvedValue({
        token: token,
      });

      // CALL FUNCTIONS
      const data = await controller.login(req);

      // ASSERTION
      expect(data).toEqual({ token });
      expect(loginSpy).toHaveBeenCalled();
    });

    it('should return register response', async () => {
      // CONFIGURATION
      const registerAuth = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      } as RegisterAuthDto;

      const token = faker.string.uuid();

      const registerSpy = jest.spyOn(service, 'register').mockResolvedValue({
        token,
      });

      // CALL FUNCTIONS
      const data = await controller.register(registerAuth);

      // ASSERTION
      expect(data).toEqual({ token });
      expect(registerSpy).toHaveBeenCalled();
    });
  });
});
