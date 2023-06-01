import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
});
