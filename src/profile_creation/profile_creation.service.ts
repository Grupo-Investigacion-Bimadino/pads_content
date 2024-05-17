import { Injectable } from '@nestjs/common';
import { CreateProfileCreationDto } from './dto/create-profile_creation.dto';
import { UpdateProfileCreationDto } from './dto/update-profile_creation.dto';

@Injectable()
export class ProfileCreationService {
  create(createProfileCreationDto: CreateProfileCreationDto) {
    return 'This action adds a new profileCreation';
  }

  findAll() {
    return `This action returns all profileCreation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileCreation`;
  }

  update(id: number, updateProfileCreationDto: UpdateProfileCreationDto) {
    return `This action updates a #${id} profileCreation`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileCreation`;
  }
}
