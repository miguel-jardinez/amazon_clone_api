import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UserRoles } from '../../../core/models/UserRoles';
import { UserEntity } from '../../user/application/entities/user.entity';
import { UserService } from '../../user/application/user.service';
import { AuthService } from '../application/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Services', () => {
    it('should Login successfully user', async () => {
      // CONFIGURATION
      const token = faker.internet.password();
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: [UserRoles.CLIENT],
        id: faker.string.uuid(),
      } as UserEntity;

      // CALL FUNCTIONS
      const jwtSignSpy = jest.spyOn(jwtService, 'sign').mockReturnValue(token);
      const data = await service.login(user);

      // ASSERTIONS
      expect(data).toEqual({ user, token });
      expect(jwtSignSpy).toHaveBeenCalled();
    });

    it('should return register success', async () => {
      // CONFIGURATION
      const token = faker.internet.password();
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: [UserRoles.CLIENT],
        id: faker.string.uuid(),
      } as UserEntity;

      // CALL FUNCTION
      const registerSpy = jest
        .spyOn(userService, 'createUser')
        .mockResolvedValue(user);

      const jwtSignSpy = jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const data = await service.register({
        email: user.email,
        password: user.password,
      });

      // ASSERTIONS
      expect(data).toEqual({ user, token });
      expect(jwtSignSpy).toHaveBeenCalled();
      expect(registerSpy).toHaveBeenCalled();
    });
  });
});
