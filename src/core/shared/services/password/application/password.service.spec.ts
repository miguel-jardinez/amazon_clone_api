import { Test, TestingModule } from '@nestjs/testing';
import * as argon from 'argon2';

import { PasswordService } from './password.service';

describe('TypeOrm Service', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  describe('Modules', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Hash password', () => {
    it('should return hash password', async () => {
      // CONFIGURATION
      const hashSpy = jest
        .spyOn(argon, 'hash')
        .mockResolvedValue('mock_password');

      // CALL FUNCTIONS
      const data = await service.hashPassword('password');

      // TESTING
      expect(hashSpy).toHaveBeenCalled();
      expect(data).toEqual('mock_password');
    });
  });

  it('should return verify password', async () => {
    // CONFIGURATION
    const verifySpy = jest.spyOn(argon, 'verify').mockResolvedValue(true);

    // CALL FUNCTIONS
    const data = await service.verifyPassword('password', '12345');

    // TESTING
    expect(verifySpy).toHaveBeenCalled();
    expect(data).toEqual(true);
  });
});
