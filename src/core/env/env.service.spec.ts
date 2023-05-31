import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { EnvConfigService } from './env.service';

describe('TypeOrm Service', () => {
  let service: EnvConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvConfigService,
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(),
        },
      ],
    }).compile();

    service = await module.get<EnvConfigService>(EnvConfigService);
    configService = await module.get<ConfigService>(ConfigService);
  });

  describe('Modules', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(configService).toBeDefined();
    });
  });

  describe('Environment variables', () => {
    it('should return string', () => {
      // CONFIGURATION
      const spyGetString = jest
        .spyOn(configService, 'get')
        .mockReturnValue('url_mock_value');

      // CALL FUNCTIONS
      const data = service.getString('MOCK_VALUE');

      // TESTING
      expect(spyGetString).toHaveBeenCalled();
      expect(data).toEqual('url_mock_value');
    });

    it('should return number', () => {
      // CONFIGURATION
      const spyGetString = jest.spyOn(configService, 'get').mockReturnValue(1);

      // CALL FUNCTIONS
      const data = service.getNumber('MOCK_NUMBER_VALUE');

      // TESTING
      expect(spyGetString).toHaveBeenCalled();
      expect(data).toEqual(1);
    });

    it('should return Boolean', () => {
      // CONFIGURATION
      const spyGetString = jest
        .spyOn(configService, 'get')
        .mockReturnValue(true);

      // CALL FUNCTIONS
      const data = service.getBoolean('MOCK_VALUE');

      // TESTING
      expect(spyGetString).toHaveBeenCalled();
      expect(data).toEqual(true);
    });

    it('should return if environment is develop', () => {
      // CONFIGURATION
      const spyGetString = jest
        .spyOn(configService, 'get')
        .mockReturnValue('development');

      // CALL FUNCTIONS
      const data = service.isDevelop();

      // TESTING
      expect(spyGetString).toHaveBeenCalled();
      expect(data).toEqual(true);
    });

    it('should return if environment is production', () => {
      // CONFIGURATION
      const spyGetString = jest
        .spyOn(configService, 'get')
        .mockReturnValue('production');

      // CALL FUNCTIONS
      const data = service.isProduction();

      // TESTING
      expect(spyGetString).toHaveBeenCalled();
      expect(data).toEqual(true);
    });

    it('should return Database url', () => {
      // CONFIGURATION
      const spyGetString = jest
        .spyOn(configService, 'get')
        .mockReturnValue('mock_database_url');

      // CALL FUNCTIONS
      const data = service.getDatabaseUrl();

      // TESTING
      expect(spyGetString).toHaveBeenCalled();
      expect(data).toEqual('mock_database_url');
    });
  });
});
