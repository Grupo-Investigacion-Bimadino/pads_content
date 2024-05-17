import { Test, TestingModule } from '@nestjs/testing';
import { ProfileCreationController } from './profile_creation.controller';
import { ProfileCreationService } from './profile_creation.service';

describe('ProfileCreationController', () => {
  let controller: ProfileCreationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileCreationController],
      providers: [ProfileCreationService],
    }).compile();

    controller = module.get<ProfileCreationController>(ProfileCreationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
