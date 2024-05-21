import { Test, TestingModule } from '@nestjs/testing';
import { ProfileCreaciónController } from './profile_creación.controller';
import { ProfileCreaciónService } from './profile_creación.service';

describe('ProfileCreaciónController', () => {
  let controller: ProfileCreaciónController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileCreaciónController],
      providers: [ProfileCreaciónService],
    }).compile();

    controller = module.get<ProfileCreaciónController>(ProfileCreaciónController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
