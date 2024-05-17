import { Module } from '@nestjs/common';
import { ProfileCreationService } from './profile_creation.service';
import { ProfileCreationController } from './profile_creation.controller';

@Module({
  controllers: [ProfileCreationController],
  providers: [ProfileCreationService],
})
export class ProfileCreationModule {}
