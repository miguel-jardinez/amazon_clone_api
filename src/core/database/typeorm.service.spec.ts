import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { EnvConfigService } from '../env/env.service';
import { TypeOrmConfigService } from './typeorm.service';

const expectedResult = {
  type: 'postgres',
  url: 'postgres_url',
  entities: [`${__dirname}/../../**/*.entity.{ts,js}`],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  logger: 'file',
  migrations: [
    '/Users/migueljardinez/Documents/projects/personal_projects/amazon_clone/src/core/database/../../migrations/**/*.{ts,js}',
  ],
  migrationsRun: {},
};

describe('TypeOrm Service', () => {
  let typeOrmService: TypeOrmConfigService;
  let envService: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmConfigService,
        { provide: EnvConfigService, useValue: createMock<EnvConfigService>() },
      ],
    }).compile();

    typeOrmService = module.get<TypeOrmConfigService>(TypeOrmConfigService);
    envService = module.get<EnvConfigService>(EnvConfigService);
  });

  describe('Modules', () => {
    it('should be defined', () => {
      expect(typeOrmService).toBeDefined();
    });
  });

  it('should return typeormConfiguration', async () => {
    // CONFIGURATION
    const urlSpy = jest
      .spyOn(envService, 'getDatabaseUrl')
      .mockReturnValue('postgres_url');

    const isDevelop = jest.spyOn(envService, 'isDevelop').mockReturnValue(true);

    // CALL FUNCTIONS
    const data = await typeOrmService.createTypeOrmOptions();

    // TESTING
    expect(urlSpy).toBeCalled();
    expect(isDevelop).toBeCalled();
    expect(data).toEqual(expectedResult);
  });
});
