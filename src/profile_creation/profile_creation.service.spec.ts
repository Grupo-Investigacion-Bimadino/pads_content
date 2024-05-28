import { Test, TestingModule } from '@nestjs/testing';
import { ProfileCreationService } from './profile_creation.service';

describe('ProfileCreationService', () => {
  let service: ProfileCreationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileCreationService],
    }).compile();

    service = module.get<ProfileCreationService>(ProfileCreationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
