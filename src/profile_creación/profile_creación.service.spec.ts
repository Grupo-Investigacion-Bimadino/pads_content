import { Test, TestingModule } from '@nestjs/testing';
import { ProfileCreaciónService } from './profile_creación.service';

describe('ProfileCreaciónService', () => {
  let service: ProfileCreaciónService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileCreaciónService],
    }).compile();

    service = module.get<ProfileCreaciónService>(ProfileCreaciónService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
