import { Module } from '@nestjs/common';
import { ProfileCreaciónService } from './profile_creación.service';
import { ProfileCreaciónController } from './profile_creación.controller';

@Module({
  controllers: [ProfileCreaciónController],
  providers: [ProfileCreaciónService],
})
export class ProfileCreaciónModule {}
